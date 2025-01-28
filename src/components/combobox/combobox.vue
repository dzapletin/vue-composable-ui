<template>
  <template v-if="name">
    <ComboboxHiddenInput
      v-if="isMultiselectable"
      v-for="(value, id) in formInputs"
      :name="`${name}[${id}]`"
      :value="value"
    />
    <ComboboxHiddenInput v-else :name="name" :value="formInputs" />
  </template>

  <slot
    :popoverId="popoverId"
    :isOpen="isOpen"
    :toggle="() => toggle()"
    :displayValue="displayValue"
    :attrs="activatorAttrs"
  />
</template>

<script setup lang="ts">
import { computed, provide, watch, nextTick } from "vue";
import { useSequentialId } from "../../utils/id";
import { useHTMLElement } from "../../utils/element";
import { usePopover } from "../../composables/popover";
import { useList } from "../../composables/list";
import ComboboxHiddenInput from "./comboboxHiddenInput.vue";
import { injectCombobox } from "../injectionKeys";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    displayValue?: (value: any) => string;

    id?: string;
    activatorId?: string;

    name?: string;
    formValue?: (item: any) => Record<string, string> | string;
  }>(),
  {
    displayValue: (value: any) =>
      Array.isArray(value)
        ? value.map((i) => i.toString()).join(", ")
        : value.toString(),
    formValue: (item: any) => item,
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

const displayValue = computed(() => props.displayValue(model.value));

watch(items, () => {
  if (!activeItem.value && items.value.length) {
    activateSelectedItem({ focus: false });
    if (!activeItem.value) {
      activateFirstItem({ focus: false });
    }
  }
});

function focus() {
  const activator = useHTMLElement(`#${activatorId}`);
  activator.value?.focus();
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
          close({ focus: true });
        }
        break;
      case "Enter":
        selectActiveItem();
        close({ focus: true });
        break;
      case "Tab":
        selectActiveItem();
        close({ focus: true });
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
        close({ focus: true });
        break;
      default:
        return;
    }
  }

  evt.preventDefault();
}

const activatorAttrs = computed(() => ({
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
  displayValue,
  popoverId,
  isOpen,
  open,
  close,
  focus,
  isMultiselectable,
  activatorAttrs,
});
</script>

<style scoped></style>
