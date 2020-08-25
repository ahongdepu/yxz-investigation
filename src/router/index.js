import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/layout';

Vue.use(VueRouter);

export const menu = [
  {
    path: '/tag-manage',
    name: 'TagManage',
    component: () => import(/* webpackChunkName: "TagManage" */ '../views/tag-manage'),
  },
  {
    path: '/tag-list',
    name: 'TagList',
    component: () => import(/* webpackChunkName: "TagList" */ '../views/tag-list'),
  },
  {
    path: '/tag-detail/:projectId',
    name: 'TagDetail',
    father: '/tag-list', // 自定义字段  表明父级
    component: () => import(/* webpackChunkName: "TagDetail" */ '../views/tag-detail'),
  },
  {
    path: '/tag-examine/:projectId',
    name: 'TagExamine',
    father: '/tag-manage', // 自定义字段  表明父级
    component: () => import(/* webpackChunkName: "TagExamine" */ '../views/tag-examine'),
  },
  {
    path: '/tag-count',
    name: 'TagCount',
    father: '/tag-manage', // 自定义字段  表明父级
    component: () => import(/* webpackChunkName: "TagCount" */ '../views/tag-count'),
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      ...menu,
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/register'),
  },

  // {
  //   path: '/demo',
  //   name: 'demo',
  //   component: () => import(/* webpackChunkName: "demo" */ '../views/demo'),
  // },
  // {
  //   path: '/animate',
  //   name: 'animate',
  //   component: () =>
  //     import(/* webpackChunkName: "animate" */ '../views/animate'),
  // },
  // {
  //   path: '/tween',
  //   name: 'tween',
  //   component: () => import(/* webpackChunkName: "tween" */ '../views/tween'),
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
