import type { ComputedRef, MaybeRef } from "vue";
import {
  ref,
  unref,
  inject,
  computed,
  onBeforeUnmount,
  onBeforeMount,
} from "vue";

import type { TemplateRefOrSelector } from "../utils/element";

import type { ItemValue, ActivationOptions } from "./list";
import { injectList } from "./list";

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
  activate: (options?: ActivationOptions) => void;
  /**
   * Deactivate the item
   */
  deactivate: () => void;
}

/**
 * Registers an HTML element and an associated value in the list created in the parent component
 *
 * @param el A template ref or a CSS selector
 * @param value A value of any type
 * @param disabled Whether the item is disabled (false by default)
 */
export function useListOption(
  el: TemplateRefOrSelector,
  value: ItemValue,
  disabled?: MaybeRef<boolean>
): UseListOptionReturn {
  const list = inject(injectList);
  if (!list) {
    throw new Error("List injectable context is not provided");
  }

  const itemId = ref(-1);

  const _isSelected = computed(() => list.isSelected(itemId.value));
  const _isActive = computed(() => list.isActive(itemId.value));

  function select() {
    list!.selectItem(itemId.value);
  }

  function activate({ focus = true } = {}) {
    if (unref(disabled)) return;
    list!.activateItem(itemId.value, { focus });
  }

  function deactivate() {
    list!.deactivateItem();
  }

  onBeforeMount(() => {
    itemId.value = list.addItem(el, value, disabled);
  });

  onBeforeUnmount(() => {
    list.removeItem(itemId.value);
  });

  return {
    isSelected: _isSelected,
    isActive: _isActive,
    select,
    activate,
    deactivate,
  };
}
