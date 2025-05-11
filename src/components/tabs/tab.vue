<template>
  <button
    ref="tab"
    @click="select"
    :id="tabId"
    :aria-selected="isSelected"
    :aria-controls="tabPanelId"
    :tabindex="isSelected ? 0 : -1"
    role="tab"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { useTemplateRef, useId } from "vue";
import { useListOption } from "../../composables/listOption";

const props = defineProps<{
  id?: string;
  ariaControls?: string;
  value: string | number;
}>();

const tab = useTemplateRef('tab');

const { isSelected, select } = useListOption(tab, props.value);

const tabId = props.id ?? useId();
const tabPanelId = props.ariaControls ?? useId();
</script>

<style scoped></style>
