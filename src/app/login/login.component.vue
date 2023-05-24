<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";

const router = useRouter();
const loading = ref<boolean>(false);

async function login(): Promise<void> {
  loading.value = true;

  try {
    await authService.login();
    await userService.read();
    if (userService.user) router.push("/game/mission");
  } catch (e) {
    console.warn("identifiants incorrectes");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="heading">
    <h1>Connectez-vous</h1>
    <h2>
      Lorem ipsum dolor sit amet, consectetur damen elitadipiscing, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua enim.
    </h2>
  </div>
  <form @submit.prevent="login()" action="/" method="post">
    <input
      v-model="authService.credential.email"
      type="email"
      placeholder="email@exemple.com"
      required
    />
    <input
      v-model="authService.credential.password"
      type="password"
      placeholder="••••••••••"
      required
    />
    <button type="submit">Connexion</button>
  </form>
</template>

<style scoped src="./login.component.scss" />
