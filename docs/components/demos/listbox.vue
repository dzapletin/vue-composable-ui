<template>
  <div class="d-demo">
    <div>
      <input type="checkbox" v-model="multiple" /> Multiselectable
      <input type="checkbox" v-model="loop" /> Loop
      <div>Value: {{ value }}</div>
      <Listbox
        class="list"
        :multiselectable="multiple"
        :loop="loop"
        v-model="value"
      >
        <ListboxOption value="1" class="list-item"> Item 1 </ListboxOption>
        <ListboxOption value="2" class="list-item"> Item 2 </ListboxOption>
        <ListboxOption value="3" class="list-item"> Item 3 </ListboxOption>
      </Listbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Listbox, ListboxOption } from "../../../src/main";

const value = ref();
const multiple = ref(false);
const loop = ref(false);

watch(multiple, (val) => {
  if (val) {
    value.value = [value.value];
  } else {
    value.value = value.value.length ? value.value[0] : undefined;
  }
});
</script>

<style>
.list {
  padding: 0.5rem;
  border: 2px blue solid;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.list-item {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: Lavender;
  outline: none;
}
.list-item[aria-selected="true"] {
  background-color: blue;
  color: white;
}
.list-item[aria-selected="false"]:hover {
  background-color: LightSkyBlue;
}
.list[aria-multiselectable="true"] .list-item[data-active="true"] {
  outline: 3px solid DeepPink;
  outline-offset: 2px;
}
</style>
