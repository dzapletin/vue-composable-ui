# useList

The composable implements single/multi-selection and navigation functionality for a list of HTML elements. It can be used to power a wide range of components: tabs, button groups, radio groups, comboboxes and all kinds of components where user has to select one or more values from a list.

`useList` is meant to be used in conjunction with the [`useListOption`](/composables/list-option) composable.

## Basic Usage

::: code-group

```vue [example.vue]
<script setup>
import { ref } from 'vue'

const value = ref()
</script>

<template>
  Selected value: {{value}}
  <List v-model="value">
    <Item value="1">Item 1</Item>
    <Item value="2">Item 2</Item>
    <Item value="3" :disabled="true">Item 3</Item>
  <List>
</template>
```

```vue [list.vue]
<script setup>
import { useList } from "vue-composable-ui";

const model = defineModel();
const list = useList(model);
</script>

<template>
  <div>
    <slot />
  </div>
</template>
```

```vue [item.vue]
<script setup>
import { useListOption } from "vue-composable-ui";
import { ref } from "vue";

const props = defineProps<{
  value: any;
  disabled?: boolean;
}>()

const itemEl = ref<HTMLElement>()
const option = useListOption(itemEl, props.value, props.disabled);

const onClick = () => option.select();
</script>

<template>
  <div ref="itemEl" @click="onClick">
    <slot />
  </div>
</template>
```

:::

## Type Declarations

### Composable

```ts
/**
 * Creates a reactive list of HTML elements with assigned values.
 *
 * @param value A ref to store the list value. Set to an array to enable multiselection.
 */
export declare function useList(value: Ref<unknown>): UseListReturn;
```

### Return Type

```ts
export type ItemValue = unknown;
export interface Item {
  id: number;
  element: Ref<HTMLElement | undefined>;
  value: ItemValue;
  disabled: MaybeRef<boolean>;
}

interface ActivationOptions {
  /**
   * Focus the corresponding HTML element
   *
   * @defaultValue false
   */
  focus?: boolean;
}

interface NavigationOptions {
  /**
   * Infinitely cycle through the items
   *
   * @defaultValue false
   */
  loop?: boolean;
}

export interface UseListReturn {
  /**
   * Array of items
   */
  items: Readonly<ShallowRef<Item[]>>;
  /**
   * Multiselection flag
   */
  isMultiselectable: Readonly<Ref<boolean>>;
  /**
   * Currently active item
   */
  activeItem: ComputedRef<Item | undefined>;
  /**
   * Select the currently active item
   */
  selectActiveItem: () => void;
  /**
   * Activate the currently selected item
   */
  activateSelectedItem: (options?: ActivationOptions) => void;
  /**
   * Activate the first item
   */
  activateFirstItem: (options?: ActivationOptions) => void;
  /**
   * Activate the last item
   */
  activateLastItem: (options?: ActivationOptions) => void;
  /**
   * Activate next item
   */
  activateNextItem: (options?: ActivationOptions & NavigationOptions) => void;
  /**
   * Activate previous item
   */
  activatePrevItem: (options?: ActivationOptions & NavigationOptions) => void;
}
```

### Injection Key

> [!NOTE]
> List items get unique ids that are not equal to their indexes in the `items` array returned by the composable. You need to access `item.id` to get its id value.

```ts
interface UseListInjectionKey {
  /**
   * The list value
   */
  value: Readonly<Ref<unknown>>;
  /**
   * Select an item by ID
   */
  selectItem: (itemId: number) => void;
  /**
   * Activate an item by ID
   */
  activateItem: (itemId: number, options?: ActivationOptions) => void;
  /**
   * Check if an item is selected
   */
  isSelected: (itemId: number) => boolean;
  /**
   * Check if an item is active
   */
  isActive: (itemId: number) => boolean;
  /**
   * Add an item to the list
   *
   * @returns New item ID
   */
  addItem: (
    itemEl: HTMLElementType,
    itemVal: ItemValue,
    disabled?: MaybeRef<boolean>
  ) => number;
  /**
   * Remove an item from the list by ID
   */
  removeItem: (itemId: number) => void;
}
```
