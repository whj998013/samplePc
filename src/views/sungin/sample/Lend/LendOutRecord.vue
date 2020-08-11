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
    <Form :label-width="80">
      <Row type="flex" class="menuid">
        <Col span='7'>
        <FormItem label="借用人：">
          <Select v-model="seachObj.UserId" multiple transfer :max-tag-count='2'>
            <Option v-for="item in userList" :value="item.DdId" :key="item.value">{{ item.Name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span='7'>
        <FormItem label="入库人：" span='7'>
          <Select v-model="seachObj.InUserId" multiple transfer :max-tag-count='2'>
            <Option v-for="item in inUserList" :value="item.DdId" :key="item.value">{{ item.Name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span='7'>
        <FormItem label=" 时间：" span='7'>
          <DatePicker @on-change="dateChange" :options="options1" v-model="dateRange" transfer type="daterange" placement="bottom-end" placeholder="选择显示日期范围" style="width: 200px"></DatePicker>
        </FormItem>
        </Col>
        <Col span='2' offset='1'>
        <Button @click="reGetData" type="primary">刷新</Button>
        </Col>
      </Row>
      <Row>
        <Table border ref="table" :columns="columnsLend" :data="dataLend" @on-selection-change="tableSelect">

          <template slot-scope="{ row,index }" slot="pic">
            <img class="maxHeight" :src="'/file/src/sample/pic/minpic/'+row.StylePic" @click="show(index)"></img>
          </template>
          <template slot-scope="{ row }" slot="lendDayNum">
            {{ row.daySpan}}
          </template>
        </Table>
      </Row>
      <Row>
    
          <br>
          <Row type="flex" :gutter="16">
            <Col>
            <Page show-total show-sizer placement='top' :current=1 :total='seachObj.total' :page-size='seachObj.pageSize' @on-change='pageChange' @on-page-size-change='pageSizeChange' />
            </Col>
            <Col>
            <Button @click="exportData">导出本页数据</Button>
            <Button @click="exportAllData">导出全部数据</Button>
            </Col>
          </Row>
        
      </Row>
    </Form>
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
      action: this.$sra.sample_GetAllLendOutReturnList,
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
          key: "StylePic"

        },
        {
          title: "样衣ID",
          width: 120,
          key: "StyleId",
          align: "center"
        },
        {
          title: "样衣款号",
          key: "StyleNo",
          width: 125,
        },
         {
          title: "种类",
          key: "Kinds",
        },
        {
          title: "入库人",
          width: 80,
          key: "InUserName"
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
          title: "用途",
          key: "LendPurpose"
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
          slot: "lendDayNum",
          width: 90,
        },
        {
          title: "操作",
          key: "action",
          width: 80,
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
        State: "",
        UserId: [],
        InUserId: []
      },
      userList: [
        // {
        //   DdId: "AAA",
        //   Name: "BBB"
        // }
      ],
      inUserList: []
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
      let lendList = re.data.list;
      lendList.map(item => {
        item.UserDept = item.UserDept.replace(",", "|");
        item.bdate = new Date(item.LendOutDate).toLocaleString();
        item.edate = new Date(item.ReturnDate).toLocaleString();
        item.daySpan = this.DateMinus(item.LendOutDate, item.ReturnDate);
      });
      this.$refs.table.exportCsv({ filename: "全部借用记录", separator: " , ", columns: this.columnsLend, data: lendList });
      console.log("导出完成");
    },

    dateChange() {
      this.seachObj.beginDate = this.$util.getGmtDate(this.dateRange[0]);
      this.seachObj.endDate = this.$util.getGmtDate(this.dateRange[1]);
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
    async show(val) {
      let id = this.dataLend[val].StyleId;
      let re = await this.$util.get(this.$sra.sample_GetSampleInfo + id);
      this.currentSmple = re.data;
      this.modal = true;
    },
    DateMinus(date1, date2) {
      var sdate = new Date(date1);
      var now = new Date(date2);
      var days = now.getTime() - sdate.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      return day == 0 ? 1 : day;
    },
    async getData() {
      this.$bus.BeginLoading();
      let re = await this.$util.post(this.action, this.seachObj);
      this.seachObj.total = re.data.count;
      this.dataLend = re.data.list;
 
      this.dataLend.map(item => {
        item.UserDept = item.UserDept.replace(",", "|");
        item.bdate = new Date(item.LendOutDate).toLocaleString();
        item.edate = new Date(item.ReturnDate).toLocaleString();
        item.daySpan = this.DateMinus(item.LendOutDate, item.ReturnDate);
      });
      this.$bus.EndLoading();
    },

    reGetData() {
      this.seachObj.pageId = 1;
      this.getData();
    }
  },
  mounted: function () {
    //取得有借用申请的用户清单

    this.$util.get(this.$sra.sample_GetLendUserList+'4').then(result => {
      this.userList = result.data;
    });

    this.$util.get(this.$sra.sample_GetInUserList).then(result => {
      this.inUserList = result.data;
    
    });
    //取得有入库的用户清单
    this.getData();

  }
};
</script>