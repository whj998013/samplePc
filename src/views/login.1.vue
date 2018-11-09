<style scoped>
</style>
<template>
  <div>
    <weblogin @login='pcLogin' v-if="isWebLogin"></weblogin>
    
  </div>
</template>
<script>
import weblogin from "./login/weblogin.vue";
import dd from "dingtalk-jsapi";
import cookie from "../libs/cookie.js";
export default {
  components: {
    weblogin
  },
  data() {
    return {
      isWebLogin: false
    };
  },

  mounted() {
    let status = this.$route.params.status;
    if (status == 401 && dd.other) {
      this.$Notice.error({
        title: "连接超时",
        desc: "连接超时或登录失效，正在重新尝试连接登录",
        duration: 5
      });
    }
    this.$bus.isPc = dd.pc;
    this.$bus.isDD = !dd.other;
    this.begingLogin();
  },

  methods: {
    showServerErrorMsg(e) {
      this.$Notice.error({
        title: "程序错误",
        desc: "无法连接后台服务器，请检查网络或联系开发人员。 " + e,
        duration: 5
      });
    },
    begingLogin() {
      if (dd.other) {
        //显示登录界面进行账户密码登录
        this.isWebLogin = true;
      } else {
        //进行cookie登录
        this.cookinLogin();
      }
    },

    loginFinsh(user) {
      console.log("Login Finsh! UserName:", user.Name);
      this.$bus.setCookieUser(user);
      this.$bus.getSystemSetting();
      let redirect = this.$route.query.redirect;
      console.log("redurl:", redirect);
      if (redirect) {
        this.$router.push(redirect);
      } else {
        this.$router.push("/");
      }
      //this.isWebLogin = false;
    },

    cookinLogin() {
      let cookiestr = cookie.get("lh");
      console.log("cookid:" + cookiestr);
      if (cookiestr != null) {
        this.$util
          .post("/login/CookieLogin", { cookie: cookiestr })
          .then(re => {
            if (re.data != null) {
              this.loginFinsh(re.data);
              console.log("cookie登录成功", this.$bus.currentUser);
            } else {
              console.log("cookie失效，开始钉钉登录");
              this.ddLogin();
            }
          })
          .catch(re => {
            console.log("cookie登录错误，尝试钉钉登录");
            this.ddLogin();
          });
      } else {
        console.log("cookie失效，尝试钉钉登录");
        this.ddLogin();
      }
    },

    ddLogin() {
      let _this = this;

      ///钉钉登录
      dd.ready(function() {
        dd.runtime.permission.requestAuthCode({
          corpId: "ding99dd341fc99a25eb", // 企业id
          onSuccess: function(info) {
            _this.$util.post("/login/ddlogin", { code: info.code }).then(re => {
              _this.$Message.success("钉钉登录成功！");
              _this.loginFinsh(re.data);
              ///设置免登cookie
              cookie.set("lh", re.data.LoginCookie, re.data.LoginOverTime);
            });
          }
        });
      });
    },

    pcLogin(data) {
      let ds = { namethis: "whj", pwd: "998013" };
      console.log("开始Web登录");
      this.$util
        .post("/login/Weblogin", data)
        .then(re => {
          if (re.data != null) {
            this.$Message.success("登录成功！");
            this.loginFinsh(re.data);
          } 
        })       
    }
  }
};
</script>