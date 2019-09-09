<style scoped>
</style>
<template>
  <div>
    <!-- <Tabs value="name0">
      <TabPane label="样衣系统配置" name="name0"> -->
    <Form>
      <Divider>样衣系统配置</Divider>
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
      <Divider>毛纱系统配置</Divider>
      <Button type="primary" @click="YarnStockCorrect">毛纱库存小数位修正</Button>

    </Form>
    <!-- </TabPane>
    </Tabs> -->
  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  data: function () {
    return {
      Setting: {
        IsInputStrageNeedAlow: false,
        InStrageAlowChange: false,
        EnableLimtView: false,
        AllSampleCanLend: false
      }
    };
  },
  methods: {
    saveSetting() {
      this.$bus.BeginLoading();
      this.$util.post("/SampleSetting/SaveSampleSetting", this.Setting).then(p => {
        this.$Notice.success({
          title: "成功",
          desc: "设置保存成功",
          duration: 4
        });
        this.$bus.EndLoading();
      });
    },
    async YarnStockCorrect() {
      this.$bus.BeginLoading();
      await this.$util.get("/YarnSetting/YarnStockCorrect");
      this.$bus.EndLoading();
    }

  },
  mounted: function () {
    this.$bus.getSystemSetting().then(re => {
      this.Setting = re;
    });
    this.$bus.$emit("changeMenuItem", ["系统设置", "样衣系统配置"]);
  }
};
</script>