<template>
  <div
    ref="itemEl"
    :id="itemId"
    @click="onClick"
    @mouseenter="activate({ focus: false })"
    :data-active="isActive"
    :aria-selected="isSelected"
    :aria-disabled="disabled || undefined"
    role="option"
  >
    <slot :isSelected="isSelected" :isActive="isActive" />
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, inject, useId } from "vue";
import { useListOption } from "../../composables/listOption";
import { injectCombobox } from "../injectionKeys";

const props = defineProps<{
  id?: string;
  value: any;
  disabled?: boolean;
}>();

const itemId = props.id ?? useId();

const itemEl = useTemplateRef('itemEl');

const { isSelected, isActive, activate, select } = useListOption(
  itemEl,
  props.value,
  props.disabled
);

const combobox = inject(injectCombobox);
if (!combobox) {
  throw new Error("Combobox injectable context is not provided");
}

function onClick() {
  select();
  if (!combobox!.isMultiselectable.value) {
    combobox!.close({ focus: true });
  } else {
    combobox!.focus();
  }
}
</script>

<style scoped></style>
