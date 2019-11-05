import Vue from 'vue'
import { getDate } from '../utils/util'

const dateTimeFilter = val => {
  return getDate(val, 'all')
}

const dateFilter = val => {
  return getDate(val, 'date')
}

const timeFilter = val => {
  return getDate(val, 'time')
}

const nullFilter = val => {
  if (val) {
    return val
  } else {
    return '-'
  }
}

Vue.filter('dateTimeFilter', dateTimeFilter)
Vue.filter('dateFilter', dateFilter)
Vue.filter('timeFilter', timeFilter)
Vue.filter('nullFilter', nullFilter)
