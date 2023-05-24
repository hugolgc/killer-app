import { createApp } from "vue";
import { appRouter } from "./app/app.router";
import AppComponent from "./app/app.component.vue";
import "./assets/main.scss";

createApp(AppComponent).use(appRouter).mount("#app");
