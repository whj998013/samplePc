<style scoped>
#main {
  margin: 10px 0;
  height: 550px;
}
#left {
  width: 35%;
  height: 100%;
  float: left;
}
#right {
  width: 60%;
  height: 100%;
  float: left;
  margin: 0px 0px 0px 5px;
  border: 1px solid #dcdee2;
}
#bottom,
#top {
  width: 100%;
  height: 50%;
  border: 1px solid #dcdee2;
  overflow: auto;
}
#bottom {
  margin: 2px 0 0 0;
}
.head {
  height: 35px;
  background-color: #2b85e4;
  padding: 5px 15px;
}
.head h3 {
  display: inline;
}
.head span {
 float:right;
}
</style>
<template>
  <div>
    <Tabs value="name2">

      <TabPane label="角色权限配置" name="name2">

        <div id="main">
          <div id="left">
            <div id="top">
              <div class="head">
                <h3>角色清单</h3>
              </div>
            </div>
            <div id="bottom">
              <div class="head">
                <h3>用户清单</h3>
              </div>
            </div>
          </div>
          <div id="right">
            <div class="head">
              <h3>权限清单</h3>
              <span><Button size="small" type="default" @click="">修改</Button>
                <Button size="small" type="default" @click="">保存</Button>
              </span>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane label="用户角色同步" name="name1">
        <Row>
          <Col span="12"><Button type="primary" size="large" @click="upUserDataByDd">从钉钉同步用户角色</Button></Col>
        </Row>

      </TabPane>
    </Tabs>
  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  data: function() {
    return {
      split2: 0.5
    };
  },
  methods: {
    auth() {
      this.test.v2 = this.$bus.Auth(this.test.v1);
    },
    auth2() {
      return this.$bus.Auth(this.test.v1);
    },
    upUserDataByDd() {
      this.$bus.BeginLoading();
      this.$util.get("/RoleSetting/UpUserDataByDd", this.Setting).then(p => {
        this.$Notice.success({
          title: "成功",
          desc: "同步用户角色成功！",
          duration: 4
        });
        this.$bus.EndLoading();
      });
    }
  },
  mounted: function() {
     this.$bus.$emit("changeMenuItem", ["系统设置","角色权限配置"]);
  }
};
</script>