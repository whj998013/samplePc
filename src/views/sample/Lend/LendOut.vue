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
      <Col span='15'> 筛选：
      <Select v-model="seachObj.UserId" multiple style="width:260px" transfer>
        <Option v-for="item in userList" :value="item.DdId" :key="item.value">{{ item.Name }}</Option>
      </Select>
      <Button>确定</Button>
      </Col>
      <Col span='5' style="float:right">
      <Button @click="getData">刷新</Button>

      <Button type="primary" @click="selectReturnLend">归还选中样衣</Button>
      </Col>
    </Row>
    <br>
    <Row>
      <Table border ref="selection" :columns="columnsLend" :data="dataLend" @on-selection-change="tableSelect">
        <template slot-scope="{ row,index }" slot="pic">
          <img class="maxHeight" :src="'/file/src/sample/pic/minpic/'+row.baseinfo.Pic" @click="show(index)"></img>
        </template>
      </Table>
    </Row>
    <Row>
      <template>
        <Page show-total show-sizer placement='top' :current=1 :total='seachObj.total' :page-size='seachObj.pageSize' @on-change='pageChange' @on-page-size-change='pageSizeChange' />
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
          key: "date"
        },
        {
          title: "操作",
          key: "action",
          width: 180,
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
        this.$util.post("/LendOut/DoReturnLend", lendIdList).then(result => {
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
    show(val) {
      this.currentSmple = this.dataLend[val].baseinfo;
      this.modal = true;
    },
    getData() {
      this.$util
        .post("/LendOut/GetAllLendOutList", this.seachObj)
        .then(result => {
          this.dataLend = result.data.items;
          this.dataLend.map(item => {
            item.date = new Date(item.CreateDate).toLocaleString();
          });
          this.seachObj.pageSize = result.data.pageSize;
          this.seachObj.pageId = result.data.pageId;
          this.seachObj.total = result.data.total;
        });
    }
  },
  mounted: function () {
    //取得有借用申请的用户清单
    this.$util.get("/LendOut/GetLendUserList/2").then(result => {
      result.data.map(item => {
        this.userList.push(item);
      });
      this.getData();
    });
  }
};
</script>