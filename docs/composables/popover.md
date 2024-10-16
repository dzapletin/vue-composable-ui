# usePopover

Popover is a floating container that appears next to its activator element above the main document flow. It can be used as a basic component for dropdown menus, comboboxes, tooltips, and more.

The composable abstracts the logic of positioning a popover relative to its activating element and captures clicks to automatically close the popover.

No event listeners are attached to the activating element to give the user full control over the way the popover is triggered.

## Type Declarations

### Composable

```ts
interface UsePopoverOptions {
  /**
   * The direction of the popover dialog
   *
   * @defaultValue `"down"`
   */
  direction?: "up" | "down" | "left" | "right";
  /**
   * The alignment of the popover dialog
   *
   * @defaultValue `"left"`
   */
  align?: "top" | "bottom" | "left" | "right" | "center" | "stretch";
  /**
   * The CSS position of the popover dialog
   *
   * @defaultValue `"fixed"`
   */
  position?: "fixed" | "absolute";
  /**
   * Close the popover on a click outside of the dialog
   *
   * @defaultValue `true`
   */
  closeOnOutsideClick?: boolean;
  /**
   * Close the popover on a click inside of the dialog
   *
   * @defaultValue `false`
   */
  closeOnInsideClick?: boolean;
}

/**
 *
 * @param activatorEl A template ref or a CSS selector
 * @param popupEl A template ref or a CSS selector
 * @param options Popover options
 */
export declare function usePopover(
  activatorEl: TemplateRefOrSelector,
  popupEl: TemplateRefOrSelector,
  options?: UsePopoverOptions
): UsePopoverReturn;
```

### Return Type

```ts
interface FocusOptions {
  /**
   * Focus the popover/activator
   *
   * @defaultValue `true`
   */
  focus?: boolean;
}

export interface UsePopoverReturn {
  /**
   * The popover state
   */
  isOpen: Ref<boolean>;
  /**
   * Open the popover
   */
  open: (options?: FocusOptions) => void;
  /**
   * Close the popover
   */
  close: (options?: FocusOptions) => void;
  /**
   * Toggle the popover
   */
  toggle: (options?: FocusOptions) => void;
}
```
