<template>
  <div class="d-demo">
    <Combobox v-model="value" :displayValue="() => ''" activatorId="testid">
      <template #input="{ popoverId, attrs, toggle, isOpen }">
        <div id="testid" class="d-combobox">
          <div class="d-combobox__tags">
            <div v-for="item in value.slice(0, 3)" class="d-tag">
              {{ item.name }}
            </div>
            <div v-if="value.length > 3">+{{ value.length - 3 }}</div>
          </div>
          <input
            type="text"
            v-bind="attrs"
            @input="query = $event.target.value"
            @focus="query = ''"
            placeholder="Type to search..."
            autocomplete="off"
          />
          <button
            @click="toggle"
            :aria-controls="isOpen ? popoverId : undefined"
            :aria-expanded="isOpen"
            aria-haspopup="listbox"
            tabindex="-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M10 3a.75.75 0 0 1 .55.24l3.25 3.5a.75.75 0 1 1-1.1 1.02L10 4.852L7.3 7.76a.75.75 0 0 1-1.1-1.02l3.25-3.5A.75.75 0 0 1 10 3Zm-3.76 9.2a.75.75 0 0 1 1.06.04l2.7 2.908l2.7-2.908a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 0 1 .04-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </template>

      <ComboboxOptions class="d-menu">
        <div class="d-no-options" v-if="filteredPeople.length == 0">
          Nothing found for <strong>"{{ query }}"</strong>
        </div>
        <ComboboxOption
          v-for="opt in filteredPeople"
          :key="opt.id"
          :value="opt"
          :disabled="opt.disabled"
          v-slot="{ isSelected }"
          class="d-menu-item"
        >
          {{ opt.name }}
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
            />
          </svg>
        </ComboboxOption>
      </ComboboxOptions>
    </Combobox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Combobox, ComboboxOptions, ComboboxOption } from "../../../src/main";

const value = ref([]);
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
    disabled: true,
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

const query = ref("");
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

watch(
  value,
  () => {
    query.value = "";
  },
  { deep: true }
);
</script>
