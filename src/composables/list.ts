import type { ComputedRef, MaybeRef, Ref, ShallowRef, InjectionKey } from "vue";
import {
  ref,
  shallowRef,
  unref,
  provide,
  computed,
  readonly,
  shallowReadonly,
  triggerRef,
} from "vue";
import { useHTMLElement, TemplateRefOrSelector } from "../utils/element";

export type ItemValue = unknown;
export interface Item {
  id: number;
  element: Ref<HTMLElement | undefined>;
  value: ItemValue;
  disabled: MaybeRef<boolean>;
}

export interface ActivationOptions {
  /**
   * Focus the corresponding HTML element
   *
   * @defaultValue `false`
   */
  focus?: boolean;
}

interface NavigationOptions {
  /**
   * Infinitely cycle throught the items
   *
   * @defaultValue `false`
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
    itemEl: TemplateRefOrSelector,
    itemVal: ItemValue,
    disabled?: MaybeRef<boolean>
  ) => number;
  /**
   * Remove an item from the list by ID
   */
  removeItem: (itemId: number) => void;
}

export const injectList: InjectionKey<UseListInjectionKey> = Symbol();

function isValuesEqual(v1: ItemValue, v2: ItemValue) {
  const [_v1, _v2] = [unref(v1), unref(v2)];
  if (typeof _v1 === "object") {
    if (typeof _v2 === "object") {
      return JSON.stringify(_v1) === JSON.stringify(_v2);
    }
    return false;
  }
  return _v1 === _v2;
}

/**
 * Creates a reactive list of HTML elements with assigned values.
 *
 * @param value A ref to store the list value. Set to an array to enable multiselection.
 */
export function useList(value: Ref<unknown>): UseListReturn {
  let lastId = 0;

  const items: ShallowRef<Item[]> = shallowRef([]);
  const activeItemId: Ref<number | undefined> = ref();

  const isMultiselectable = computed(() => Array.isArray(value.value));

  function getItem(itemId: number) {
    const item = items.value.find((_item) => {
      return _item.id === itemId;
    });
    if (!item) throw new Error(`Item not found: (${itemId})`);
    return item;
  }

  function focusItem(item: Item) {
    const el = unref(item.element);
    if (!el) return;
    el.focus();
    return el;
  }

  function activateItem(
    item?: Item,
    { focus = false }: ActivationOptions = {}
  ) {
    activeItemId.value = item?.id ?? undefined;
    if (item !== undefined && focus) focusItem(item);
  }

  function activateItemById(
    itemId: number,
    { focus = false }: ActivationOptions = {}
  ) {
    const item = getItem(itemId);
    return activateItem(item, { focus });
  }

  function isActive(itemId: number) {
    return activeItemId.value === itemId;
  }

  function addItem(
    itemEl: TemplateRefOrSelector,
    itemVal: ItemValue,
    disabled: MaybeRef<boolean> = false
  ) {
    const el = useHTMLElement(itemEl);
    const id = lastId++;
    items.value.push({
      id,
      value: itemVal,
      element: el,
      disabled,
    });
    triggerRef(items);
    return id;
  }

  function removeItem(itemId: number) {
    const item = getItem(itemId);
    const idx = items.value.indexOf(item);
    items.value.splice(idx, 1);
    triggerRef(items);
    if (isActive(itemId)) {
      activateItem();
    }
  }

  function selectItem(itemId: number) {
    const item = getItem(itemId);
    if (unref(item.disabled)) return;
    const v = unref(item.value);
    if (v === undefined) return;
    if (unref(isMultiselectable)) {
      const idx = (value.value as ItemValue[]).findIndex((iv) =>
        isValuesEqual(v, iv)
      );
      if (idx > -1) {
        (value.value as ItemValue[]).splice(idx, 1);
      } else {
        value.value = [...(value.value as ItemValue[]), v];
      }
    } else {
      value.value = v;
    }
    activateItem(item);
  }

  function isSelected(item: Item) {
    return unref(isMultiselectable)
      ? !!(value.value as ItemValue[]).find((iv) =>
          isValuesEqual(item.value, iv)
        )
      : isValuesEqual(value, item.value);
  }

  function isSelectedById(itemId: number) {
    try {
      const item = getItem(itemId);
      return isSelected(item);
    } catch {
      return false;
    }
  }

  function activateSelectedItem({ focus = false }: ActivationOptions = {}) {
    for (let item of items.value) {
      if (isSelected(item)) {
        return activateItem(item, { focus });
      }
    }
  }

  function activateFirstItem({ focus = false }: ActivationOptions = {}) {
    if (!items.value.length) return;
    return activateItem(items.value[0], { focus });
  }

  function activateLastItem({ focus = false }: ActivationOptions = {}) {
    if (!items.value.length) return;
    return activateItem(items.value[items.value.length - 1], { focus });
  }

  function activateNextItem({
    focus = false,
    loop = false,
  }: ActivationOptions & NavigationOptions = {}) {
    if (activeItemId.value === undefined) return activateFirstItem({ focus });
    const item = getItem(activeItemId.value);
    const idx = items.value.indexOf(item);
    let nextItem: Item;
    if (idx + 1 < items.value.length) {
      nextItem = items.value[idx + 1];
    } else {
      if (loop) {
        nextItem = items.value[0];
      } else {
        return;
      }
    }
    return activateItem(nextItem, { focus });
  }

  function activatePrevItem({
    focus = false,
    loop = false,
  }: ActivationOptions & NavigationOptions = {}) {
    if (activeItemId.value === undefined) return activateLastItem({ focus });
    const item = getItem(activeItemId.value);
    const idx = items.value.indexOf(item);
    let prevItem: Item;
    if (idx - 1 > -1) {
      prevItem = items.value[idx - 1];
    } else {
      if (loop) {
        prevItem = items.value[items.value.length - 1];
      } else {
        return;
      }
    }
    return activateItem(prevItem, { focus });
  }

  provide(injectList, {
    value: readonly(value),
    selectItem,
    activateItem: activateItemById,
    isSelected: isSelectedById,
    isActive,
    addItem,
    removeItem,
  });

  return {
    items: shallowReadonly(items),
    isMultiselectable: readonly(isMultiselectable),
    activeItem: computed(() =>
      activeItemId.value !== undefined ? getItem(activeItemId.value) : undefined
    ),
    selectActiveItem: () => {
      if (activeItemId.value !== undefined) {
        selectItem(activeItemId.value);
      }
    },
    activateSelectedItem,
    activateFirstItem,
    activateLastItem,
    activateNextItem,
    activatePrevItem,
  };
}
