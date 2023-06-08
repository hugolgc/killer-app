<script setup lang="ts">
import { SWITCHS } from "../../../mocks/switchs.mock";
import { ISwitch } from "../../../interfaces/swtich.interface";

interface IProp {
  modelValue: ISwitch;
}

interface IEmit {
  (e: "update:modelValue", modelValue: ISwitch): void;
}

const props = defineProps<IProp>();
const emits = defineEmits<IEmit>();
</script>

<template>
  <div :class="props.modelValue.slug" class="switch">
    <button
      @click="emits('update:modelValue', item)"
      :class="{ active: props.modelValue.slug === item.slug }"
      v-for="item in SWITCHS"
    >
      {{ item.value }}
    </button>
  </div>
</template>

<style scoped src="./ranking-switch.component.scss" />
