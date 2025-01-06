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
import { ref } from "vue";
import { useSequentialId } from "../../utils/id";
import { useListOption } from "../../composables/listOption";

const props = defineProps<{
  id?: string;
  ariaControls?: string;
  value: string | number;
}>();

const tab = ref<HTMLButtonElement>();

const { isSelected, select } = useListOption(tab, props.value);

const tabId = props.id ?? useSequentialId("tab");
const tabPanelId = props.ariaControls ?? useSequentialId("tab-panel");
</script>

<style scoped></style>
