<style scoped>
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
         <TabPane label="入库记录" name="name0">
        <YarnInStock action="/MyYarn/GetMyYarnInStock"></YarnInStock>
      </TabPane>

      <TabPane label="用纱记录" name="name2">
        <YarnOutStock action="/MyYarn/GetMyYarnOutStock"></YarnOutStock>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
//import bus from "../bus.js";

import YarnOutStock from "./commpent/YarnOutStock.vue";
import YarnInStock from "./commpent/YarnInStock.vue";
export default {
  inject: ["reload"],
  components: {
    YarnInStock,
    YarnOutStock,
  },
  data: function () {
    return {

    };
  },
  methods: {

  },
  mounted: function () {
    this.$bus.$emit('changeMenuItem', ['样纱管理', '我的样纱']);
  }
};
</script>