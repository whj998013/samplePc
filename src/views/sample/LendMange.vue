<style scoped>
</style>
<template>
  <div>

    <Tabs value="name0">
      <TabPane label="借用审批" name="name0">
        <Lend></Lend>
      </TabPane>
      <TabPane label="借出归还" name="name1">
        <LendOut></LendOut>
      </TabPane>
      <TabPane label="历史记录" name="name2">
        <LendOutRecord></LendOutRecord>
      </TabPane>
      <TabPane label="借样排行" name="name3">
        <LendChart></LendChart>
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
    return {};
  },
  methods: {},
  mounted: function () {
    this.$bus.$emit("changeMenuItem", ["样衣管理", "借用管理"]);
  }
};
</script>