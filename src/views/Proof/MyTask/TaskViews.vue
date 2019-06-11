<style scoped>
</style>
<style>
.demo-drawer-profile {
  font-size: 14px;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 12px;
}
</style>
<template>
  <div>
    <p :style="pStyle">申请信息</p>
    <div class="demo-drawer-profile">
      <Row>
        <Col span="12">
        编号:{{value.ProofOrderId}}
        </Col>
        <Col span="12">
        款号:{{value.ProofStyle.ProofStyleNo}}
        </Col>
      </Row>
      <Row>
        <Col span="12">
        业务: {{value.ProofApplyUserName}}
        </Col>
        <Col span="12">
        部门: {{value.ProofApplyDeptName}}
        </Col>
      </Row>
      <Row>
        <Col span="12">
        客户: {{value.ProofStyle.ClentName}}
        </Col>
        <Col span="12">
        客户款号: {{value.ProofStyle.ClientNo}}
        </Col>
      </Row>
      <Row>
        <Col span="12">
        打样数量: {{value.ProofNum}}件

        </Col>
        <Col span="12">
        紧急度: {{value.Urgency}}
        </Col>
      </Row>
      <Row>
        <Col span="12">
        接单日期: {{JSON.stringify(value.ReceivedDate ).substring(1, 11)}}
        </Col>
        <Col span="12">
        要求交期: {{JSON.stringify(value.RequiredDate ).substring(1, 11)}}
        </Col>
      </Row>
      备注：{{value.Remark}}
    </div>
    <Divider />
    <p :style="pStyle">款式信息</p>
    <div class="demo-drawer-profile">
      <Row>
        <Col span="12">
        打样类别: {{value.ProofStyle.ProofTypeText}}
        </Col>
        <Col span="12">
        款名:{{value.ProofStyle.StyleName}}
        </Col>
      </Row>
      <Row>
        <Col span="12">
        成份:{{value.ProofStyle.Material}}
        </Col>
        <Col span="12">
        支数:{{value.ProofStyle.Counts}}
        </Col>
      </Row>
      <Row>
        <Col span="12">
        克重:{{value.ProofStyle.Weight}}
        </Col>
        <Col span="12">
        针型:{{value.ProofStyle.Gauge}}
        </Col>
      </Row>
    </div>
    <Divider />
    <p :style="pStyle">打样资料</p>
    <div class="demo-drawer-profile">
      <Row>
        <Col span="24">
        <span class="expand-value" v-for="item in dyzl">
          <a :href="proofDataUrl+item.Url" >{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>
        </Col>
      </Row>
    </div>
    <Divider />
    <p :style="pStyle">工艺文件</p>
    <div class="demo-drawer-profile">
      <Row>
        <Col span="24">
        <span class="expand-value" v-for="item in gy">
          <a :href="proofDataUrl+item.Url">{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>
        </Col>
      </Row>
    </div>
    <Divider />
    <p :style="pStyle">制版文件</p>
    <div class="demo-drawer-profile">
      <Row>
        <Col span="12">
        <span class="expand-value" v-for="item in zb">
          <a :href="proofDataUrl+item.Url">{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  props: ["value"],
  data: function() {
    return {
      proofDataUrl: this.$util.proofDataUrl,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      }
    };
  },
  computed: {
    dyzl: function() {
      return this.value.ProofStyle.ProofFiles.filter(item => {
        return item.FileType == 2;
      });
    },
    gy: function() {
      return this.value.ProofStyle.ProofFiles.filter(item => {
        return item.FileType == 3;
      });
    },
    zb: function() {

       return this.value.ProofStyle.ProofFiles.filter(item => {
        return item.FileType == 4;
      });
    }
  },
  methods: {},
  mounted: function() {}
};
</script>