import request from "./../../utils/request"

/** 查询发票夹数据 */
export function listTicketFilesAll(params) {
  return request({
    url: "/miniapp/ticket/ticketFiles/listTicketFilesAll",
    method: "post",
    data: params
  })
}

/** 新增发票夹 */
export function insertTicketFile(params) {
  return request({
    url: "/miniapp/ticket/ticketFiles/insertTicketFile",
    method: "post",
    data: params
  })
}

// /**  */
// export function ListTicketFile(params) {
//   return request({
//     url: "/cp/ticket/ticketFiles/listTicketFileById",
//     method: "post",
//     params: params
//   })
// }

/** 修改发票夹 */
export function updateTicketFile(params) {
  return request({
    url: "/miniapp/ticket/ticketFiles/updateTicketFile",
    method: "post",
    data: params
  })
}

/** 删除发票夹 */
export function deleteTicketFile(ids) {
  return request({
    url: "/miniapp/ticket/ticketFiles/" + ids,
    method: 'delete'
  })
}

/** 查询发票夹里面的发票 */
export function selectInvInfo(params) {
  return request({
    url: "/miniapp/ticket/ticketFiles/selectInvInfo",
    method: "post",
    data: params
  })
}

/** 检查发票夹里面的发票，判断是否有查验或者报销的发票，并提示用户后续的删除操作 */
export function checkInvStatus(ids) {
  return request({
    url: '/miniapp/ticket/ticketFiles/checkInvStatus/' + ids,
    method: 'delete'
  })
}

