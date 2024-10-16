<template>
  <div
    v-if="menu!.isOpen.value"
    @keydown="onKeyDown"
    :id="menu!.menuId"
    :aria-activedescendant="menu!.activeItemId.value"
    :aria-labelledby="menu!.activatorId"
    role="menu"
    tabindex="-1"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { injectMenu } from "../injectionKeys";

const menu = inject(injectMenu);
if (!menu) {
  throw new Error("Menu injectable context is not provided");
}

function onKeyDown(evt: KeyboardEvent) {
  switch (evt.code) {
    case "ArrowUp":
      menu!.activatePrevItem({ focus: true, loop: false });
      break;
    case "ArrowDown":
      menu!.activateNextItem({ focus: true, loop: false });
      break;
    case "Home":
      menu!.activateFirstItem({ focus: true });
      break;
    case "End":
      menu!.activateLastItem({ focus: true });
      break;
    case "Escape":
      menu!.close();
      break;
    case "Tab":
      menu!.isOpen.value = false;
      return;
    default:
      return;
  }
  evt.preventDefault();
}
</script>

<style scoped></style>
