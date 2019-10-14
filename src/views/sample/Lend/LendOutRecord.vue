<style scoped>
img {
  width: auto;
  height: auto;
  max-width: 100%;
}
.maxHeight {
  max-height: 60px;
}
</style>
<template>
  <div>
    <Row type="flex" justify="space-between" class="menuid">
      <Col span='18'> 筛选：
      <Select v-model="seachObj.UserId" multiple style="width:260px" transfer>
        <Option v-for="item in userList" :value="item.DdId" :key="item.value">{{ item.Name }}</Option>
      </Select>
      <Button @click="getData">确定</Button>
      </Col>
      <Col span='2'>
      <Button @click="getData">刷新</Button>
      </Col>
    </Row>
    <br>
    <Row>
      <Table border ref="table" :columns="columnsLend" :data="dataLend" @on-selection-change="tableSelect">

        <template slot-scope="{ row,index }" slot="pic">
          <img class="maxHeight" :src="'/file/src/sample/pic/minpic/'+row.baseinfo.Pic" @click="show(index)"></img>
        </template>
        <template slot-scope="{ row }" slot="lendDayNum">
          {{ row.daySpan}}
        </template>
      </Table>
    </Row>
    <Row>
      <template>
        <br>
        <Row type="flex" :gutter="16">
          <Col>
          <Page show-total show-sizer placement='top' :current=1 :total='seachObj.total' :page-size='seachObj.pageSize' @on-change='pageChange' @on-page-size-change='pageSizeChange' />
          </Col>
          <Col> 时间：<DatePicker @on-change="dateChange" :options="options1" v-model="dateRange" transfer type="daterange" placement="bottom-end" placeholder="选择显示日期范围" style="width: 200px"></DatePicker>
          </Col>
          <Col> <Button @click="exportData">导出本页数据</Button>
          <Button @click="exportAllData">导出全部数据</Button>
          </Col>
        </Row>

      </template>
    </Row>
    <Modal v-model="modal" cancel-text="" width="430px" title="详情页">
      <sampleInfo v-if="modal" width="400px" :haveAction='false' v-model="currentSmple"></sampleInfo>
    </Modal>
  </div>
</template>
<script>
import sampleInfo from "../../commpent/sampleinfo.vue";
export default {
  components: {
    sampleInfo
  },
  data: function () {
    return {
      action: "/LendOut/GetAllLendOutReturnList",
      dateRange: [],
      modal: false,
      currentSmple: {},
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
      columnsLend: [

        {
          title: "样衣图",
          width: 80,
          slot: "pic",

        },
        {
          title: "样衣ID",
          width: 120,
          key: "StyleId",
          align: "center"
        },
        {
          title: "样衣款号",
          key: "StyleNo"
        },
        {
          title: "借用人",
          width: 80,
          key: "UserName"
        },
        {
          title: "借用部门",
          key: "UserDept"
        },

        {
          title: "借出时间",
          key: "bdate"
        },
        {
          title: "还回时间",
          key: "edate"
        },
        {
          title: "借用天数",
          key: "daySpan",
          slot: "lendDayNum"
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      dataLend: [],
      selectItems: [],
      seachObj: {
        pageId: 1,
        total: 0,
        pageSize: 10,
        keyWord: "",
        dateValue: ["", ""],
        State: "",
        UserId: []
      },
      userList: [
        // {
        //   DdId: "AAA",
        //   Name: "BBB"
        // }
      ]
    };
  },
  methods: {
    ///还回选中样衣
    exportData() {
      this.$refs.table.exportCsv({ filename: "借用记录", separator: " , " });
    },
    async exportAllData() {
      let seachObj = JSON.parse(JSON.stringify(this.seachObj));
      seachObj.pageId = 1;
      seachObj.pageSize = 65535;
      let re = await this.$util.post(this.action, seachObj);

      let lendList = re.data.items;
      lendList.map(item => {
        item.UserDept = item.UserDept.replace(",", "|");
        item.bdate = new Date(item.CreateDate).toLocaleString();
        item.edate = new Date(item.ReturnDate).toLocaleString();
        item.daySpan = this.DateMinus(item.CreateDate, item.ReturnDate);
      });
      this.$refs.table.exportCsv({ filename: "借用记录2", separator: " , ", columns: this.columnsLend, data: lendList });
      console.log("导出完成");
    },

    dateChange() {
      this.seachObj.beginDate = this.$util.getGmtDate(this.dateRange[0]);
      this.seachObj.endDate = this.$util.getGmtDate(this.dateRange[1]);
      this.getData();
    },

    ///表格选中项变更
    tableSelect(items) {
      this.selectItems = items;
    },
    pageChange(pageid) {
      this.seachObj.pageId = pageid;
      this.getData();
    },
    pageSizeChange(pageSize) {
      this.seachObj.pageSize = pageSize;
      this.getData();
    },
    show(val) {
      this.currentSmple = this.dataLend[val].baseinfo;
      this.modal = true;
    },
    DateMinus(date1, date2) {
      var sdate = new Date(date1);
      var now = new Date(date2);
      var days = now.getTime() - sdate.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      return day == 0 ? 1 : day;
    },

    getData() {
      this.$util
        .post(this.action, this.seachObj)
        .then(result => {
          console.log("return", result)
          this.dataLend = result.data.items;
          this.dataLend.map(item => {
            item.UserDept = item.UserDept.replace(",", "|");
            item.bdate = new Date(item.CreateDate).toLocaleString();
            item.edate = new Date(item.ReturnDate).toLocaleString();
            item.daySpan = this.DateMinus(item.CreateDate, item.ReturnDate);
          });
          this.seachObj.pageSize = result.data.pageSize;
          this.seachObj.pageId = result.data.pageId;
          this.seachObj.total = result.data.total;
        });
    }
  },
  mounted: function () {
    //取得有借用申请的用户清单

    this.$util.get("/LendOut/GetLendUserList/4").then(result => {

      console.log("user", result);
      this.userList = result.data;
      this.getData();
    });
  }
};
</script>