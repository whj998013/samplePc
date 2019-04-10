import axios from 'axios';
import env from '../config/env';
import QRCode from 'qrcode2';
import Print from './print.js';
import cookie from "./cookie.js";
import bus from '../bus.js';
import loginApi from './loginApi.js';

axios.defaults.withCredentials = true;
let util = {

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
        //let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.close();
        // window.location.reload();
        // document.body.innerHTML = oldContent;
        return false;
    },

};

util.title = function (title) {
    title = title ? title + ' - 样衣管理' : '样衣管理系统';
    window.document.title = title;
};
util.PrintUrl = env === 'development' ?
    'http://api.sungingroup.com:8081/sampleinfo/' :'http://app.sungingroup.com:8081/sampleinfo/' 
const ajaxUrl = env === 'development' ?
    'http://api.sungingroup.com:8082' :'http://app.sungingroup.com:8082' ;
util.dataUrl = ajaxUrl+"/src/sample";
util.proofDataUrl=ajaxUrl;
util.baseUrl = ajaxUrl + "/api";
util.ajax = axios.create({
    baseURL: util.baseUrl,
    timeout: 15000,
});
util.ajax.interceptors.response.use(function (response) {
    //对返回的数据进行一些处理  
    return response;
}, function (error) {
    //对返回的错误进行一些处理
    bus.EndLoading();
    console.log('ajax出错:', error, "config:", error.config);
    let config = error.config;
    let str = error + '';
    if (str.search('timeout') !== -1 || str.search('Network Error') !== -1) { // 超时error捕获
       // window.location.href = '/login/401';
    };
    console.log("error",error);
    if(typeof(error.response.status)=='undefined') return axios(config);
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
});

util.post = util.ajax.post;
util.get = util.ajax.get;
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