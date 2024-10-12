import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createApp } from "vue";

import App from "./App.vue";
import services from "./Services";
import vueRouter from "./vueRouter";
import vuetify from "./vuetify";

const app = createApp(App, { services });
app.use(vueRouter);
app.use(vuetify);
app.mount("#app");
