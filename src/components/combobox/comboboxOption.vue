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
import { ref, inject } from "vue";
import { useSequentialId } from "../../utils/id";
import { useListOption } from "../../composables/listOption";
import { injectCombobox } from "../injectionKeys";

const props = defineProps<{
  id?: string;
  value: any;
  disabled?: boolean;
}>();

const itemId = props.id ?? useSequentialId("combobox-option");

const itemEl = ref<HTMLElement>();

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
    combobox!.close({ focus: false });
  }
  combobox!.focus();
}
</script>

<style scoped></style>
