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
      <Form ref="proof" :model="proof" :label-width="75" label-position="right" :rules="proofRuleValidate">
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="打样单号">
          <Input v-model="proof.ProofOrderId" readonly></Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="客户" prop="ClentName">
          <Input v-model="proof.ClentName" placeholder="客户"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="客户款号">
          <Input v-model="proof.ClientNo" placeholder="客户款号"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="款号" prop="ProofStyleNo">
          <Input v-model="proof.ProofStyleNo" placeholder="款号"></Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="款名">
          <Input v-model="proof.StyleName" placeholder="款名"></Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="打样类别" prop="proofType">
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
        <FormItem label='克重(g)' prop="Weight">
          <InputNumber :step=50 style="width:100%" v-model="proof.Weight "></InputNumber>
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
        <FormItem label='打样数量' prop="ProofNum">
          <InputNumber :step=1 style="width:100%" v-model="proof.ProofNum "></InputNumber>
        </FormItem>
        </Col>

         <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="交期" prop="FinshDate">
          <DatePicker style="width:100%" v-model="proof.FinshDate" type="date" placeholder="要求样品交期"></DatePicker>
        </FormItem>
        </Col>
        <Divider>上传工艺资料</Divider>
        <Row>
          <Col span="8">
          <FormItem>
            <Upload type="drag" :on-remove="fileUploadRemoveFile" :on-preview="fileUploadOpenFile" :with-credentials="true" :action="baseUrl + '/NewProof/UpLoadFile'"
              :on-success="fileUploadOUpSuccess" :default-file-list="proof.FileList" :data="proof">
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
        ProofOrderId: "",
        ProofStyleId: "",
        UserName: "",
        ClentName: "",
        ProofStyleNo: "",
        ClientNo: "",
        StyleName: "",
        proofType: "",
        Counts: "",
        Material: "",
        Weight: 0,
        Gauge: "",
        FileList: [],
        FinshDate: "",
        ProofNum:1,
      },
      proofRuleValidate: {
        ClentName: [
          {
            required: true,
            message: "请输入客户名",
            trigger: "change"
          }
        ],
        ProofStyleNo: [
          {
            required: true,
            message: "请输入打样款号",
            trigger: "change"
          }
        ],
        proofType: [
          {
            required: true,
            message: "请选择打样种类",
            trigger: "change"
          }
        ],
        FinshDate: [
          {
            required: true,
            type: "date",
            message: "请输入客户交期",
            trigger: "change"
          }
        ],  
        ProofNum: [
          {
            required: true,
            type: "number",
            min: 1,
            message: "数量不能小于1",
            trigger: "change"
          }
        ]
        
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
      this.validate().then(p => {
        if (p) {
          if (this.proof.FileList.length > 0) {
            this.$util.post("/NewProof/SaveProof", this.proof).then(result => {
              console.log(result);
              this.$Notice.info({
                title: "打样单保存成功。"
              });
              this.$router.back(-1);
            });
          } else {
            this.$Message.info("请上传工艺资料!");
          }
        } else {
          this.$Message.error("输入有错误，请重新检查!");
        }
      });
    },
    ///输入验证
    validate() {
      let _this = this;
      return new Promise((resolve, reject) => {
        _this.$refs.proof.validate(v => {
          resolve(v);
        });
      });
    },
    goBack() {
      this.$router.back(-1);
    },

    fileUploadRemoveFile(file) {
      console.log(file);
      this.$util.post(this.baseUrl + "/NewProof/RemoveFile", file).then(re => {
        console.log("re", re);
      });
    },

    fileUploadOpenFile() {},

    fileUploadOUpSuccess(response, file, fileList) {
      this.proof.FileList = fileList;
      file.FullName = response.name;
      file.Url = response.url;
      console.log(response, file, fileList);
    },

    Init() {
      this.$bus.getSelectList().then(result => {
        if (result) {
          this.gaugelist = result.GaugeList;
          this.proofTypeList = result.ProofTypeList;
        }
      });
      this.getProofNo().then(re => {
        this.proof.ProofOrderId = re.newProofOrderId;
        this.proof.ProofStyleId = re.newProofStyleId;
      });
      this.proof.UserName = this.$bus.currentUser.UserName;
    }
  },

  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["打样中心", "新打样单"]);
    this.Init();
  }
};
</script>