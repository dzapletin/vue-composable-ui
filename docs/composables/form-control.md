# useFormControl

`useFormControl` utilizes [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) to enable custom validation constrains for a form control.

## Basic Usage

```vue
<script setup>
import { ref } from "vue";
import { useFormControl } from "vue-composable-ui";

const codeInput = ref();

const code = ref("");
const country = ref("");

const validateCode = (value) => {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  const constraint = new RegExp(constraints[country.value][0], "");

  // Check it!
  if (constraint.test(code.value)) {
    // The postal code follows the constraint, we use the ConstraintAPI to tell it
    return true;
  } else {
    // The postal code doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    return constraints[country.value][1];
  }
};

const { validate } = useFormControl(codeInput, [validateCode]);
</script>

<template>
  <form>
    <label for="postal-code">Postal Code: </label>
    <input ref="codeInput" v-model="code" id="postal-code" />
    <label for="country">Country: </label>
    <select v-model="country" id="country">
      <option value="ch">Switzerland</option>
      <option value="fr">France</option>
      <option value="de">Germany</option>
      <option value="nl">The Netherlands</option>
    </select>
    <button type="button" @click="validate">Validate</button>
  </form>
</template>
```

## Type Declarations

### Composable

```ts
type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * A validating function must return `true` or a string describing the error
 */
export type FormValidator = (value: string) => boolean | string;

/**
 * Utilizes Constraint Validation API to enable custom validation constrains for a form control
 *
 * @param el A template ref or a CSS selector
 * @param validators An array of validating functions
 * @param showValidationError Whether to show the default browser validation error (true by default)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation}
 */
export declare function useFormControl(
  el: TemplateRefOrSelector<FormElement>,
  validators?: MaybeRef<FormValidator[]>,
  showValidationError?: MaybeRef<boolean>
): useFormControlReturn;
```

### Return Type

```ts
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
```
