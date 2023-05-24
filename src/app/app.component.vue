<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import { userService } from "../services/user.service";

const router = useRouter();
const loading = ref<boolean>(false);

async function read(): Promise<void> {
  loading.value = true;

  try {
    await userService.read();
    if (userService.user) router.push("/game/mission");
  } finally {
    loading.value = false;
  }
}

if (localStorage.getItem("auth_token")) read();
</script>

<template>
  <RouterView />
</template>

<style scoped src="./app.component.scss" />
