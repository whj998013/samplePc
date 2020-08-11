<style scoped>
</style>
<style>
.ivu-table .success {
  background-color: #19be6b;
  color: #fff;
}
.ivu-table .info {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .warning {
  background-color: #ff9900;
  color: #fff;
}
</style>
<template>
  <div>
    <Table border :columns="columns" :data="proofList">
      <template slot-scope="{ row }" slot="ProofOrderId">
        <strong>{{ row.ProofOrderId }}</strong>
      </template>
      <template slot-scope="{ row }" slot="ProofStyleNo">
        {{ row.ProofStyle.ProofStyleNo }}
      </template>
      <template slot-scope="{ row }" slot="FinshDateStr">
        {{ JSON.stringify(row.RequiredDate).substring(1, 11) }}
      </template>
      <template slot-scope="{ row }" slot="ClentName">
        {{ row.ProofStyle.ClentName }}
      </template>
      <template slot-scope="{ row }" slot="ProofTypeText">
        {{ row.ProofStyle.ProofTypeText }}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="DoProofPlan(row)">{{buttonText(row)}}</Button>
        <Button v-if="row.ProofStatusText=='打样中'" type="info" size="small" style="margin-right: 5px" @click="FinshProof(row)">交样</Button>
      </template>
    </Table>
    <proofPlan ref='proofPlan'></proofPlan>
  </div>
</template>
<script>
import proofPlan from "./proofPlan.vue";
import expandRow from "./mange-table-expand.vue";
import workerSelect from "../../commpent/workerSelect.vue";
export default {
  inject: ["reload"],
  props: {
    action: String
  },
  components: {
    workerSelect,
    proofPlan
  },
  data: function () {
    return {
      planId: "",
      CurrentRow: {
        DesignatedCX: "",
        DesignatedGY: ""
      },

      gylist: [],
      cxlist: [],
      gy: "",
      jhrq: "",
      columns: [
        {
          type: "expand",
          width: 40,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "状态",
          key: "ProofStatusText",
          width: 75,
        },
        {
          title: "单号",
          width: 110,
          slot: "ProofOrderId",
        },
        {
          title: "交样日期",
          minWidth: 120,
          slot: "FinshDateStr"
        },

        {
          title: "款号",
          slot: "ProofStyleNo",
          minWidth: 110,

        },
        {
          title: "类型",
          slot: "ProofTypeText",
          minWidth: 110,

        },
        {
          title: "数量",
          key: "ProofNum",
          minWidth: 110,
        },

        {
          title: "紧急度",
          key: "Urgency",
          minWidth: 110,
        },
        {
          title: "业务员",
          key: "ProofApplyUserName",
          minWidth: 110,
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          minWidth: 160,
        }
      ],
      proofList: []
    };
  },
  methods: {
    buttonText(row) {
      if (row.ProofStatusText == "排单") return "排单";
      return "重新排单";
    },
    DoProofPlan(row) {
      this.CurrentRow = row;
      this.$refs.proofPlan.Show(row.ProofOrderId);
    },
    async FinshProof(row) {
      console.log("交样", row);
      this.$bus.BeginLoading();
      let re = await this.$util.get(this.$sra.proof_FinshProof + row.ProofOrderId);
      this.$Notice.success({
        title: '成功',
        desc: '已发出交样审批，请在钉钉查看审批并拍照上传照片。 '
      });
      this.reload();
      this.$bus.EndLoading();
    },
    GetData() {
      this.$util.get(this.action).then(result => {
        let re = result.data;
        let color = "";
        re.forEach(row => {
          if (row.ProofStatusText == "排单") {
            color = "warning";
          } else if (row.ProofStatusText == "打样中") {
            color = "info";
          }
          row.cellClassName = { ProofStatusText: color };
        });
        this.proofList = re;
      });
    }
  },
  mounted: function () {
    this.GetData();
  }
};
</script>