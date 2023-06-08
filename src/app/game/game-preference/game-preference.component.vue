<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { userHelper } from "../../../helpers/user.helper";
import { userService } from "../../../services/user.service";
import { notificationService } from "../../../services/notification.service";
import { authService } from "../../../services/auth.service";
import { useRouter } from "vue-router";

interface IProp {
  modelValue: boolean;
}

interface IEmit {
  (e: "update:modelValue", modelValue: boolean): void;
}

const active = ref<boolean>(false);
const router = useRouter();
const props = defineProps<IProp>();
const emits = defineEmits<IEmit>();

function open(): void {
  setTimeout(() => (active.value = true));
}

function close(): void {
  active.value = false;
  setTimeout(() => emits("update:modelValue", false), 330);
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

watchEffect(() => {
  if (props.modelValue) open();
});
</script>

<template>
  <div v-if="props.modelValue && userService.user" class="preference">
    <div @click="close()" :class="{ active }" class="background"></div>
    <div :class="{ active }" class="body">
      <section class="user">
        <div class="heading">
          <img
            :src="userHelper.getAvatar(userService.user)"
            :alt="userHelper.getFullName(userService.user)"
            class="avatar medium"
          />
          <div class="information">
            <h2>{{ userHelper.getFullName(userService.user) }}</h2>
            <h3>{{ userService.user.service.name }}</h3>
          </div>
        </div>
        <button @click="logout()" class="button large">Déconnexion</button>
      </section>
      <section class="setting">
        <h4>Préférences</h4>
        <div role="list">
          <div role="listitem">
            <div class="vector">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.2277 20.7348C21.4203 19.6141 22.3704 18.2608 23.0193 16.7584C23.6681 15.256 24.0019 13.6365 24 12C24 5.37231 18.6277 0 12 0C5.37231 0 8.01134e-06 5.37231 8.01134e-06 12C-0.00188553 13.6365 0.331905 15.256 0.980746 16.7584C1.62959 18.2608 2.57969 19.6141 3.77231 20.7348C5.99623 22.8356 8.94073 24.0041 12 24C15.0593 24.0041 18.0038 22.8356 20.2277 20.7348ZM4.79385 19.1532C5.65795 18.0722 6.75448 17.1997 8.00202 16.6005C9.24956 16.0013 10.616 15.6909 12 15.6923C13.384 15.6909 14.7504 16.0013 15.998 16.6005C17.2455 17.1997 18.3421 18.0722 19.2062 19.1532C18.2634 20.1055 17.141 20.861 15.904 21.3761C14.667 21.8912 13.34 22.1556 12 22.1538C10.66 22.1556 9.33305 21.8912 8.09604 21.3761C6.85902 20.861 5.73659 20.1055 4.79385 19.1532ZM16.6154 8.30769C16.6154 9.53176 16.1291 10.7057 15.2636 11.5713C14.398 12.4368 13.2241 12.9231 12 12.9231C10.7759 12.9231 9.60199 12.4368 8.73643 11.5713C7.87088 10.7057 7.38462 9.53176 7.38462 8.30769C7.38462 7.08361 7.87088 5.90967 8.73643 5.04412C9.60199 4.17857 10.7759 3.69231 12 3.69231C13.2241 3.69231 14.398 4.17857 15.2636 5.04412C16.1291 5.90967 16.6154 7.08361 16.6154 8.30769Z"
                  fill="#999999"
                />
              </svg>
            </div>
            <div class="item">
              <p>Éditer le profil</p>
              <div class="item-icon">
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.25 1.5L8.75 9L1.25 16.5"
                    stroke="#999999"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div role="listitem">
            <div class="vector">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.68925 8.31081C3.68925 6.10665 4.56485 3.99276 6.12343 2.43418C7.68201 0.875601 9.7959 0 12.0001 0C14.2042 0 16.3181 0.875601 17.8767 2.43418C19.4353 3.99276 20.3109 6.10665 20.3109 8.31081V9.23424C20.3109 11.8481 21.2959 14.2293 22.9186 16.0306C23.0197 16.1427 23.0918 16.2778 23.1286 16.4241C23.1654 16.5704 23.1658 16.7236 23.1297 16.8701C23.0936 17.0166 23.0222 17.152 22.9216 17.2645C22.8211 17.3771 22.6945 17.4632 22.5529 17.5155C20.6519 18.2173 18.6623 18.7344 16.6049 19.0459C16.6512 19.6789 16.5665 20.3147 16.3561 20.9135C16.1457 21.5124 15.814 22.0614 15.3819 22.5263C14.9498 22.9912 14.4264 23.362 13.8446 23.6156C13.2627 23.8691 12.6348 24 12.0001 24C11.3653 24 10.7374 23.8691 10.1556 23.6156C9.5737 23.362 9.05036 22.9912 8.61823 22.5263C8.18611 22.0614 7.85448 21.5124 7.64405 20.9135C7.43363 20.3147 7.34894 19.6789 7.39526 19.0459C5.36576 18.7384 3.37281 18.2252 1.44718 17.5143C1.30575 17.4621 1.17926 17.376 1.07875 17.2637C0.978237 17.1513 0.906764 17.016 0.870572 16.8697C0.83438 16.7233 0.834569 16.5703 0.871123 16.4241C0.907677 16.2778 0.979485 16.1427 1.08027 16.0306C2.76313 14.1674 3.69304 11.745 3.68925 9.23424V8.31081ZM9.23226 19.2688C9.21651 19.6421 9.27643 20.0147 9.40843 20.3642C9.54042 20.7138 9.74176 21.033 10.0003 21.3027C10.2589 21.5724 10.5693 21.787 10.913 21.9336C11.2567 22.0802 11.6264 22.1558 12.0001 22.1558C12.3737 22.1558 12.7435 22.0802 13.0871 21.9336C13.4308 21.787 13.7412 21.5724 13.9998 21.3027C14.2584 21.033 14.4597 20.7138 14.5917 20.3642C14.7237 20.0147 14.7836 19.6421 14.7679 19.2688C12.9264 19.4346 11.0737 19.4346 9.23226 19.2688Z"
                  fill="#999999"
                />
              </svg>
            </div>
            <div class="item">
              <p>Notifications</p>
              <button class="switch">
                <span class="sr-only">Activation des notifications</span>
              </button>
            </div>
          </div>
          <div role="listitem">
            <div class="vector">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 12C0 5.37231 5.37231 0 12 0C18.6277 0 24 5.37231 24 12C24 18.6277 18.6277 24 12 24C5.37231 24 0 18.6277 0 12ZM16.4431 9.76738C16.5169 9.66899 16.5704 9.55682 16.6002 9.43748C16.6301 9.31813 16.6358 9.19402 16.6171 9.07244C16.5983 8.95085 16.5554 8.83425 16.4909 8.72947C16.4264 8.6247 16.3416 8.53388 16.2415 8.46234C16.1415 8.3908 16.0281 8.33999 15.9081 8.3129C15.7881 8.2858 15.6639 8.28297 15.5427 8.30457C15.4216 8.32617 15.306 8.37176 15.2028 8.43866C15.0996 8.50556 15.0107 8.59243 14.9415 8.69415L10.9588 14.2695L8.96 12.2708C8.78502 12.1077 8.55357 12.0189 8.31443 12.0232C8.07529 12.0274 7.84713 12.1243 7.678 12.2934C7.50888 12.4625 7.412 12.6907 7.40778 12.9298C7.40357 13.169 7.49233 13.4004 7.65539 13.5754L10.4246 16.3446C10.5194 16.4393 10.6336 16.5122 10.7594 16.5583C10.8851 16.6044 11.0194 16.6226 11.1529 16.6116C11.2864 16.6006 11.4159 16.5607 11.5325 16.4946C11.649 16.4285 11.7497 16.3379 11.8277 16.2289L16.4431 9.76738Z"
                  fill="#999999"
                />
              </svg>
            </div>
            <div class="item">
              <p>Statut</p>
              <button class="switch active">
                <span class="sr-only">Activation du statut</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped src="./game-preference.component.scss" />
