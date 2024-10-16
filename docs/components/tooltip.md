<script setup>
import TooltipDemo from './demos/tooltip.vue'
</script>

# Tooltip Component

A tooltip is a contextual text bubble that displays a description for an element that appears on pointer hover or keyboard focus.

A tooltip activator can be provided in the default slot:

```vue
<Tooltip text="Tooltip text" v-slot="{ attrs }">
  <button v-bind="attrs">Activator</button>
</Tooltip>
```

Or by setting a tooltip id and using it in the `aria-describedby` attribute on the activator:

```vue
<Tooltip id="tooltip-example" text="Tooltip text" />
<button aria-describedby="tooltip-example">Activator</button>
```

Based on:

- [usePopover](/composables/popover)

## Demo

<TooltipDemo />

::: details Code
<<< ./demos/tooltip.vue
:::

## Tooltip

### Properties

| Property      | Required | Description                                           | Type                                        | Default        |
| ------------- | -------- | ----------------------------------------------------- | ------------------------------------------- | -------------- |
| **text**      | false    | Tooltip text.                                         | `string`                                    | `undefined`    |
| **delay**     | false    | The delay before showing the tooltip in milliseconds. | `number` \| `string`                        | `undefined`    |
| **direction** | false    | The direction of the tooltip.                         | `'up'` \| `'down'` \| `'left'` \| `'right'` | `'up'`         |
| **id**        | false    | The ID of the tooltip.                                | `string`                                    | auto-generated |

### Slots

#### default

The `default` slot can be used to provide an activator. The slot provides the `attrs` attribute that must be binded to the activating element.

```vue
<Tooltip text="Tooltip text" v-slot="{ attrs }">
  <button v-bind="attrs">Activator</button>
</Tooltip>
```

#### content

The `content` slot can be used to provide any custom html content for the tooltip.

```vue
<Tooltip>
  <template #content>
    Any custom html content 
    <img src="..." />
  </template>
</Tooltip>
```

### Keyboard interactions

- `Escape` - Hides the tooltip without preventing the default action.

### ARIA roles and attributes

Tooltips have the [tooltip](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role) role.
