<script setup lang="ts">
import { userHelper } from "../../helpers/user.helper";
import { userService } from "../../services/user.service";
</script>

<template>
  <div class="toolbar">
    <h1>
      <slot />
    </h1>
    <img
      v-if="userService.user"
      :src="userHelper.getAvatar(userService.user)"
      :alt="userHelper.getFullName(userService.user)"
      class="avatar"
    />
  </div>
</template>

<style scoped src="./toolbar.component.scss" />
