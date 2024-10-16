<script setup>
import MenuDemo from './demos/menu.vue'
</script>

# Menu Components

A composite widget that offers a list of choices to the user.

Based on:

- [usePopover](/composables/popover)
- [useList](/composables/list)
- [useListOption](/composables/list-option)

## Demo

<MenuDemo />

::: details Code
<<< ./demos/menu.vue
:::

## Menu

The root component.

### Properties

| Property        | Required | Description                                                   | Type                                                                        | Default        |
| --------------- | -------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------- |
| **modelValue**  | false    | The selected value. Set to an array to enable multiselection. | `any` \| `any[]`                                                            | `undefined`    |
| **direction**   | false    | The direction of the menu.                                    | `'up'` \| `'down'` \| `'left'` \| `'right'`                                 | `'down'`       |
| **align**       | false    | The alignment of the menu.                                    | `'top'` \| `'bottom'` \| `'left'` \| `'right'` \| `'center'` \| `'stretch'` | `'left'`       |
| **position**    | false    | CSS position of the menu panel.                               | `'fixed'` \| `'absolute'`                                                   | `'fixed'`      |
| **id**          | false    | The ID of the menu panel.                                     | `string`                                                                    | auto-generated |
| **activatorId** | false    | The ID of the activator element.                              | `string`                                                                    | auto-generated |

### Slots

#### default

The `default` slot is used to provide an activator and a list of menu items in the [MenuItems](#menuitems) component. It provides the `attrs` property that must be binded to the activating element.

```vue-html
<Menu v-slot="{ attrs }">
  <button v-bind="attrs">Toggle Menu</button>

  <MenuItems>
    <MenuItem @select="/* do smth. */">Item 1</MenuItem>
  </MenuItems>
</Menu>
```

### Keyboard interactions

Binding the props to the activating element adds the following keyboard interactions:

- `Space` / `Enter` - Opens the menu and places focus on the first item. Or closes the menu and returns focus to the activating element.
- `Down Arrow` - Opens the menu and moves focus to the first item.
- `Up Arrow` - Opens the menu and moves focus to the last item.

### ARIA roles and attributes

The following attributes are managed for the activator:

- [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
- [aria-haspopup](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)
- [aria-expanded](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)

## MenuItems

A component to hold a collection of menu items.

### Keyboard interactions

- `Escape` - Closes the menu and returns focus to the activating element.
- `Tab` - Closes the menu.
- `Down Arrow` - Moves focus to the next item.
- `Up Arrow` - Moves focus to the previous item.
- `Home` - Moves focus to the first item.
- `End` - Moves focus to the last item.

### ARIA roles and attributes

The menu container has the [menu](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role) role and automatically manages the following attributes:

- [aria-activedescendant](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant)
- [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)

## MenuItem

### Properties

| Property     | Required | Description                   | Type      | Default        |
| ------------ | -------- | ----------------------------- | --------- | -------------- |
| **value**    | false    | Value assigned to the item.   | `any`     | `undefined`    |
| **disabled** | false    | Whether the item is disabled. | `boolean` | `false`        |
| **id**       | false    | The ID of the item.           | `string`  | auto-generated |

### Slots

#### default

| Attribute      | Description                           | Type      |
| -------------- | ------------------------------------- | --------- |
| **isSelected** | Whether the item is selected.         | `boolean` |
| **isActive**   | Whether the item is active (focused). | `boolean` |

### Keyboard interactions

- `Enter` - Selects the item and closes the menu.
- `Space` - Selects the item if it has a value set, otherwise closes the menu.

### ARIA roles and attributes

if an item has no value set, it will be given the [menuitem](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitem_role) role. Otherwise, it will be given the [menuitemradio](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitemradio_role) or [menuitemcheckbox](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitemcheckbox_role) (if `modelValue` is an array) role.

The following attributes are automatically managed:

- [aria-checked](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked)
- [aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)
