<style scoped>
</style>
<template>
  <div>
    <Tabs value="name0">
       <TabPane label="已入库样衣管理" name="name0">
        <all-sample havePrint  haveEdit  haveDelete ></all-sample>
      </TabPane>
      <TabPane label="入库审批" name="name1">
        <Row type="flex" justify="space-between" class="menuid">
          <Col span='15'> 筛选：
          <Select v-model="seachObj.UserId" multiple style="width:260px">
            <Option v-for="item in userList" :value="item.DdId" :key="item.value">{{ item.Name }}</Option>
          </Select>
          <Button @click="upData">确定</Button>
          </Col>
          <Col span='7'>
          <Button @click="selectAll">{{!checked?"全选":"反选"}} </Button>
          <Button type="primary" @click="SelectAlowInStorage">将选择的样衣入库</Button>
          </Col>
        </Row>
        <Row type="flex">
          <sampleview ref="view" action="/InOutStorage/GetInStorageList" haveAcceptInStorage haveEdit havePrint haveDelete can-select></sampleview>
        </Row>
      </TabPane>
     
    </Tabs>
  </div>
</template>
<script>
//import bus from "../bus.js";
import sampleview from "../commpent/sampleView.vue";
import allSample from "../commpent/allSample.vue";
export default {
  components: {
    sampleview,
    allSample
  },
  data: function() {
    return {
      checked: false,
      seachObj: {
        keyWord: "",
        dateValue: ["", ""],
        State: "",
        UserId: []
      },
      userList: [
        //       {
        //       DdId:'',
        //       Name:''
        //   }
      ]
    };
  },
  methods: {
    SelectAlowInStorage() {
      this.$bus.BeginLoading();
      let styleList = [];
      this.$refs.view.items.forEach(item => {
        if (item.checked) styleList.push(item.StyleId);
      });

      console.log(styleList);
      this.$util
        .post("/InOutStorage/AcceptInStorageList", styleList)
        .then(result => {
          this.$Notice.success({
            title: "入库成功",
            desc: "批量确认入库成功。",
            duration: 4
          });
          this.upData();
        });
    },
    selectAll() {
      this.checked = !this.checked;
      this.$refs.view.items.forEach(p => {
        p.checked = this.checked;
      });
      this.$refs.view.reload();
    },

    upData() {
      this.$refs.view.Seach(this.seachObj);
      this.checked = false;
    }
  },
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["样衣管理", "入库申请管理"]);
    //取得有入库申请的用户清单
    this.$util.get("/InOutStorage/GetInStorageUserList").then(result => {
      result.data.map(item => {
        this.userList.push(item);
      });
    });
  }
};
</script>