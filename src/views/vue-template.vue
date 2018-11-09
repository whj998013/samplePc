<style scoped>
</style>
<template>
  <div>      
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
    aa:function(){
     let i=0;
    }
  },
  mounted: function() {
       this.$bus.$emit('changeMenuItem',['样衣管理','找样衣']);
  }
};
</script>