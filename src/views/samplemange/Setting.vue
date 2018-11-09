<style scoped>
</style>
<template>
  <div>

    <Tabs value="name0">
      <TabPane label="基本配置" name="name0">
        <Form>
          <FormItem label='入库申请后需管理员审批后方可入库：'>
            <Switch v-model="Setting.IsInputStrageNeedAlow" />
          </FormItem>
          <FormItem label='入库后入库人员仍可修改删除样衣信息：'>
            <Switch v-model="Setting.InStrageAlowChange" />
          </FormItem>
          <FormItem label='启用受限视图：'>
            <Switch v-model="Setting.EnableLimtView" />
          </FormItem>
          <FormItem label='所有样衣可外借：'>
            <Switch v-model="Setting.AllSampleCanLend" />
          </FormItem>
          <Button type="primary" @click="saveSetting">保存</Button>
        </Form>
      </TabPane>
      <TabPane label="用户及管理员同步" name="name1">
        <Button type="primary" size="large" @click="upUserDataByDd">从钉钉同步管理员设置及用户</Button>
      </TabPane>
    </Tabs>

  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  data: function() {
    return {
      Setting: {
        IsInputStrageNeedAlow: false,
        InStrageAlowChange: false,
        EnableLimtView: false,
        AllSampleCanLend:false,
      }
    };
  },
  methods: {
    upUserDataByDd() {
     this.$bus.BeginLoading();
      this.$util.get("/Setting/UpUserDataByDd", this.Setting).then(p => {
        this.$Notice.success({
          title: "成功",
          desc: "同步样衣管理员和工艺人员成功！",
          duration: 4
        });
         this.$bus.EndLoading();
      });
    },
    saveSetting() {
      this.$bus.BeginLoading();
      this.$util.post("/Setting/SaveSetting", this.Setting).then(p => {
        this.$Notice.success({
          title: "成功",
          desc: "设置保存成功",
          duration: 4
        });
        this.$bus.EndLoading();
      });
    }
  },
  mounted: function() {
    this.$bus.getSystemSetting().then(re => {
      this.Setting = re;
    });
    this.$bus.$emit("changeMenuItem", ["样衣管理", "系统设置"]);
  }
};
</script>