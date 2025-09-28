<template>
  <input
    v-model="model"
    v-bind="combobox.activatorAttrs"
    @click="combobox.open({ focus: false })"
    @keydown="combobox.activatorOnKeyDown"
    @input="combobox.open({ focus: true })"
    @change="updateValue"
    autocomplete="off"
  />
</template>

<script setup lang="ts">
import { inject, watch } from "vue";

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
</script>
