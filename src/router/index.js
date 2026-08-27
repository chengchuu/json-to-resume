import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const vueRouter = new Router({
  routes: [
    {
      path: "/resume",
      name: "resume",
      component: resolve => require(["@/components/m-resume.vue"], resolve), // Resume
    },
    {
      path: "/home",
      name: "home",
      component: resolve => require(["@/components/m-home.vue"], resolve), // Resume
    },
    {
      path: "/",
      redirect: {name: "resume"},
    },
  ],
});

let routerCount = 0;
vueRouter.afterEach(() => {
  if (routerCount > 0) {
    // Not the first page load.
  }
  routerCount++;
});

export default vueRouter;
