<style scoped>
</style>
<template>
  <div>

    <Tabs value="name0">
      <TabPane label="已入库样衣管理" name="name0">
        <Lend></Lend>
      </TabPane>
      <TabPane label="入库审批" name="name1">
        <LendOut></LendOut>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
//import bus from "../bus.js";
import Lend from "./Lend/Lend.vue";
import LendOut from "./Lend/LendOut.vue";
export default {
    components: {
    Lend,
    LendOut
  },
  data: function() {
    return {};
  },
  methods: {},
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["样衣管理", "借用管理"]);
  }
};
</script>