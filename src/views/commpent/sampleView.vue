<style scoped>
</style>
<template>
  <div>

    <Row type="flex" :gutter="16">
      <Col v-for="(item,i) in items" :key="item.Id">
      <sampleInfo v-if="show" class="sample" v-model="items[i]" :canSelect="canSelect" :limtView='limtView' :haveAction='haveAction' :haveLend='haveLend' :haveEdit='haveEdit' :haveDelete='haveDelete'
        :haveReturn='haveReturn' :havePrint='havePrint' :haveInStorage='haveInStorage' :haveAcceptInStorage='haveAcceptInStorage' :haveAcceptLend='haveAcceptLend' :haveAcceptReturn='haveAcceptReturn' @onLend='handleLend'
        @onEdit='handleEdit' @onDelete='handleDelete' @onReturn='handleReturn' @onPrint='handlePrint' @onInStorage='handleInStorage' @onAcceptInStorage='handleAcceptInStorage' @onAcceptLend='handleAcceptLend'
        @onAcceptReturn='handleAcceptReturn' @addToPrint='handleAddToPrint'>
      </sampleInfo>
      </Col>
    </Row>
    <Row>
      <Table border ref="table"  v-show="false">
      </Table>
    </Row>
    <Row v-if="havePage">
      <template>
        <Row type="flex" :gutter="16">
          <Col>
          <Page show-total show-sizer placement='top' :current=1 :total='pageobj.total' :page-size='pageobj.pageSize' @on-change='pageChange' @on-page-size-change='pageSizeChange' />
          </Col>
          <Col v-if="showImport">
          <DatePicker @on-change="dateChange" :options="options1" v-model="dateRange" transfer type="daterange" placement="bottom-end" placeholder="选择显示日期范围" style="width: 200px"></DatePicker>
          </Col>
          <Col v-if="showImport">
          <Button @click="exportData">导出本页数据</Button>
          <Button @click="exportAllData">导出全部数据</Button>
          </Col>
        </Row>
      </template>
    </Row>
  </div>
