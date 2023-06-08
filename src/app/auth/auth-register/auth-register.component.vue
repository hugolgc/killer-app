<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { authService } from "../../../services/auth.service";
import { userService } from "../../../services/user.service";
import { placeService } from "../../../services/place.service";
import { notificationService } from "../../../services/notification.service";
import { companyHelper } from "../../../helpers/company.helper";
import { userHelper } from "../../../helpers/user.helper";
import { IPlace } from "../../../interfaces/place.interface";
import { IService } from "../../../interfaces/service.interface";
import { dataHelper } from "../../../helpers/data.helper";

interface IState {
  name: string;
  place?: IPlace;
  loading: boolean;
  service?: IService;
}

const states = reactive<IState>({
  name: "",
  loading: false,
});

const route = useRoute();
const router = useRouter();
const placeId = Number(route.params.place);

async function getPlace(id: number): Promise<void> {
  states.loading = true;

  try {
    states.place = await placeService.getPlace(id);
    states.service = states.place.company.services[0];
  } catch {
    router.push("/auth/login");
  } finally {
    states.loading = false;
  }
}

async function createUser(): Promise<void> {
  if (!states.place) return;

  states.loading = true;
  const userDto = userHelper.getUserDto(authService.credential, states.place);

  try {
    await userService.createUser(userDto);
    await authService.login();
    await userService.readUser();
  } catch (e) {
    notificationService.throw(e, "Cette adresse email est déjà utilisée");
    throw new Error();
  } finally {
    states.loading = false;
  }
}

async function updateUser(): Promise<void> {
  if (!userService.user || !states.service) return;
  states.loading = true;

  try {
    await userService.updateUser(userService.user.id, {
      first_name: states.name,
      service: dataHelper.to<IService>(states.service.id),
    });
    await userService.readUser();
    router.push("/game/mission");
  } finally {
    states.loading = false;
  }
}

async function logout(): Promise<void> {
  try {
    await authService.logout();
    userService.user = undefined;
    router.push("/auth/login");
  } catch (e) {
    notificationService.throw(e, "Nous n'avons pas pu vous déconnecter");
    throw new Error();
  }
}

getPlace(placeId);
</script>

<template>
  <div :class="{ second: userService.user }" class="progress"></div>

  <div class="heading">
    <img
      v-if="states.place && !userService.user"
      :src="companyHelper.getLogo(states.place.company)"
      :alt="states.place.company.name"
    />
    <svg
      v-else
      width="128"
      height="128"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M107.881 110.585C114.242 104.609 119.309 97.3909 122.769 89.3781C126.23 81.3654 128.01 72.728 128 64C128 28.6523 99.3477 1.52588e-05 64 1.52588e-05C28.6523 1.52588e-05 4.27271e-05 28.6523 4.27271e-05 64C-0.0100562 72.728 1.77016 81.3654 5.23065 89.3781C8.69113 97.3909 13.7583 104.609 20.119 110.585C31.9799 121.79 47.6839 128.022 64 128C80.3161 128.022 96.0201 121.79 107.881 110.585ZM25.5672 102.151C30.1757 96.3849 36.0239 91.7315 42.6774 88.536C49.331 85.3405 56.6189 83.6849 64 83.6923C71.3811 83.6849 78.669 85.3405 85.3226 88.536C91.9761 91.7315 97.8243 96.3849 102.433 102.151C97.4049 107.229 91.4186 111.259 84.8212 114.006C78.2237 116.753 71.1465 118.163 64 118.154C56.8535 118.163 49.7763 116.753 43.1789 114.006C36.5814 111.259 30.5951 107.229 25.5672 102.151ZM88.6154 44.3077C88.6154 50.8361 86.022 57.0971 81.4057 61.7134C76.7894 66.3297 70.5284 68.923 64 68.923C57.4716 68.923 51.2106 66.3297 46.5943 61.7134C41.978 57.0971 39.3846 50.8361 39.3846 44.3077C39.3846 37.7793 41.978 31.5183 46.5943 26.902C51.2106 22.2857 57.4716 19.6923 64 19.6923C70.5284 19.6923 76.7894 22.2857 81.4057 26.902C86.022 31.5183 88.6154 37.7793 88.6154 44.3077Z"
        fill="#333333"
      />
    </svg>
  </div>

  <form
    v-if="userService.user && states.place"
    @submit.prevent="updateUser()"
    action="/"
    method="post"
  >
    <input
      v-model="states.name"
      type="text"
      placeholder="Nick Surname"
      required
    />
    <select v-model="states.service">
      <option v-for="service in states.place.company.services" :value="service">
        {{ service.name }}
      </option>
    </select>
    <button type="submit">Terminer</button>
    <p @click="logout()" class="link">Se déconnecter</p>
  </form>

  <form v-else @submit.prevent="createUser()" action="/" method="post">
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
    <button type="submit">S’inscrire</button>
    <RouterLink to="/auth/login" class="link">J'ai déjà un compte</RouterLink>
  </form>
</template>

<style scoped src="./auth-register.component.scss" />
