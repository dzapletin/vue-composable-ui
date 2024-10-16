import type { Ref } from "vue";
import { ref } from "vue";

export type TemplateRefOrSelector<E extends HTMLElement = HTMLElement> =
  | Ref<E | undefined>
  | E
  | string;

export function useHTMLElement<E extends HTMLElement = HTMLElement>(
  el: TemplateRefOrSelector<E>
) {
  if (typeof el === "string") {
    return ref<E | undefined>(document.querySelector<E>(el) || undefined);
  } else if (el instanceof HTMLElement) {
    return ref<E | undefined>(el);
  } else {
    return el;
  }
}
