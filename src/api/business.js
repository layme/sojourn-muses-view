import { request } from '../utils/request'

export const listBusiness = params => {
  return request('post', '/business/listPage', params)
}

export const save = params => {
  return request('post', '/business/save', params)
}

export const del = params => {
  return request('post', '/business/delete', params)
}

export const listServerInfo = params => {
  return request('post', '/business/listServerInfo', params)
}

export const saveServerInfo = params => {
  return request('post', '/business/saveServerInfo', params)
}

export const deleteServerInfo = params => {
  return request('post', '/business/deleteServerInfo', params)
}
