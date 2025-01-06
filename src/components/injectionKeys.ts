import type { ComputedRef, InjectionKey } from "vue";

import type { UseListReturn } from "../composables/list";
import type { UsePopoverReturn } from "../composables/popover";

export const injectTabs: InjectionKey<{
  getIds: (value: any) => ComputedRef<{
    tabId: string | undefined;
    panelId: string | undefined;
  }>;
  selectActiveItem: UseListReturn["selectActiveItem"];
  activateFirstItem: UseListReturn["activateFirstItem"];
  activateLastItem: UseListReturn["activateLastItem"];
  activateNextItem: UseListReturn["activateNextItem"];
  activatePrevItem: UseListReturn["activatePrevItem"];
}> = Symbol();

export const injectPopover: InjectionKey<{
  popoverId: string;
  activatorId: string;
  role: "dialog" | "listbox" | "menu" | "tree" | "grid";
  isOpen: UsePopoverReturn["isOpen"];
  close: UsePopoverReturn["close"];
}> = Symbol();

export const injectMenu: InjectionKey<{
  menuId: string;
  activatorId: string;
  isOpen: UsePopoverReturn["isOpen"];
  close: UsePopoverReturn["close"];

  activeItemId: ComputedRef<string | undefined>;
  isMultiselectable: UseListReturn["isMultiselectable"];
  activateFirstItem: UseListReturn["activateFirstItem"];
  activateLastItem: UseListReturn["activateLastItem"];
  activateNextItem: UseListReturn["activateNextItem"];
  activatePrevItem: UseListReturn["activatePrevItem"];
}> = Symbol();

export const injectCombobox: InjectionKey<{
  displayValue: ComputedRef<string | undefined>;
  popoverId: string;

  isOpen: UsePopoverReturn["isOpen"];
  open: UsePopoverReturn["open"];
  close: UsePopoverReturn["close"];

  isMultiselectable: UseListReturn["isMultiselectable"];

  focus: () => void;
  activatorAttrs: ComputedRef<Record<string, any>>;
}> = Symbol();
