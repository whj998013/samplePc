<style scoped>
</style>
<template>
  <div>
    <Modal v-model="modalShow" title="关联样纱出库单" @on-ok="asyncOK" width="60%">
      <Row>
        <Col span="12">
        <Input search placeholder="查找" />
        </Col>
        <Col offset="1" span="5">
        <Button>从我入库的毛纱中选择出库</Button>
        </Col>
        <Col span="5">
        <Button>刷新</Button>
        </Col>
      </Row>
      <br>

      <Table border :columns="columns" :data="outStockList" height="400px">
     
      </Table>
    </Modal>
  </div>
</template>
<script>
//import bus from "../bus.js";
//import newProof from "./myProofViews/newProof.vue";
export default {
  inject: ["reload"],
  components: {


  },
  data: function () {
    return {
      modalShow: false,
      columns: [
        {
          title: "出库单号",
          key: "ProofStatusText",
        },
        {
          title: "纱名",
          slot: "ProofOrderId",
        },
        {
          title: "缸号",
          slot: "ProofOrderId",
        },
       

      ],
      outStockList: []
    };
  },
  methods: {
    show() {
      console.log("showModel");
      this.modalShow = true;
    },
    asyncOK() {

    }
  },
  mounted: function () {

  }
};
</script>