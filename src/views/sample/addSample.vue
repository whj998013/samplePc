<style scoped>
</style>
<style>
#color .ivu-select-dropdown {
  max-height: 180px;
}
</style>
<template>
  <div>
    <Row type="flex" justify="space-between">
      <Col span="16"></Col>
      <Col>
      <Button size="large" type="primary" icon="md-checkmark" @click="saveSample">&emsp;保存&emsp;</Button>
      <Button size="large" type="warning" icon="md-close" @click="goBack">&emsp;取消&emsp;</Button>
      </Col>
    </Row>
    <Form ref='sample' :model="sample" :label-width="75" label-position="right" :rules="sampleRuleValidate">
      <Divider>样衣基本信息</Divider>
      <Row type="flex">
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='编号'>
          <Input v-model="sample.StyleId" readonly>
          </Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='部门'>
          <Input v-model="sample.DeptName" placeholder="输入部门">
          </Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='款号' prop="StyleNo">
          <Input v-model="sample.StyleNo" placeholder="输入款号">
          </Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='种类' prop="Kinds">
          <Select v-model="sample.Kinds">
            <Option v-for="item in kindslist" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='颜色' prop="Color">
          <AutoComplete id="color" v-model="sample.Color" :filter-method="filterMethod" :data="colorlist" placeholder="输入颜色" clearable></AutoComplete>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='尺码' prop="Size">
          <Select v-model="sample.Size">
            <Option v-for="item in sizelist" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">

        <FormItem label='针型' prop="Gauge">
          <Select v-model="sample.Gauge">
            <Option v-for="item in gaugelist" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='克重' prop="Weight">
          <InputNumber :step=50 style="width:100%" v-model="sample.Weight " :formatter="value=> `${value}克`" :parser="value => value.replace('克', '')"></InputNumber>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='可否外借'>
          <Switch v-model="sample.CanLendOut" size="large">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </Switch>
        </FormItem>
        </Col>

      </Row>
      <Divider>价格</Divider>
      <Col :xs="24" :sm="12" :md="12" :lg="8">
      <FormItem label='成本价'>
        <InputNumber style="width:100%" v-model="sample.CostPrice " :formatter="value=> `${value}元`" :parser="value => value.replace('元', '')"></InputNumber>
      </FormItem>
      </Col>
      <Col :xs="24" :sm="12" :md="12" :lg="8">
      <FormItem label='出厂价'>
        <InputNumber style="width:100%" v-model="sample.FactoryPrice " :formatter="value=> `${value}元`" :parser="value => value.replace('元', '')"></InputNumber>
      </FormItem>
      </Col>
      <Col :xs="24" :sm="12" :md="12" :lg="8">
      <FormItem label='销售价'>
        <InputNumber style="width:100%" v-model="sample.SalePrice " :formatter="value=> `${value}元`" :parser="value => value.replace('元', '')"></InputNumber>
      </FormItem>
      </Col>
      <Col :xs="24" :sm="12" :md="12" :lg="8">
      <FormItem label='处理价'>
        <InputNumber style="width:100%" v-model="sample.DiscountPrice " :formatter="value=> `${value}元`" :parser="value => value.replace('元', '')"></InputNumber>
      </FormItem>
      </Col>

      <Divider>样衣标签</Divider>
      <sytleTag ref="sytleTag" v-model="sample.StyleTag" :selectTagList="selectTagList"></sytleTag>

      <Divider>原料成份</Divider>
      <material ref="material" v-model="sample.Material" :materials="materialist"></material>
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='纱线支数' prop="Counts">
          <Input v-model="sample.Counts" placeholder="输入纱线支数">
          </Input>
        </FormItem>
        </Col>
      </Row>
      <Divider>现货信息</Divider>
      <Row>
        <Col>
        <FormItem label='有无现货'>
          <Switch v-model="sample.HaveStock" size="large">
            <span slot="open">有</span>
            <span slot="close">无</span>
          </Switch>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="20" :lg="16" v-if="sample.HaveStock">
        <stock :sizelist="sizelist" v-model="sample.StockData" ref="stock" is-edit></stock>
        </Col>
      </Row>
      <br>
      <Divider>打样信息</Divider>
      <Row type="flex">
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='打样单位'>
          <Input v-model="sample.ProofingCompany" placeholder="输入打样单位">
          </Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='工艺员'>
          <Input v-model="sample.TechnologyPeople" placeholder="输入工艺员姓名">
          </Input>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='程序员'>
          <Input v-model="sample.ProgamPeople" placeholder="输入程序员姓名"> </Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='打样日期'>
          <DatePicker style="width:100%" v-model="sample.ProofingDate" type="date" placeholder="选择样衣生产日期"></DatePicker>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='织机时间'>
          <InputNumber :step=5 style="width:100%" v-model="sample.WeaveTime " :formatter="value=> `${value}分钟`" :parser="value => value.replace('分钟', '')"></InputNumber>
        </FormItem>
        </Col>

        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='套口时间'>
          <InputNumber :step=5 style="width:100%" v-model="sample.LinkTime " :formatter="value=> `${value}分钟`" :parser="value => value.replace('分钟', '')"></InputNumber>
        </FormItem>
        </Col>
      </Row>
      <Divider>大货生产信息</Divider>
      <Row>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='客户'>
          <Input v-model="sample.ClientName" placeholder="输入客户">
          </Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='大货工厂'>
          <Input v-model="sample.ProductFactory" placeholder="输入大货工厂">
          </Input>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='大货数量'>
          <InputNumber :step=500 :min="0" v-model="sample.ProductNum" style="width:100%"></InputNumber>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='大货价格'>
          <InputNumber :step=5 :min="0" v-model="sample.Price" style="width:100%"></InputNumber>
        </FormItem>
        </Col>
        <Col :xs="24" :sm="12" :md="12" :lg="8">
        <FormItem label='出货日期'>
          <DatePicker style="width:100%" v-model="sample.ProductDate" type="date" placeholder="选择出货日期"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Divider>上传样衣图片</Divider>
      <picUp ref='picup' v-model="sample.PicList" :action="baseUrl+'/Sample/UpLoadPic'" :removeAction="baseUrl+'/Sample/RemoveFile'"></picUp>
      <Divider>上传工艺单</Divider>
      <Row>
        </Col>
        <Col span="8">
        <Upload type="drag" :on-remove='fileUploadRemoveFile' :on-preview='fileUploadOpenFile' :with-credentials=true :action="baseUrl+'/Sample/UpLoadFile'" :on-success='fileUploadOUpSuccess' :default-file-list='sample.FileList'>
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将文件拖入框内上传</p>
          </div>
        </Upload>
        </Col>
      </Row>
      <br>

    </Form>

  </div>
