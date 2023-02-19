import { inputValue, ErrorMessage } from '../types'

export const required = (value: inputValue): ErrorMessage =>
  value !== undefined ? undefined : '値を入力してください'

export const mustBeNumber = (value: inputValue): ErrorMessage => {
  return isNaN(value) && value !== undefined
    ? '数値を入力してください'
    : undefined
}

export const mustBeHour = (value: inputValue): ErrorMessage => {
  return Number(value) < 0 || Number(value) > 23
    ? '0~23を入力してください'
    : undefined
}

export const mustBeMinute = (value: inputValue): ErrorMessage => {
  return Number(value) < 0 || Number(value) > 59
    ? '0~59を入力してください'
    : undefined
}

export const mustBeDay = (value: inputValue): ErrorMessage => {
  return Number(value) < 0 || Number(value) > 31
    ? '0~31を入力してください'
    : undefined
}

export const composeValidators =
  (...validators: Array<(value: inputValue) => ErrorMessage>) =>
  (value: inputValue) =>
    validators.reduce(
      (error: ErrorMessage, validator) => error ?? validator(value),
      undefined
    )
