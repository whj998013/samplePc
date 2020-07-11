<style scoped>
</style>
<template>
  <div>

    <Tabs value="tab1" @on-click="tabClick">
      <TabPane label="借用审批" name="tab1">
        <Lend v-if="tabPane.tab1"></Lend>
      </TabPane>
      <TabPane label="借出归还" name="tab2">
        <LendOut v-if="tabPane.tab2"></LendOut>
      </TabPane>
      <TabPane label="历史记录" name="tab3">
        <LendOutRecord v-if="tabPane.tab3"></LendOutRecord>
      </TabPane>
      <TabPane label="借样排行" name="tab4">
        <LendChart v-if="tabPane.tab4"></LendChart>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
//import bus from "../bus.js";
import Lend from "./Lend/Lend.vue";
import LendOut from "./Lend/LendOut.vue";
import LendOutRecord from "./Lend/LendOutRecord.vue";
import LendChart from "./Lend/LendChart.vue";
export default {
  components: {
    Lend,
    LendOut,
    LendChart,
    LendOutRecord
  },
  data: function () {
    return {
      tabPane: {
        tab1: true,
        tab2: false,
        tab3: false,
        tab4: false
      }

    };
  },
  methods: {
    tabClick(name) {
      eval('this.tabPane.' + name + '=true');
    }
  },
  mounted: function () {
    this.$bus.$emit("changeMenuItem", ["样衣管理", "借用管理"]);
  }
};
</script>