<template>
  <input
    v-for="(value, name) in inputs"
    :name="name"
    :value="value"
    type="hidden"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  value: any;
}>();

const inputs = computed(() => {
  if (typeof props.value === "object") {
    const fields: Record<string, any> = {};
    for (const [key, value] of Object.entries(props.value)) {
      fields[`${props.name}[${key}]`] = value;
    }
    return fields;
  } else {
    return {
      [props.name]: props.value,
    };
  }
});
</script>

<style scoped></style>
