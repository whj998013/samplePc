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
        <CurrentProof v-model="myProofs"></CurrentProof>
      </TabPane>
      <TabPane label="历史打样" name="name1">
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import CurrentProof from "./myProofViews/CurrentProof.vue";
export default {
  components: {
    CurrentProof
  },
  data: function() {
    return {
      myProofs: []
    };
  },
  methods: {
    newProof() {
      this.$router.push("/Proof/newProof");
    },
    handleUpdata() {
      console.log("testupdata");
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$util
          .get("/MyProof/GetMyProofs")
          .then(result => {
            resolve(result.data);
          })
          .catch(re => {
            reject(re);
          });
      });
    }
  },
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["打样中心", "我的打样"]);
    this.getData().then(reData => {
      console.log("redata:", reData);
      this.myProofs = reData;
    });
  }
};
</script>