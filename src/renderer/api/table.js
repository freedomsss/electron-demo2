import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/gyenno-admin/doctor/api/doctor',
    method: 'get',
    params
  })
}
