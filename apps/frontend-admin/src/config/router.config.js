// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      {
          path: '/dashboard/workplace',
          name: 'Workplace',
          component: () => import('@/views/dashboard/Workplace'),
          meta: { title: '首页', keepAlive: true, permission: ['dashboard'] }
      },
      {
        path: '/datas',
          name: 'DatasList',
          component: () => import('@/views/list/spiderdataitem'),
          meta: { title: '数据管理', keepAlive: true, permission: ['datas'] }
      },
      {
          path: '/users',
            name: 'UserList',
            component: () => import('@/views/list/user'),
            meta: { title: '用户管理', keepAlive: true, permission: ['users'] }
      },
      {
        path: '/spiders',
        name: 'spidersManage',
        component: RouteView,
        meta: { title: '爬虫管理', icon: 'slack', permission: [ 'spiders' ] },
        children: [
          {
            path: '/spiders/queue',
            name: 'spiderQueue',
            component: () => import('@/views/spider/queue'),
            meta: { title: '用户任务', keepAlive: true, permission: ['spiders.queue'] }
          },
          {
            path: '/spiders/job',
            name: 'spiderJob',
            component: () => import('@/views/spider/job'),
            meta: { title: '爬虫作业', keepAlive: true, permission: ['spiders.job'] }
          },
          {
            path: '/spiders/joblog',
            name: 'spiderJoblog',
            component: () => import('@/views/spider/joblog'),
            meta: { title: '作业日志', keepAlive: true, permission: ['spiders.job'] }
          }]
        },
      {
        path: '/system',
        name: 'systemManage',
        component: RouteView,
        meta: { title: '系统管理', icon: 'slack', permission: [ 'system' ] },
        redirect: '/system/administer',
        children: [
          {
            path: '/system/administer',
            name: 'UserList',
            component: () => import('@/views/other/UserList'),
            meta: { title: '用户列表', keepAlive: true, permission: ['system.administer'] }
          },
          {
            path: '/system/role',
            name: 'RoleList',
            component: () => import('@/views/other/RoleList'),
            meta: { title: '角色列表', keepAlive: true, permission: ['system.role'] }
          },
          {
            path: '/system/permission',
            name: 'PermissionList',
            component: () => import('@/views/other/PermissionList'),
            meta: { title: '权限列表', keepAlive: true, permission: ['system.permission'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
