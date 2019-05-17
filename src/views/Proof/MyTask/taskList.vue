<style scoped>
</style>
<template>
  <div>
    <Table border :columns="columns" :data="taskList" @on-row-dblclick="showTaskView">
      <template slot-scope="{ row, index }" slot="needData">
        {{JSON.stringify(row.NeedFinshDate ).substring(1, 11)}}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Dropdown transfer trigger="click">
          <a href="javascript:void(0)">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              <span @click="showTaskView(row)">详细信息</span>
            </DropdownItem>
            <DropdownItem>
              <p @click="DoUploadFile(row)">上传资料</p>
            </DropdownItem>
            <DropdownItem>
              <p @click="Submit(row)">完成任务</p>
            </DropdownItem>

          </DropdownMenu>
        </Dropdown>
      </template>
      <template slot-scope="{ row, index }" slot="proofNo">
        {{row.ProofStyleNo}}
      </template>
    </Table>
    <Drawer :closable="false" placement="left" width="450" v-model="showDrawer">
      <taskViews v-if="showDrawer" v-model="currentProof"></taskViews>
    </Drawer>
    <!-- 工作提交 -->
    <Modal v-model="showUploadFile" :title="'上传'+currentTask.ProcessName+'资料'" width="650px">
      <Row>
        <Col span="8">
        <Upload type="drag" :with-credentials="true" :action="baseUrl + '/ProofTask/UpLoadFile'" :on-success="fileUploadOUpSuccess" :data="currentTask"
          :show-upload-list=false>
          <div>
            <Icon type="ios-cloud-upload" size="100" style="color: #3399ff"></Icon>
            <p>点击或将文件拖入框内上传</p>
          </div>
        </Upload>
        </Col>
        <Col span="15" offset="1">
        <p>如有多尺码机型，请将文件按不同尺码机型命名上传</p>
        <Tag closable color="primary" v-for="(f,index) in uploadList" :key="index" @on-close="removeFile(f,index)">{{f.DisplayName}}</Tag>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
import taskViews from "./TaskViews.vue";
export default {
  components: {
    taskViews
  },
  data: function() {
    return {
      baseUrl: this.$util.baseUrl,
      dataUrl: this.$util.dataUrl,
      showUploadFile: false,
      showDrawer: false,
      uploadList: [],
      taskList: [],
      currentTask: {
        TaskId: "",
        ProofOrderId: "",
        ProcessName: ""
      },
      currentProof: {
        ProofStyle: {
          ProofStyleNo: ""
        },
        ReceivedDate: "",
        RequiredDate: ""
      },
      columns: [
        {
          title: "工序",
          width: 60,
          key: "ProcessName"
        },
        {
          title: "编号",
          key: "ProofOrderId",
          width: 110,
          sortable: true
        },
        {
          title: "款号",
          slot: "proofNo",
          key: "ProofStyleNo"
        },
        {
          title: "业务员",
          key: "UserName",
          width: 95,
          sortable: true
        },
        {
          title: "交期",
          width: 120,
          slot: "needData",
          key: "NeedFinshDate",
          sortable: true
        },

        {
          title: "打样类型",
          key: "TypeName",
          width: 110,
          sortable: true
        },
        {
          title: "数量",
          key: "ProofNum",
          width: 65
        },

        {
          title: "紧急度",
          key: "Urgency",
          width: 95,
          sortable: true
        },

        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 80
        }
      ]
    };
  },
  methods: {
    async Submit(row) {
      let TaskId = row.Id;
      let PoofId = row.ProofOrderId;
      let Process = row.ProcessName;
      console.log("row",row);
      let re = await this.$util.post("/ProofTask/SubmitTask/", {
        TaskId,
        PoofId
      });
      console.log(re);      

    },
    async removeFile(f, index) {
      let fileid = f.Id;
      let re = await this.$util.get("/ProofTask/DeleteTaskFile/" + fileid);
      if ((re = "ok")) {
        this.uploadList.splice(index, 1);
      }
    },
    fileUploadOUpSuccess(f) {
      this.uploadList.push(f);
    },
    async DoUploadFile(row) {
      let proofId = row.ProofOrderId;
      let re = await this.$util.get("/ProofTask/GetTasks/" + proofId);
      console.log("row", re);
      this.currentTask.TaskId = row.Id;
      this.currentTask.ProofOrderId = row.ProofOrderId;
      this.currentTask.ProcessName = row.ProcessName;
      let filetype = 3;
      if (row.ProcessName == "制版") filetype = 4;
      this.uploadList = re.data.ProofStyle.ProofFiles.filter(item => {
        return item.FileType == filetype;
      });
      this.showUploadFile = true;
    },
    async showTaskView(row) {
      let proofId = row.ProofOrderId;
      let re = await this.$util.get("/ProofTask/GetTasks/" + proofId);
      this.currentProof = re.data;
      console.log("rowclick", this.currentProof);
      this.showDrawer = true;
    },
    async getData() {
      let re = await this.$util.get("/ProofTask/GetMyTasks");
      console.log("1", re);
      this.taskList = re.data;
    }
  },
  mounted: function() {
    this.getData();
    console.log("2");
  }
};
</script>