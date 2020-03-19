import request from '@/utils/request'

export function login(username, pwd) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      pwd
    }
  })
}

export function getInfo(uid) {
  return request({
    url: '/user/info/' + uid,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
