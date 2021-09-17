import request from "./../../utils/request"

/** 查询用户读取进行发票的邮箱记录列表 */
export function emailList(params) {
  return request({
    url: "/income/email/list",
    method: "get",
    data: params,
  })
}

/** 导出用户读取进行发票的邮箱记录列表 */
export function emailExport(params) {
  return request({
    url: "/income/email/export",
    method: "get",
    data: params,
  })
}

/** 获取用户读取进行发票的邮箱记录详细信息 */
export function emailGetInfo(id) {
  return request({
    url: "/income/email/" + id,
    method: "get",
  })
}

/** 新增用户读取进行发票的邮箱记录 */
export function emailAdd(params) {
  return request({
    url: "/income/email",
    method: "post",
    data: params
  })
}

/** 删除用户读取进行发票的邮箱记录 */
export function emailRemove(ids) {
  return request({
    url: "/income/email/" + ids,
    method: "delete",
  })
}

/** 修改邮箱 */
export function emailEdit(params) {
  return request({
    url: "/income/email",
    method: 'put',
    data: params,
  })
}

/** 邮箱录入发票数据 */
export function dealLoadEmail(params) {
  return request({
    url: "/miniapp/ticket/zzsinvoice/dealLoadEmail",
    method: "post",
    data: params
  })
}
