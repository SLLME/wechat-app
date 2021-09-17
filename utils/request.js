let app = getApp();
let baseUrl = app.globalData.env.baseUrl;

const whiteUrl = ['/wechat/api/code2Session'];
/**
 * 
 * @param {*} url 请求url
 * @param {*} method 请求方法
 * @param {*} data 请求数据
 * @param {*} success 成功回调
 * @param {*} fail 失败回调
 */
function publicRequest(options){
  if(options.header == undefined || options.header == ""){
    // options.header = {'content-type': 'application/x-www-form-urlencoded'};
    options.header = {'content-type': "application/json"};
    if(wx.getStorageSync("token") && !whiteUrl.includes(options.url)){
      options.header['Authorization'] = 'Bearer ' + wx.getStorageSync("token");
    }
  }
  if(options.url.indexOf("http") == -1){
    options.url = baseUrl + options.url;
  }
  if(options.method == undefined || options.method == ""){
    options.method = "get";
  }
  if(options.timestamp == undefined || options.timestamp == ""){
    options.timestamp = 600000;
  }
  // if(options.success && typeof(options.success) == "function"){
  //   let successCallback = options.success;
  //   options.success = res=>{
  //     successCallback(res.data);
  //   }
  // }
  // if(options.error && typeof(options.error) == "function"){
  //   let errorCallback = options.error;
  //   options.error = res =>{
  //     errorCallback(res.data);
  //   }
  // }
  return wx.pro.request(options).then(res=>{
    return Promise.resolve(res.data);
  }).catch(error=>{
    return Promise.reject(error);
  })
}

export default publicRequest;