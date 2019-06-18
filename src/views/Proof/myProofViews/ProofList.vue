<style scoped>
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
      <template slot-scope="{ row }" slot="CreateDateStr">
        {{ row.CreateDateStr }}
      </template>
      <template slot-scope="{ row }" slot="ClentName">
        {{ row.ProofStyle.ClentName }}
      </template>
      <template slot-scope="{ row }" slot="ProofTypeText">
        {{ row.ProofStyle.ProofTypeText }}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button :disabled="row.ProofStatus>0&&row.ProofStatus<6" type="primary" size="small" style="margin-right: 5px" @click="submit(row)">提交</Button>
        <Button :disabled="row.ProofStatus>0&&row.ProofStatus<6" type="info" size="small" @click="edit(row)">编辑</Button>
        <Button :disabled="row.ProofStatus>0&&row.ProofStatus<6" type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>
    <Modal v-model="deleteModal" title="确认删除" @on-ok="deleteProof">
      <p>确认删除此打样单吗？</p>
    </Modal>
  </div>

</template>
<script>
//import bus from "../bus.js";
import expandRow from "./table-expand.vue";
export default {
  props: {
    action: String
  },
  data: function () {
    return {
      CurrentRow: null,
      deleteModal: false,
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
          width: 80,
          sortable: true
        },
        {
          title: "单号",
          width: 110,
          slot: "ProofOrderId",
          sortable: true,
          key: "ProofOrderId"
        },
        {
          title: "日期",
          minWidth: 120,
          sortable: true,
          slot: "CreateDateStr",
          key: "CreateDateStr"
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
          sortable: true,
          key: "ProofNum",
          minWidth: 110,

        },
        {
          title: "紧急度",
          sortable: true,
          key: "Urgency",
          minWidth: 110,

        },
        {
          title: "客户",
          slot: "ClentName",
          minWidth: 110,

        },
        {
          title: "操作",
          slot: "action",
          minWidth: 170,
          align: "center",
         
        }
      ],
      proofList: []
    };
  },
  methods: {
    GetData() {
      this.$util.get(this.action).then(result => {
        this.proofList = result.data;
      });
    },

    submit(row) {
      this.$bus.BeginLoading();
      let proof = {
        ProofOrderId: row.ProofOrderId
      };

      this.$util
        .post("/MyProof/SubmitProof", proof)
        .then(result => {
          this.$Notice.success({
            title: "成功",
            desc:
              row.ProofStyle.ProofStyleNo +
              "款样衣已提交钉钉审批单审批，请及时关注钉钉中的审批信息。"
          });

          row.ProofStatus = 1;
          row.ProofStatusText = "审批";
          this.$bus.EndLoading();
        })
        .catch(re => {
          this.$bus.EndLoading();
          console.log(re);
        });
      this.$bus.EndLoading();
    },
    edit(row) {
      this.$emit("onEdit", row);
    },
    deleteProof() {
      let proof = { ProofOrderId: this.CurrentRow.ProofOrderId };
      this.$util.post("/MyProof/DeleteProof", proof).then(result => {
        this.$Notice.success({
          title: "成功",
          desc: this.CurrentRow.ProofStyle.ProofStyleNo + "款样衣已成功删除。"
        });
        this.removeByValue(this.proofList, this.CurrentRow);
      });
    },
    removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].ProofOrderId == val.ProofOrderId) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    remove(row) {
      this.CurrentRow = row;
      this.deleteModal = true;
    }
  },
  mounted: function () {
    this.GetData();
  }
};
</script>