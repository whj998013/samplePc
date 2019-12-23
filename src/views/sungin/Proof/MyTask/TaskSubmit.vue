<style scoped>
</style>
<template>
  <div>
    <!-- 工作提交 -->
    <Modal v-model="showSumitBox" :title="'提交任务,工序：'+currentRow.ProcessName" width="650px">
      <div slot="footer">
        <Button type="error" size="large" @click="showSumitBox=false">取消</Button>
        <Button type="primary" size="large" @click="submit">提交</Button>

      </div>
      <Row>
        <Col span="8">
        <h3>编号:{{currentRow.ProofOrderId}}</h3>
        </Col>
        <Col span="8">
        <h3>款号:{{currentRow.ProofStyleNo}}</h3>
        </Col>
        <Col span="8">
        <h3>业务员:{{currentRow.UserName}}</h3>
        </Col>
      </Row>

      <Row>
        <Divider>上传文件</Divider>
        <Col span="8">
        <Upload type="drag" :with-credentials="true" :action="baseUrl + '/ProofTask/UpLoadFile'" :data="upLoadData" :on-success="fileUploadOUpSuccess" :show-upload-list=false>
          <div>
            <Icon type="ios-cloud-upload" size="100" style="color: #3399ff"></Icon>
            <p>点击或将文件拖入框内上传</p>
          </div>
        </Upload>
        </Col>
        <Col span="15" offset="1">
        <p>如有多尺码机型，请将文件按不同尺码机型命名上传</p>
        <Tag closable color="success" v-for="(f,index) in uploadList" :key="index" @on-close="removeFile(f,index)">{{f.DisplayName}}</Tag>
        </Col>
      </Row>
      <Divider>选择下级任务</Divider>
      <Row v-show="NextTask.isHave">
        <h2>打样管理员已设置下级任务</h2>
        <h2>工序:{{NextTask.process}},姓名:{{NextTask.name}}</h2>

      </Row>
      <Row v-show="!NextTask.isHave">
        <Form :label-width="65" label-position="right">
          <Col span="8">
          <FormItem label="工序">
            <Select v-model="currentTask.nextProcessId" @on-change="processChange">
              <Option value="0">无</Option>
              <Option v-for="item in processList" :value="item.Id" :key="item.Id">{{ item.ProcessName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="姓名" v-show="havenextWorkerName">
            <workerSelect v-model="currentTask.nextWorkerName" ref="wSelect" :HaveNoSelect="false" NoScore></workerSelect>
          </FormItem>
          </Col>
        </Form>
      </Row>
    </Modal>
  </div>
</template>
<script>
//import bus from "../bus.js";
import workerSelect from "../../commpent/workerSelect.vue";

export default {
  components: {
    workerSelect
  },
  data: function () {
    return {
      NextTask: {
        isHave: false,
        process: "",
        name: "",
      },
      baseUrl: this.$util.baseUrl,
      dataUrl: this.$util.dataUrl,
      showSumitBox: false,
      uploadList: [],
      processList: [],
      havenextWorkerName: true,
      currentRow: {},
      currentTask: {
        nextTaskId: 0,
        nextProcessId: -1,
        nextWorkerName: "",
        nextProcessName: "",
        nextTaskNO: "",
      },
      upLoadData: {},
    };
  },
  methods: {
    async submit() {
      let haveError = false;
      if (this.uploadList.length == 0) {
        //没有上传文件
        this.$Message.error("请上传" + this.currentRow.ProcessName + "文件");
        haveError = true;
      };

      if (!this.NextTask.isHave && this.currentTask.nextProcessId < 0) {
        this.$Message.error("请选择下级任务。");
        haveError = true;

      };

      if (this.currentTask.nextWorkerName == "" && this.currentTask.nextProcessId > 0) {
        this.$Message.error("请选择任务员工。");
        haveError = true;
      };
      if (!haveError) {
        console.log(this.currentTask);
        this.currentTask.nextTaskNO = this.$util.getID(8);
        let re = await this.$util.post("/ProofTask/SubmitTask/", this.currentTask);
        
        this.$Message.info("任务完成");
        this.showSumitBox = false;
      };

    },
    async Show(row) {
      console.log("row", row);
      this.havenextWorkerName = true;
      let proofId = row.ProofOrderId;
      let re = await this.$util.get("/ProofTask/GetTasks/" + proofId);
      this.upLoadData.TaskId = row.Id;
      this.upLoadData.ProofOrderId = row.ProofOrderId;
      this.upLoadData.ProcessName = row.ProcessName;
      this.currentRow = row;
      this.currentTask.nextTaskId = 0;
      // this.currentTask.nextProcessId = 0;
      this.currentTask.nextWorkerName = "";
      this.currentTask.nextProcessName = "";
      this.currentTask.proofId = row.ProofOrderId;
      this.currentTask.taskId = row.Id;
      let filetype = 3;
      if (row.ProcessName == "程序") filetype = 4;
      this.uploadList = re.data.ProofStyle.ProofFiles.filter(item => {
        return item.FileType == filetype;
      });
      this.getNextTask(row.Id);
      this.currentRow = row;
      this.showSumitBox = true;
    },
    //取得工序表
    processChange(val) {
      if (val > 0) {
        this.$refs.wSelect.GetWorker("/ProofWorker/GetWorkerList/" + val);
        let pcs = this.processList.find(function (p) {
          return p.Id == val;
        });
        this.currentTask.nextProcessName = pcs.ProcessName;
        this.currentTask.nextWorkerName = "";
        this.havenextWorkerName = true;
      } else {
        this.havenextWorkerName = false;
        this.currentTask.nextProcessName = "";
        this.currentTask.nextWorkerName = "";
      }
    },
    async getNextTask(TaskId) {
      let re = await this.$util.get("/ProofTask/GetNextTask/" + TaskId);
      console.log("re", re);
      if (re.data.length > 0) {
        this.NextTask.isHave = true;
        this.NextTask.process = re.data[0].Process.ProcessName;
        this.NextTask.name = re.data[0].UserName;
        this.currentTask.nextTaskId = re.data[0].Id;
        this.currentTask.nextProcessId = 0;
        console.log("currentTask", this.currentTask);
      }
      else {
        this.NextTask.isHave = false;
        this.currentTask.nextProcessId = -1;
      }

    },

    fileUploadOUpSuccess(f) {
      this.uploadList.push(f);
    },
    async removeFile(f, index) {
      let fileid = f.Id;
      let re = await this.$util.get("/ProofTask/DeleteTaskFile/" + fileid);
      if ((re = "ok")) {
        this.uploadList.splice(index, 1);
      }
    },

  },
  mounted: function () {
    this.$util.get("/ProofWorker/GetProcessList").then(re => {
      this.processList = re.data;

    });
  }
};
</script>