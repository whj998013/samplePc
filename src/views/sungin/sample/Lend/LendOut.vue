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
<style>
.ivu-table .demo-table-error-row td {
  color: #ed4014;
  /* color: #fff; */
}
</style>
<template>
  <div>
    <Form :label-width="80">
      <Row type="flex" justify="space-between" class="menuid">
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
        <Col span='7' style="float:right">
        <Button @click="reGetData">刷新</Button>
        <Button type="primary" @click="selectReturnLend">归还选中样衣</Button>
        </Col>
      </Row>
      <Row>
        <Table :row-class-name="rowClassName" border ref="selection" :columns="columnsLend" :data="dataLend" @on-selection-change="tableSelect">
          <template slot-scope="{ row,index }" slot="pic">
            <img class="maxHeight" :src="'/file/src/sample/pic/minpic/'+row.StylePic" @click="show(index)"></img>
          </template>
        </Table>
      </Row>
      <Row>
        <br>
        <Page show-total show-sizer placement='top' :current='seachObj.pageId' :total='seachObj.total' :page-size='seachObj.pageSize' @on-change='pageChange' @on-page-size-change='pageSizeChange' />

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
      modal: false,
      currentSmple: {},
      columnsLend: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
          key: "date",
          width: 120,
        }, {
          title: "申请天数",
          key: "LendDay"
        },
        {
          title: "已借天数",
          key: "daySpan",
          width: 90,
        },
        {
          title: "操作",
          key: "action",
          width: 140,
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
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.lendReturn(params.index);
                    }
                  }
                },
                "归还"
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
        UserId: [],
        InUserId: []
      },
      inUserList: [],
      userList: [
        // {
        //   DdId: "AAA",
        //   Name: "BBB"
        // }
      ]
    };
  },
  methods: {
    rowClassName(row, index) {
      let d = row.daySpan - row.LendDay;
      if (d > 0) {
        return 'demo-table-error-row';
      }
      return '';
    },

    reGetData() {
      this.seachObj.pageId = 1;
      this.getData();
    },
    ///还回选中样衣
    selectReturnLend() {
      if (this.selectItems.length > 0) {
        let lendIdList = this.selectItems.map(p => {
          return p.Id;
        });
        this.DoReturnLend(lendIdList).then(resutl => {
          this.$Notice.success({
            title: "成功",
            desc: "选中样衣的已还回样衣库。",
            duration: 4
          });
          this.getData();
        });
      } else {
        this.$Notice.warning({
          title: "未选择任何样衣。",
          // desc: "样衣："+styleId+" 的借用申请已通过。",
          duration: 4
        });
      }
    },
    ///返回指定样衣
    lendReturn(val) {
      let styleId = this.dataLend[val].StyleId;
      let lendId = this.dataLend[val].Id;
      this.DoReturnLend([lendId]).then(result => {
        this.$Notice.success({
          title: "成功",
          desc: "样衣：" + styleId + " 的已还回样衣库。",
          duration: 4
        });
        this.getData();
      });
    },
    ///指行还回操作
    DoReturnLend(lendIdList) {
      return new Promise(resolve => {
        this.$util.post(this.$sra.sample_DoReturnLend, lendIdList).then(result => {
          resolve(result);
        });
      });
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
    getData() {
      this.$bus.BeginLoading();
      this.$util
        .post(this.$sra.sample_GetAllLendOutList, this.seachObj)
        .then(result => {
          let today = new Date();
          this.dataLend = result.data.list;
          this.dataLend.map(item => {
            item.date = new Date(item.LendOutDate).toLocaleString();
            item.daySpan = this.DateMinus(item.LendOutDate, today);
          });
          this.seachObj.total = result.data.count;
          this.$bus.EndLoading();
        });

    },
    DateMinus(date1, date2) {
      var sdate = new Date(date1);
      var now = new Date(date2);
      var days = now.getTime() - sdate.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      return day == 0 ? 1 : day;
    },
  },
  mounted: function () {
    //取得有借用申请的用户清单
    this.$util.get(this.$sra.sample_GetLendUserList+'2').then(result => {
      result.data.map(item => {
        this.userList.push(item);
      });
      this.getData();
    });
    this.$util.get(this.$sra.sample_GetInUserList).then(result => {
      this.inUserList = result.data;
    });
  }
};
</script>