import request from "./../../utils/request"

/** 获取当前用户的公司列表 */
export function deptList() {
  return request({
    url: '/miniapp/system/dept/list',
    method: 'get',
  })
}

/** 获取当前用户登录信息 */
export function currentInfo() {
  return request({
    url: '/miniapp/system/dept/currentInfo',
    method: 'get',
  })
}

/** 切换当前登录组织,更新token内容 */
export function updateCurrentDeptId(currentDeptId) {
  return request({
    url: '/miniapp/system/dept/updateCurrentDeptId/' + currentDeptId,
    method: 'get',
  })
}

/** 获取当前登录对象信息 */
export function getDeptUsersByUserName() {
  return request({
    url: '/miniapp/system/user/getDeptUsersByUserName',
    method: 'get',
  })
}

/** 修改用户对象 */
export function updateUser(params) {
  return request({
    url: '/miniapp/system/user/updateUser',
    method: 'put',
    data: params
  })
}


/** 修改cpUser管理webUser中间关系 */
export function editUserRelation(params) {
  return request({
    url: '/system/relation',
    method: 'post',
    data: params
  })
}

/** 获取需要关联的web对象信息 */
export function getWebUsersByUserName(params) {
  return request({
    url: '/miniapp/system/user/getWebUsersByUserName',
    method: 'get',
    params: params
  })
}

