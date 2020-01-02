import request from '@/utils/request'

export function login(mobile, password, role) {
  return request({
    url: '/gyenno-admin/login/api/login',
    method: 'get',
    params: {
      mobile,
      password,
      role
    }
  })
}
// export function login(mobile, password, role) {
//   return request({
//     url: '/gyenno-admin/login/api/login',
//     method: 'post',
//     data: {
//       mobile,
//       password,
//       role
//     }
//   })
// }

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
