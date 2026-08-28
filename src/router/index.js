import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const vueRouter = new Router({
  routes: [
    {
      path: "/resume",
      name: "resume",
      component: () => import("@/components/m-resume.vue"), // Resume
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/components/m-home.vue"), // Home
    },
    {
      path: "/",
      redirect: { name: "resume" },
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
