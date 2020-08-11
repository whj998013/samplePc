import Vue from 'vue';
import cookie from './libs/cookie.js';

export default new Vue({
    data() {
        return {
            menuItem: [],
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
            console.log('user:', this.currentUser, 'islogin:', this.currentUser == undefined ? false : true);
            return this.currentUser == undefined ? false : true;
        },
        isLimt() {
            return this.Auth('Sample_Dd_ViewAllInfo');
        }
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
        async upDateMenuItem() {
            let lmi = localStorage.getItem('menuItem');
            if (lmi != null) {
                this.menuItem = JSON.parse(localStorage.getItem('menuItem'));
            }
            let re = await this.$util.get(this.$sra.public_getmenu);
            localStorage.setItem('menuItem', JSON.stringify(re.data));
            this.menuItem = re.data;
        },
        setCookieUser(user) {
            this.currentUser = user;
            cookie.setSessionCookie('sgud', JSON.stringify(user), '/');
        },
        getSystemSetting() {
            return new Promise((resolve, reject) => {
                this.$util.get(this.$sra.sample_getsetting).then(result => {
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
                    this.$util.get(this.$sra.public_getselectlist).then(result => {
                        this.selectData = result.data;
                        resolve(result.data);
                    }).catch(re => {
                        reject(re);
                    });
                } else resolve(this.selectData);
            });
        },
        alert(alertstr) {
            this.$Notice.warning({
                title: '警告',
                desc: alertstr,
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
            this.$bus.$emit('BeginLoading', '');
        },
        EndLoading() {
            this.$bus.$emit('EndLoading', '');
        }
    },
    created() {




    }
});