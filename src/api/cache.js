import { request } from '../utils/request'

export const getRedis = params => {
  return request('get', '/redis/search', params)
}
