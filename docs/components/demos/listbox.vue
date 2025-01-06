<template>
  <div class="d-demo">
    <div class="d-demo--column">
      <input type="checkbox" v-model="multiple" /> Multiselectable
      <br />
      <input type="checkbox" v-model="loop" /> Loop KB navigation
      <Listbox
        class="d-list"
        :multiselectable="multiple"
        :loop="loop"
        v-model="value"
      >
        <ListboxOption
          v-for="option in options"
          :value="option.id"
          :key="option.id"
          class="d-list-item"
          v-slot="{ isSelected }"
        >
          {{ option.name }}
          <svg
            v-if="isSelected"
            xmlns="http://www.w3.org/2000/svg"
            width="1rem"
            height="1rem"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z"
            /></svg
        ></ListboxOption>
      </Listbox>
      <div>Selected value: {{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Listbox, ListboxOption } from "../../../src/main";

const value = ref();
const multiple = ref(false);
const loop = ref(false);

const options = [
  {
    id: 1,
    name: "Option 1",
  },
  {
    id: 2,
    name: "Option 2",
  },
  {
    id: 3,
    name: "Option 3",
  },
  {
    id: 4,
    name: "Option 4",
  },
  {
    id: 5,
    name: "Option 5",
  },
];

watch(multiple, (val) => {
  if (val) {
    value.value = [value.value];
  } else {
    value.value = value.value.length ? value.value[0] : undefined;
  }
});
</script>
