<template>
  <div @keydown="onKeyDown" :aria-orientation="tabs!.orientation" role="tablist">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { injectTabs } from "../injectionKeys";

const tabs = inject(injectTabs);
if (!tabs) {
  throw new Error("Tabs injectable context is not provided");
}

function onKeyDown(evt: KeyboardEvent) {
  switch (evt.code) {
    case "ArrowUp":
      if (tabs!.orientation === "vertical") {
        tabs!.activatePrevItem();
      }
      break;
    case "ArrowDown":
      if (tabs!.orientation === "vertical") {
        tabs!.activateNextItem();
      }
      break;
    case "ArrowLeft":
      if (tabs!.orientation === "horizontal") {
        tabs!.activatePrevItem();
      }
      break;
    case "ArrowRight":
      if (tabs!.orientation === "horizontal") {
        tabs!.activateNextItem();
      }
      break;
    case "Home":
      tabs!.activateFirstItem();
      break;
    case "End":
      tabs!.activateLastItem();
      break;
    default:
      return;
  }
  tabs!.selectActiveItem();
  evt.preventDefault();
}
</script>

<style scoped></style>
