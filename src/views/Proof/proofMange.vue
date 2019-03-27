<style scoped>
</style>
<template>
  <div>    
    <Tabs value="name0">
      <TabPane label="打样排单" name="name0">
        <proofMangeList></proofMangeList>
      </TabPane>
      <TabPane label="已完成打样" name="name1">
        
      </TabPane>
    </Tabs>
  </div>                       
</template>

<script>
import proofMangeList from "./proofMange/proofMangeList.vue";  
//import bus from "../bus.js";
export default {  
   components: {
    proofMangeList
  },
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