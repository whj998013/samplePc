<style scoped>
</style>
<template>
  <div>

    <Modal id="newOutStockApply" v-model="newOutStockApplyModel" width=60 title="用纱申请/毛纱出库" :mask-closable='false'>
        新的毛纱申请
      <div slot="footer">
        <Button size="large" @click="cancelApply">取消</Button>
        <Button type="primary" size="large" @click="saveApply">保存</Button>
      </div>
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
      newOutStockApplyModel: false,
      row:undefined,

    };
  },
  methods: {
    outStock(nso) {
      console.log("outstock",nso);
      this.row=nso;
      this.newOutStockApplyModel = true;
    },
    cancelApply() {
      this.row=undefined;
      this.newOutStockApplyModel = false;
    },
    saveApply() {

    }
  },
  mounted: function () {
    this.$bus.$off('OutStock');
    this.$bus.$on('OutStock', this.outStock);
  }
};
</script>