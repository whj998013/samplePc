<style scoped>
</style>
<template>
  <div>
    <div>
      <Row type="flex" justify="space-between">
        <Col span="16">
        </Col>
        <Col>
        <Button size="large" type="primary" icon="md-checkmark" @click="saveProof">&emsp;保存&emsp;</Button>
        <Button size="large" type="warning" icon="md-close" @click="goBack">&emsp;取消&emsp;</Button>
        </Col>
      </Row>
      <Divider>打样基本信息</Divider>
      <Form ref="sample" :label-width="75" label-position="right">
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="编号">
          <Input v-model="proof.ProofStyleId" readonly></Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="业务员">
          <Input v-model="proof.ProofApplyUserDdId" placeholder="业务员" readonly></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="部门">
          <Input v-model="proof.ProofApplyDeptName" placeholder="业务部" readonly></Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="客户">
          <Input v-model="proof.ClentName" placeholder="客户"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="款号">
          <Input v-model="proof.ProofStyleNo" placeholder="款号"></Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="客户款号">
          <Input v-model="proof.ClientNo" placeholder="客户款号"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="款名">
          <Input v-model="proof.StyleName" placeholder="款名"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="打样类别">
          <Select v-model="proof.proofType">
            <Option v-for="item in proofTypeList" :value="item.TypeName" :key="item.Id">{{ item.TypeName }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="纱支">
          <Input v-model="proof.Counts" placeholder="纱支"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="成份">
          <Input v-model="proof.Material" placeholder="成份"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="克重">
          <Input v-model="proof.Weight" placeholder="克重"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="针形">
          <Select v-model="proof.Gauge">
            <Option v-for="item in gaugelist" :value="item" :key="item">{{item}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="交期">
          <DatePicker style="width:100%" v-model="proof.ProductDate" type="date" placeholder="要求样品交期"></DatePicker>
        </FormItem>
        </Col>
        <Divider>上传工艺资料</Divider>
        <Row>
          <Col span="8">
          <FormItem>
            <Upload type="drag" :on-remove="fileUploadRemoveFile" :on-preview="fileUploadOpenFile" :with-credentials="true" :action="baseUrl + '/Sample/UpLoadFile'"
              :on-success="fileUploadOUpSuccess" :default-file-list="proof.FileList">
              <div>
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或将文件拖入框内上传</p>
              </div>
            </Upload>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
//import bus from "../bus.js";
export default {
  data: function() {
    return {
      baseUrl: this.$util.baseUrl,
      dataUrl: this.$util.dataUrl,
      gaugelist: [],
      proofTypeList: [],
      proof: {
        ProofStyleId: ""
      }
    };
  },
  methods: {
    getProofNo() {
      return new Promise((resolve, reject) => {
        this.$util
          .get("/NewProof/GetProofNo")
          .then(result => {
            resolve(result.data);
          })
          .catch(re => {
            reject(re);
          });
      });
    },
    saveProof() {
      console.log(this.proof);
    },
    goBack() {
      this.$router.back(-1);
    },

    fileUploadRemoveFile() {},

    fileUploadOpenFile() {},

    fileUploadOUpSuccess() {},

    Init() {
      this.$bus.getSelectList().then(result => {
        if (result) {
          this.gaugelist = result.GaugeList;
          this.proofTypeList = result.ProofTypeList;
        }
      });
      this.getProofNo().then(re => {
        this.proof.ProofStyleId = re;
      });
    }
  },

  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["打样中心", "新打样单"]);
    this.Init();
  }
};
</script>