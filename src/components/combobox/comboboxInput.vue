<template>
  <input v-model="model" v-bind="inputAttrs" autocomplete="off" />
</template>

<script setup lang="ts">
import { computed, inject, watch } from "vue";

import { injectCombobox } from "../injectionKeys";

const combobox = inject(injectCombobox);
if (!combobox) {
  throw new Error("Combobox injectable context is not provided");
}

const model = defineModel<string>();

function updateValue() {
  model.value = combobox!.displayValue.value;
}

watch(combobox!.displayValue, updateValue, { immediate: true });

const inputAttrs = computed(() => ({
  oninput: () => combobox!.open({ focus: true }),
  onchange: updateValue,
  ...combobox!.activatorAttrs.value,
}));
</script>
