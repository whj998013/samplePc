<style scoped>
</style>
<style>
#client .ivu-select-dropdown {
  max-height: 180px;
}
</style>
<template>
  <div>
    <div>

      <Form ref="proof" :model="proof" :label-width="75" label-position="right" :rules="proofRuleValidate">
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="打样单号">
          <Input v-model="proof.ProofOrderId" readonly></Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label="客户" prop="ClentName">
          <AutoComplete id="client" v-model="proof.ClentName" :data="clients" clearable :filter-method="filterMethod" placeholder="客户"></AutoComplete>
          <!-- <Input v-model="proof.ClentName" placeholder="客户"></Input> -->
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
        <Divider>其它要求</Divider>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
        <FormItem label='指定工艺'>
          <workerSelect v-model="proof.DesignatedGY" action="/ProofWorker/GetWorkerList/1"></workerSelect>

        </FormItem>
        </Col>
        <Col v-if="false" :xs="24" :sm="24" :md="12" :lg="12">
        <!-- <FormItem label='指定程序'>
          <workerSelect v-model="proof.DesignatedCX" action="/ProofWorker/GetWorkerList/2"></workerSelect>
        </FormItem> -->
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
        <FormItem label='紧急度'>
          <RadioGroup v-model="proof.Urgency" size="large">
            <Radio label="闲时"></Radio>
            <Radio label="一般"></Radio>
            <Radio label="加急"></Radio>
          </RadioGroup>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
        <FormItem label='备注'>
          <Input type="textarea" :rows="2" :step=1 style="width:100%" v-model="proof.Remark"></Input>
        </FormItem>
        </Col>

        <Divider>上传工艺资料</Divider>
        <Row>
          <Col span="8">
          <FormItem>
            <Upload type="drag" :with-credentials="true" :action="baseUrl + '/NewProof/UpLoadFile'" :on-success="fileUploadOUpSuccess" :data="proof"
              :show-upload-list=false>
              <div>
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或将文件拖入框内上传</p>
              </div>
            </Upload>
          </FormItem>
          </Col>
          <Col span="12" offset="1">
          <Tag closable color="primary" v-for="(f,index) in proof.FileList" :key="index" @on-close="removeFile(f,index)">{{f.DisplayName}}</Tag>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
import workerSelect from "../../commpent/workerSelect.vue";
export default {
  components: {
    workerSelect
  },
  props: {
    value: {
      type: Object
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      baseUrl: this.$util.baseUrl,
      dataUrl: this.$util.dataUrl,
      gaugelist: [],
      proofTypeList: [],
      model9: "不指定",
      clients: ['Next', 'macys', 'Jonathan Paul Ive'],
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
        ProofNum: 1,
        Urgency: "一般",
        DesignatedGY: "",
        DesignatedCX: "",
        Remark: ""
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
    filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    saveProof() {
      return new Promise((resolve, reject) => {
        this.validate().then(p => {
          if (p) {
            if (this.proof.FileList.length > 0) {
              let action = "";
              if (this.editMode) {
                action = "/NewProof/UpdateProof"; //编辑模式
              } else {
                action = "/NewProof/SaveProof"; //新增模式
              }
              console.log("proof", this.proof);
              this.$util.post(action, this.proof).then(result => {
                resolve(result);
                this.$Notice.info({
                  title: "打样单保存成功。"
                });
              });
            } else {
              this.$Message.info("请上传工艺资料!");
              reject("error");
            }
          } else {
            this.$Message.error("输入有错误，请重新检查!");
            reject("error");
          }
        });
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

    exit() {
      this.$emit("exit", row);
    },

    removeFile(file, index) {
      if (file.Id == 0) {
        this.$util
          .post(this.baseUrl + "/NewProof/RemoveFile", file)
          .then(re => {
            console.log("re", re);
          });
      }
      this.proof.FileList.splice(index, 1);
      console.log(this.proof.FileList);
    },

    fileUploadOUpSuccess(response, file, fileList) {
      let fobj = {};
      fobj.Id = 0;
      fobj.FullName = response.name;
      fobj.Url = response.url;
      fobj.DisplayName = file.name;
      this.proof.FileList.push(fobj);
      console.log(response, file, fileList, this.proof);
    },

    Init() {
      this.$bus.getSelectList().then(result => {
        if (result) {
          this.gaugelist = result.GaugeList;
          this.proofTypeList = result.ProofTypeList;
        }
      });

      this.proof.UserName = this.$bus.currentUser.UserName;
    },
    NewProof(proofNo) {
      this.resetData();
      this.proof.ProofOrderId = proofNo.ProofOrderId;
      this.proof.ProofStyleId = proofNo.ProofStyleId;
    },
    resetData() {
      this.$refs.proof.resetFields();
      this.proof.ProofOrderId = "";
      this.proof.ProofStyleId = "";
      this.proof.UserName = "";
      this.proof.ClentName = "";
      this.proof.ProofStyleNo = "";
      this.proof.ClientNo = "";
      this.proof.StyleName = "";
      this.proof.proofType = "";
      this.proof.Counts = "";
      this.proof.Material = "";
      this.proof.Weight = 0;
      this.proof.Gauge = "";
      this.proof.ProofNum = 1;
      this.proof.FileList.length = 0;
      this.proof.DesignatedGY = "不指定";
      this.proof.DesignatedCX = "不指定";
      this.proof.Remark = "";
      this.proof.Urgency = "一般";
    },
    BeginEdit(proofobj) {
      console.log("obj", proofobj);
      this.resetData();
      this.proof.ProofOrderId = proofobj.ProofOrderId;
      this.proof.ProofStyleId = proofobj.ProofStyle.ProofStyleId;
      this.proof.UserName = proofobj.ProofApplyUserName;
      this.proof.ClentName = proofobj.ProofStyle.ClentName;
      this.proof.ProofStyleNo = proofobj.ProofStyle.ProofStyleNo;
      this.proof.ClientNo = proofobj.ProofStyle.ClientNo;
      this.proof.StyleName = proofobj.ProofStyle.StyleName;
      this.proof.proofType = proofobj.ProofStyle.ProofTypeText;
      this.proof.Counts = proofobj.ProofStyle.Counts;
      this.proof.Material = proofobj.ProofStyle.Material;
      this.proof.Weight = proofobj.ProofStyle.Weight;
      this.proof.Gauge = proofobj.ProofStyle.Gauge;
      this.proof.FinshDate = proofobj.RequiredDate;
      this.proof.ProofNum = proofobj.ProofNum;
      this.proof.Remark = proofobj.Remark;
      this.proof.Urgency = proofobj.Urgency;
      this.proof.DesignatedGY = proofobj.DesignatedGY;
      this.proof.DesignatedCX = proofobj.DesignatedCX;
      this.proof.FileList = proofobj.ProofStyle.ProofFiles.slice();
      console.log("proof", this.proof);
    },
    GetClients(){
        this.$util.get("/ProofMange/GetClients").then(re=>{

          this.clients=re.data;

        });
       
    }
  },
  mounted: function() {
    this.Init();
    this.GetClients();

  }
};
</script>