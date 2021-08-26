const request = require("../utils/request")

const getImage = ()=>{
  return request.publicRequest({
    url: '/captchaImage',
    method: 'get',
  })
}

const login = () =>{
  return request.publicRequest({
    url: '/test',
    method: 'post',
  })
}

module.exports = {
  getImage,
  login
}