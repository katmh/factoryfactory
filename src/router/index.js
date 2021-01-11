import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/:base64",
    name: "dynamic",
    props: true,
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
