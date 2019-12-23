<style scoped>
</style>
<template>
  <div>
    <Select v-model="sv" style="width:100%" @on-change="handleChange" placeholder="请选择打样部门">
      <Option v-for="(item,index) in proofDepts" :key="index" :value="item.DeptID" :label="item.DeptName+' / '+item.UserName">
        <Row>
          <Col span="8">
          <span>{{item.DeptName}}</span>
          </Col>
          <Col span="16">
          <div style="float:right;">
            <p>负责人：{{item.UserName}}</p>
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
    value: Number,
    action: String,
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: function () {
    return {
      sv: "",
      proofDepts: []
    };
  },
  methods: {
    handleChange(val) {
      this.$emit("input", val);
    },
    GetDepts(act) {
      this.$util.get(act).then(re => {
        this.proofDepts = re.data;
        console.log("proofdept",this.proofDepts);
      });
        
    }
  },
  mounted: function () {
    this.sv = this.value;
    if (this.action != undefined) {
      this.GetDepts(this.action);
    }

  },
  watch: {
    value: function () {
      this.sv = this.value;
    }
  }
};
</script>