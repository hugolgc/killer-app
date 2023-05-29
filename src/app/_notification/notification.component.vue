<script setup lang="ts">
import { notificationService } from "../../services/notification.service";
</script>

<template>
  <TransitionGroup name="list" tag="section" class="notification">
    <template
      v-for="notification in notificationService.notifications"
      :key="notification.id"
    >
      <article v-if="notification.active">
        <p>{{ notification.value }}</p>
        <button
          @click="notificationService.closeNotification(notification)"
          class="button icon"
        >
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
      </article>
    </template>
  </TransitionGroup>
</template>

<style scoped src="./notification.component.scss" />
