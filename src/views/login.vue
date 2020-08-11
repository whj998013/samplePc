<style scoped>
</style>
<template>
  <div>
    <weblogin @login='pcLogin' v-if="isWebLogin"></weblogin>

  </div>
</template>
<script>
import weblogin from "./Login/weblogin";
import dd from "dingtalk-jsapi";
import cookie from "../libs/cookie.js";
import loginApi from "../libs/loginApi.js";
var IsLoging = false;
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
    if (status == 0) {
      this.$Notice.error({
        title: "连接超时",
        desc: "连接超时或服务器错误，请联系网络管理员。",
        duration: 5
      });
    }
    if (status == 401 && dd.other) {
      this.$Notice.error({
        title: "连接超时",
        desc: "连接超时或登录失效，正在重新尝试连接登录",
        duration: 5
      });
    }
    this.$bus.isPc = dd.pc;
    this.$bus.isDD = !dd.other;
    loginApi
      .beginLogin()
      .then(re => {
        //登录成功
        console.log("login result:", re);
        let redirect = this.$route.query.redirect;
        console.log("redurl:", redirect);
        if (redirect) {
          this.$router.push(redirect);
        } else {
          this.$router.push("/");
        }
      })
      .catch(re => {
        //登录失败
        console.log("login error result:", re);
        this.isWebLogin = true;
      });
  },

  methods: {
    loginFinsh(user) {
      loginApi.loginFinsh(user);
      ///返回跳转页面
      let redirect = this.$route.query.redirect;
      console.log("redurl:", redirect);
      if (redirect) {
        this.$router.push(redirect);
      } else {
        this.$router.push("/");
      }
    },

    pcLogin(data) {
      console.log("开始Web登录");
      if (!IsLoging) {
        IsLoging = true;
        setTimeout(() => {
          IsLoging=false;
        }, 5000);
        this.$util.post(this.$sra.login_weblogin, data).then(re => {
          if (re.data != null) {
            this.$Message.success("登录成功！");
            this.loginFinsh(re.data);
            IsLoging=false;
          }
        });
      }

    }
  }
};
</script>