<style scoped>
</style>
<style>
#ContentDiv .ivu-table td {
  background-color: rgb(255, 255, 255);
}
</style>
<template>
  <div>

    <div style="margin:10px 0px 30px 0px;">
      <Steps :current="row.ProofStatus">
        <Step title="草拟"></Step>
        <Step title="审批"></Step>
        <Step title="排单"></Step>
        <Step title="打样"></Step>
        <Step title="完成"></Step>
      </Steps>
    </div>
    <hr color=#e8eaec SIZE=1>

    <Row class="expand-row" style="margin:20px 0px 0px 0px;">
      <Col span="8">
      <span class="expand-key">申请员工: </span>
      <span class="expand-value">{{ row.ProofApplyUserName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">申请部门: </span>
      <span class="expand-value">{{ row.ProofApplyDeptName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">交期: </span>
      <span class="expand-value">{{row.rdate}}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">款式ID: </span>
      <span class="expand-value">{{ row.ProofStyle.ProofStyleId }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">款名: </span>
      <span class="expand-value">{{ row.ProofStyle.StyleName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">客户款名: </span>
      <span class="expand-value">{{ row.ProofStyle.ClientNo }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">克重: </span>
      <span class="expand-value">{{ row.ProofStyle.Weight }}g</span>
      </Col>
      <Col span="8">
      <span class="expand-key">支数: </span>
      <span class="expand-value">{{ row.ProofStyle.Counts }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">针型: </span>
      <span class="expand-value">{{ row.ProofStyle.Gauge }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">成份: </span>
      <span class="expand-value">{{ row.ProofStyle.Material }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
      <span class="expand-key">打样资料: </span>
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <a :href="proofDataUrl+item.Url">{{item.DisplayName }}</a>
         <Divider type="vertical" />
      </span>
      </Col>
    </Row>
  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  props: {
    row: Object
  },
  data: function() {
    return {
      proofDataUrl:this.$util.proofDataUrl,
    };
  },
  methods: {},
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["样衣管理", "找样衣"]);
  },
  beforeMount: function() {
    var ds = JSON.stringify(this.row.RequiredDate);
    this.row.rdate = ds.substring(1, 11);
  }
};
</script>