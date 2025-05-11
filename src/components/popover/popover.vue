<template>
  <slot
    :attrs="activatorAttrs"
    :isOpen="isOpen"
    :toggle="() => toggle()"
    :open="() => open()"
    :close="() => close()"
  />
</template>

<script setup lang="ts">
import { provide, computed, useId } from "vue";
import { usePopover } from "../../composables/popover";
import { injectPopover } from "../injectionKeys";

const props = withDefaults(
  defineProps<{
    id?: string;
    activatorId?: string;
    direction?: "up" | "down" | "left" | "right";
    align?: "top" | "bottom" | "left" | "right" | "center" | "stretch";
    position?: "fixed" | "absolute";
    closeOnOutsideClick?: boolean;
    closeOnInsideClick?: boolean;
    role?: "dialog" | "listbox" | "menu" | "tree" | "grid";
  }>(),
  {
    direction: "down",
    align: "left",
    position: "fixed",
    closeOnOutsideClick: true,
    closeOnInsideClick: false,
    role: "dialog",
  }
);

const popoverId = props.id ?? useId();
const activatorId = props.activatorId ?? useId();

const { isOpen, toggle, open, close } = usePopover(
  `#${activatorId}`,
  `#${popoverId}`,
  {
    direction: props.direction,
    align: props.align,
    position: props.position,
    closeOnOutsideClick: props.closeOnOutsideClick,
    closeOnInsideClick: props.closeOnInsideClick,
  }
);

const activatorAttrs = computed(() => ({
  id: activatorId,
  "aria-controls": isOpen.value ? props.id : undefined,
  "aria-haspopup": props.role,
  "aria-expanded": isOpen.value,
}));

provide(injectPopover, {
  popoverId,
  activatorId,
  role: props.role,
  isOpen,
  close,
});
</script>

<style scoped></style>
