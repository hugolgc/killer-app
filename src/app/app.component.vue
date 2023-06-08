<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import { userService } from "../services/user.service";
import NotificationComponent from "./notification/notification.component.vue";

const router = useRouter();
const loading = ref<boolean>(false);

async function readUser(): Promise<void> {
  loading.value = true;

  try {
    await userService.readUser();
    if (userService.user) router.push("/game/mission");
  } finally {
    loading.value = false;
  }
}

if (localStorage.getItem("auth_token")) readUser();
</script>

<template>
  <NotificationComponent />
  <RouterView />
</template>

<style scoped src="./app.component.scss" />
