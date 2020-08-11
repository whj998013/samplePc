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
      <TabPane :label="label1" name="name0">
        <taskList @TaskCount="setCount" :action='$sra.proof_GetMyTasks'></taskList>
      </TabPane>
      <TabPane label="已完成任务" name="name1">
        <taskList :action='$sra.proof_GetMyFinshTasks'></taskList>
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
  data: function () {
    return {
      count: 0,
      label1: (h) => {
        return h('div', [
          h('span', '当前任务'),
          h('Badge', {
            props: {
              count: this.count
            }
          })
        ])
      }

    };
  },
  methods: {
    setCount(v) {
      this.count = v;
    }
  },
  mounted: function () {
    this.$bus.$emit("changeMenuItem", ["打样中心", "我的任务"]);
  }
};
</script>