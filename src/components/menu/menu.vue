<template>
  <div>
    <slot :attrs="activatorAttrs" />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, nextTick } from "vue";
import { useSequentialId } from "../../utils/id";
import { usePopover } from "../../composables/popover";
import { useList } from "../../composables/list";
import { injectMenu } from "../injectionKeys";

const props = withDefaults(
  defineProps<{
    id?: string;
    activatorId?: string;
    direction?: "up" | "down" | "left" | "right";
    align?: "top" | "bottom" | "left" | "right" | "center" | "stretch";
    position?: "fixed" | "absolute";
  }>(),
  {
    direction: "down",
    align: "left",
    position: "fixed",
  }
);

const menuId = props.id ?? useSequentialId("menu");
const activatorId = props.activatorId ?? useSequentialId("menu-activator");

const model = defineModel();

const {
  isMultiselectable,
  activeItem,
  activateFirstItem,
  activateLastItem,
  activateNextItem,
  activatePrevItem,
} = useList(model);

const { isOpen, toggle, open, close } = usePopover(
  `#${activatorId}`,
  `#${menuId}`,
  {
    direction: props.direction,
    align: props.align,
    position: props.position,
    closeOnOutsideClick: true,
    closeOnInsideClick: false,
  }
);

function onActivatorKeyDown(evt: KeyboardEvent) {
  switch (evt.code) {
    case "Space":
    case "Enter":
      toggle();
      if (isOpen.value) {
        nextTick(activateFirstItem);
      }
      break;
    case "ArrowUp":
      open();
      nextTick(activateLastItem);
      break;
    case "ArrowDown":
      open();
      nextTick(activateFirstItem);
      break;
    default:
      return;
  }
  evt.preventDefault();
}

const activatorAttrs = computed(() => ({
  id: activatorId,
  "aria-controls": isOpen.value ? menuId : undefined,
  "aria-haspopup": "menu" as "menu",
  "aria-expanded": isOpen.value,
  onclick: () => toggle(),
  onkeydown: onActivatorKeyDown,
  tabindex: 0,
}));

provide(injectMenu, {
  menuId: menuId,
  activatorId: activatorId,
  isOpen,
  close,
  isMultiselectable,
  activeItemId: computed(() => activeItem.value?.element.value?.id),
  activateFirstItem,
  activateLastItem,
  activateNextItem,
  activatePrevItem,
});
</script>

<style scoped></style>
