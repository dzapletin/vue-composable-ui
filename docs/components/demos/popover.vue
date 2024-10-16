<template>
  <div class="d-demo">
    <Popover direction="right" align="center" v-slot="{ attrs, toggle, close }">
      <button @click="toggle" v-bind="attrs" class="d-btn">Toggle</button>

      <PopoverDialog class="d-popover d-popover--h">
        <div>Any HTML content &#x1F61C;</div>
        <button @click="close()" class="d-btn">Close</button>
      </PopoverDialog>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverDialog } from "../../../src/main";
</script>
