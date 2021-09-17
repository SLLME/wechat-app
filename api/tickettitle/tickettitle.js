import request from "./../../utils/request"

/** 发票抬头列表 */
export function ticketTitleList(params) {
  return request({
    url: '/income/TicketInvTitle/list',
    method: 'get',
    params: params
  })
}

/** 获取发票抬头详细信息 */
export function ticketTitleDetail(id) {
  return request({
    url: '/income/TicketInvTitle/' + id,
    method: 'get',
  })
}

/** 新增发票抬头 */
export function addTicketTitle(params) {
  return request({
    url: '/income/TicketInvTitle',
    method: 'post',
    data: params,
  })
}

/** 删除发票抬头 */
export function deleteTicketTitle(ids) {
  return request({
    url: '/income/TicketInvTitle/' + ids,
    method: 'delete',
  })
}

/** 修改发票抬头 */
export function editTicketTitle(params) {
  return request({
    url: '/income/TicketInvTitle',
    method: 'put',
    data: params
  })
}
