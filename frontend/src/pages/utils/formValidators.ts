import { inputValue, ErrorMessage } from '../types'

export const required = (value: inputValue): ErrorMessage =>
  value !== undefined ? undefined : '値を入力してください'

export const mustBeNumber = (value: inputValue): ErrorMessage => {
  return isNaN(value) && value !== undefined
    ? '数値を入力してください'
    : undefined
}

export const composeValidators =
  (...validators: Array<(value: inputValue) => ErrorMessage>) =>
  (value: inputValue) =>
    validators.reduce(
      (error: ErrorMessage, validator) => error ?? validator(value),
      undefined
    )
