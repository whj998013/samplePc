<style scoped>
</style>
<template>
  <div>
    <Row>
      <Table border :columns="columns" :data="tableData">
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
      </Table>
    </Row>
    <br>
    <Row>
      <Page show-total show-sizer placement='top' :current="page.pageId" :total='page.total' :page-size='page.pageSize' @on-change='pageChange' @on-page-size-change='pageSizeChange' />
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
          minWidth: 120
        },
        {
          title: "库存数(KG)",
          key: "InStorNum",
          slot: "inStorNum",
          fixed: "left",
          sortable: true,
          minWidth: 120
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
          minWidth: 100
        },
        {
          title: "供应商",
          key: "SupName",
          minWidth: 100
        }, {
          title: "入库时间",
          key: "CreateTime",
          sortable: true,
          minWidth: 180,
          slot: "date",
        },

      ]
    };
  },
  methods: {
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

    async GetData(dept) {
      console.log(dept);
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