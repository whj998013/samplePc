import Vue from 'vue';
import cookie from "./libs/cookie.js"
export default new Vue({
    data() {
        return {
            client: {
                IsPc: false,
                IsDd: false
            },
            currentUser: undefined,
            Setting: {
                IsInputStrageNeedAlow: false,
                InStrageAlowChange: false,
                EnableLimtView: false
            },
            sizelist: [],
            colorlist: [],
            selectData: null,
        };
    },
    computed: {

        isLogin() {
            console.log("user:", this.currentUser, "islogin:", this.currentUser == undefined ? false : true);
            return this.currentUser == undefined ? false : true;
        },
        isLimt() {
            return this.Auth("Sample_Dd_ViewAllInfo");
        },
    },
    methods: {
        Auth(value) {

            if (value) {
                let v = this.currentUser.plist.find(p => p == value);
                if (v != undefined) {
                    return true;
                }
            }
            return false;
        },
        setCookieUser(user) {
            this.currentUser = user;
            cookie.setSessionCookie('sgud', JSON.stringify(user), "/");
        },
        getSystemSetting() {
            return new Promise((resolve, reject) => {
                this.$util.get("/SampleSetting/GetSampleSetting").then(result => {
                    this.Setting = result.data;
                    resolve(result.data);
                }).catch(re => {
                    reject(re);
                });
            });
        },
        getSelectList() {
            return new Promise((resolve, reject) => {
                if (this.selectData == null) {
                    this.$util.get("/Public/GetSelectList").then(result => {
                        console.log("getSelectDate");
                        this.selectData=result.data;
                        resolve(result.data);
                    }).catch(re => {
                        reject(re);
                    });
                }else resolve(this.selectData);
            });

        },
        alert(alertstr) {
            this.$Notice.error({
                title: "错误",
                desc:  alertstr,
                duration: 4
            });
        },
        getUserBycookie() {

            let userstr = cookie.get('sgud');
            if (userstr) {
                let user = JSON.parse(userstr);
                this.currentUser = user;
                console.log('get User By Cooke Finsh');
            } else {
                cookie.delete('sgud');
            }
        },
        BeginLoading() {
            this.$bus.$emit("BeginLoading", "");
        },
        EndLoading() {
            this.$bus.$emit("EndLoading", "");
        }
    },

});