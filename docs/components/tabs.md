<script setup>
import TabsDemo from './demos/tabs.vue'
</script>

# Tabs Components

Based on:

- [useList](/composables/list)
- [useListOption](/composables/list-option)

## Demo

<TabsDemo />

::: details Code
<<< ./demos/tabs.vue
:::

## TabContainer

The root component.

### Properties

| Property       | Required | Description         | Type                 | Default     |
| -------------- | -------- | ------------------- | -------------------- | ----------- |
| **modelValue** | false    | The selected value. | `string` \| `number` | `undefined` |

## TabList

### Properties

| Property        | Required | Description                                           | Type                           | Default        |
| --------------- | -------- | ----------------------------------------------------- | ------------------------------ | -------------- |
| **orientation** | false    | The orientation of tabs. Affects keyboard navigation. | `'horizontal'` \| `'vertical'` | `'horizontal'` |

### Keyboard interactions

- `Down Arrow` - Moves focus to the next tab (vertical orientation).
- `Right Arrow` - Moves focus to the next tab (horizontal orientation).
- `Up Arrow` - Moves focus to the previous tab (vertical orientation).
- `Left Arrow` - Moves focus to the previous tab (horizontal orientation).
- `Home` - Moves focus to the first tab.
- `End` - Moves focus to the last tab.

### ARIA roles and attributes

The tab container has the [tablist](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tablist_role) role and automatically manages the following attributes:

- [aria-orientation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation)

## Tab

### Properties

| Property          | Required | Description                         | Type                 | Default        |
| ----------------- | -------- | ----------------------------------- | -------------------- | -------------- |
| **value**         | true     | The value assigned to the tab.      | `string` \| `number` | `undefined`    |
| **id**            | false    | The ID of the tab.                  | `string`             | auto-generated |
| **aria-controls** | false    | The ID of the controlled tab panel. | `string`             | auto-generated |

### ARIA roles and attributes

Tabs are assigned the [tab](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role) role.

The following attributes are automatically managed:

- [aria-selected](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
- [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)

## TabPanel

### Properties

| Property  | Required | Description                                                   | Type                 | Default     |
| --------- | -------- | ------------------------------------------------------------- | -------------------- | ----------- |
| **value** | true     | The value assinged to the panel. Must match to a tab's value. | `string` \| `number` | `undefined` |

### ARIA roles and attributes

The tab panel has the [tablist](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tabpanel_role) role and automatically manages the following attributes:

- [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)
