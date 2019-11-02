import main from '../views/layout/TheLayout'

/**
 * meta {
 *   title: 标题
 *   hideMenu: 隐藏菜单
 * }
 */
export default [
  {
    path: '/',
    name: 'index',
    redirect: '/index',
    meta: {
      title: '大盘',
      icon: 'el-icon-odometer'
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
    path: '/vehicle',
    name: 'vehicle',
    meta: {
      title: '车辆',
      icon: 'el-icon-truck'
    },
    component: main,
    children: [
      {
        path: 'sold',
        name: 'sold',
        meta: {
          title: '已售车辆',
          icon: 'el-icon-truck'
        }
      },
      {
        path: 'stock',
        name: 'stock',
        meta: {
          title: '库存车辆',
          icon: 'el-icon-truck'
        }
      }
    ]
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
