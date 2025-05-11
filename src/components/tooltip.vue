<template>
  <slot :attrs="activatorAttrs" />

  <Teleport to="body">
    <div
      ref="popupEl"
      v-if="isOpen"
      :id="tooltipId"
      v-bind="$attrs"
      role="tooltip"
    >
      <slot name="content">{{ text }}</slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useSlots, useId } from "vue";
import { usePopover } from "../composables/popover";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    id?: string;
    text?: string;
    delay?: string | number;
    direction?: "up" | "down" | "left" | "right";
  }>(),
  {
    direction: "up",
  }
);
const slots = useSlots();

const popupEl = ref();
let timer: NodeJS.Timeout;

const tooltipId = props.id ?? useId();

const { isOpen } = usePopover(`[aria-describedby=${tooltipId}]`, popupEl, {
  direction: props.direction,
  align: "center",
});

function open() {
  timer = setTimeout(
    () => {
      isOpen.value = true;
    },
    typeof props.delay === "string" ? parseInt(props.delay) : props.delay
  );
}

function close() {
  isOpen.value = false;
  clearTimeout(timer);
}

function onKeyDown(evt: KeyboardEvent) {
  if (evt.key === "Escape") {
    close();
  }
}

const activatorAttrs = {
  "aria-describedby": tooltipId,
  onmouseenter: open,
  onmouseleave: close,
  onfocus: open,
  onblur: close,
  onkeydown: onKeyDown,
};

const controller = new AbortController();

onMounted(() => {
  if (slots.default) return;
  const activator = document.querySelector(
    `[aria-describedby=${tooltipId}]`
  ) as HTMLElement;
  if (!activator) {
    throw new Error(`Tooltip activator not found: ${tooltipId}`);
  }
  activator.addEventListener("mouseenter", open, {
    signal: controller.signal,
    passive: true,
  });
  activator.addEventListener("mouseleave", close, {
    signal: controller.signal,
    passive: true,
  });
  activator.addEventListener("focus", open, {
    signal: controller.signal,
    passive: true,
  });
  activator.addEventListener("blur", close, {
    signal: controller.signal,
    passive: true,
  });
  activator.addEventListener("keydown", onKeyDown, {
    signal: controller.signal,
    passive: true,
  });
});

onBeforeUnmount(() => {
  controller.abort();
});
</script>

<style scoped></style>
