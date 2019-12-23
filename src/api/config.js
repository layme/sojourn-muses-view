import { request } from '../utils/request'

export const listSysConfig = params => {
  return request('post', '/sysConfig/listPage', params)
}

export const save = params => {
  return request('post', '/sysConfig/save', params)
}

export const update = params => {
  return request('post', '/sysConfig/update', params)
}

export const del = params => {
  return request('post', '/sysConfig/delete', params)
}

export const reBuild = params => {
  return request('post', '/sysConfig/reBuild', params)
}
