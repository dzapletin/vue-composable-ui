<template>
  <TabContainer v-model="currentTab">
    <TabList class="tab-list">
      <Tab v-for="(tab, i) in Object.keys(tabs)" :value="i" class="tab">
        {{ tab }}
      </Tab>
    </TabList>

    <TabPanel
      v-for="(tab, i) in Object.values(tabs)"
      :value="i"
      class="tab-panel"
    >
      {{ tab }}
    </TabPanel>
  </TabContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TabContainer, TabList, Tab, TabPanel } from "../../../src/main";

const tabs = {
  "Tab 1": "Tab Panel 1",
  "Tab 2": "Tab Panel 2",
};

const currentTab = ref(0);
</script>

<style>
.tab-list {
  padding: 0.25rem;
  display: flex;
  gap: 0.25rem;
}
.tab {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem 0.25rem 0 0;
  width: 100%;
  background-color: Lavender;
}
.tab:focus {
  z-index: 10;
}
.tab[aria-selected="false"]:hover {
  background-color: LightSkyBlue;
}
.tab[aria-selected="true"] {
  background-color: blue;
  color: white;
}
.tab-panel {
  padding: 1.5rem;
  border: 2px blue solid;
  border-radius: 0.5rem;
  text-align: center;
}
</style>
