<template>
  <div class="d-demo">
    <Tooltip text="Tooltip text" v-slot="{ attrs }" class="d-tooltip">
      <button v-bind="attrs" class="d-btn">Basic</button>
    </Tooltip>

    <Tooltip
      text="Tooltip text"
      delay="1000"
      v-slot="{ attrs }"
      class="d-tooltip"
    >
      <button v-bind="attrs" class="d-btn">Delayed</button>
    </Tooltip>

    <Tooltip id="tooltip-demo" class="d-tooltip">
      <template #content>Any HTML content &#x1F61C;</template>
    </Tooltip>
    <button aria-describedby="tooltip-demo" class="d-btn">
      Custom content
    </button>
  </div>
</template>

<script setup lang="ts">
import { Tooltip } from "../../../src/main";
</script>
