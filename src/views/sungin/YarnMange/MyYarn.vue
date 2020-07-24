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
    <Tabs @on-click="tabClick" v-model="currentTab">
      <TabPane label="用纱申请" name="outApply">
        <OutStockApplyView v-if="tabPane.outApply" :dept="dept" ref="outApply" action="apiaction/YarnOutStock/GetYarnOutApplyList"></OutStockApplyView>
      </TabPane>
      <TabPane label="入库记录" name="yarnIn">
        <YarnInStock v-if="tabPane.yarnIn" :dept="dept" ref="yarnIn" action="apiaction/MyYarn/GetMyYarnInStock"></YarnInStock>
      </TabPane>
      <TabPane label="用纱记录" name="yarnOut">
        <YarnOutStock v-if="tabPane.yarnOut" :dept="dept" ref="yarnOut" action="apiaction/MyYarn/GetMyYarnOutStock"></YarnOutStock>
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
      currentTab: 'outApply',
      dept: [],
      tabPane: {
        outApply: true,
        yarnIn: false,
        yarnOut: false
      },
    };
  },
  methods: {
    tabClick(v) {
      eval("this.tabPane." + v + "=true");
    
    },
    reload() {
       if (this.tabPane.yarnIn) this.$refs.yarnIn.reload(this.dept);
       if (this.tabPane.yarnOut) this.$refs.yarnOut.reload(this.dept);
       if (this.tabPane.outApply) this.$refs.outApply.reload(this.dept);
    },
  },
  mounted: function () {
    this.$bus.$emit('changeMenuItem', ['样纱管理', '我的样纱']);

  }
};
</script>