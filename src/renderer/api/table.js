import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getUserList(date, isSigned) {
  return request({
    url: '/user/list',
    method: 'post',
    data: {
      date,
      isSigned
    }
  })
}
export function search(key) {
  return request({
    url: '/user/search' + '?key=' + key,
    method: 'get'
  })
}
