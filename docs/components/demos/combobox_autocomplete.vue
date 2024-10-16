<template>
  <div class="d-demo">
    <Combobox
      v-model="value"
      :displayName="(i) => i?.name"
      :customValue="(i) => ({ id: -1, name: i })"
      @input="query = $event"
      class="d-input"
    >
      <ComboboxOptions class="d-popup">
        <div v-if="!filteredPeople.length">
          Use <span>{{ query }}</span>
        </div>
        <ComboboxOption
          v-for="opt in filteredPeople"
          :key="opt.id"
          :value="opt"
          v-slot="{ active, selected }"
          ><div class="d-menu-item" :class="{ 'd-menu-item--active': active }">
            {{ opt.name }}
          </div></ComboboxOption
        >
      </ComboboxOptions>
    </Combobox>

    {{ value }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Combobox, ComboboxOptions, ComboboxOption } from "../../../src/main";

const value = ref();
const query = ref("");
const options = [
  {
    id: 0,
    name: "John Doe",
  },
  {
    id: 1,
    name: "Cris Doe",
  },
  {
    id: 2,
    name: "Michael Doe",
  },
  {
    id: 3,
    name: "Kim Doe",
  },
  {
    id: 4,
    name: "Boris Doe",
  },
  {
    id: 5,
    name: "Angelina Doe",
  },
];

const filteredPeople = computed(() =>
  query.value === ""
    ? options
    : options.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);
</script>

<style scoped></style>
