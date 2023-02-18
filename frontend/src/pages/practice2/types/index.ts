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

export type AttendancesType = {
  attendanceName: string
  value: string
}

export type AllowancesType = {
  laborRegulations: {
    yearPrescribedWorkingDays: {
      value: string
    }
    dailyPrescribedWorkingHours: {
      hour: {
        value: string
      }
      minute?: {
        value: string
      }
    }
    closingDate?: {
      value: string
    }
    payDate?: {
      value: string
      payMonth: string
    }
  }
  allowances: {
    baseSalary: AllowanceValuesType
    positionAllowance?: AllowanceValuesType
    qualificationAllowance?: AllowanceValuesType
    housingAllowance?: AllowanceValuesType
    commutingAllowance?: AllowanceValuesType
    otherAllowance?: OtherAllowanceValuesType[]
  }
  attendances?: AttendancesType[]
}
