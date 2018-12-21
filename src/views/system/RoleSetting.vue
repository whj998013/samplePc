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
.noedit{
pointer-events: none;
}
</style>
<style>
input[disabled] {
  color: #87ceeb;
  opacity: 1;
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
          <CellGroup @on-click="roleClick">
            <Cell v-for="p in urp" :name="p.Role.RoleId" label="单击查看清单" :key="p.Role.RoleId" :selected="p.selected">
              <h4>
                <Icon size="25" type="ios-contacts" />{{p.Role.RoleName}}</h4>
            </Cell>
          </CellGroup>
        </div>
      </div>
      <div id="bottom" class="brod">
        <div class="head">
          <h3>{{currentRole.Role.RoleName}}的用户</h3>
        </div>
        <div class="content">
          <CellGroup>
            <Cell v-for="u in currentRole.UserList" :name="u.DdId" :label="u.RoleName" :key="u.DdId">
              <h4>
                <Icon size="25" type="ios-contact" />{{u.UserName}}</h4>
            </Cell>
          </CellGroup>
        </div>
      </div>
    </div>
    <div id="right" class="brod float">
      <div class="head">
        <h3>{{currentRole.Role.RoleName}}的权限</h3>
        <span>
          <Button v-if="!isModify" size="small" type="default" @click="modifyRole">修改</Button>
          <Button v-if="isModify" size="small" type="default" @click="cancelModify">取消</Button>
          <Button v-if="isModify" size="small" type="default" @click="savePermision">保存</Button>
        </span>
      </div>
      <div class="content2" v-bind:class="{noedit:!isModify}">
        <Tree ref="pTree" :data="permisionView" show-checkbox multiple></Tree>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data: function() {
    return {
      height: window.innerHeight - 235,
      currentRole: { Role: { RoleName: "" } },
      urp: [],
      isModify: false,
      permisionList: [],
      permisionView: []
    };
  },
  watch: {
    currentRole: function(val, oldVal) {
      this.permisionList.forEach(p => {
        p.checked = false;
        if (p.children.length == 0) {
          let obj = this.currentRole.PermissionList.find(t => t.Key == p.key);
          if (obj != undefined) {
            p.checked = true;
          }
        }
      });
      this.permisionList.forEach(p => {
        if (p.indeterminate) p.indeterminate = this.getIndeterminate(p);
      });
    }
  },
  methods: {
    getIndeterminate(val) {
      let tv = false;
      if (val.children.length > 0) {
        val.children.forEach(p => {
          tv = this.getIndeterminate(p);
        });
      } else tv = val.checked;
      return tv;
    },
    modifyRole() {
      this.isModify = true;
    },
    cancelModify() {
      this.isModify = false;
    },
    roleClick(roleId) {
      this.currentRole.selected = false;
      this.currentRole = this.urp.find(u => u.Role.RoleId == roleId);
      this.currentRole.selected = true;
    },

    upUserDataByDd() {
      this.$bus.BeginLoading();
      this.$util.get("/RoleSetting/UpUserDataByDd").then(p => {
        this.$Notice.success({
          title: "成功",
          desc: "同步用户角色成功！",
          duration: 4
        });
        this.getData();
        this.$bus.EndLoading();
      });
    },
    setData(obj) {
      this.urp = obj.data.urp;
      this.urp.forEach(u => {
        u.selected = false;
      });
      //根节点
      this.permisionList = [];
      this.permisionList.push({
        title: "管理系统",
        key: "P000000",
        expand: true,
        checked: false,
        selected: false,
        children: []
      });
      //生成权限节点
      obj.data.plist.forEach(p => {
        this.permisionList.push({
          title: p.CnName,
          key: p.Key,
          expand: true,
          checked: false,
          upKey: p.UpKey,
          children: []
        });
      });
      //链接权限节点a
      this.permisionList.forEach(p => {
        let re = this.permisionList.find(t => {
          return p.upKey == t.key;
        });
        if (re != undefined) re.children.push(p);
      });
      this.permisionView = this.permisionList[0].children;
      this.currentRole = this.urp[0];
      this.currentRole.selected = true;
    },
    getData() {
      this.$bus.BeginLoading();
      this.$util.get("/RoleSetting/GetUserRoleData").then(p => {
        this.setData(p);
      });
      this.$bus.EndLoading();
    },
    savePermision() {
      this.$bus.BeginLoading();
      this.isModify = false;
      let re = this.$refs.pTree.getCheckedAndIndeterminateNodes();
      let plist = re.map(p => p.key);
      let obj = { RoleId: this.currentRole.Role.RoleId, PermissionKey: plist };
      this.$util.post("/RoleSetting/SaveRoleData", obj).then(p => {
        this.getData();
      });
    }
  },
  mounted: function() {
    this.$bus.$emit("changeMenuItem", ["系统设置", "角色权限配置"]);
    this.getData();
  }
};
</script>