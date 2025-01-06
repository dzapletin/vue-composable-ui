<template>
  <div
    @keydown="onKeyDown"
    :aria-orientation="props.orientation"
    role="tablist"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { injectTabs } from "../injectionKeys";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
  }>(),
  {
    orientation: "horizontal",
  }
);

const tabs = inject(injectTabs);
if (!tabs) {
  throw new Error("Tabs injectable context is not provided");
}

function onKeyDown(evt: KeyboardEvent) {
  switch (evt.code) {
    case "ArrowUp":
      if (props.orientation === "vertical") {
        tabs!.activatePrevItem({ focus: true, loop: true });
      }
      break;
    case "ArrowDown":
      if (props.orientation === "vertical") {
        tabs!.activateNextItem({ focus: true, loop: true });
      }
      break;
    case "ArrowLeft":
      if (props.orientation === "horizontal") {
        tabs!.activatePrevItem({ focus: true, loop: true });
      }
      break;
    case "ArrowRight":
      if (props.orientation === "horizontal") {
        tabs!.activateNextItem({ focus: true, loop: true });
      }
      break;
    case "Home":
      tabs!.activateFirstItem({ focus: true });
      break;
    case "End":
      tabs!.activateLastItem({ focus: true });
      break;
    default:
      return;
  }
  tabs!.selectActiveItem();
  evt.preventDefault();
}
</script>

<style scoped></style>
