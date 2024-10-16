<script setup>
import ComboboxDemo from './demos/combobox.vue'
import ComboboxTagsDemo from './demos/combobox_tags.vue'
</script>

# Combobox Components

A combobox is a composite widget that combines an input field with a popup providing possible values for that input field.

Based on:

- [usePopover](/composables/popover)
- [useList](/composables/list)
- [useListOption](/composables/list-option)
- [useFormControl](/composables/form-control)

## Demo

<ComboboxDemo />
::: details Code
<<< ./demos/combobox.vue
:::

## Complex Widget Example

Autocomplete + tags

<ComboboxTagsDemo />
::: details Code
<<< ./demos/combobox_tags.vue
:::

## Combobox

The root component.

### Properties

| Property         | Required | Description                                                                                                    | Type                                                  | Default                                                                                                                                     |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **modelValue**   | true     | The selected value. Set to an array to enable multiselection.                                                  | `any` \| `any[]`                                      | `undefined`                                                                                                                                 |
| **displayValue** | false    | A function that takes the combobox value and returns a string representation that is shown in the input.       | `(value: unknown \| unknown[]) => string`             | Calls `.toString()` on the provided value. For multi-selectable combobox converts every value to string and joins the results with a comma. |
| **name**         | false    | The name of the field that is submitted when using inside a form.                                              | `string`                                              | `undefined`                                                                                                                                 |
| **formValue**    | false    | A function that takes a selected item value and transforms it into a value to submit when using inside a form. | `(item: unknown) => Record<string, string> \| string` | Returns the value unchanged                                                                                                                 |
| **id**           | false    | The ID of the combobox input.                                                                                  | `string`                                              | Auto-generated                                                                                                                              |
| **activatorId**  | false    | The ID of the activator element.                                                                               | `string`                                              | Equals to the `id`                                                                                                                          |

### Slots

#### input

The `input` slot is used to provide an input element and possibly an activator. The slot passes the following properties:

| Property      | Description                                               | Type           |
| ------------- | --------------------------------------------------------- | -------------- |
| **attrs**     | Required attributes that **must** be binded to the input. | `object`       |
| **isOpen**    | The status of the popover.                                | `Ref<boolean>` |
| **toggle**    | Toggle the popover.                                       | `() => void`   |
| **popoverId** | The ID of the popover dialog.                             | `string`       |

In a complex component you may need to wrap the input in a container element which must serve as an activator for the popover. You can achieve this by setting the `activatorId` property and assigning it to the wrapper element in the input slot.

```vue
<Combobox activatorId="activator">
  <template #input="{ popoverId, attrs, toggle, isOpen }">
    <div id="activator">
      <input
        v-bind="attrs"
      />
      <button
        @click="toggle"
        :aria-controls="isOpen ? popoverId : undefined"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        tabindex="-1"
      >
        Toggle
      </button>
    </div>
  </template>
</Combobox>
```

### Keyboard interactions

When closed:

- `Space` / `Enter` - Opens the listbox.
- `Down Arrow` / `Home` - Opens the listbox and moves focus to the first item.
- `Up Arrow` / `End` - Opens the listbox and moves focus to the last item.

When open:

- `Space` - Selects the currently active item and closes the combobox (if it is not multiselectable).
- `Enter` - Selects the currently active item and closes the combobox.
- `Tab` - Selects the currently active item, closes the combobox and proceeds to the default tab action.
- `Down Arrow` - Moves focus to the next item.
- `Up Arrow` - Moves focus to the previous item.
- `Home` - Moves focus to the first item.
- `End` - Moves focus to the last item.
- `Escape` - Closes the listbox.

## ComboboxOptions

Wraps a collection of options, has no properties.

### ARIA roles and attributes

Options container has the [listbox](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role) role.

## ComboboxOption

### Properties

| Property     | Required | Description                   | Type      | Default        |
| ------------ | -------- | ----------------------------- | --------- | -------------- |
| **value**    | true     | Value assigned to the item.   | `any`     |                |
| **disabled** | false    | Whether the item is disabled. | `boolean` | `false`        |
| **id**       | false    | The ID of the item.           | `string`  | Auto-generated |

### Slots

#### default

| Attribute      | Description                           | Type      |
| -------------- | ------------------------------------- | --------- |
| **isSelected** | Whether the item is selected.         | `boolean` |
| **isActive**   | Whether the item is active (focused). | `boolean` |

### ARIA roles and attributes

Options have the [option](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role) role.

The following attributes are automatically managed:

- [aria-selected](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
- [aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

## Using in a Form

When using Combobox in a form set the `name` attribute on the root component.

If multiple items are selected, the values will be submitted as an array:

```
name[0]=value1&name[1]=value2...&name[n]=valueN
```

If a value is an object each of its properties will be submitted as a separate field:

```js
const value = {
  login: "johny1223",
  email: "johny@gmail.com",
  isAdmin: false,
};

// Will be submitted as
// name[login]=johny1223&name[email]=johny@gmail.com&name[isAdmin]=false
```

Sometimes you may want to transform a value before submitting the form. Use the `formValue` attribute to provide a transformer function, if multiple items are selected the function will be call for each value:

```js
const value = {
  login: "johny1223",
  email: "johny@gmail.com",
  isAdmin: false,
};
const formValue = (value) => value.login;

// Will be submitted as
// name=johny@gmail.com
```
