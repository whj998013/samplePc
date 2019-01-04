<style scoped>
</style>
<template>
  <div>    
    新的打样  
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
       this.$bus.$emit('changeMenuItem',['打样管理','打样申请']);
  }
};
</script>