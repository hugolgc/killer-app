import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "../guard/auth.guard";
import { gameGuard } from "../guard/game.guard";
import AuthComponent from "./auth/auth.component.vue";
import GameComponent from "./game/game.component.vue";
import MissionComponent from "./mission/mission.component.vue";
import RankingComponent from "./ranking/ranking.component.vue";
import ActivityComponent from "./activity/activity.component.vue";
import AuthLoginComponent from "./auth/auth-login/auth-login.component.vue";
import AuthRegisterComponent from "./auth/auth-register/auth-register.component.vue";

export const appRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/auth/login" },
    {
      path: "/auth",
      redirect: "/auth/login",
      component: AuthComponent,
      beforeEnter: () => authGuard(),
      children: [
        { path: "login", component: AuthLoginComponent },
        { path: "register", component: AuthRegisterComponent },
      ],
    },
    {
      path: "/game",
      redirect: "/game/mission",
      component: GameComponent,
      beforeEnter: () => gameGuard(),
      children: [
        { path: "mission", component: MissionComponent },
        { path: "ranking", component: RankingComponent },
        { path: "activity", component: ActivityComponent },
      ],
    },
  ],
});
