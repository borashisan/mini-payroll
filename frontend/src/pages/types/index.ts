import { Dispatch, SetStateAction } from 'react'

export type ErrorMessage = string | undefined

export type inputValue = number

export interface FormProps<AllowancesType = object> {
  initialValues?: AllowancesType
  sum: number
  setSum: Dispatch<SetStateAction<number>>
}
