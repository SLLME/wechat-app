import request from "./../../utils/request"

/** 获取发票列表 */
export function selectInvInfoBySearch(params) {
  return request({
    url: '/miniapp/ticket/ticketFiles/selectInvInfoBySearch',
    method: 'get',
    data: params
  })
}


/** 删除发票 */
export function deleteInfoByIds(params) {
  return request({
    url: '/miniapp/ticket/ticketFiles/deleteInfoByIds',
    method: "post",
    data: params,
  })
}

/** 转移发票 */
export function changeInvInfo(params) {
  return request({
    url: '/miniapp/ticket/ticketFiles/changeInvInfo',
    method: 'post',
    data: params
  })
}

/** 获取发票详情 */
export function getInvInfoById(params) {
  return request({
    url: '/miniapp/ticket/ticketFiles/getInvInfo',
    method: 'post',
    data: params
  })
}

/** 修改发票 */
export function updateInvInfo(params) {
  return request({
    url: '/miniapp/ticket/ticketFiles/updateInvInfo',
    method: 'post',
    data: params
  })
}

/** 查验 */
export function checkInvoice(params) {
  return request({
    url: '/miniapp/ticket/zzsinvoice/checkInvoice',
    method: 'post',
    data: params
  })
}

/** 转移发票 */
export function transferInvoice(params) {
  return request({
    url: "/miniapp/ticket/zzsinvoice/transferInvoice",
    method: "post",
    data: params
  })
}

/** 分享发票 */
export function shareInvoice(params) {
  return request({
    url: "/miniapp/ticket/zzsinvoice/shareInvoice",
    method: "post",
    data: params
  })
}

