<style scoped>
</style>
<template>
  <div>
  
    <Select v-model="sv" style="width:100%" @on-change="handleChange" :disabled="disabled">
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
            <p>待完成:{{item.InCompleteNum}}款</p>
            <p>7天完成:{{item.CompleteNum7Day}}款</p>
            <p v-if="!NoScore">综合评分:{{item.Point}}</p>
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
    disabled:{
      type: Boolean,
      default: false
    },
    HaveNoSelect: {
      type: Boolean,
      default: true
    },
     NoScore: {
      type: Boolean,
      default: false
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
    },
    GetWorker(act){
      this.$util.get(act).then(re => {
      this.workers = re.data;
     
    });
    }
  },
  mounted: function() {
    this.sv = this.value;
    // debugger;
    if(this.action!=undefined){
      this.GetWorker(this.action);
    }
    
  },
  watch: {
    value: function() {
      this.sv = this.value;
    }
  }
};
</script>