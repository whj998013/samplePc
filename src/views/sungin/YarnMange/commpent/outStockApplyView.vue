<style scoped>
</style>
<template>
  <div>
    <Row>
      <Table ref="table" border :columns="columns" :data="tableData" max-height="550" @on-filter-change="filterChange">
        <template slot-scope="{ row }" slot="color">
          <span :style="'background-color:'+row.RGB">&emsp;&emsp;</span>{{ row.Color }}
        </template>
        <template slot-scope="{ row }" slot="num">
          {{ row.Num.toFixed(2) }}
        </template>
        <template slot-scope="{ row }" slot="minNum">
          {{ row.MinNum.toFixed(2) }}
        </template>
        <template slot-scope="{ row }" slot="inStorNum">
          <a class="link" @click="showOutStock(row)" v-if="row.Num!=row.InStorNum">
            <Badge status="processing"></Badge>{{ row.InStorNum==null?0:row.InStorNum.toFixed(2) }}
          </a>
          <p v-if="row.Num==row.InStorNum">
            {{ row.InStorNum==null?0:row.InStorNum.toFixed(2) }}
          </p>
        </template>
        <template slot-scope="{ row }" slot="date">
          {{ $util.getGmtDate(row.ApplyDate)}}
        </template>
        <template slot-scope="{ row }" slot="stats">

          <div v-html="getState(row.Stats)"></div>
        </template>
        <template slot-scope="{ row }" slot="action">
          <ButtonGroup>
            <Button v-if="HaveAlowButton"  icon="md-checkmark" @click="alowStock(row)" :disabled="!(row.Stats==2)" type="success" size="small">
            </Button>
            <Button icon="md-close" @click="deleteStock(row)" :disabled="!(row.Stats<2||row.Stats>=10)" type="error" size="small">
            </Button>
          </ButtonGroup>

        </template>
      </Table>
    </Row>
    <br>
    <Row type="flex" :gutter="16">
      <Col>
      <Page show-total show-sizer placement='top' :page-size-opts="pageSizeOpts" :current="page.pageId" :total='page.total' :page-size='page.pageSize' @on-change='pageChange' @on-page-size-change='pageSizeChange' />
      </Col>
      <Col> 时间：<DatePicker @on-change="dataChange" :options="options1" v-model="dateRange" transfer type="daterange" placement="bottom-end" placeholder="选择显示日期范围" style="width: 200px"></DatePicker>
      </Col>
      <Col> <Button @click="exportData">导出本页数据</Button>
      <Button @click="exportAllData">导出全部数据</Button>
      </Col>
    </Row>
    <YarnOutModel v-model="tableData" ref="yom"></YarnOutModel>
  </div>
</template>
<script>
import YarnOutModel from "./YarnOutModel.vue";

