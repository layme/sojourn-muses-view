import main from '../views/layout/TheLayout'

/**
 * meta {
 *   title: 标题
 *   hideMenu: 隐藏菜单
 *   access: 权限
 * }
 */
export default [
  {
    path: '/',
    name: '',
    redirect: '/index',
    meta: {
      title: '大盘',
      icon: 'el-icon-odometer',
      hideMenu: true
    },
    component: main,
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: 'menu.home',
          icon: 'el-icon-s-home',
          hideMenu: true
        },
        component: () => import('../views/pages/PageHome')
      }
    ]
  },
  {
    path: '/cache',
    name: 'cache',
    meta: {
      title: 'menu.cache',
      icon: 'el-icon-truck'
    },
    component: main,
    children: [
      {
        path: 'redis',
        name: 'redis',
        meta: {
          title: 'menu.redis',
          icon: 'el-icon-truck'
        },
        component: () => import('../views/cache/index')
      }
    ]
  },
  {
    path: '/config',
    name: 'config',
    meta: {
      title: 'menu.config',
      icon: 'el-icon-truck'
    },
    component: main,
    children: [
      {
        path: 'zookeeper',
        name: 'zookeeper',
        meta: {
          title: 'menu.zookeeper',
          icon: 'el-icon-truck'
        },
        component: () => import('../views/config/index')
      }
    ]
  },
  {
    path: '/job',
    name: 'job',
    meta: {
      title: 'menu.job',
      icon: 'el-icon-truck'
    },
    component: main,
    children: [
      {
        path: 'business',
        name: 'business',
        meta: {
          title: 'menu.business',
          icon: 'el-icon-truck'
        },
        component: () => import('../views/job/business/index')
      },
      {
        path: 'trigger',
        name: 'trigger',
        meta: {
          title: 'menu.trigger',
          icon: 'el-icon-truck'
        },
        component: () => import('../views/job/trigger/index')
      }
    ]
  },
  {
    path: '/recoup',
    name: 'recoup',
    meta: {
      title: 'menu.recoup',
      icon: 'el-icon-truck'
    },
    component: main,
    children: [
      {
        path: 'elastic',
        name: 'elastic',
        meta: {
          title: 'menu.elastic',
          icon: 'el-icon-truck'
        },
        component: () => import('../views/recoup/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      hideInMenu: true
    },
    component: () => import('../views/login/AppLogin')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('../views/error/AppError404')
  }
]
