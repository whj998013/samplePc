<style scoped>
</style>
<template>
  <div>
    <h1>欢迎使用</h1>

  </div>
</template>
<script>
import dd from "../libs/ddapi.js";
export default {
  mounted(){
    this.$bus.$emit('changeMenuItem',['首页']);
  },
  data() {
    return {
    
    };
  },
  methods: {
  }
};
</script>