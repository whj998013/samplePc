<style scoped>
</style>
<template>
  <div>
    <Row type="flex" justify="space-between" class="menuid">

      <Col span='8'>

      </Col>
      <Col span='8'>
      </Col>
      <Col>
      <Button @click="reload">&emsp;&emsp;刷新&emsp;&emsp;</Button>
      </Col>
    </Row>
    <Tabs value="name0">
      <TabPane label="入库记录" name="name0">
        <YarnInStock :dept="dept" ref="yarnIn" action="/MyYarn/GetMyYarnInStock"></YarnInStock>
      </TabPane>

      <TabPane label="用纱记录" name="name2">
        <YarnOutStock :dept="dept" ref="yarnOut" action="/MyYarn/GetMyYarnOutStock"></YarnOutStock>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
//import bus from "../bus.js";

import YarnOutStock from "./commpent/YarnOutStock.vue";
import YarnInStock from "./commpent/YarnInStock.vue";

export default {

  components: {
    YarnInStock,
    YarnOutStock,

  },
  data: function () {
    return {

    };
  },
  methods: {

    reload() {
      this.$refs.yarnIn.reload(this.dept);
      this.$refs.yarnOut.reload(this.dept);
    },
    async getDeptData() {
      let re = await this.$util.get("/Public/GetDeptPvList");
      console.log(re);
      if (re.data.length > 0) {
        this.SetDeptOptions(this.options, re.data);
      }

    },

    SetDeptOptions(options, depts) {
      depts.forEach(element => {
        let newOptions = {
          id: element.DeptID,
          label: element.DeptName,
        };
        if (element.Items.length > 0) {
          newOptions.children = [];
          this.SetDeptOptions(newOptions.children, element.Items);
        };
        options.push(newOptions);
      });

    }
  },
  mounted: function () {
    this.$bus.$emit('changeMenuItem', ['样纱管理', '我的样纱']);
    this.getDeptData();
  }
};
</script>