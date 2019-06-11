<style scoped>
</style>
<template>
  <div>
    <Table border :columns="columns" :data="taskList" @on-row-dblclick="showTaskView">
      <template slot-scope="{ row, index }" slot="needData">
        {{JSON.stringify(row.NeedFinshDate ).substring(1, 11)}}
      </template>
      <template slot-scope="{ row, index }" slot="beginDate">
        {{JSON.stringify(row.BeginDate ).substring(1, 11)}}
      </template>
      <template slot-scope="{ row, index }" slot="finshDate">
        {{row.FinshDate==null?"":JSON.stringify(row.FinshDate ).substring(1, 11)}}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button @click="showTaskView(row)" type="info" size="small">查看</Button>
        <Button v-if="row.FinshDate==null" @click="Submit(row)" type="primary" size="small">提交</Button>
      </template>
      <template slot-scope="{ row, index }" slot="proofNo">
        {{row.ProofStyleNo}}
      </template>
    </Table>
    <Drawer :closable="false" placement="left" width="450" v-model="showDrawer">
      <taskViews v-if="showDrawer" v-model="currentProof"></taskViews>
    </Drawer>
    <!-- 工作提交 -->
    <taskSubmit ref="tsView"></taskSubmit>
  </div>
</template>
<script>
import taskViews from "./TaskViews.vue";
import taskSubmit from "./TaskSubmit.vue";
export default {
  props: {
    action: String
  },
  components: {
    taskViews,
    taskSubmit
  },
  data: function () {
    return {
      showDrawer: false,
      taskList: [],
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
          width: 65,
          key: "ProcessName"
        },
        {
          title: "编号",
          key: "ProofOrderId",
          width: 115,
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
          title: "开始日期",
          width: 120,
          slot: "beginDate",
          key: "BeginDate",
          sortable: true
        },
        {
          title: "完成日期",
          width: 120,
          slot: "finshDate",
          key: "FinshDate",
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
          width: 99,
          sortable: true
        },

        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 130
        }
      ],

    };
  },
  methods: {
    async Submit(row) {

      this.$refs.tsView.Show(row);
      //this.showSumitBox = true;
    },
    async showTaskView(row) {
      let proofId = row.ProofOrderId;
      let re = await this.$util.get("/ProofTask/GetTasks/" + proofId);
      this.currentProof = re.data;
      console.log("rowclick", this.currentProof);
      this.showDrawer = true;
    },
    async getData() {
      let re = await this.$util.get(this.action);
      this.taskList = re.data;
      this.$emit("TaskCount", this.taskList.length)
    }
  },
  mounted: function () {
    this.getData();
  }
};
</script>