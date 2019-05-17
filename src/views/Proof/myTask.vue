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
      <Button @click="reload">&emsp;&emsp;刷新&emsp;&emsp;</Button>
      </Col>
    </Row>
    <Tabs value="name0">
      <TabPane label="当前任务" name="name0">
        <taskList></taskList>
      </TabPane>
      <TabPane label="历史任务" name="name1">

      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import taskList from "./MyTask/taskList.vue";
export default {
  inject: ["reload"],
  components: {
    taskList
  },
  data: function() {
    return {};
  },
  methods: {

  },
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["打样中心", "我的任务"]);
  }
};
</script>