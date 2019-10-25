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
      <!-- 显示时间段:  <DatePicker v-model="dateValue" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择时间段" style="width: 250px"></DatePicker> -->
      </Col>
      <Col>
      <Button @click="reload">&emsp;&emsp;刷新&emsp;&emsp;</Button>
      <Button type="primary" v-if="$Auth('Sample_MySample_NewSample')" @click="newSample" span='8'>录入新样衣</Button>
      </Col>
    </Row>

    <Tabs value="name0">

      <TabPane label="未入库样衣" name="name0">
        <sampleview ref="view1" action="/MySample/GetNotInStorageSample" @needUpData='handleUpdata' haveEdit havePrint haveDelete haveInStorage></sampleview>
      </TabPane>
      <TabPane label="已入库样衣" name="name1">
        <sampleview ref="view2" action="/MySample/GetInStorageSample" @needUpData='handleUpdata' :haveEdit="InStrageAlowChange" havePrint showImport></sampleview>
      </TabPane>
      <TabPane label="我借用的样衣" name="name2">
        <sampleview ref="view3" action="/MySample/GetLendOutSample" @needUpData='handleUpdata' ba havePrint :havePage="false"></sampleview>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import sampleview from "../commpent/sampleView.vue";

export default {
  inject: ["reload"],
  components: {
    sampleview
  },
  data: function () {
    return {
      InStrageAlowChange: this.$bus.Setting.InStrageAlowChange,
      dateValue: [],
      isshow: false
    };
  },
  methods: {
    test() {
      console.log("teset");
    },

    handleUpdata(val) {
      console.log("hand:", val);
      this.$refs.view1.getData();
      this.$refs.view2.getData();
      this.$refs.view3.getData();
    },
    newSample() {
      this.$router.push("/sample/newSample");
    }
  },
  mounted: function () {
    this.$bus.$emit("changeMenuItem", ["样衣库", "我的样衣"]);
  }
};
</script>