</template>
<script>
import sampleInfo from "../commpent/sampleinfo.vue";
export default {
  components: {
    sampleInfo
  },
  props: {
    action: {
      type: String,
      dafault: ""
    },
    showImport: {
      type: Boolean,
      default: false
    },
    haveAction: {
      type: Boolean,
      default: true
    },
    canSelect: {
      type: Boolean,
      default: false
    },
    havePage: {
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
      show: true,
      isLoading: false,
      items: [],
      dateRange: [],
      pageobj: {
        pageId: 1,
        total: 0,
        pageSize: 10,
        key: "", //关建词
        dateValue: [], //日期区间
        State: 0, //状态,
        UserId: []
      },
      options1: {
        shortcuts: [
          {
            text: '1周',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: '1个月',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: '3个月',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          },
          {
            text: '1年',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              return [start, end];
            }
          },
          {
            text: '全部',
            value() {
              const end = new Date();
              const start = new Date("1900-1-1");
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 365*20);
              return [start, end];
            }
          }

        ]
      },
      columns: [{
        title: "样衣ID",
        key: "StyleId",
      },
      {
        title: "样衣款号",
        key: "StyleNo",
      },
      {
        title: "种类",
        key: "Kinds",
      },
      {
        title: "颜色",
        key: "Color",
      },
      {
        title: "针型",
        key: "Gauge",
      },
      {
        title: "尺码",
        key: "Size",
      },
      {
        title: "成份",
        key: "MaterialStr",
        width:200
      },
      {
        title: "克重",
        key: "Weight",
      },
      {
        title: "入库人",
        key: "User",
      },
      {
        title: "部门",
        key: "DeptName",
      },
      {
        title: "入库日期",
        key: "CreateDate",
      },
      {
        title: "织机时间",
        key: "LinkTime",
      },

      {
        title: "套口时间",
        key: "WeaveTime",
      },
      {
        title: "工艺员",
        key: "TechnologyPeople",
      },

      {
        title: "程序员",
        key: "ProgamPeople",
      },

      ]
    };
  },
  methods: {
    Seach(obj) {
      console.log("seachobj:", obj);
      this.pageobj.key = obj.key;
      this.pageobj.beginDate = obj.beginDate;
      this.pageobj.endDate = obj.endDate;
      this.pageobj.State = obj.State;
      this.pageobj.UserId = obj.UserId;
      this.pageobj.pageId = 1;
      this.getData();
    },
    exportData() {
      this.$refs.table.exportCsv({ filename: "样衣", separator: " , ",columns: this.columns, data: this.items });
    },
    async exportAllData() {
      this.$bus.BeginLoading();
      let seachObj = JSON.parse(JSON.stringify(this.pageobj));
      seachObj.pageId = 1;
      seachObj.pageSize = 65535;
      let re = await this.$util.post(this.action, seachObj);
      let list = re.data.items;
      console.log("listaaa", re);
      list.forEach(p => {
        p.checked = false;
        p.MaterialStr = "";
        p.Material.forEach(m => {
          p.MaterialStr += m.materials +(m.enName? "(" + m.enName + ")":"") + " " + (m.counts?m.counts:"") + " " + m.percent + "%" + " | "
        });
      });
      this.$refs.table.exportCsv({ filename: "样衣", separator: " , ", columns: this.columns, data: list });
      this.$bus.EndLoading();
    },
    dateChange() {
       this.pageobj.pageId = 1;
      this.pageobj.beginDate = this.$util.getGmtDate(this.dateRange[0]);
      this.pageobj.endDate = this.$util.getGmtDate(this.dateRange[1]);
      this.getData();
    },
    reload() {
      this.show = false;
      this.$nextTick(() => (this.show = true));
    },
    pageChange(pageid) {
      this.pageobj.pageId = pageid;
      this.getData();
    },
    pageSizeChange(pageSize) {
      this.pageobj.pageSize = pageSize;
      this.getData();
    },
    getData() {
      if (!this.isLoading) {
        this.$bus.BeginLoading();
        this.isLoading = true;
        this.$util.post(this.action, this.pageobj).then(result => {
          if (result.data.items) {
            this.items = result.data.items;
            this.items.forEach(p => {
              p.checked = false;
              p.MaterialStr = "";
              p.Material.forEach(m => {
                p.MaterialStr += m.materials +(m.enName? "(" + m.enName + ")":"") + " " + (m.counts?m.counts:"") + " " + m.percent + "%" + " | "
              });

            });
          }
          this.pageobj.total = result.data.total;
          window.scrollTo(0, 0);
          this.isLoading = false;
          this.$bus.EndLoading();
        });
      }
    },

    handleAddToPrint(val) {
      console.log('添加待打印', val);
    },
    handleInStorage(val) {
      let actionStr = "/InOutStorage/PutInStorage";
      let _this = this;
      this.$Modal.confirm({
        title: "申请入库",
        content: "点确认将款号：“" + val.StyleNo + "” 的样衣申请入库。",
        okText: "确认",
        cancelText: "退出",
        onOk() {
          this.$util.post(actionStr, { styleId: val.StyleId }).then(result => {
            _this.getData();
            this.$Notice.success({
              title: result.data.title,
              desc: result.data.content,
              duration: 4
            });
          });
        }
      });
    },
    ///管理员确认入库
    handleAcceptInStorage(val) {
      let actionStr = "/InOutStorage/AcceptInStorage";
      let _this = this;
      this.$Modal.confirm({
        title: "确认入库",
        content:
          "已确认收到款号：“" + val.StyleNo + "” 的样衣及资料，并同意入库。",
        okText: "确认",
        cancelText: "退出",
        onOk() {
          this.$util.post(actionStr, { styleId: val.StyleId }).then(result => {
            console.log("this", this);
            _this.$emit("needUpData", "ok");
            this.$Notice.success({
              title: "样衣已入库",
              desc:
                "款号:“" + val.StyleNo + "”的样衣已入库，请及时打印查询二维吗",
              duration: 4
            });
            _this.getData();
          });
        }
      });
    },
    //编辑
    handleEdit(val) {
      this.$router.push("/sample/editSample/" + val.StyleId);
    },
    //删除
    handleDelete(val) {
      let actionStr = "/InOutStorage/DeleteSample";
      let _this = this;
      this.$Modal.confirm({
        title: "确认删除",
        content: "是否删除款号：“" + val.StyleNo + "” 的样衣资料。",
        okText: "确认",
        cancelText: "退出",
        onOk() {
          this.$util.post(actionStr, { styleId: val.StyleId }).then(result => {
            console.log("this", this);
            _this.$emit("needUpData", "ok");
            this.$Notice.success({
              title: "样衣已删除",
              desc: "款号:“" + val.StyleNo + "”的样衣已删除",
              duration: 4
            });
          });
        }
      });
    },

    //打印二维码
    handlePrint(val) {
      window.open("/sample/printcode/" + val.StyleId);
    },
    handleLend(val) { },
    handleAcceptLend(val) { },
    handleReturn(val) { },
    handleAcceptReturn(val) { }
  },
  mounted: function () {
    //初始化数据
    this.getData();
  }
};
</script>