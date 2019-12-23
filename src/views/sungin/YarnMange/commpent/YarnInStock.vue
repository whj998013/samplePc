<style scoped>
</style>
<template>
  <div>
    <Row>
      <Table ref="table" border :columns="columns" :data="tableData" max-height="550">
        <template slot-scope="{ row }" slot="color">
          <span :style="'background-color:'+row.RGB">&emsp;&emsp;</span>{{ row.Color }}
        </template>
        <template slot-scope="{ row }" slot="num">
          {{ row.Num.toFixed(2) }}
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
          {{ $util.getGmtDate(row.CreateTime)}}
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button @click="outStock(row)" type="primary" size="small">用纱申请</Button>
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
    <YarnOutModel ref="yom"></YarnOutModel>
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
          title: "入库数(KG)",
          key: "Num",
          slot: "num",
          fixed: "left",
          sortable: true,
          minWidth: 130
        },
        {
          title: "库存数(KG)",
          key: "InStorNum",
          slot: "inStorNum",
          fixed: "left",
          sortable: true,
          minWidth: 130
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
          title: "入库单号",
          key: "OrderNum",
          minWidth: 100

        },
        {
          title: "入库价",
          key: "InPrice",
          minWidth: 100

        },
        {
          title: "总价",
          key: "Amount",
          minWidth: 100

        },
        {
          title: "库位",
          key: "LocalName",
          minWidth: 80

        }, {
          title: "查询码",
          key: "BarCode",
          minWidth: 80

        },
        {
          title: "入库人",
          key: "UserName",
          sortable: true,
          minWidth: 100
        },
        {
          title: "入库部门",
          key: "DeptName",
          sortable: true,
          minWidth: 115
        },
        {
          title: "供应商",
          key: "SupName",
          minWidth: 100
        }, {
          title: "入库时间",
          key: "CreateTime",
          sortable: true,
          minWidth: 160,
          slot: "date",
        },

        {
          title: "操作",
          slot: "action",
          align: "center",
          minWidth: 100,
          fixed: 'right'
        }

      ]
    };
  },
  methods: {
    exportData() {
      this.$refs.table.exportCsv({ filename: "入库信息", separator: " , " });
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
    async exportAllData() {
      let page = JSON.parse(JSON.stringify(this.page));
      page.pageId = 1;
      page.pageSize = 65535;
      let re = await this.$util.post(this.action, page);
      //await this.GetData();
      this.$refs.table.exportCsv({ filename: "入库信息", separator: " , ", columns: this.columns, data: re.data.Result });
      console.log("导出完成");
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
      let re = await this.$util.post(this.action, this.page);
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