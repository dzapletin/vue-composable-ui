<template>
  <template v-if="name">
    <ComboboxFormInput
      v-if="isMultiselectable"
      v-for="(value, id) in formInputs"
      :name="`${name}[${id}]`"
      :value="value"
    />
    <ComboboxFormInput v-else :name="name" :value="formInputs" />
  </template>

  <slot
    name="input"
    :popoverId="popoverId"
    :attrs="inputAttrs"
    :isOpen="isOpen"
    :toggle="toggle"
  >
    <input v-bind="{ ...$attrs, ...inputAttrs }" autocomplete="off" />
  </slot>

  <slot />
</template>

<script setup lang="ts">
import { ref, computed, provide, watch, nextTick } from "vue";
import { useSequentialId } from "../../utils/id";
import { usePopover } from "../../composables/popover";
import { useList } from "../../composables/list";
import { useFormControl, FormValidator } from "../../composables/formControl";
import ComboboxFormInput from "./comboboxFormInput.vue";
import { injectCombobox } from "../injectionKeys";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    displayValue?: (value: any) => string;

    id?: string;
    activatorId?: string;

    name?: string;
    formValue?: (item: any) => Record<string, string> | string;

    validators?: FormValidator[];
    showValidationError?: boolean;
  }>(),
  {
    displayValue: (value: any) =>
      Array.isArray(value)
        ? value.map((i) => i.toString()).join(", ")
        : value.toString(),
    formValue: (item: any) => item,
    showValidationError: true,
  }
);

const formInputs = computed(() => {
  if (isMultiselectable.value) {
    return (model.value as any[]).map((i) => props.formValue(i));
  } else {
    return props.formValue(model.value);
  }
});

const model = defineModel();
const modelIsValid = defineModel("isValid");
const modelValidationMessage = defineModel("validationMessage");

const comboboxId = props.id ?? useSequentialId("combobox");
const activatorId = props.activatorId ?? comboboxId;
const popoverId = `${comboboxId}-popover`;

// Popover
const { isOpen, toggle, open, close } = usePopover(
  `#${activatorId}`,
  `#${popoverId}`,
  {
    direction: "down",
    align: "stretch",
    position: "fixed",
    closeOnOutsideClick: true,
    closeOnInsideClick: false,
  }
);

// List
const {
  items,
  activeItem,
  isMultiselectable,
  selectActiveItem,
  activateSelectedItem,
  activateFirstItem,
  activateLastItem,
  activateNextItem,
  activatePrevItem,
} = useList(model);

// Form Control
const { focus, isValid, validationMessage } = useFormControl(
  `#${comboboxId}`,
  props.validators,
  props.showValidationError
);

watch(isValid, () => (modelIsValid.value = isValid.value));
watch(
  validationMessage,
  () => (modelValidationMessage.value = validationMessage.value)
);

watch(items, () => {
  if (!activeItem.value && items.value.length) {
    if (
      (isMultiselectable.value && (model.value as any[]).length) ||
      (!isMultiselectable.value && model.value)
    ) {
      activateSelectedItem({ focus: false });
    } else {
      activateFirstItem({ focus: false });
    }
  }
});

const inputValue = ref("");

function updateInputValue() {
  inputValue.value = props.displayValue(model.value);
}

watch(model, updateInputValue, { deep: true, immediate: true });

function onChange() {
  updateInputValue();
}

function onInput(evt: KeyboardEvent) {
  inputValue.value = (evt.target as HTMLInputElement).value;
  open({ focus: false });
}

function onKeyDown(evt: KeyboardEvent) {
  if (!isOpen.value) {
    switch (evt.code) {
      case "Space":
      case "Enter":
        open({ focus: false });
        break;

      case "End":
      case "ArrowUp":
        open({ focus: false });
        nextTick(() => activateLastItem({ focus: false }));
        break;

      case "Home":
      case "ArrowDown":
        open({ focus: false });
        nextTick(() => activateFirstItem({ focus: false }));
        break;

      default:
        return;
    }
  } else {
    switch (evt.code) {
      case "Space":
        selectActiveItem();
        if (!isMultiselectable.value) {
          close();
        }
        break;
      case "Enter":
        selectActiveItem();
        close();
        break;
      case "Tab":
        selectActiveItem();
        close();
        return;
      case "ArrowUp":
        activatePrevItem({ focus: false, loop: false });
        break;
      case "ArrowDown":
        activateNextItem({ focus: false, loop: false });
        break;
      case "Home":
        activateFirstItem({ focus: false });
        break;
      case "End":
        activateLastItem({ focus: false });
        break;
      case "Escape":
        close();
        break;
      default:
        return;
    }
  }

  evt.preventDefault();
}

const inputAttrs = computed(() => ({
  value: inputValue.value,
  oninput: onInput,
  onchange: onChange,
  onkeydown: onKeyDown,
  onclick: () => open({ focus: false }),
  id: comboboxId,
  "aria-controls": isOpen.value ? popoverId : undefined,
  "aria-expanded": isOpen.value,
  "aria-activedescendant": activeItem.value?.element.value?.id,
  "aria-haspopup": "listbox" as "listbox",
  role: "combobox",
}));

provide(injectCombobox, {
  popoverId,
  isOpen,
  isMultiselectable,
  close,
  focus,
});
</script>

<style scoped></style>
