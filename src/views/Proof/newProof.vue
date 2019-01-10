<style scoped>
</style>
<template>
  <div>
    <div>
      <Row type="flex" justify="space-between">
        <Col span='16'>
        </Col>
        <Col>
        <Button size="large" type="primary" icon="md-checkmark" @click="saveSample">&emsp;保存&emsp;</Button>
        <Button size="large" type="warning" icon="md-close" @click="goBack">&emsp;取消&emsp;</Button>
        </Col>
      </Row>

      <Form ref='sample' :label-width="75" label-position="right">

      </Form>
    </div>
  </div>
</template>

<script>
//import bus from "../bus.js";
export default {
  data: function() {
    return {};
  },
  methods: {},
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["打样管理", "打样申请"]);
  }
};
</script>