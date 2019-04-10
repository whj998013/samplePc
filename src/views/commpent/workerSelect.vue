<style scoped>
</style>
<template>
  <div>
  
    <Select v-model="sv" style="width:100%" @on-change="handleChange">
      <Option v-if="HaveNoSelect" value="不指定" label="不指定">
        <h3>不指定</h3><br>
        <hr color=#e8eaec size=1>
      </Option>

      <Option v-for="(item,index) in workers" :key="index" :value="item.UserName" :label="item.UserName">
        <Row>
          <Col span="8">
          <Avatar icon="ios-person" :src="item.Avatar" size="large"></Avatar><span>{{item.UserName}}</span>
          </Col>
          <Col span="16">
          <div style="float:right;">
            <p>打样中:{{item.InCompleteNum}}款</p>
            <p>7天完成:{{item.CompleteNum7Day}}款</p>
            <p>综合评分:{{item.Point}}</p>
          </div>
          </Col>
        </Row>
      </Option>
    </Select>
  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  props: {
    value: String,
    action: String,
    HaveNoSelect: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      sv: "",
      workers: []
    };
  },
  computed: {
    currentUser() {
      return this.$bus.currentUser;
    }
  },
  methods: {
    handleChange(val) {
      this.$emit("input", val);
    }
  },
  mounted: function() {
    this.sv = this.value;
    this.$util.get(this.action).then(re => {
      this.workers = re.data;
    });
  },
  watch: {
    value: function() {
      this.sv = this.value;
    }
  }
};
</script>