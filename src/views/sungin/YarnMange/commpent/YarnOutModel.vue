<style scoped>
</style>
<template>
  <div>

    <Modal v-model="modal" title="纱线出库记录" width="650px">
      <Table border :columns="columns" :data="tableData">
        <template slot-scope="{ row }" slot="date">
          {{ $util.getGmtDate(row.CreateTime)}}
        </template>

      </Table>
    </Modal>
  </div>
</template>
<script>
//import bus from "../bus.js";
//import newProof from "./myProofViews/newProof.vue";
export default {
  data: function () {
    return {
      columns: [
        {
          title: "姓名",
          key: "OutUName",

        },
        {
          title: "部门",
          key: "OutDName",
        },
        {
          title: "数量(kg)",
          key: "Num",
        },
        {
          title: "单价",
          key: "OutPrice",
        },
        {
          title: "合计",
          key: "Amount",
        },
        {
          title: "时间",
          key: "CreateTime",
          slot: "date"
        },

      ],
      modal: false,
      tableData: [],
    };
  },
  methods: {
    async   Show(BatchNum) {
      let re = await this.$util.post("apiaction/YarnSeach/GetOutList/",{BatchNum:BatchNum} );
      this.tableData = re.data;
      this.modal = true;
    }
  },
  mounted: function () {

  }
};
</script>