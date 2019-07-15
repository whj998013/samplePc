<style scoped>
img {
  width: auto;
  height: auto;
  max-width: 100%;
}
p {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.sample {
  padding: 10px 0px 10px 0px;
}
.maxHeight {
  max-height: 100px;
}
.modelwh {
  max-width: 800px;
  max-height: 800px;
}
</style>
<style>
#xh .ivu-collapse-content {
  padding: 0 0 0 0;
}
#aid .ivu-card-body {
  padding: 10px 10px;
}
</style>
<template>
  <div id="aid">
    <Card :style="'width:'+width">
      <div slot="title">
        <Checkbox v-model="value.checked" v-if="canSelect"></Checkbox>
        <div style="display:inline">ID：{{value.StyleId}}&nbsp[{{value.StateText}}]</div>
      </div>
      <Dropdown v-if="haveAction" slot="extra" @on-click='dropdown'>
        <a href="javascript:void(0)">
          操作
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name='onInStorage' v-if="haveInStorage&&value.State==1">申请入库</DropdownItem>
          <DropdownItem name='onAcceptInStorage' v-if="haveAcceptInStorage&&value.State==2">确认入库</DropdownItem>
          <DropdownItem name='onLend' v-if="haveLend &&value.State==3">借出</DropdownItem>
          <DropdownItem name='onAcceptLend' v-if="haveAcceptLend &&value.State==4">确认借出</DropdownItem>
          <DropdownItem name='onReturn' v-if="haveReturn  &&value.State==5">还回</DropdownItem>
          <DropdownItem name='onAcceptReturn' v-if="haveAcceptReturn  &&value.State==6">确认还回</DropdownItem>
          <DropdownItem name='onEdit' v-if="haveEdit">编辑</DropdownItem>
          <DropdownItem name='onDelete' v-if="haveDelete">删除</DropdownItem>
          <DropdownItem name='onPrint' v-if="havePrint">打印二维码</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Row>
        <Col span="9">
        <div>
          <a><img class="maxHeight" :src="dataUrl+'/pic/minpic/'+picstr" @click="handleView(picstr)"></img>
          </a>
        </div>
        </Col>
        <Col span="14" offset="1">
        <div class="dc">
          <p>款号:{{value.StyleNo}}</p>
          <p>种类:{{value.Kinds}}</p>
          <p>允许借用:{{canlendout}}</p>
          <p>现货:{{haveStock}}</p>

        </div>
        </Col>
      </Row>
      <Row>
        <Tag v-for="item in value.StyleTag" :key="item.name" :color="item.color">{{item.name}}</Tag>
      </Row>
      <Collapse simple>
        <Panel name="基本信息">
          基本信息
          <span slot="content">
            <p>颜色:{{value.Color}}</p>
            <p>尺码:{{value.Size}}</p>
            <p>针型:{{value.Gauge}}</p>
            <p>克重:{{value.Weight}}K</p>
            <p>成份:<span v-for="item in mList" :key="item.yranId">{{item.yarnId}}、{{item.counts==""?"":"支数："+item.counts+" "}}{{item.Material}}<br/></span></p>
            <p v-if="value.Counts!=''">支数:{{value.Counts}}</p>
            <p>录入人:{{value.User}}</p>
            <p>部门:{{value.DeptName}}</p>
            <p>日期:{{value.CreateDate}}</p>
          </span>
        </Panel>
        <Panel name="价格信息">
          价格信息
          <span slot="content">
            <p v-if="isLimt">成本价:{{value.CostPrice}}元</p>
            <p v-if="isLimt">出厂价:{{value.FactoryPrice}}元</p>
            <p>零售价:{{value.SalePrice}} 元</p>
            <p v-if="isLimt">处理价:{{value.DiscountPrice}}元</p>
          </span>
        </Panel>
        <Panel name="现货信息" v-if="value.HaveStock" id="xh">
          现货信息
          <span slot="content">
            <stock v-model="value.StockData" ref="stock"></stock>
          </span>

        </Panel>

        <Panel name="打样及大货信息" v-if="isLimt">
          打样及大货信息
          <span slot="content">
            <p>————打样信息————</p>
            <p>打样部门:{{value.ProofingCompany}}</p>
            <p>工艺员:{{value.TechnologyPeople}}</p>
            <p>程序员:{{value.ProgamPeople}}</p>
            <p>织机时间(分钟):{{value.WeaveTime}}</p>
            <p>套口时间(分钟):{{value.LinkTime}}</p>
            <p>打样日期:{{value.ProofingDate}}</p>
            <p>————大货信息————</p>
            <p>客户:{{value.ClientName}}</p>
            <p>工厂:{{value.ProductFactory}}</p>
            <p>数量:{{value.ProductNum}}</p>
            <p>成衣价:{{value.Price}}</p>
            <p>出货日期:{{value.ProductDate}}</p>
          </span>
        </Panel>

        <Panel name="样衣图片">
          样衣图片
          <span slot="content">
            <Row>
              <Col v-for="item in piclist" :key="item.FileName" span='11' offset="1">
              <a><img class="maxHeight" :src="dataUrl+'/pic/minpic/'+item.FileName" @click="handleView(item.FileName)"></img>
              </a>
              </Col>
            </Row>
          </span>
        </Panel>

        <Panel name="工艺单附件" v-if="isLimt">
          工艺单附件
          <span slot="content">
            <p v-for="(item,index) in filelist" :key="item.FileName">
              <Icon type="md-attach" />
              <a :href="dataUrl+'/uploadfile/'+item.FileName" target="_blank">{{item.DisplayName}}</a>
            </p>
            <p v-if="!isHaveFile">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp没有附件</p>
          </span>
        </Panel>

      </Collapse>
      <Row>
      </Row>
    </Card>
    <Modal title="图片查看" v-model="modalVisible" footer-hide>
      <img :src="dataUrl+'/pic/' + imgName " v-if="modalVisible">
    </Modal>
  </div>
