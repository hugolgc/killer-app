<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { IMission } from "../../../interfaces/mission.interface";
import { userHelper } from "../../../helpers/user.helper";
import QrScanner from "qr-scanner";
import { missionService } from "../../../services/mission.service";

interface IProp {
  modelValue?: IMission;
}

interface IEmit {
  (e: "update:modelValue", modelValue?: IMission): void;
}

const scanner = ref<QrScanner>();
const active = ref<boolean>(false);
const props = defineProps<IProp>();
const emits = defineEmits<IEmit>();

function open(): void {
  setTimeout(() => {
    active.value = true;
    scanner.value = new QrScanner(document.querySelector("video")!, scan);
    scanner.value.start();
  });
}

function close(): void {
  active.value = false;
  setTimeout(() => emits("update:modelValue", undefined), 330);
}

async function scan(targetUserId: string): Promise<void> {
  const missionEvent = new CustomEvent<IMission>("completeMission", {
    detail: props.modelValue,
  });

  if (
    scanner.value &&
    props.modelValue &&
    props.modelValue.target_user.id === targetUserId
  ) {
    await missionService.completeMission(props.modelValue);
    missionService.getMissionsFromUser(props.modelValue.current_user);
    document.dispatchEvent(missionEvent);
    scanner.value.destroy();
    close();
  }
}

watchEffect(() => {
  if (props.modelValue) open();
});
</script>

<template>
  <div v-if="props.modelValue" class="scanner">
    <div @click="close()" :class="{ active }" class="background"></div>
    <div :class="{ active }" class="body">
      <div class="heading">
        <img
          :src="userHelper.getAvatar(props.modelValue.target_user)"
          :alt="userHelper.getFullName(props.modelValue.target_user)"
          class="avatar"
        />
        <p class="content">{{ props.modelValue.objective.value }}</p>
        <button @click="close()" class="button icon">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.75"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div @click="scan(props.modelValue.target_user.id)" class="preview">
        <video></video>
      </div>
    </div>
  </div>
</template>

<style scoped src="./mission-scanner.component.scss" />
