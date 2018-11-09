
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #d7dde4;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
<template>
  <div class="layout">
   
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <a @click="routeGoto('/')"><img src="../pic/logo.jpg" height="64"></img>
      </a>
      <Menu :active-name="menuActiveName" theme="dark" width="auto" :open-names="openNames" @on-select="routeGoto">
        <Submenu :name="m.subMenuName" v-for="m in menuItem" :key="m.subMenuName" v-show="!m.needmange||isMange">
          <template slot="title">
            <Icon :type="m.iconType"></Icon>
            {{ m.subMenuText}}
          </template>
          <MenuItem :name="item.name" v-for="item in m.menuItem" :key="item.name" v-if="!item.needmange||isMange">{{item.text}}</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
        <h1>杭州商泰样衣管理</h1>
      </Header>
      <Content :style="{padding: '0 16px 16px'}">
        <Row type="flex" justify="start" class="code-row-bg">
          <Col span="16">
          <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem v-for="item in BreadArr" :key="item">{{item}}</BreadcrumbItem>
          </Breadcrumb>
          </Col>
          <Col span="8">
          <div :style="{float:'right',margin: '7px 0'}">
              
            <Avatar icon="ios-person" :src="currentUser.Avatar" size="large"></Avatar>&nbsp&nbsp
            <h3 :style="{display:'inline'}">{{currentUser.Name}}</h3>&nbsp&nbsp
          </div>
          </Col>
        </Row>
        <Card>
          <div id='ContentDiv' :style="{'min-height': minheight+'px'}">
             <Spin v-if="isLoading" fix size="large"></Spin>
            <router-view></router-view>
            <br/> <br> <br></div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
import mItem from "../template/menuItem.js";
export default {
  data() {
    return {
      isLoading:false,
      minheight: window.innerHeight - 200,
      menuItem: mItem,
      currentUrl: "",
      BreadArr: ["首页"],
      menuActiveName: "",
      isMange:false,
      openNames:['stockMenu','mangeMenu'],
    };
  },
  computed: {
    currentUser() {
      return this.$bus.currentUser;
    }
  },
  mounted() {
      this.$bus.$on("BeginLoading", () => {
      this.isLoading = true;
    });
    this.$bus.$on("EndLoading", () => {
      this.isLoading = false;
    });
     this.$bus.$on("changeMenuItem", msg => {
      this.changemenuItem(msg);
    });
    if(this.currentUser.Role>=2) this.isMange=true;
  },
  methods: {
    //执行路由跳转
    routeGoto: function(url) {
      this.currentUrl = url;
      this.$router.push(url);
    },
    changemenuItem(bread) {
      this.BreadArr = bread;
    },
    isShowMenuItem(v) {
      return this.alowStr.indexOf(v) > -1;
    }
  }
};
</script>
