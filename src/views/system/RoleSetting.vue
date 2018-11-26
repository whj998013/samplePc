<style scoped>
#left {
  width: 35%;
}
#right {
  width: 60%;
  margin: 0px 0px 0px 2px;
  height: 100%;
}
#bottom,
#top {
  width: 100%;
  height: 50%;
}
.head {
  height: 35px;
  background-color: #515a6e;
  padding: 5px 15px;
  color: #dcdee2;
}
.head h3 {
  display: inline;
}
.head span {
  float: right;
}
.brod {
  border: 1px solid #dcdee2;
}
.float {
  height: 100%;
  float: left;
}
.content {
  height: 89%;
  overflow: auto;
}
.content2 {
  height: 94%;
  overflow: auto;
  padding: 5px 0 0 10px;
}
</style>
<template>

  <div id="main" :style="{'height': height+'px'}">
    <div id="left" class="float">
      <div id="top" class="brod">
        <div class="head">
          <h3>角色</h3>
          <span><Button type="default" size="small" @click="upUserDataByDd">从钉钉同步用户角色</Button></span>
        </div>
        <div class="content">
          <CellGroup>
            <Cell v-for="p in urp" :name="p.Role.RoleId" label="单击查看清单" :key="p.Role.RoleId" :selected="p.selected">
              <h4>
                <Icon size="25" type="ios-contacts" />{{p.Role.RoleName}}</h4>
            </Cell>
          </CellGroup>
        </div>
      </div>
      <div id="bottom" class="brod">
        <div class="head">
          <h3>该角色的用户</h3>
        </div>
        <div class="content">
          <CellGroup>
            <Cell v-for="u in userList" :name="u.DdId" :label="u.RoleName" :key="u.DdId">
              <h4>
                <Icon size="25" type="ios-contact" />{{u.UserName}}</h4>
            </Cell>
          </CellGroup>
        </div>
      </div>
    </div>
    <div id="right" class="brod float">
      <div class="head">
        <h3>角色权限</h3>
        <span><Button size="small" type="default" @click="">取消</Button>
          <Button size="small" type="default" @click="savePermision">保存</Button>
        </span>
      </div>
      <div class="content2">
        <Tree ref="pTree" :data="permisionView" show-checkbox multiple></Tree>
      </div>
    </div>
  </div>
  <!-- </TabPane>

    </Tabs> -->

</template>
<script>
//import bus from "../bus.js";
export default {
  data: function() {
    return {
      height: window.innerHeight - 235,
      urp: [],
      userList: [],
      permisionList: [],
      permisionView: [],
    };
  },
  methods: {
    savePermision(){
      console.log(this.permisionList[0]);
      let re=this.$refs.pTree.flatState;
      console.log("pt",re);
    },
    addPermision(plist, obj) {},
    upUserDataByDd() {
      this.$bus.BeginLoading();
      this.$util.get("/RoleSetting/UpUserDataByDd").then(p => {
        this.$Notice.success({
          title: "成功",
          desc: "同步用户角色成功！",
          duration: 4
        });
        this.$bus.EndLoading();
      });
    },
    setData(obj) {
      this.urp = obj.data.urp;
      this.urp.forEach(u => {
        u.selected = false;
      });
      //根节点
      this.permisionList.push({
        title: "管理系统",
        key: "P000000",
        expand: true,
        checked:false,
        selected: true,
        children: []
      });
         //生成权限节点
      obj.data.plist.forEach(p => {
        this.permisionList.push({
          title: p.CnName,
          key: p.Key,
          expand: true,
          checked:false,
          selected: false,
          upKey: p.UpKey,
          children: []
        });
      });
      //链接权限节点
      this.permisionList.forEach(p => {
        let re = this.permisionList.find(t => {
          return p.upKey == t.key;
        });
        if (re != undefined) re.children.push(p);
      });
      console.log("p", this.permisionList[0]);
      this.permisionView=this.permisionList[0].children;
      this.userList = this.urp[0].UserList;
     
    },
    getData() {
      this.$bus.BeginLoading();
      this.$util.get("/RoleSetting/GetUserRoleData").then(p => {
        this.setData(p);
      });
      this.$bus.EndLoading();
    }
  },
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["系统设置", "角色权限配置"]);
    this.getData();
  }
};
</script>