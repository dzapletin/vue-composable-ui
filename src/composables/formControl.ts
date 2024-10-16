import type { MaybeRef, Ref } from "vue";
import { ref, unref, onBeforeUnmount, onMounted, readonly } from "vue";

import type { TemplateRefOrSelector } from "../utils/element";
import { useHTMLElement } from "../utils/element";

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * A validating function must return `true` or a string describing the error
 */
export type FormValidator = (value: string) => boolean | string;

export interface useFormControlReturn {
  /**
   * Focus the form control
   */
  focus: () => void;
  /**
   * Validate the form control
   *
   * @returns Validation result
   */
  validate: () => boolean;
  /**
   * Whether the form control is valid. A shorthand for `validity.valid`, but can be manually overriden.
   */
  isValid: Ref<boolean>;
  /**
   * The validity state of the form control
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ValidityState}
   */
  validity: Readonly<Ref<ValidityState | undefined>>;
  /**
   * A string representing a localized message that describes the validation constraints that the control does not satisfy (if any)
   */
  validationMessage: Readonly<Ref<string>>;
  /**
   * Whether the value has been changed since the form control was mounted
   */
  isChanged: Ref<boolean>;
}

/**
 * Utilizes Constraint Validation API to enable custom validation constrains for a form control
 *
 * @param el A template ref or a CSS selector
 * @param validators An array of validating functions
 * @param showValidationError Whether to show the default browser validation error (true by default)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation}
 */
export function useFormControl(
  el: TemplateRefOrSelector<FormElement>,
  validators: MaybeRef<FormValidator[]> = [],
  showValidationError: MaybeRef<boolean> = true
): useFormControlReturn {
  const isChanged = ref(false);
  const isValid = ref(true);
  const validity = ref<ValidityState>();
  const validationMessage = ref("");

  let formElement: FormElement | undefined;
  let initValue: string;

  function focus() {
    formElement?.focus();
  }

  function updateValidationState() {
    isValid.value = formElement!.validity.valid;
    validity.value = formElement!.validity;
    validationMessage.value = formElement!.validationMessage;
  }

  function validate() {
    if (!formElement) throw new Error("Form element is undefined");
    formElement.setCustomValidity("");

    if (formElement.validity.valid) {
      const value = formElement.value;
      for (const validator of unref(validators)) {
        const check = validator(value);
        if (check !== true) {
          formElement.setCustomValidity(check as string);
          break;
        }
      }
    }

    updateValidationState();
    return isValid.value;
  }

  function onInvalid(event: Event) {
    updateValidationState();
    if (!unref(showValidationError)) {
      event.preventDefault();
    }
  }

  function onChange() {
    validate();
    isChanged.value = initValue !== formElement!.value;
  }

  let abortController = new AbortController();

  onMounted(() => {
    formElement = useHTMLElement(el).value;
    if (!formElement) throw new Error("Form element is undefined");

    initValue = formElement.value;

    formElement.addEventListener("change", onChange, {
      signal: abortController.signal,
      passive: true,
    });
    formElement.addEventListener("invalid", onInvalid, {
      signal: abortController.signal,
    });

    // Fix autofocus?
    if (formElement?.autofocus) {
      focus();
    }
  });

  onBeforeUnmount(() => {
    abortController.abort();
  });

  return {
    focus,
    validate,

    isValid,
    validity: readonly(validity),
    validationMessage: readonly(validationMessage),

    isChanged,
  };
}
