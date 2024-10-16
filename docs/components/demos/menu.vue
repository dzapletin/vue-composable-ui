<template>
  <div class="d-demo">
    <Menu v-slot="{ attrs }">
      <button v-bind="attrs" class="d-btn">Basic Example</button>

      <MenuItems class="d-menu">
        <MenuItem @select="onSelect('Item 1')" class="d-menu-item"
          >Item 1</MenuItem
        >
        <MenuItem @select="onSelect('Item 2')" class="d-menu-item"
          >Item 2</MenuItem
        >
        <MenuItem @select="onSelect('Item 3')" class="d-menu-item"
          >Item 3</MenuItem
        >
      </MenuItems>
    </Menu>

    <Menu v-model="color" align="right" v-slot="{ attrs }">
      <button v-bind="attrs" :style="{ backgroundColor: color }" class="d-btn">
        Radio Items
        <span v-if="color">({{ color }})</span>
      </button>

      <MenuItems class="d-menu">
        <MenuItem
          v-for="(color, name) in colors"
          :value="color"
          class="d-menu-item"
          v-slot="{ isSelected }"
        >
          <span :style="{ fontWeight: isSelected ? 'bold' : 'normal' }">
            {{ name }}
          </span>
        </MenuItem>
      </MenuItems>
    </Menu>

    <Menu v-model="option" align="stretch" v-slot="{ attrs }">
      <button v-bind="attrs" class="d-btn">Checkbox Items</button>

      <MenuItems class="d-menu">
        <MenuItem
          v-for="(option, name) in options"
          :value="option"
          class="d-menu-item"
          v-slot="{ isSelected }"
        >
          {{ name }}
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
        </MenuItem>
        <hr />
        <MenuItem disabled class="d-menu-item">Disabled item</MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Menu, MenuItems, MenuItem } from "../../../src/main";

const colors = {
  Blue: "#007bff",
  Purple: "#6f42c1",
  Pink: "#e83e8c",
  Red: "#dc3545",
};
const color = ref();

const options = {
  "Option 1": 1,
  "Option 2": 2,
  "Option 3": 3,
  "Option 4": 4,
};
const option = ref([]);

function onSelect(msg: string) {
  alert(msg);
}
</script>
