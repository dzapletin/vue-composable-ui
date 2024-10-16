<template>
  <div
    @keydown="onKeyDown"
    :aria-activedescendant="activeItemId"
    :aria-orientation="orientation"
    :aria-multiselectable="multiselectable"
    role="listbox"
    tabindex="0"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useList } from "../../composables/list";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
    multiselectable?: boolean;
    loop?: boolean;
  }>(),
  {
    orientation: "vertical",
    multiselectable: false,
    loop: false,
  }
);

const model = defineModel();

const {
  isMultiselectable,
  activeItem,
  selectActiveItem,
  activateFirstItem,
  activateLastItem,
  activateNextItem,
  activatePrevItem,
} = useList(model);

const activeItemId = computed(() => activeItem.value?.element.value?.id);

function onKeyDown(evt: KeyboardEvent) {
  switch (evt.code) {
    case "Space":
      selectActiveItem();
      break;
    case "ArrowUp":
      if (props.orientation === "horizontal") return;
      activatePrevItem({ focus: false, loop: props.loop });
      if (!isMultiselectable.value) {
        selectActiveItem();
      }
      break;
    case "ArrowDown":
      if (props.orientation === "horizontal") return;
      activateNextItem({ focus: false, loop: props.loop });
      if (!isMultiselectable.value) {
        selectActiveItem();
      }
      break;
    case "ArrowLeft":
      if (props.orientation === "vertical") return;
      activatePrevItem({ focus: false, loop: props.loop });
      if (!isMultiselectable.value) {
        selectActiveItem();
      }
      break;
    case "ArrowRight":
      if (props.orientation === "vertical") return;
      activateNextItem({ focus: false, loop: props.loop });
      if (!isMultiselectable.value) {
        selectActiveItem();
      }
      break;
    case "Home":
      activateFirstItem({ focus: false });
      break;
    case "End":
      activateLastItem({ focus: false });
      break;
    default:
      return;
  }
  evt.preventDefault();
}
</script>

<style scoped></style>
