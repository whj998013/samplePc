<style scoped>
</style>
<template>
  <div>
    <Modal v-model="modalShow" title="关联样纱出库单" width="70%">
      <Row type="flex" justify="space-between">
        <Col span="16">
        <Input style="width:60%" search placeholder="查找" v-model="page.key" @on-search="getData" /> <Button @click="getData">刷新</Button>
        </Col>
        <Col>
        <Page placement='top' :current="page.pageId" :total='page.total' :page-size='page.pageSize' @on-change='pageChange' @on-page-size-change='pageSizeChange' simple />
        </Col>
      </Row>
      <br>

      <Table border :columns="columns" :data="outStockList" maxHeight="300px">
        <template slot-scope="{ row }" slot="color">
          <span :style="'background-color:'+row.RGB">&emsp;&emsp;</span>{{ row.Color }}
        </template>
        <template slot-scope="{ row }" slot="num">
          {{ row.Num.toFixed(2) }}
        </template>
        <template slot-scope="{ row }" slot="minNum">
          {{ row.MinNum.toFixed(2) }}
        </template>
        <template slot-scope="{ row }" slot="date">
          {{ $util.getGmtDate(row.ApplyDate)}}
        </template>
        <template slot-scope="{ row }" slot="stats">
          <div v-html="$util.getState(row.Stats)"></div>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button size="small" shape="circle" @click="addYarn(row)" icon="ios-add" type="info"></Button>
        </template>
      </Table>
      <Divider>已选择出库单</Divider>
      <Table border :columns="columns" :data="value">
        <template slot-scope="{ row }" slot="color">
          <span :style="'background-color:'+row.RGB">&emsp;&emsp;</span>{{ row.Color }}
        </template>
        <template slot-scope="{ row }" slot="num">
          {{ row.Num.toFixed(2) }}
        </template>
        <template slot-scope="{ row }" slot="minNum">
          {{ row.MinNum.toFixed(2) }}
        </template>
        <template slot-scope="{ row }" slot="date">
          {{ $util.getGmtDate(row.ApplyDate)}}
        </template>
        <template slot-scope="{ row }" slot="stats">
          <div v-html="$util.getState(row.Stats)"></div>
        </template>
        <template slot-scope="{ row,index }" slot="action">
          <Button size="small" shape="circle" @click="removeYarn(row,index)" icon="ios-close" type="warning"></Button>
        </template>
      </Table>
      <div slot="footer">
        <Button size="large" @click="modalShow=false">取消</Button>
        <Button type="primary" size="large" @click="asyncOK">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
//import bus from "../bus.js";
//import newProof from "./myProofViews/newProof.vue";
export default {
  inject: ["reload"],
  components: {

  },
  props: { value: Array },
  data: function () {
    return {
      modalShow: false,
      page: {
        pageId: 1,
        pageSize: 10,
        total: 0,
        key: '',
      },
      columns: [
        {
          title: "单号",
          key: "NO",
          minWidth: 120
        },
        {
          title: "纱名",
          key: "ProductName",
          sortable: true,

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

          sortable: true,
          minWidth: 120
        },
        {
          title: "出库数(KG)",
          key: "Num",
          slot: "num",

          sortable: true,
          minWidth: 120
        },
        {
          title: "状态",
          key: "Stats",
          slot: "stats",

          sortable: true,
          minWidth: 100
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
          title: "查询码",
          key: "BarCode",
          minWidth: 85

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
          align: "center",
          minWidth: 70,
          fixed: 'right'
        }

      ],
      outStockList: [],
      selectYarn: []
    };
  },
  methods: {
    addYarn(row) {
      let ishave = false;
      this.value.forEach(y => {
        if (y.NO == row.NO)
          ishave = true;
      });
      if (!ishave) this.value.push(row);
    },
    removeYarn(row, index) {
      this.value.splice(index, 1);
    },
    pageChange(pageid) {
      this.page.pageId = pageid;
      this.getData();
    },
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getData();
    },
    show() {
      console.log("showModel");
      this.getData();
      this.modalShow = true;
    
    },
    asyncOK() {
      // if (this.value.length <= 0) {
      //   this.$Notice.warning({
      //     title: '未关联任何出库单',
      //     desc: '请选择要关联的出库单，或点取消关闭。'
      //   });
      // } else {}
        this.$emit("input", this.value);
        this.$emit("selected", this.value);
        this.modalShow = false;
      
    },
    async getData() {
      let re = await this.$util.post("apiaction/YarnOutStock/GetMyYarnOutApplyList", this.page);
      console.log(re);
      this.page.pageId = re.data.SeachObj.PageId;
      this.page.pageSize = re.data.SeachObj.PageSize;
      this.page.total = re.data.SeachObj.Total;
      this.outStockList = re.data.Result;
    }
  },
  mounted: function () {
    
  }
};
</script>