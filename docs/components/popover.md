<script setup>
import PopoverDemo from './demos/popover.vue'
</script>

# Popover Component

Popover is a floating container that appears next to its activator element above the main document flow.

No event listeners are attached to the activating element to give the user full control over the way the popover is triggered.

Based on:

- [usePopover](/composables/popover)

## Demo

<PopoverDemo />

::: details Code
<<< ./demos/popover.vue
:::

## Popover

The root component.

### Properties

| Property                | Required | Description                                          | Type                                                                        | Default        |
| ----------------------- | -------- | ---------------------------------------------------- | --------------------------------------------------------------------------- | -------------- |
| **id**                  | false    | The ID of the popover dialog.                        | `string`                                                                    | Auto-generated |
| **activatorId**         | false    | The ID of the activator element.                     | `string`                                                                    | Auto-generated |
| **direction**           | false    | The direction of the popover.                        | `'up'` \| `'down'` \| `'left'` \| `'right'`                                 | `'down'`       |
| **align**               | false    | The alignment of the popover.                        | `'top'` \| `'bottom'` \| `'left'` \| `'right'` \| `'center'` \| `'stretch'` | `'left'`       |
| **position**            | false    | CSS position of the popover dialog.                  | `'fixed'` \| `'absolute'`                                                   | `'fixed'`      |
| **closeOnOutsideClick** | false    | Close the popover on an click outside of the dialog. | `boolean`                                                                   | `true`         |
| **closeOnInsideClick**  | false    | Close the popover on an click inside of the dialog.  | `boolean`                                                                   | `false`        |
| **role**                | false    | The ARIA role of the popover                         | `'dialog'` \| `'listbox'` \| `'menu'` \| `'tree'` \| `'grid'`               | `'dialog'`     |

### Slots

#### default

The `default` slot is used to provide an activating element and a [PopoverDialog](#popoverdialog). The slot passes the following properties:

| Property | Description                                                  | Type           |
| -------- | ------------------------------------------------------------ | -------------- |
| attrs    | Required attributes that **must** be binded to the activator | `object`       |
| isOpen   | The status of the popover                                    | `Ref<boolean>` |
| toggle   | Toggle the popover                                           | `() => void`   |
| open     | Open the popover and place focus on it                       | `() => void`   |
| close    | Close the popover and return focus to the activator          | `() => void`   |

```vue-html
<Popover v-slot="{ attrs, toggle, close }">
  <button @click="toggle" v-bind="attrs">Toggle</button>

  <PopoverDialog>
    <button @click="close()" >Close</button>
  </PopoverDialog>
</Popover>
```

### ARIA roles and attributes

The following attributes are managed for the activator:

- [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
- [aria-haspopup](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)
- [aria-expanded](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)

## PopoverDialog

### Keyboard interactions

- `Escape` - Closes the popover and returns focus to the activating element.

### ARIA roles and attributes

The popover container has the role provided in the popover properties and automatically manages the following attributes:

- [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)
