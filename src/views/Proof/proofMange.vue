<style scoped>
</style>
<template>
  <div>    
    打样管理  
  </div>                       
</template>

<script>

//import bus from "../bus.js";
export default {  
  data: function() {
    return {
 
    };
  },
  methods: {
    
  },
  mounted: function() {
       this.$bus.$emit('changeMenuItem',['打样中心','打样管理']);
  }
};
</script>