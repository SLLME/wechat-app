import request from "./../utils/request"

/** 自动授权 */
export function automaticGrant(query) {
  return request({
    url: "/wechat/api/oauth2",
    method: "get",
    params: query,
  })
}

/** 授权登录 */
export function oauthLogin(query) {
  return request({
    url: "/wechat/api/oauthLogin",
    method: "get",
    params: query
  })
}

/** 微信js授权 */
export function getJsTicket(query){
  return request({
    url: "/wechat/api/getJsTicket",
    method: 'get',
    params: query,
  })
}

/** 领取发票 */
export function getToCard(query){
  return request({
    url: "/wechat/api/getToCard",
    method: 'get',
    params: query,
  })
}

/** 获取已开票信息 */
export function getInvoice(query) {
  return request({
    url: "/wechat/api/getInvoice",
    method: "get",
    params: query,
  })
}