export default {

  components: {
    YarnOutModel
  },
  props: {
    action: String,
    dept: Array,
    GetAllDept: Boolean,
    HaveAlowButton:Boolean,
  },
  data: function () {
    return {
      dateRange: [],
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
          }

        ]
      },
      pageSizeOpts: [10, 20, 30, 40],
      page: {
        pageId: 1,
        pageSize: 10,
        total: 0,

      },
      state: 0,
      tableData: [],
      columns: [
        {
          title: "申请人",
          key: "ApplyEmpName",
          sortable: true,
          minWidth: 130
        },
        {
          title: "纱名",
          key: "ProductName",
          sortable: true,
          fixed: "left",
          minWidth: 130
        },
        {
          title: "颜色",
          key: "Color",
          sortable: true,
          slot: "color",
          minWidth: 100
        },
        {
          title: "申请数(KG)",
          key: "MinNum",
          slot: "minNum",
          fixed: "left",
          sortable: true,
          minWidth: 130
        },
        {
          title: "出库数(KG)",
          key: "Num",
          slot: "num",
          fixed: "left",
          sortable: true,
          minWidth: 130
        },
        {
          title: "状态",
          key: "Stats",
          slot: "stats",
          fixed: "left",
          minWidth: 120,
          sortable: true,
          filters: [
            {
              label: '草拟',
              value: 1
            },
            {
              label: '审批中',
              value: 2
            },
            {
              label: '通过',
              value: 3
            },
            {
              label: '已出库',
              value: 4
            },
            {
              label: '拒绝|撤回',
              value: 10
            }
            ,
            {
              label: '出库失败',
              value: 11
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            return true;
          },

        },
        {
          title: "支数",
          key: "Count",
          minWidth: 80
        }, {
          title: "成份",
          key: "Size",
          minWidth: 200
        },

        {
          title: "缸号",
          key: "BatchNum",
          minWidth: 150

        },
        {
          title: "出库单号",
          key: "NO",
          minWidth: 110

        },
        {
          title: "入库价",
          key: "InPrice",
          minWidth: 100

        },
        {
          title: "出库价",
          key: "OutPrice",
          minWidth: 100

        },
        {
          title: "总价",
          key: "Amount",
          minWidth: 100

        },
        {
          title: "查询码",
          key: "BarCode",
          minWidth: 80

        },
        {
          title: "入库人",
          key: "YarnOwerEmpName",
          sortable: true,
          minWidth: 100
        },
        {
          title: "入库部门",
          key: "YarnOwerDeptName",
          sortable: true,
          minWidth: 120
        },
        {
          title: "申请部门",
          key: "ApplyDeptName",
          sortable: true,
          minWidth: 120
        },
        {
          title: "申请时间",
          key: "ApplyDate",
          sortable: true,
          minWidth: 160,
          slot: "date",
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 84,
          fixed: "right",
        }


      ]
    };
  },
  methods: {
    filterChange(v) {
      if (v._filterChecked[0]) this.state = v._filterChecked[0];
      else this.state = 0;
      this.GetData();
      console.log("getAllDept:", this.GetAllDept);

    },
    exportData() {
      this.$refs.table.exportCsv({ filename: "用纱信息", separator: " , " });
    },
    async exportAllData() {
      let page = JSON.parse(JSON.stringify(this.page));
      page.pageId = 1;
      page.pageSize = 65535;
      let re = await this.$util.post(this.action, page);
      this.$refs.table.exportCsv({ filename: "用纱信息", separator: " , ", columns: this.columns, data: re.data.Result });
      console.log("导出完成");
    },
    alowStock(row) {
      console.log("alow", row);
       this.$Modal.confirm({
        title: '确定吗',
        content: '<p>确定强制通过单号为"' + row.NO + '"的申请单吗？</p>',
        onOk: async () => {
          let re = await this.$util.get("apiaction/YarnOutStock/AlowYarnOutStock/" + row.NO);
          this.GetData();
          this.$Message.info('已通过');
        },
        onCancel: () => {
        }
      });
    },
    deleteStock(row) {
      console.log(row);
      this.$Modal.confirm({
        title: '确定吗',
        content: '<p>确定撤回并删除单号为"' + row.NO + '"的申请单吗？</p>',
        onOk: async () => {
          let re = await this.$util.get("apiaction/YarnOutStock/DeleteYarnOutStock/" + row.NO);
          this.GetData();
          this.$Message.info('删除成功');
        },
        onCancel: () => {
        }
      });
    },
    getState(v) {
      if (v == 12) return "<p style='color:#515a6e'>仓库退回</p>";
      else if (v == 1) return "<p style='color:#19be6b'>草拟</p>";
      else if (v == 2) return "<p style='color:#ff9900'>审批中</p>";
      else if (v == 3) return "<p style='color:#2db7f5'>通过</p>";
      else if (v == 4) return "<p style='color:#2d8cf0'>已出库</p>";
      else if (v == 10) return "<p style='color:#ed4014'>拒绝|撤回</p>";
      else if (v == 11) return "<p style='color:#ed4014'>出库失败</p>";
      else return "";
    },

    outStock(row) {
      if (row.InStorNum > 0) {
        let r = row;
        r.UName = r.UserName;
        r.DName = r.DeptName;
        r.Num = r.InStorNum;
        this.$bus.$emit('OutStock', row);
      } else {
        this.$Message.info('库存为0，无法出库');
      }
    },


    reload(v) {
      this.page.pageId = 1;
      this.GetData(v);
    },
    showOutStock(row) {
      this.$refs.yom.Show(row.BatchNum);
    },
    pageChange(pageid) {
      this.page.pageId = pageid;
      this.GetData();
    },
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.GetData();
    },
    dataChange() {
      this.page.beginDate = this.$util.getGmtDate(this.dateRange[0]);
      this.page.endDate = this.$util.getGmtDate(this.dateRange[1]);
      this.GetData();

    },
    async GetData(dept) {
      console.log("取数据", this.page);
      this.$bus.BeginLoading();
      if (dept != undefined) this.page.deptIdList = dept;
      else this.page.deptIdList = this.dept;
      this.page.state = this.state;
      this.page.GetAllDept = this.GetAllDept;
      let re = await this.$util.post(this.action, this.page);
      console.log(re);
      this.page.pageId = re.data.SeachObj.PageId;
      this.page.pageSize = re.data.SeachObj.PageSize;
      this.page.total = re.data.SeachObj.Total;
      if (re.data.SeachObj.Total >= 0) {
        this.tableData = re.data.Result;
      }

      this.$bus.EndLoading();

    }
  },
  mounted: function () {
    this.GetData();
  }
};
</script>