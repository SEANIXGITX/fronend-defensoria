import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    component: () => import(/* webpackChunckName: "Main" */ '../layouts/PrivateLayout.vue'),
    children: [
      {
        path: '/home',
        alias: 'home',
        name: 'home',
        component: () => import('../views/private/Home.vue'),
      },
      {
        path: '/solicitudes',
        alias: '/solicitudes',
        name: 'solicitudes',
        component: () => import('../views/private/solicitudes/RequestTypes.vue'),
      },
      {
        path: '/solicitudDetalle/:id',
        alias: '/solicitudDetalle/:id',
        name: 'solicitudDetalle',
        component: () => import('../views/private/solicitudes/RequestList.vue'),
      },
      {
        path: '/programas',
        alias: '/programas',
        name: 'programas',
        component: () => import('../views/private/planificacion/Planificacion.vue'),
      },
    ],
  },
  {
    path: '/',
    alias: '/',
    name: 'login',
    component: () => import('../views/public/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//TODO: implement a guardian validation
router.beforeEach((to, from, next) => {
  console.log(from, to);
  next();
});

export default router;
