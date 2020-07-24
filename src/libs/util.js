import axios from 'axios';
import env from '../config/env';
import QRCode from 'qrcode2';
import Print from './print.js';
import cookie from "./cookie.js";
import bus from '../bus.js';
import loginApi from './loginApi.js';

axios.defaults.withCredentials = true;
let util = {
    dataFormat: function (fmt) { //author: meizz   
        var o = {
            "M+": this.getMonth() + 1,                 //月份   
            "d+": this.getDate(),                    //日   
            "h+": this.getHours(),                   //小时   
            "m+": this.getMinutes(),                 //分   
            "s+": this.getSeconds(),                 //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    getGmtDate(dstr) {
        let dt;
        // if (dstr instanceof Date) {
        //     dt = dstr;
        // } else {
        //     dt = new Date(dstr);
        // };
        dt = dstr instanceof Date ? dstr : new Date(dstr);
        let y = dt.getFullYear();
        let m = dt.getMonth() + 1;
        let d = dt.getDate();
        let ms = m > 9 ? m : ('0' + m);
        let ds = d > 9 ? d : ('0' + d);
        let str = y + '-' + ms + '-' + ds;
        return str;
    },
    getID(length) {
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
    },
    getState(v) {
        if (v == 12) return "<p style='color:#515a6e'>仓库退回</p>";
        else if (v == 1) return "<p style='color:#19be6b'>草拟</p>";
        else if (v == 2) return "<p style='color:#ff9900'>审批中</p>";
        else if (v == 3) return "<p style='color:#2db7f5'>通过</p>";
        else if (v == 4) return "<p style='color:#2d8cf0'>已出库</p>";
        else if (v == 10) return "<p style='color:#ed4014'>拒绝|撤回</p>";
        else if (v == 11) return "<p style='color:#ed4014'>出库失败</p>";
        else return "";
    },
    // 二维码生成方法
    qrcode(id, text, width, callBack) {
        if (text != null) {
            let qrcode = new QRCode(id, { // qrcode html为标签id
                width: width, // 长度
                height: width, // 宽度
                text: text // 内容
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas)
                // background: '#f0f'
                // foreground: '#ff0'
            });
            console.log(qrcode);
            callBack(qrcode);
            return qrcode
        }
    },

    //打印插件，传入DOM，通过1、"<div id="qrcode" ref="print">"  2、printContent(this.$refs.print); 
    print2(refDom) {
        let subOutputRankPrint = refDom;
        let newContent = subOutputRankPrint.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.close();
        return false;
    },

};

util.title = function (title) {
    title = title ? title + ' - 样衣管理' : '样衣管理系统';
    window.document.title = title;
};
let protocol = document.location.protocol;
let port = document.location.port;
let hostName = document.location.hostname;

util.PrintUrl = 'http:' + "//" + hostName + ":8081" + "/sampleinfo/";
let ajaxUrl = protocol === "http:" ? "http://" + hostName + ":8082" : "https://" + hostName + ":8182";
let dataBaseUrl = env === 'development' ? '/file' : '/file';

util.dataUrl = dataBaseUrl + "/src/sample";
util.proofDataUrl = dataBaseUrl;
util.baseUrl = ajaxUrl+'/';
// util.baseUrl = ajaxUrl + "/apiaction";


util.ajax = axios.create({
    baseURL: util.baseUrl,
    timeout: 60000,
});
util.ajax.interceptors.response.use(function (response) {
    //对返回的数据进行一些处理  
    return response;
}, function (error) {
    //对返回的错误进行一些处理
    console.log("axios Error", error);
    if (true) {

        bus.EndLoading();
        console.log('ajax出错:', error, "config:", error.config);
        let config = error.config;
        let str = error + '';
        if (str.search('timeout') !== -1 || str.search('Network Error') !== -1) { // 超时error捕获
            console.log("error", error);
            debugger;
            window.location.href = '/login/0';
            return;
        };

        if (error.response.status == 401) {
            bus.BeginLoading();
            cookie.delete('sgud');
            //登录失效，开始后台重新登录
            console.log("开始重新登录");
            return loginApi.beginLogin().then(re => {
                console.log("重新登录成功");
                bus.EndLoading();
                return axios(config);
            }).catch(error => {

                //window.location.href = '/login/401';

            });

        } else if (error.response.status == 404) {

            console.log("服务器没有找到相应数据：", error.response);
        } else if (error.response.status == 400) {

            bus.alert(error.response.data.Message);
        };
        return Promise.reject(error);
    }
});

util.post = util.ajax.post;
util.get = util.ajax.get;
util.put=util.ajax.put;
util.delete=util.ajax.delete;
util.print = Print;

util.removeByValue = (arr, val) => {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}


export default util;