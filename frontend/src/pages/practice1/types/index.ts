export type AllowanceValuesType = {
  value: string
  isUniform?: boolean
  payUnit?: string
}

export type OtherAllowanceValuesType = {
  name: string
  value: string
  isRelatedLabor: boolean
  isUniform?: boolean
  payUnit?: string
}

export type AllowancesType = {
  baseSalary: AllowanceValuesType
  positionAllowance?: AllowanceValuesType
  qualificationAllowance?: AllowanceValuesType
  housingAllowance?: AllowanceValuesType
  commutingAllowance?: AllowanceValuesType
  otherAllowance?: OtherAllowanceValuesType[]
}
