<style scoped>
.menuid {
  height: 40px;
  border-bottom: 1px solid #dedede;
}
</style>
<template>
  <div>
    <Row type="flex" justify="space-between" class="menuid">
      <Col span='16'>
      </Col>
      <Col>
      <Button @click="handleUpdata" type="info">刷新</Button>
      <Button type="primary" v-if="$Auth('Sample_MySample_NewSample')" @click="newProof" span='8'>新的打样申请</Button>
      </Col>
    </Row>
    <Tabs value="name0">
      <TabPane label="当前打样" name="name0">
      </TabPane>
      <TabPane label="历史打样" name="name1">
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
//import bus from "../bus.js";
export default {
  data: function() {
    return {};
  },
  methods: {
    newProof() {
      console.log("test");
      this.$router.push("/Proof/newProof");
    },
    handleUpdata() {
      console.log("testupdata");
    }
  },
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["打样管理", "我的打样"]);
  }
};
</script>