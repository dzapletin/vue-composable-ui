<template>
  <div
    ref="itemEl"
    :id="itemId"
    @click="onClick"
    @keydown="onKeyDown"
    @mouseenter="activate({ focus: false })"
    @mouseleave="deactivate()"
    :data-active="isActive"
    :role="role"
    :aria-checked="value !== undefined ? isSelected : undefined"
    :aria-disabled="disabled || undefined"
    tabindex="-1"
  >
    <slot :isSelected="isSelected" :isActive="isActive" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, inject, computed, useId } from "vue";
import { useListOption } from "../../composables/listOption";
import { injectMenu } from "../injectionKeys";

const props = defineProps<{
  id?: string;
  value?: any;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  select: [value: any];
}>();

const itemId = props.id ?? useId();

const itemEl = useTemplateRef('itemEl');
const { isSelected, isActive, select, activate, deactivate } = useListOption(
  itemEl,
  props.value,
  props.disabled
);

const menu = inject(injectMenu);
if (!menu) {
  throw new Error("Menu injectable context is not provided");
}

const role = computed(() => {
  if (props.value !== undefined) {
    return menu.isMultiselectable.value ? "menuitemcheckbox" : "menuitemradio";
  }
  return "menuitem";
});

function selectAndEmit() {
  select();
  emit("select", props.value);
}

function onClick() {
  selectAndEmit();
  if (props.value === undefined || !menu?.isMultiselectable.value) {
    menu!.close();
  }
}

function onKeyDown(evt: KeyboardEvent) {
  switch (evt.code) {
    case "Space":
      selectAndEmit();
      if (props.value === undefined) {
        menu!.close();
      }
      break;
    case "Enter":
      selectAndEmit();
      menu!.close();
      break;
    default:
      return;
  }
  evt.preventDefault();
}
</script>

<style scoped></style>
