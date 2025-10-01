import type { MaybeRefOrGetter, Ref } from "vue";
import { ref, readonly, toValue, watch } from "vue";

/**
 * A validating function must return `true` or a string describing the error
 */
export type Validator = (value: string) => true | string;

export interface useValidationReturn {
  /**
   * Whether the value is valid.
   */
  isValid: Readonly<Ref<boolean>>;

  /**
   * An array of strings representing messages that describe the validation constraints that the value does not satisfy (if any)
   */
  errors: Readonly<Ref<readonly string[]>>;
}

/**
 * Utilizes Constraint Validation API to enable custom validation constrains for a form control
 *
 * @param el A template ref or a CSS selector
 * @param validators An array of validating functions
 * @param stopOnFirstError Whether to stop running validators on the first error (false by default)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation}
 */
export function useValidation(
  value: MaybeRefOrGetter<any>,
  validators: MaybeRefOrGetter<Validator[]> = [],
  stopOnFirstError: MaybeRefOrGetter<boolean> = false
): useValidationReturn {
  const isValid = ref(true);
  const errors = ref<string[]>([]);

  function runValidators(
    _value: any,
    _validators: Validator[],
    _stopOnFirstError: boolean
  ) {
    errors.value = [];
    isValid.value = true;
    for (const validator of _validators) {
      const check = validator(_value);
      if (check !== true) {
        errors.value.push(check);
        isValid.value = false;
        if (_stopOnFirstError) return false;
      }
    }
    return isValid.value;
  }

  watch(
    [
      () => toValue(value),
      () => toValue(validators),
      () => toValue(stopOnFirstError),
    ],
    ([_value, _validators, _stopOnFirstError]) => {
      runValidators(_value, _validators, _stopOnFirstError);
    },
    { immediate: true }
  );

  return {
    isValid: readonly(isValid),
    errors: readonly(errors),
  };
}
