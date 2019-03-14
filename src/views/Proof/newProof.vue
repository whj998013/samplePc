<style scoped>
</style>
<template>
  <div>
    <div>
      <Row type="flex" justify="space-between">
        <Col span="16"></Col>
        <Col>
          <Button size="large" type="primary" icon="md-checkmark" @click="saveProof">&emsp;保存&emsp;</Button>
          <Button size="large" type="warning" icon="md-close" @click="goBack">&emsp;取消&emsp;</Button>
        </Col>
      </Row>
     <Divider>录入打样信息</Divider>
      <Form ref="sample" :label-width="75" label-position="right">
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <FormItem label="编号">
            <Input v-model="sample.StyleId" readonly></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <FormItem label="客户">
            <Input v-model="sample.DeptName" placeholder="输入客户"></Input>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
          <FormItem label="业务员">
            <Input v-model="sample.DeptName" placeholder="输入客户"></Input>
          </FormItem>
        </Col>
      </Form>
    </div>
  </div>
</template>

<script>
//import bus from "../bus.js";
export default {
  data: function() {
    return {
      sample:{}

    };
  },
  methods: {
    saveProof(){

    },
    goBack(){
      this.$router.back(-1);
    }
  },
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["打样管理", "打样申请"]);
  }
};
</script>