import Vue from 'vue'
import VueRouter from 'vue-router'
import routeConf from './router.conf'
Vue.use(VueRouter)

let routes = [{
  path: '/',
  redirect: '/changeLog'
}, {
  path: '/changeLog',
  name: 'changeLog',
  component: r => require.ensure([], () => r(require('../views/change-log.md')))
}, {
  path: '/quickStart',
  name: 'quickStart',
  component: r => require.ensure([], () => r(require('../views/quickstart.md')))
}];


for (const key in routeConf) {
  const routeMap = routeConf[key];
  const pathPrefix = key;
  for (const routeKey in routeMap) {
    const routeInfo = routeMap[routeKey];
    routes.push({
      path: `/${pathPrefix}/${routeKey}`,
      name: routeKey,
      component: r => require.ensure([], () => r(require(`../docs/${routeInfo.path}.md`)))
    })
  }
}

export default new VueRouter({
  history: true,
  mode: 'history',
  routes: routes
})
