import { request } from '../utils/request'

export const getRedis = params => {
  return request('get', '/redis/search', { key: params })
}

export const delRedis = params => {
  return request('post', '/redis/del', { key: params }, { contentType: 'application/x-www-form-urlencoded' })
}
