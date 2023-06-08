<script setup lang="ts">
import { ref } from "vue";
import { userService } from "../../services/user.service";
import { missionService } from "../../services/mission.service";
import { userHelper } from "../../helpers/user.helper";
import { missionHelper } from "../../helpers/mission.helper";
import { IMission } from "../../interfaces/mission.interface";
import GameToolbarComponent from "../game/game-toolbar/game-toolbar.component.vue";
import MissionQRCodeComponent from "../mission/mission-qrcode/mission-qrcode.component.vue";
import MissionScannerComponent from "./mission-scanner/mission-scanner.component.vue";

const showQRCodeComponent = ref<boolean>(false);
const selectedMission = ref<IMission>();

if (userService.user) {
  missionService.getMissionsFromUser(userService.user);
}
</script>

<template>
  <main>
    <GameToolbarComponent>Missions</GameToolbarComponent>
    <MissionQRCodeComponent v-model="showQRCodeComponent" />
    <MissionScannerComponent v-model="selectedMission" />
    <section role="list">
      <article role="listitem">
        <header>
          <div class="target">
            <h2>Voir mon QRCode</h2>
            <h3>Attention cela doit rester secret !</h3>
          </div>
          <button @click="showQRCodeComponent = true" class="button icon">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 9.375v-4.5zM4.875 4.5a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 01-1.875-1.875v-4.5zm1.875-.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75A.75.75 0 016 7.5v-.75zm9.75 0A.75.75 0 0116.5 6h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 013 19.125v-4.5zm1.875-.375a.375.375 0 00-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 00.375-.375v-4.5a.375.375 0 00-.375-.375h-4.5zm7.875-.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm6 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zM6 16.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm9.75 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm-3 3a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75zm6 0a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </header>
      </article>
      <article v-for="mission in missionService.missions" role="listitem">
        <header>
          <img
            :src="userHelper.getAvatar(mission.target_user)"
            :alt="userHelper.getFullName(mission.target_user)"
            class="avatar"
          />
          <div class="target">
            <h2>{{ userHelper.getFullName(mission.target_user) }}</h2>
            <h3>{{ mission.target_user.service.name }}</h3>
          </div>
          <button @click="selectedMission = mission" class="button">
            Killer
          </button>
        </header>
        <h4>{{ mission.objective.value }}</h4>
        <footer>
          <div class="progress">
            <div
              :style="{ width: missionHelper.getPercentage(mission) }"
              class="bar"
            ></div>
          </div>
          <div class="information">
            <h5 class="type">
              {{ missionHelper.getTypeName(mission) }} ·
              {{ mission.objective.points }} pts
            </h5>
            <h6 class="time">{{ missionHelper.getCountdown(mission) }}</h6>
          </div>
        </footer>
      </article>
    </section>
  </main>
</template>

<style scoped src="./mission.component.scss" />
