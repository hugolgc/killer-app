import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "../guard/auth.guard";
import { gameGuard } from "../guard/game.guard";
import LoginComponent from "./login/login.component.vue";
import MissionComponent from "./mission/mission.component.vue";
import RankingComponent from "./ranking/ranking.component.vue";
import ActivityComponent from "./activity/activity.component.vue";
import AuthComponent from "./_auth/auth.component.vue";
import GameComponent from "./_game/game.component.vue";

export const appRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/auth/login" },
    {
      path: "/auth",
      redirect: "/auth/login",
      component: AuthComponent,
      beforeEnter: () => authGuard(),
      children: [{ path: "login", component: LoginComponent }],
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
