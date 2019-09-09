<style scoped>
</style>
<template>
  <div>
    <Table border :columns="columns" max-height="550" :data="value" border>
      <template slot-scope="{ row }" slot="color">
        <span :style="'background-color:'+row.RGB">&emsp;&emsp;</span>{{ row.Color }}
      </template>
      <template slot-scope="{ row }" slot="num">
        {{ row.Num.toFixed(2) }} kg
      </template>
      <template slot-scope="{ row }" slot="date">
        {{ $util.getGmtDate(row.CreateTime)}}
      </template>
         <template slot-scope="{ row, index }" slot="action">
          <Button @click="outStock(row)"  type="primary" size="small">用纱申请</Button>
        </template>
    </Table>
    <br>
    <Row v-if="showPage">
      <Page show-total show-sizer placement='top' :current="page.pageId" :total='page.total' :page-size='page.pageSize' @on-change='pageChange' @on-page-size-change='pageSizeChange' />
    </Row>
  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  props: {
    value: Array,
    page: Object,
    showPage: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    columns: function () {
      return this.showPage ? this.nosc : this.havesc;
    }
  },
  data: function () {
    return {
      havesc: [],
      nosc: [
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
          title: "数量",
          key: "Num",
          slot: "num",
          fixed: "left",
          sortable: true,
          minWidth: 90
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
          title: "库位",
          key: "LocalName",
          minWidth: 80

        }, {
          title: "查询码",
          key: "BarCode",
          minWidth: 80

        }, {
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
          title: "入库人",
          key: "UName",
          sortable: true,
          minWidth: 100
        },
        {
          title: "入库部门",
          key: "DName",
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
    outStock(row){
      console.log('OutStock',row);
      this.$bus.$emit('OutStock',row);
    },
    pageChange(pageid) {
      this.page.pageId = pageid;
      this.$emit("pageChange", this.page);
    },
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.$emit("pageChange", this.page);
    },

  },
  mounted: function () {
    this.havesc = this.nosc.slice();
    this.havesc.splice(2, 0, {
      title: "色差",
      key: "Sc",
      sortable: true,
      width: 80
    });

  }
};
</script>