</template>
<script>
import stock from "./Stock.vue";
export default {
  components: {
    stock
  },
  props: {
    value: {
      type: Object
    },
    width: {
      type: String,
      default: "300px"
    },
    canSelect: {
      type: Boolean,
      default: false
    },
    haveAction: {
      type: Boolean,
      default: true
    },
    haveLend: {
      type: Boolean,
      default: false
    },
    haveReturn: {
      type: Boolean,
      default: false
    },
    haveEdit: {
      type: Boolean,
      default: false
    },
    haveDelete: {
      type: Boolean,
      default: false
    },
    havePrint: {
      type: Boolean,
      default: false
    },
    haveInStorage: {
      type: Boolean,
      default: false
    },
    haveAcceptInStorage: {
      type: Boolean,
      default: false
    },
    haveAcceptLend: {
      type: Boolean,
      default: false
    },
    haveAcceptReturn: {
      type: Boolean,
      default: false
    },
    limtView: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      mList: [],
      checked: this.value.checked,
      dataUrl: this.$util.dataUrl,
      modalVisible: false,
      imgName: "",
      picstr: "",
      filelist: [],
      piclist: [],
      Material: "",
      isLimt: false,

    };
  },
  computed: {
    isHaveFile() {
      return this.filelist.length > 0 ? true : false;
    },
    canlendout() {
      if (this.value.CanLendOut) return "是";
      else return "否";
    },
    haveStock() {
      if (this.value.HaveStock) return "有现货";
      else return "无现货";
    }
  },
  methods: {
    getobj() {
      this.checked = !this.checked;
      this.value.checked = this.checked;
    },
    dropdown(event) {
      this.$emit(event, this.value);
    },
    handleView(name) {
      this.imgName = name;
      this.modalVisible = true;
    }
  },
  mounted() {
    console.log('info', this.value);
    this.picstr = this.value.Pic;
    for (let p of this.value.Material) {
      if (!p.yarnId) p.yarnId = 1;
      if (!p.enName) p.enName = "";
      let m = this.mList.find(t => {
        return t.yarnId == p.yarnId;
      });
      if (m) {
        m.Material = m.Material + p.percent + "%" + p.materials + '(' + p.enName + ')' + " ";
      } else {
        let nm = {
          yarnId: p.yarnId,
          Material: '',
          counts: p.counts ? p.counts : "",
        };
        nm.Material = nm.Material + p.percent + "%" + p.materials + '(' + p.enName + ')' + " ";
        this.mList.push(nm);
      }
    }
    console.log(this.mList);

    for (let f of this.value.Files) {
      if (f.FileType == 0) {
        //图片
        this.piclist.push(f);
      } else {
        this.filelist.push(f);
      }
    }
    this.isLimt = this.$bus.isLimt;
    this.v = this.value;
  }
};
</script>