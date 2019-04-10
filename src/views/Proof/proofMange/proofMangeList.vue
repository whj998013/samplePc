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
        <Button type="primary" size="small" style="margin-right: 5px" @click="proofPlan(row)">{{buttonText(row)}}</Button>
      </template>
    </Table>
    <!-- 排单  -->
    <Modal v-model="paiDanModel" :title="modelText" @on-ok="modalOk">
      <Row>
        <Col span="4">
        <p>业务指定工艺:</p>
        </Col>
        <Col span="16">
        <p>{{CurrentRow.DesignatedGY}}</p>
        </Col>
      </Row> 
       <br>
      <Row>
      
        <Col span="4">
        <span>选择工艺员：</span>
        </Col>
        <Col span="16">
        <workerSelect v-model="gy" :HaveNoSelect="false" action="/ProofWorker/GetWorkerList/1"></workerSelect>
        </Col>
      </Row>
      <br>
      <Row>
        <Col span="4">
        <span>计划日期：</span>
        </Col>
        <Col span="16">
        <DatePicker type="date" v-model="jhrq" placeholder="选择计划日期" style="width: 100%"></DatePicker>
        </Col>
      </Row>
      <br>
    </Modal>
  </div>
</template>
<script>
import expandRow from "./mange-table-expand.vue";
import workerSelect from "../../commpent/workerSelect.vue";
export default {
  props: {
    action: String
  },
  components: {
    workerSelect
  },
  data: function() {
    return {
      paiDanModel: false,
      CurrentRow: {
        DesignatedCX: "",
        DesignatedGY: ""
      },
      modelText: "打样排单",
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
          width: 75
        },
        {
          title: "单号",
          width: 110,
          slot: "ProofOrderId"
        },
        {
          title: "交样日期",
          width: 120,
          slot: "FinshDateStr"
        },

        {
          title: "款号",
          slot: "ProofStyleNo"
        },
        {
          title: "类型",
          slot: "ProofTypeText"
        },
        {
          title: "数量",
          key: "ProofNum"
        },

        {
          title: "紧急度",
          key: "Urgency"
        },
        {
          title: "客户",
          slot: "ClentName"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
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
    proofPlan(row) {
      this.CurrentRow = row;

      this.gy = "";

      this.paiDanModel = true;
    },
    modalOk() {
      let _this = this;
      let proofPlanObj = {
        gy: _this.gy,
        jhrq:_this.jhrq,
        proofId: _this.CurrentRow.ProofOrderId
      };
      this.$util.post("/ProofMange/PoofPlan", proofPlanObj).then(re => {
        this.GetData();
        this.$Notice.success({
          title: "成功",
          desc: "已排单成功，请通知相关接收打样任务。"
        });
      });
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
  mounted: function() {
    this.GetData();
  }
};
</script>