import type { Ref } from "vue";
import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  onBeforeMount,
} from "vue";
import { useHTMLElement, TemplateRefOrSelector } from "../utils/element";

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

/**
 *
 * @param activatorEl A template ref or a CSS selector
 * @param popupEl A template ref or a CSS selector
 * @param options Popover options
 */
export function usePopover(
  activatorEl: TemplateRefOrSelector,
  popupEl: TemplateRefOrSelector,
  {
    direction = "down",
    align = "left",
    position = "fixed",
    closeOnOutsideClick = true,
    closeOnInsideClick = false,
  }: UsePopoverOptions = {}
): UsePopoverReturn {
  const isOpen = ref(false);

  function getActivator() {
    const el = useHTMLElement(activatorEl);
    if (!el.value) throw new Error("Activator element is undefined");
    return el.value;
  }

  function getPopup() {
    const el = useHTMLElement(popupEl);
    if (!el.value) throw new Error("Popover element is undefined");
    return el.value;
  }

  function open({ focus = true }: FocusOptions = {}) {
    isOpen.value = true;
    if (focus)
      nextTick(() => {
        const popover = getPopup();
        popover.focus();
      });
  }

  function close({ focus = true }: FocusOptions = {}) {
    isOpen.value = false;
    if (focus) {
      const activator = getActivator();
      activator.focus();
    }
  }

  function toggle(options?: FocusOptions) {
    if (isOpen.value) {
      close(options);
    } else {
      open(options);
    }
  }

  function calcPosition() {
    if (!isOpen.value) return;

    const activator = getActivator();
    const popover = getPopup();

    popover.style.position = position;
    const {
      top: aTop,
      right: aRight,
      bottom: aBottom,
      left: aLeft,
      width: aWidth,
      height: aHeight,
    } = activator.getBoundingClientRect();

    const popoverHeight = popover.offsetHeight;
    const popoverWidth = popover.offsetWidth; //> aWidth ? popover.offsetWidth : aWidth;

    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;

    // reverse menu direction if it doesnt fit in the viewport
    let _direction = direction;

    if (direction == "up") {
      if (aTop - popoverHeight < 0) {
        _direction = "down";
      }
    } else if (direction == "down") {
      if (aBottom + popoverHeight > viewportHeight) {
        _direction = "up";
      }
    } else if (direction == "right") {
      if (aRight + popoverWidth > viewportWidth) {
        _direction = "left";
      }
    } else if (direction == "left") {
      if (aLeft - popoverWidth < 0) {
        _direction = "right";
      }
    }

    let _align = align;

    if (align == "left") {
      if (aLeft + popoverWidth > viewportWidth) {
        _align = "right";
      }
    } else if (align == "right") {
      if (aRight - popoverWidth < 0) {
        _align = "left";
      }
    } else if (align == "top") {
      if (aTop + popoverHeight > viewportHeight) {
        _align = "bottom";
      }
    } else if (align == "bottom") {
      if (aBottom - popoverHeight < 0) {
        _align = "top";
      }
    }

    const _position = {
      top: "auto",
      bottom: "auto",
      left: "auto",
      right: "auto",
      width: "auto",
    };

    const isFixed = position === "fixed";

    if (_direction == "up") {
      _position.bottom = `${
        aHeight + (isFixed ? viewportHeight - aBottom : 0)
      }px`;
    } else if (_direction == "down") {
      _position.top = `${aHeight + (isFixed ? aTop : 0)}px`;
    } else if (_direction == "right") {
      _position.left = `${aWidth + (isFixed ? aLeft : 0)}px`;
    } else if (_direction == "left") {
      _position.right = `${aWidth + (isFixed ? viewportWidth - aRight : 0)}px`;
    }

    if (["up", "down"].includes(_direction)) {
      if (_align == "right") {
        _position.right = `${isFixed ? viewportWidth - aRight : 0}px`;
      } else if (_align == "left" || _align == "stretch") {
        _position.left = `${isFixed ? aLeft : 0}px`;
      } else if (_align == "center") {
        _position.left = `${
          (isFixed ? aLeft : 0) - (popoverWidth - aWidth) / 2
        }px`;
      }
    } else {
      if (_align == "bottom") {
        _position.bottom = `${isFixed ? viewportHeight - aBottom : 0}px`;
      } else if (_align == "top") {
        _position.top = `${isFixed ? aTop : 0}px`;
      } else if (_align == "center") {
        _position.top = `${
          (isFixed ? aTop : 0) - (popoverHeight - aHeight) / 2
        }px`;
      }
    }

    if (["up", "down"].includes(_direction) && _align === "stretch") {
      _position["width"] = aWidth + "px";
    }

    for (const prop in _position) {
      popover.style[prop as keyof typeof _position] =
        _position[prop as keyof typeof _position];
    }
  }

  watch(
    isOpen,
    (val) => {
      if (val) {
        nextTick(() => {
          calcPosition();
        });
      }
    },
    { flush: "pre" }
  );

  function onWindowClick(evt: MouseEvent) {
    const target = evt.target as HTMLElement;

    // ignore activator clicks
    const activator = getActivator();
    if (activator.contains(target)) return;

    try {
      const popover = getPopup();
      // inside
      if (popover.contains(target)) {
        if (closeOnInsideClick) {
          close();
        }
      }
      // outside
      else {
        if (closeOnOutsideClick) {
          isOpen.value = false;
        }
      }
    } catch (e) {}
  }

  let resizeObserver: ResizeObserver;
  const abortController = new AbortController();

  onBeforeMount(() => {
    resizeObserver = new ResizeObserver(calcPosition);
  });

  onMounted(() => {
    window.addEventListener("resize", calcPosition, {
      passive: true,
      signal: abortController.signal,
    });
    window.addEventListener("scroll", calcPosition, {
      passive: true,
      //capture: true,
      signal: abortController.signal,
    });
    window.addEventListener("click", onWindowClick, {
      passive: true,
      signal: abortController.signal,
    });
    resizeObserver.observe(getActivator());
  });

  onBeforeUnmount(() => {
    abortController.abort();
    resizeObserver.disconnect();
  });

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
