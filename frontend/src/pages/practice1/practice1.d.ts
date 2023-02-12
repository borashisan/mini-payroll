type ErrorMessage = string | undefined

type inputValue = number

type AllowanceValuesType = {
  value: string
  isRelatedLabor: boolean
  isUniform?: boolean
  payUnit?: string
}

type OtherAllowanceValuesType = {
  name: string
  value: string
  isRelatedLabor: boolean
  isUniform?: boolean
  payUnit?: string
}

type AllowancesType = {
  baseSalary: AllowanceValuesType
  positionAllowance?: AllowanceValuesType
  qualificationAllowance?: AllowanceValuesType
  housingAllowance?: AllowanceValuesType
  commutingAllowance?: AllowanceValuesType
  otherAllowance?: OtherAllowanceValuesType[]
}

type FormProps = {
  initialValues: AllowancesType
}
