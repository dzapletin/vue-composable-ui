<script setup>
import ListDemo from './demos/listbox.vue'
</script>

# Listbox Components

A listbox is used to to create a list from which a user may select one or more static items.

Based on:

- [useList](/composables/list)
- [useListOption](/composables/list-option)

## Demo

<ListDemo />

::: details Code
<<< ./demos/listbox.vue
:::

## Listbox

The root component.

### Properties

| Property        | Required | Description                                                   | Type                           | Default      |
| --------------- | -------- | ------------------------------------------------------------- | ------------------------------ | ------------ |
| **modelValue**  | false    | The selected value. Set to an array to enable multiselection. | `any` \| `any[]`               | `undefined`  |
| **orientation** | false    | The orientation of the list. Affects keyboard navigation.     | `'horizontal'` \| `'vertical'` | `'vertical'` |
| **loop**        | false    | Infinitely cycle through the options with keyboard.           | `boolean`                      | `false`      |

### Keyboard interactions

- `Space` - Selects the currently active option.
- `Down Arrow` - Moves focus to the next option (vertical orientation).
- `Right Arrow` - Moves focus to the next option (horizontal orientation).
- `Up Arrow` - Moves focus to the previous option (vertical orientation).
- `Left Arrow` - Moves focus to the previous option (horizontal orientation).
- `Home` - Moves focus to the first option.
- `End` - Moves focus to the last option.

### ARIA roles and attributes

The listbox container has the [listbox](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role) role and automatically manages the following attributes:

- [aria-activedescendant](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant)
- [aria-orientation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation)
- [aria-multiselectable](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiselectable)

## ListboxOption

### Properties

| Property     | Required | Description                     | Type      | Default        |
| ------------ | -------- | ------------------------------- | --------- | -------------- |
| **value**    | false    | Value assigned to the option.   | `any`     | `undefined`    |
| **disabled** | false    | Whether the option is disabled. | `boolean` | `false`        |
| **id**       | false    | The ID of the option.           | `string`  | auto-generated |

### Slots

#### default

| Attribute      | Description                             | Type      |
| -------------- | --------------------------------------- | --------- |
| **isSelected** | Whether the option is selected.         | `boolean` |
| **isActive**   | Whether the option is active (focused). | `boolean` |

### ARIA roles and attributes

Options are assigned the [option](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role) role.

The following attributes are automatically managed:

- [aria-selected](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
- [aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)
