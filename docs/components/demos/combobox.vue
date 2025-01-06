<template>
  <div class="d-demo">
    <div class="d-demo__column">
      <h5>Autocomplete Combobox</h5>
      <Combobox v-model="fruit">
        <ComboboxInput
          @input="query = $event.target.value"
          @change="query = ''"
          placeholder="Choose a fruit..."
          class="d-input"
        />
        <ComboboxOptions class="d-menu">
          <div class="d-no-options" v-if="filteredFruits.length == 0">
            Nothing found for <strong>"{{ query }}"</strong>
          </div>
          <ComboboxOption
            v-for="opt in filteredFruits"
            :key="opt"
            :value="opt"
            v-slot="{ isSelected }"
            class="d-menu-item"
          >
            {{ opt }}
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

    <div class="d-demo__column">
      <h5>Select-Only Combobox</h5>
      <Combobox v-model="fruit" v-slot="{ attrs, displayValue }">
        <button class="d-input d-input--select" v-bind="attrs">
          {{ displayValue || "Select a fruit..." }}
        </button>
        <ComboboxOptions class="d-menu">
          <ComboboxOption
            v-for="opt in fruits"
            :value="opt"
            v-slot="{ isSelected }"
            class="d-menu-item"
          >
            {{ opt }}
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

    <div class="d-demo__column">
      <h5>Multiselectable Combobox</h5>
      <Combobox
        v-model="value"
        :displayValue="(items: any[]) => items.map((i) => i.name).join(', ')"
        v-slot="{ attrs, displayValue }"
      >
        <button class="d-input d-input--select" v-bind="attrs">
          {{ displayValue || "Select some people..." }}
        </button>
        <ComboboxOptions class="d-menu">
          <ComboboxOption
            v-for="opt in options"
            :value="opt"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "../../../src/main";

const fruit = ref("");
const fruits = ["Apple", "Banana", "Grape", "Orange"];

const query = ref("");
const filteredFruits = computed(() =>
  query.value === ""
    ? fruits
    : fruits.filter((fruit) =>
        fruit
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

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
</script>
