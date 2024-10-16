<template>
  <div v-if="combobox!.isOpen.value" :id="combobox!.popoverId" role="listbox">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { injectCombobox } from "../injectionKeys";

const combobox = inject(injectCombobox);
if (!combobox) {
  throw new Error("Combobox injectable context is not provided");
}
</script>

<style scoped></style>
