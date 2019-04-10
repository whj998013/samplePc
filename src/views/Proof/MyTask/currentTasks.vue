<style scoped>
</style>
<template>
  <div>
    <Table border :columns="columns" :data="taskList" @on-row-dblclick="rowClick">
      <template slot-scope="{ row, index }" slot="needData">
        {{JSON.stringify(row.NeedFinshDate ).substring(1, 11)}}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="DoUploadFile(row)">上传资料</Button>
        <Button type="primary" size="small" style="margin-right: 5px">提交</Button>
      </template>
      <template slot-scope="{ row, index }" slot="proofNo">
        <a v-on:click="rowClick(row, index)">{{row.ProofStyleNo}}</a>
      </template>
    </Table>
    <Drawer :closable="false" width="450" v-model="showDrawer">
      <taskViews v-model="currentProof"></taskViews>
    </Drawer>
    <!-- 工作提交 -->
    <Modal v-model="showUploadFile" :title="'上传'+currentTask.ProcessName+'资料'" width="600px">
      <Row>
        <Col span="10">
        <Upload type="drag" :with-credentials="true" :action="baseUrl + '/ProofTask/UpLoadFile'" :on-success="fileUploadOUpSuccess" :data="currentTask"
          :show-upload-list=false>
          <div>
            <Icon type="ios-cloud-upload" size="100" style="color: #3399ff"></Icon>
            <p>点击或将文件拖入框内上传</p>
            <p>请将文件按不同尺码命名上传</p>
          </div>
        </Upload>
        </Col>
        <Col span="14" offset="1">
        <Tag closable color="primary" v-for="(f,index) in task.FileList" :key="index" @on-close="removeFile(f,index)">{{f.DisplayName}}</Tag>
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
      task: { FileList: [] },
      taskList: [],
      currentTask: {
        TaskId:"",
        ProofOrderId:"",
        ProcessName:"",
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
          title: "款号(单击查看祥情)",
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
          width: 160
        }
      ]
    };
  },
  methods: {
    removeFile(f, index) {},
    fileUploadOUpSuccess() {},
    DoUploadFile(row) {
      this.currentTask.TaskId = row.Id;
      this.currentTask.ProofOrderId = row.ProofOrderId;
      this.currentTask.ProcessName = row.ProcessName;
      this.showUploadFile = true;
    },
    async rowClick(row, index) {
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