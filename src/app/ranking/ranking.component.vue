<script setup lang="ts">
import { computed, ref } from "vue";
import { userHelper } from "../../helpers/user.helper";
import { userService } from "../../services/user.service";
import { SWITCHS } from "../../mocks/switchs.mock";
import { ISwitch } from "../../interfaces/swtich.interface";
import SwitchComponent from "../_switch/switch.component.vue";
import ToolbarComponent from "../_toolbar/toolbar.component.vue";

const selectedSwitch = ref<ISwitch>(SWITCHS[0]);
const users = computed(() => {
  if (!userService.user) return [];
  return userHelper.getUsersFromSwitch(
    userService.user,
    userService.users,
    selectedSwitch.value
  );
});

userService.getUsers();
</script>

<template>
  <main>
    <ToolbarComponent>Classements</ToolbarComponent>
    <SwitchComponent v-model="selectedSwitch" />
    <section role="list">
      <article v-for="(user, index) in users">
        <h4 :class="`is-${index}`">{{ index + 1 }}</h4>
        <img
          :src="userHelper.getAvatar(user)"
          :alt="userHelper.getFullName(user)"
          class="avatar"
        />
        <div class="user">
          <h2>{{ userHelper.getFullName(user) }}</h2>
          <h3>
            {{ userHelper.getDescriptionFromSwitch(user, selectedSwitch) }}
          </h3>
        </div>
        <h5>{{ user.points }} pts</h5>
      </article>
    </section>
  </main>
</template>

<style scoped src="./ranking.component.scss" />
