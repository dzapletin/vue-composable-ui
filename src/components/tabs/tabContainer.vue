<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from "vue";
import { useList } from "../../composables/list";
import { injectTabs } from "../injectionKeys";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
  }>(),
  {
    orientation: "horizontal",
  }
);

const model = defineModel();

const {
  items,
  selectActiveItem,
  activateFirstItem,
  activateLastItem,
  activateNextItem,
  activatePrevItem,
} = useList(model);

provide(injectTabs, {
  getIds: (value: any) =>
    computed(() => {
      const item = items.value.find((item) => item.value === value);
      return {
        tabId: item?.element.value?.getAttribute("id") || undefined,
        panelId: item?.element.value?.getAttribute("aria-controls") || undefined,
      };
    }),
  selectActiveItem,
  activateFirstItem,
  activateLastItem,
  activateNextItem,
  activatePrevItem,
  orientation: props.orientation,
});
</script>

<style scoped></style>
