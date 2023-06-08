<script setup lang="ts">
import { ref } from "vue";
import { IMission } from "../../../interfaces/mission.interface";
import { userHelper } from "../../../helpers/user.helper";
import { missionHelper } from "../../../helpers/mission.helper";
import { notificationService } from "../../../services/notification.service";
import JSConfetti from "js-confetti";

const mission = ref<IMission>();
const active = ref<boolean>(false);
const confetti = new JSConfetti();

function open(): void {
  setTimeout(() => (active.value = true));
}

function close(): void {
  active.value = false;
  setTimeout(() => (mission.value = undefined), 330);
}

function share(mission: IMission): void {
  if (!navigator.share) {
    notificationService.throw(
      undefined,
      "Votre appareil ne supporte pas le partage"
    );
  }

  navigator.share({
    title: `J'ai killé ${userHelper.getFullName(mission.target_user)}`,
    text: `${missionHelper.getTypeName(mission)} · ${mission.objective.points}`,
  });
}

document.addEventListener("completeMission", (missionEvent) => {
  // @ts-ignore
  const completeMission = <IMission>missionEvent.detail;
  mission.value = completeMission;
  open();
  confetti.addConfetti();
});
</script>

<template>
  <div v-if="mission" class="resume">
    <div @click="close()" :class="{ active }" class="background"></div>
    <div :class="{ active }" class="body">
      <div class="avatars">
        <img
          :src="userHelper.getAvatar(mission.current_user)"
          :alt="userHelper.getFullName(mission.current_user)"
          class="avatar large"
        />
        <img
          :src="userHelper.getAvatar(mission.target_user)"
          :alt="userHelper.getFullName(mission.target_user)"
          class="avatar large"
        />
      </div>
      <h2>
        Vous avez killé <br />
        {{ userHelper.getFullName(mission.target_user) }}
      </h2>
      <div class="card">
        <div class="information">
          <h3>{{ missionHelper.getTypeName(mission) }}</h3>
          <ul>
            <li>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0C3.58154 0 0 3.58154 0 8C0 12.4185 3.58154 16 8 16C12.4185 16 16 12.4185 16 8C16 3.58154 12.4185 0 8 0ZM8.61538 3.07692C8.61538 2.91371 8.55055 2.75719 8.43514 2.64178C8.31974 2.52637 8.16321 2.46154 8 2.46154C7.83679 2.46154 7.68026 2.52637 7.56486 2.64178C7.44945 2.75719 7.38462 2.91371 7.38462 3.07692V8C7.38462 8.33969 7.66031 8.61538 8 8.61538H11.6923C11.8555 8.61538 12.012 8.55055 12.1275 8.43514C12.2429 8.31974 12.3077 8.16321 12.3077 8C12.3077 7.83679 12.2429 7.68026 12.1275 7.56486C12.012 7.44945 11.8555 7.38462 11.6923 7.38462H8.61538V3.07692Z"
                  fill="#999999"
                />
              </svg>
              <span>3 jours d'activité</span>
            </li>
            <li>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.6667 0C12.7467 0 12 0.689231 12 1.53846V14.4615C12 15.3108 12.7467 16 13.6667 16H14.3333C15.2533 16 16 15.3108 16 14.4615V1.53846C16 0.68841 15.2533 0 14.3333 0H13.6667ZM6 5.23077C6 4.38072 6.74667 3.69231 7.66667 3.69231H8.33333C9.25422 3.69231 10 4.38154 10 5.23077V14.4615C10 15.3108 9.25333 16 8.33333 16H7.66667C7.22464 16 6.80072 15.8379 6.48815 15.5494C6.17559 15.2609 6 14.8696 6 14.4615V5.23077ZM0 8.92308C0 8.07303 0.746667 7.38462 1.66667 7.38462H2.33333C3.25422 7.38462 4 8.07385 4 8.92308V14.4615C4 15.3108 3.25333 16 2.33333 16H1.66667C1.22464 16 0.800716 15.8379 0.488155 15.5494C0.175595 15.2609 0 14.8696 0 14.4615V8.92308Z"
                  fill="#999999"
                />
              </svg>
              <span>{{ mission.objective.points }} points gagnés</span>
            </li>
          </ul>
        </div>
        <img src="../../../assets/faces.png" alt="Pixel Art" class="faces" />
      </div>
      <div class="actions">
        <button @click="share(mission)" class="button big">Partager</button>
        <button @click="close()" class="button big outline">Continuer</button>
      </div>
    </div>
  </div>
</template>

<style scoped src="./mission-resume.component.scss" />
