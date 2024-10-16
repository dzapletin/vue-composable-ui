<template>
  <div class="d-demo">
    <Input
      v-model="value"
      :mask="mask"
      v-model:unmasked="unmaskedValue"
      v-model:isValid="isValid"
      v-model:validationMessage="validationMessage"
      class="d-input"
      type="tel"
    />
    <div>
      <div>val: {{ value }}</div>
      <div>Unmasked value: {{ unmaskedValue }}</div>
      <div>Is valid: {{ isValid }}</div>
      <div>Validation message: {{ validationMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Input } from "../../../src/main";

const value = ref("test");
const mask = {
  mask: "{+7} (000) 000-00-00",
};

const unmaskedValue = ref("");
const isValid = ref();
const validationMessage = ref("");
</script>

<style scoped></style>
