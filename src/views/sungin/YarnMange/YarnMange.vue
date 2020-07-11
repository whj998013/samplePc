<style scoped>
</style>
<template>
  <div>

    <Tabs>
      <TabPane label="用纱申请" name="name1">
        <OutStockApplyView ref="outApply" action="/YarnOutStock/GetYarnOutApplyList" HaveAlowButton GetAllDept></OutStockApplyView>
      </TabPane>
      <TabPane label="样纱报表" name="name2">

      </TabPane>
    </Tabs>

  </div>
</template>
<script>
//import bus from "../bus.js";
//import newProof from "./myProofViews/newProof.vue";
import OutStockApplyView from "./commpent/outStockApplyView";
export default {
  inject: ["reload"],
  components: {
    OutStockApplyView

  },
  data: function () {
    return {

    };
  },
  methods: {

  },
  mounted: function () {
    this.$bus.$emit('changeMenuItem', ['样纱仓库', '纱线管理']);
  }
};
</script>