<style scoped>
</style>
<template>
  <div>
    <Tabs value="name1">
      <TabPane label="库位设置" name="name1"><StackAreaMange></StackAreaMange></TabPane>
      <TabPane label="库位2设置" name="name2">标签二的内容</TabPane>
      <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>
<script>
//import bus from "../bus.js";
import StackAreaMange from './commpent/StackAreaMange';
export default {
  components: {
    StackAreaMange
  },
  data: function () {
    return {

    };
  },
  methods: {

  },
  mounted: function () {
    this.$bus.$emit('changeMenuItem', ['成衣仓库', '库存管理']);
  }
};
</script>