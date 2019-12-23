<style scoped>
</style>
<template>
  <div>
    <Row type="flex" justify="space-between" class="menuid">
      <Col span='18'>
      <Input search placeholder="输入搜索" v-model="SeachWords" @on-search="beginSeach" style="width: 60%" />
      <Button type="primary" v-show="!AdvanSeach" @click="beginSeach">搜索</Button>
      <Button type="text" @click="AdvanSeach=!AdvanSeach">
        <span v-if="!AdvanSeach" style="color:#2d8cf0">LAB色差查找</span>
        <span v-else style="color:#2d8cf0">关闭LAB色差查找</span>
      </Button>
      <Card style="width:60%" v-show="AdvanSeach">
        <Row>
          <Col span='24'>
          <span>请在下框中输入色差仪测出的LAB值进行色差查找</span>
          <br>
          <br>
          </Col>
          <Col span='12'>
          <Input v-model="lab.l" type="number">
          <span slot="prepend">LAB_L</span>
          </Input>
          <br>
          <Input v-model="lab.a" type="number">
          <span slot="prepend">LAB_A</span>
          </Input>
          <br>
          <Input v-model="lab.b" type="number">
          <span slot="prepend">LAB_B</span>
          </Input><br>

          <Button type="primary" @click="LabSeach">LAB色差查找</Button>
          </Col>
          <Col span='8' offset='1'>
          颜色选择:
          <ColorPicker v-model="rgb" recommend size="large" @on-change="RgbColorSelect" />
          <br>
          <span style="color:#ed4014">显示器存在显示色差，您所选择的颜色并不是精准的。</span>
          </Col>
        </Row>
      </Card>
      </Col>
      <Col>
      <Button @click="reload">&emsp;&emsp;刷新&emsp;&emsp;</Button>
      </Col>
    </Row>
    <br>
    <LocalStockView v-model="YarnList" :page="pageObj" @pageChange="pageChange" :showPage="showPage"></LocalStockView>
    <OutStockApply></OutStockApply>
  </div>
</template>  
<script>
//import bus from "../bus.js";
import LocalStockView from "./commpent/LocalStockView.vue";
import OutStockApply from "./commpent/outStockApply";
import ColorHelp from "@/libs/ColorHelp";


export default {
  inject: ["reload"],
  components: {
    LocalStockView,
    OutStockApply
  },
  data: function () {
    return {
      pageObj: {
        pageId: 1,
        pageSize: 10,
        total: 0,
      },
      showPage: true,
      SeachWords: "",
      rgb: "#000000",
      AdvanSeach: false,
      lab: {
        l: 0,
        a: 0,
        b: 0,
      },

      YarnList: []
    };
  },
  methods: {
    async LabSeach() {
      if (this.SeachWords != "") {
        this.$bus.BeginLoading();
        let obj = {
          key: this.SeachWords,
          lab: this.lab
        }
        let re = await this.$util.post("/YarnSeach/GetLabYarnList", obj);
        this.YarnList = re.data.Result;
        this.showPage = false;
        this.AdvanSeach = false;
        this.$bus.EndLoading();

      } else {
        this.$Notice.warning({
          title: '请输入搜索关键词',
          desc: 'LAB色差比对查找必须输入搜索关键词！'
        });
      }

    },
    beginSeach() {
      this.pageObj.pageId = 1;
      this.showPage = true;
      this.GetData();
    },
    pageChange(page) {
      console.log(page);
      this.pageObj.pageId = page.pageId;
      this.pageObj.pageSize = page.pageSize;
      this.GetData();
    },
    async GetData() {
      this.$bus.BeginLoading();
      let qObj = {
        key: this.SeachWords,
        pageId: this.pageObj.pageId,
        pageSize: this.pageObj.pageSize,
      };

      let re = await this.$util.post("/YarnSeach/GetYarnList", qObj);
      console.log("yarnlist", re);
      this.YarnList = re.data.Result;
      this.pageObj.pageId = re.data.SeachObj.PageId;
      this.pageObj.pageSize = re.data.SeachObj.PageSize;
      this.pageObj.total = re.data.SeachObj.Total;
      this.$bus.EndLoading();
    },
    async RgbColorSelect(val) {
      var r = ColorHelp.rgbToLab(val);
      this.lab.l = r[0].toFixed(2);
      this.lab.a = r[1].toFixed(2);
      this.lab.b = r[2].toFixed(2);
    }
  },
  mounted: function () {
    this.$bus.$emit('changeMenuItem', ['样纱管理', '样纱查询']);
    this.GetData();
  }
};
</script>