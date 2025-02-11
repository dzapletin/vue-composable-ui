<template>
  <div
    v-show="isSelected"
    :id="ids.panelId"
    :aria-labelledby="ids.tabId"
    tabindex="0"
    role="tabpanel"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { injectList } from "../../composables/list";
import { injectTabs } from "../injectionKeys";

const props = defineProps<{
  value: string | number;
}>();

const list = inject(injectList);
if (!list) {
  throw new Error("List injectable context is not provided");
}

const tabs = inject(injectTabs);
if (!tabs) {
  throw new Error("Tabs injectable context is not provided");
}

const isSelected = computed(() => props.value === list.value.value);
const ids = tabs.getIds(props.value);
</script>

<style scoped></style>
