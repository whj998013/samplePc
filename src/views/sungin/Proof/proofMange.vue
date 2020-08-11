<style scoped>
.menuid {
  height: 40px;
  border-bottom: 1px solid #dedede;
}
</style>
<template>
  <div>
    <!-- <Row>

      <Input v-model="testValue" placeholder="输入部门"></Input>
      <Button size="large" type="warning" icon="md-close" @click="test">&emsp;取消&emsp;</Button>
    </Row> -->

    <Row type="flex" justify="space-between" class="menuid">
      <Col span='16'>
      </Col>
      <Col>
      <Button @click="reload">&emsp;&emsp;刷新&emsp;&emsp;</Button>
      </Col>
    </Row>
    <Tabs value="name0">
      <TabPane label="打样中" name="name0">
        <proofMangeList ref="CurrentProof" :action='$sra.proof_GetProofPlanList'></proofMangeList>
      </TabPane>
      <TabPane label="已完成打样" name="name2">
        <proofMangeList ref="CurrentProof" :action='$sra.proof_GetFinshPlanList'></proofMangeList>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import proofMangeList from "./proofMange/proofMangeList.vue";
import finshProof from "./proofMange/finshProof.vue";

//import bus from "../bus.js";
export default {
  inject: ["reload"],
  components: {
    proofMangeList,
    finshProof
  },
  data: function () {
    return {
      testValue: "aa",
    };
  },
  methods: {
    test() {
      this.testValue = this.$util.getID(1);
    },
    handleUpdata() {
      this.$refs.CurrentProof.GetData();
    }
  },
  mounted: function () {
    this.$bus.$emit("changeMenuItem", ["打样中心", "打样管理"]);
  }
};
</script>