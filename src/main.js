import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import "./assets/tailwind.css";
import vClickOutside from "./lib/clickOutside";

createApp(App)
  .directive("click-outside", vClickOutside)
  .use(router)
  .mount("#app");
