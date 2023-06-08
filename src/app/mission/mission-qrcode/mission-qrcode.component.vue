<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { userService } from "../../../services/user.service";
import { userHelper } from "../../../helpers/user.helper";

interface IProp {
  modelValue: boolean;
}

interface IEmit {
  (e: "update:modelValue", modelValue: boolean): void;
}

const active = ref<boolean>(false);
const props = defineProps<IProp>();
const emits = defineEmits<IEmit>();

function open(): void {
  setTimeout(() => (active.value = true));
}

function close(): void {
  active.value = false;
  setTimeout(() => emits("update:modelValue", false), 330);
}

watchEffect(() => {
  if (props.modelValue) open();
});
</script>

<template>
  <div v-if="props.modelValue && userService.user" class="qrcode">
    <div @click="close()" :class="{ active }" class="background"></div>
    <div :class="{ active }" class="body">
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
      <figure>
        <img
          :src="userHelper.getQRCode(userService.user)"
          :alt="userHelper.getFullName(userService.user)"
        />
      </figure>
    </div>
  </div>
</template>

<style scoped src="./mission-qrcode.component.scss" />
