<template>
  <div
    ref="itemEl"
    :id="itemId"
    @click="select"
    :aria-disabled="disabled"
    :aria-selected="isSelected"
    :data-active="isActive"
    role="option"
    tabindex="-1"
  >
    <slot :isSelected="isSelected" :isActive="isActive" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSequentialId } from "../../utils/id";
import { useListOption } from "../../composables/listOption";

const props = defineProps<{
  id?: string;
  value?: any;
  disabled?: boolean;
}>();

const itemId = props.id ?? useSequentialId("list-option");

const itemEl = ref<HTMLElement>();
const { isSelected, isActive, select } = useListOption(
  itemEl,
  props.value,
  props.disabled
);
</script>

<style scoped></style>
