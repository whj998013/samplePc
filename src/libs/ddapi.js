import dd from "dingtalk-jsapi";
import util from './util.js';

// util.post('/Dd/GetDdSign',{url:window.location.href}).then(result => {
    
//     let re=result.data;   
//     dd.config({
//         agentId: re.agentId, // 必填，微应用ID
//         corpId: re.corpId,//必填，企业ID
//         timeStamp: re.timestamp, // 必填，生成签名的时间戳
//         nonceStr: re.nonceStr, // 必填，生成签名的随机串
//         signature: re.signature, // 必填，签名
//         type: 0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
//         jsApiList: [
//             'biz.util.uploadImage',
//             'biz.util.uploadAttachment',            
//         ] // 必填，需要使用的jsapi列表，注意：不要带dd。
//     });
// });

export default dd;