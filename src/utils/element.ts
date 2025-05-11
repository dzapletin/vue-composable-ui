import type { Ref } from "vue";
import { ref } from "vue";

export type TemplateRefOrSelector<E extends HTMLElement = HTMLElement> =
  | Ref<E | null>
  | E
  | string;

export function useHTMLElement<E extends HTMLElement = HTMLElement>(
  el: TemplateRefOrSelector<E>
) {
  if (typeof el === "string") {
    return ref(document.querySelector<E>(el));
  } else if (el instanceof HTMLElement) {
    return ref(el);
  } else {
    return el;
  }
}
