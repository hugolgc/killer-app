<script setup lang="ts">
import { ref } from "vue";
import { userHelper } from "../../../helpers/user.helper";
import { userService } from "../../../services/user.service";
import GamePreferenceComponent from "../game-preference/game-preference.component.vue";

const showPreferenceComponent = ref<boolean>(false);
</script>

<template>
  <GamePreferenceComponent v-model="showPreferenceComponent" />
  <div class="toolbar">
    <h1>
      <slot />
    </h1>
    <img
      v-if="userService.user"
      @click="showPreferenceComponent = true"
      :src="userHelper.getAvatar(userService.user)"
      :alt="userHelper.getFullName(userService.user)"
      class="avatar"
    />
  </div>
</template>

<style scoped src="./game-toolbar.component.scss" />
