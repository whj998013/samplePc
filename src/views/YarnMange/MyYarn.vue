<style scoped>
</style>
<template>
  <div>
    <Row type="flex" justify="space-between" class="menuid">

      <Col span='12'>
      <DeptSelect v-model="dept" @SelectChange="reload" defaultText="请选择需要显示的部门，未选择则显示您的个人记录"></DeptSelect>
      </Col>
      <Col span='6'>
      </Col>
      <Col>
      <Button @click="reload">&emsp;&emsp;刷新&emsp;&emsp;</Button>
      </Col>
    </Row>
    <Tabs value="name0">
      <TabPane label="入库记录" name="name0">
        <YarnInStock :dept="dept" ref="yarnIn" action="/MyYarn/GetMyYarnInStock"></YarnInStock>
      </TabPane>
      <TabPane label="用纱记录" name="name2">
        <YarnOutStock :dept="dept" ref="yarnOut" action="/MyYarn/GetMyYarnOutStock"></YarnOutStock>
      </TabPane>
      <TabPane label="用纱申请" name="name3">
        <OutStockApplyView :dept="dept" ref="outApply" action="/YarnOutStock/GetYarnOutApplyList"></OutStockApplyView>
      </TabPane>
    </Tabs>
    <OutStockApply></OutStockApply>
  </div>
</template>
<script>
//import bus from "../bus.js";
import DeptSelect from "../commpent/deptSelect.vue"
import YarnOutStock from "./commpent/YarnOutStock.vue";
import YarnInStock from "./commpent/YarnInStock.vue";
import OutStockApply from "./commpent/outStockApply";
import OutStockApplyView from "./commpent/outStockApplyView";

export default {
  components: {
    YarnInStock,
    YarnOutStock,
    DeptSelect,
    OutStockApply,
    OutStockApplyView
  },
  data: function () {
    return {
      dept: []
    };
  },
  methods: {
    reload() {
      this.$refs.yarnIn.reload(this.dept);
      this.$refs.yarnOut.reload(this.dept);
      this.$refs.outApply.reload(this.dept);
    },
  },
  mounted: function () {
    this.$bus.$emit('changeMenuItem', ['样纱管理', '我的样纱']);

  }
};
</script>