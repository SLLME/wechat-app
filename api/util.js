import request from "./../utils/request"

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/ticket/dict/data/type/' + dictType,
    method: 'get'
  })
}

/** 获取当前组织用户列表 */
export function getDeptUsersByNikeName(params) {
  return request({
    url: '/cp/system/user/getDeptUsersByNikeName',
    method: "get",
    params: params,
  })
}
