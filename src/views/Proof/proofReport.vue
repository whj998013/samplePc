<style scoped>
</style>
<template>
  <div>
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

    };
  },
  methods: {

  },
  mounted: function () {
    this.$bus.$emit('changeMenuItem', ['样衣管理', '打样报表']);
  }
};
</script>
