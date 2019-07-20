<style scoped>
</style>
<template>
  <div>
    <Row>
      <Table border ref='table' :columns="columns" :data="tableData" max-height="550">
        <template slot-scope="{ row }" slot="color">
          <span :style="'background-color:'+row.RGB">&emsp;&emsp;</span>{{ row.Color }}
        </template>
        <template slot-scope="{ row }" slot="num">
          {{ row.Num.toFixed(2) }} kg
        </template>
        <template slot-scope="{ row }" slot="date">
          {{ $util.getGmtDate(row.CreateTime)}}
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
  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  props: {
    action: String,
    dept: Array,
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
      tableData: [],
      columns: [
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
          title: "出库数量",
          key: "Num",
          slot: "num",
          fixed: "left",
          sortable: true,
          minWidth: 110
        },
        {
          title: "支数",
          key: "Count",
          minWidth: 100
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
          key: "OrderNum",
          minWidth: 100

        },
        {
          title: "单价",
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
          title: "用纱人",
          key: "OutUName",
          minWidth: 100
        },
        {
          title: "用纱部门",
          key: "OutDName",
          minWidth: 100
        }, {
          title: "用纱时间",
          key: "CreateTime",
          sortable: true,
          minWidth: 180,
          slot: "date",

        },
        {
          title: "入库人",
          key: "InUName",
          sortable: true,
          minWidth: 100
        },
        {
          title: "入库部门",
          key: "InDName",
          sortable: true,
          minWidth: 110
        },
      ]
    };
  },
  methods: {
    exportData() {
      this.$refs.table.exportCsv({ filename: "出库信息", separator: " , ", original: false });
    },
    async exportAllData() {

      let page = JSON.parse(JSON.stringify(this.page));
      page.pageId = 1;
      page.pageSize = 65535;
      let re = await this.$util.post(this.action, page);
      await this.GetData();
      this.$refs.table.exportCsv({ filename: "出库信息", separator: " , ", columns: this.columns, data: re.data.Result });
      console.log("导出完成");

    },
    reload(v) {
      this.page.pageId = 1;
      this.GetData(v);
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
      this.$bus.BeginLoading();
      if (dept != undefined) this.page.deptIdList = dept;
      else this.page.deptIdList = this.dept;

      let re = await this.$util.post(this.action, this.page);
      this.page.pageId = re.data.SeachObj.PageId;
      this.page.pageSize = re.data.SeachObj.PageSize;
      this.page.total = re.data.SeachObj.Total;
      if (re.data.SeachObj.Total >= 0) this.tableData = re.data.Result;
      this.$bus.EndLoading();
    }
  },
  mounted: function () {
    this.GetData();
  }
};
</script>