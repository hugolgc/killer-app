<script setup lang="ts">
import GameToolbarComponent from "../game/game-toolbar/game-toolbar.component.vue";
import { missionService } from "../../services/mission.service";
import { userService } from "../../services/user.service";
import { userHelper } from "../../helpers/user.helper";
import { missionHelper } from "../../helpers/mission.helper";

if (userService.user) {
  missionService.getMissionsFromPlace(userService.user.place);
}
</script>

<template>
  <main>
    <GameToolbarComponent>Activités</GameToolbarComponent>
    <section role="list">
      <article v-for="activity in missionService.activities" role="listitem">
        <div class="avatars">
          <img
            :src="userHelper.getAvatar(activity.current_user)"
            :alt="userHelper.getFullName(activity.current_user)"
            class="avatar"
          />
          <img
            :src="userHelper.getAvatar(activity.target_user)"
            :alt="userHelper.getFullName(activity.target_user)"
            class="avatar"
          />
        </div>
        <div class="content">
          <h2>
            {{ userHelper.getFullName(activity.current_user) }}
            <span>a killé</span>
            {{ userHelper.getFullName(activity.target_user) }}
          </h2>
          <h3>
            {{ missionHelper.getTypeName(activity) }} ·
            {{ activity.objective.points }} pts
          </h3>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped src="./activity.component.scss" />
