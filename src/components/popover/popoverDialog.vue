<template>
  <div
    v-if="popover!.isOpen.value"
    @keydown="onKeyDown"
    :id="popover!.popoverId"
    :role="popover!.role"
    :aria-labelledby="popover!.activatorId"
    tabindex="-1"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { injectPopover } from "../injectionKeys";

const popover = inject(injectPopover);
if (!popover) {
  throw new Error("Popover injectable context is not provided");
}

function onKeyDown(evt: KeyboardEvent) {
  switch (evt.code) {
    case "Escape":
      popover!.close();
      break;
    default:
      return;
  }
  evt.preventDefault();
}
</script>

<style scoped></style>
