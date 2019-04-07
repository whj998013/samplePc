<style scoped>
.menuid {
  height: 40px;
  border-bottom: 1px solid #dedede;
}
</style>
<template>
  <div>    
    <Row type="flex"  justify="space-between" class="menuid">
      <Col span='16'>
      </Col>
      <Col>
      <Button @click="handleUpdata">&emsp;&emsp;刷新&emsp;&emsp;</Button>
      </Col>
    </Row>
    <Tabs value="name0">
      <TabPane label="打样中" name="name0">
        <proofMangeList ref="CurrentProof" action="/ProofMange/GetProofPlanList"></proofMangeList>
      </TabPane>
     
      <TabPane label="已完成打样" name="name2">
       
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
    handleUpdata(){
      this.$refs.CurrentProof.GetData();

    }
    
  },
  mounted: function() {
       this.$bus.$emit('changeMenuItem',['打样中心','打样管理']);
  }
};
</script>