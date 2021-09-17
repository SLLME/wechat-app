// const request = require("../utils/request")

import request from "./../utils/request"

export function code2Session(data){
  return request({
    url: '/wechat/api/code2Session',
    method: 'get',
    data: data
  })
}