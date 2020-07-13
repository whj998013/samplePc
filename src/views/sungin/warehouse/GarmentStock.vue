<style scoped>
</style>
<template>
  <div>    
    GarmentSotck. 
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
       this.$bus.$emit('changeMenuItem',['成衣仓库','库存管理']);
  }
};
</script>