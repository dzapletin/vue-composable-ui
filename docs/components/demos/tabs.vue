<template>
  <div class="d-demo">
    <TabContainer v-model="currentTab">
      <TabList class="d-tab-list">
        <Tab v-for="(tab, i) in Object.keys(tabs)" :value="i" class="d-tab">
          {{ tab }}
        </Tab>
      </TabList>

      <TabPanel
        v-for="(tab, i) in Object.values(tabs)"
        :value="i"
        class="d-tab-panel"
      >
        {{ tab }}
      </TabPanel>
    </TabContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TabContainer, TabList, Tab, TabPanel } from "../../../src/main";

const tabs = {
  "Tab 1": "Tab Panel 1",
  "Tab 2": "Tab Panel 2",
  "Tab 3": "Tab Panel 3",
};

const currentTab = ref(0);
</script>
