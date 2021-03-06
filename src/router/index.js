import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "../views/ContactBook.vue";
import ContactAdd from "../views/ContactAdd.vue";

const routes = [
//   {
//     path: "/",
//     name: "ContactBook",
//     component: ContactBook,
//   },
  {
    path: "/",
    name: "ContactAdd",
    component: ContactAdd,
  },
  {
    path: "/contacts/:id",
    name: "EditContact",
    component: () => import("../views/ContactEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
