<style scoped>
</style>
<template>
  <div>
    <all-sample   limtView></all-sample>
  </div>
</template>
<script>
//import bus from "../bus.js";
import allSample from "../commpent/allSample.vue";
export default {
  components: {
    allSample
  },
  data: function() {
    return {};
  },
  methods: {},
  mounted: function() {
   this.$bus.$emit("changeMenuItem", ["样衣库", "找样衣"]);
  }
};
</script>