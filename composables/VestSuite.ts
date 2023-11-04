import type { Suite } from 'vest'
import type { CB } from 'vest-utils'

import { computed, ref } from 'vue'
import classnames from 'vest/classnames'

// Duplicate of unexported `SupportedClasses` interface
interface Classes {
  valid?: string
  tested?: string
  invalid?: string
  warning?: string
  untested?: string
}

// Replace `undefined` with your class names of choice!
const DEFAULT_CLASSES: Classes = {
  valid: undefined,
  tested: undefined,
  invalid: undefined,
  warning: undefined,
  untested: undefined,
}

/**
 * Vue composable for interacting with [Vest](https://vestjs.dev) validation suites.
 *
 * @param {Suite} suite - The Vest validation suite
 * @param {Classes} [_classes] - The user-defined state-validity class names
 */
export function useVestSuite<T extends CB>(suite: Suite<T>, _classes?: Classes) {
  // reactive reference to the suite result
  const res = ref(suite.get())

  // method which returns respective classes depending on field's validity status;
  // here, we merge the user's input class names with the default class names
  // defined above
  const classes = computed(() => {
    return classnames(res.value, { ...DEFAULT_CLASSES, ..._classes })
  })

  // the suite validation method
  function validate(...args: Parameters<T>) {
    res.value = suite(...args)
  }

  // the suite reset method
  function reset() {
    suite.reset()
    res.value = suite.get()
  }

  // the suite reset method for a single field
  function resetField(field: string) {
    suite.resetField(field)
    res.value = suite.get()
  }

  return { res, classes, validate, reset, resetField }
}
