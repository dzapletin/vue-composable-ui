# useListOption

`useListOption` is meant to be used in a child component representing a list item inside a parent component that uses the [`useList`](/composables/list) composable.

See the [Basic Usage](/composables/list#basic-usage) example.

## Type Declarations

### Composable

```ts
/**
 * Registers an HTML element and an associated value in the list created in the parent component
 *
 * @param el A template ref or a CSS selector
 * @param value A value of any type to associate with the HTML element
 * @param disabled Whether the item is disabled (false by default)
 */
export declare function useListOption(
  el: HTMLElementType,
  value: ItemValue,
  disabled?: MaybeRef<boolean>
): UseListOptionReturn;
```

### Return Type

```ts
interface UseListOptionReturn {
  /**
   * Whether the item is selected
   */
  isSelected: ComputedRef<boolean>;
  /**
   * Whether the item is active
   */
  isActive: ComputedRef<boolean>;
  /**
   * Select the item
   */
  select: () => void;
  /**
   * Activate the item
   */
  activate: () => void;
}
```