</template>
<script>
import picUp from "../commpent/picUpload.vue";
import material from "../commpent/material.vue";
import sytleTag from "../commpent/styleTag.vue";
import stock from "../commpent/Stock.vue";

export default {
  components: {
    picUp,
    material,
    sytleTag,
    stock
  },
  data: function() {
    return {
      newMode: true,
      baseUrl: this.$util.baseUrl,
      dataUrl: this.$util.dataUrl,
      sizelist: [],
      colorlist: [],
      gaugelist: [],
      materialist: [],
      selectTagList: [],
      kindslist: [],
      sample: {
        StyleId: "",
        StyleNo: "",
        DeptName: "",
        Color: "",
        Kinds: "",
        Size: "",
        Material: [],
        Gauge: "",
        Counts: "",
        StockData: [
          {
            color: "不分色",
            size: "均码",
            num: 1
          }
        ],
        ProofingCompany: "",
        TechnologyPeople: "",
        ProgamPeople: "",
        ProofingDate: "",
        WeaveTime: 0,
        LinkTime: 0,
        ClientName: "",
        ProductFactory: "",
        ProductNum: 0,
        ProductDate: "",
        Price: 0,
        Weight: 0,
        CostPrice: 0,
        FactoryPrice: 0,
        SalePrice: 0,
        DiscountPrice: 0,
        YarnCounts: "",
        CanLendOut: true,
        HaveStock: false,
        StyleTag: [{ name: "基本款", color: "#8FBC8F" }],
        PicList: [
          // {
          //   name: "bc7521e033abdd1e92222d733590f104",
          //   url:
          //     "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
          // }
        ],
        FileList: [
          // {
          //   name: "未报销.docx",
          //   reallyName: "SI100000069未报销.docx",
          //   url: "/uploadfile/SI100000069未报销.docx"
          // }
        ]
      },
      sampleRuleValidate: {
        StyleNo: [
          {
            required: true,
            message: "请输入款号",
            trigger: "change"
          }
        ],
        Color: [
          {
            required: true,
            message: "请输入颜色",
            trigger: "change"
          }
        ],
        Counts: [
          {
            required: true,
            message: "请输纱线支数",
            trigger: "change"
          }
        ],
        Size: [
          {
            required: true,
            message: "请选择尺码",
            trigger: "change"
          }
        ],
        Kinds: [
          {
            required: true,
            message: "请选择种类",
            trigger: "change"
          }
        ],
        Gauge: [
          {
            required: true,
            message: "请选择针型",
            trigger: "change"
          }
        ],
        Weight: [
          {
            required: true,
            type: "number",
            min: 1,
            message: "请正确填写克重",
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
    getobj() {
      //  console.log(this.$refs.stock.getData());
      console.log(this.sample.sizeData);
    },
    goBack() {
      this.$router.back(-1);
    },
    ///输入验证
    validate() {
      let _this = this;
      const p = Promise.all([
        new Promise((resolve, reject) => {
          _this.$refs.sample.validate(v => {
            resolve(v);
          });
        }),
        new Promise((resolve, reject) => {
          _this.$refs.material.validate(v => {
            resolve(v);
          });
        })
      ]).then(re => {
        console.log("检查结果", re);
        return re[0] && re[1];
      });
      return p;
    },
    ///调用验证并上传数据
    saveSample() {
      this.validate().then(p => {
        if (p) {
          this.$bus.BeginLoading();
          this.$util
            .post("/sample/SaveSample", this.sample)
            .then(result => {
              this.$Message.success("保存成功!");
              this.$router.back(-1);
              this.$bus.EndLoading();
            })
            .catch(p => {
              this.$bus.EndLoading();
            });
        } else {
          this.$Message.error("输入有错误，请重新检查!");
        }
      });
    },

    ///点击下载文件
    fileUploadOpenFile(file) {
      window.open(file.url);
    },
    ///删除上传的文件
    fileUploadRemoveFile(file) {
      this.$util
        .post(this.baseUrl + "/sample/RemoveFile", {
          filename: file.reallyName
        })
        .then(re => {
          console.log("re", re);
        });
    },
    ///上传文件返回
    fileUploadOUpSuccess(response, file, fileList) {
      file.reallyName = response.name;
      file.url = this.dataUrl + "/uploadfile/" + response.name;
      this.sample.FileList = Array.from(fileList, item => {
        return {
          name: item.name,
          reallyName: item.reallyName,
          url: item.url
        };
      });
    },

    Init() {
      //初始化各项插件
      this.$util.get("/sample/GetSelectList").then(result => {
        if (result.data) {
          let data = result.data;
          this.colorlist = data.ColorList;
          this.sizelist = data.SizeList;
          this.$bus.colorlist = data.ColorList;
          this.$bus.sizelist = data.SizeList;
          this.gaugelist = data.GaugeList;
          this.materialist = data.MaterialList;
          this.selectTagList = data.TagList;
          this.kindslist = data.KindsList;
        }
      });
    },
    newStyle() {
      //从服务器取得新样衣的ID
      this.$util.get("/sample/CreateSample").then(result => {
        if (result.data) {
          this.sample.StyleId = result.data.StyleId;
        }
      });
    },
    LoadStyle(id) {
      //从服务器取得样衣信息

      this.$bus.BeginLoading();
      this.$util
        .get("/sample/GetEditSample", {
          params: { StyleId: id }
        })
        .then(result => {
          if (result.data) {
            console.log("get:", result.data);
            result.data.PicList.forEach(item => {
              item.url = this.dataUrl + "/pic/minPic/" + item.name;
            });
            this.sample = result.data;
            this.$refs.material.materialsList.items = this.sample.Material;
            this.$refs.sytleTag.tagList = this.sample.StyleTag;
            this.$refs.picup.setPicList(this.sample.PicList);
            this.sample.FileList.forEach(item => {
              item.url = this.dataUrl + "/uploadfile/" + item.reallyName;
            });
            this.$bus.EndLoading();
          }
        });
    }
  },

  mounted() {
    this.Init();
    let id = this.$route.params.id;
    if (id == undefined) {
      //新增模式
      this.newStyle();
    } else {
      //编辑模式
      this.newMode = false;
      this.LoadStyle(id);
    }
    if (this.newMode) this.$bus.$emit("changeMenuItem", ["样衣管理", "新样衣"]);
    else this.$bus.$emit("changeMenuItem", ["样衣管理", "信息编辑"]);
  }
};
</script>