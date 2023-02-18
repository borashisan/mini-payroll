import { type FC, useState } from 'react'
import InputForm from './components/InputForm'
import { type AllowancesType } from '../practice2/types'

const Practice2: FC = () => {
  const [initialValues, setInitializeValues] = useState(case1)
  const [sum, setSum] = useState(0)
  return (
    <div className="main">
      <div className="mainContainer">
        <h1 className="containerHeader">演習2</h1>
        <div className="containerTabs">
          <button
            className="containerTab"
            onClick={() => {
              setInitializeValues(case1)
              setSum(0)
            }}
          >
            事例1
          </button>
          <button
            className="containerTab"
            onClick={() => {
              setInitializeValues(case2)
              setSum(0)
            }}
          >
            事例2
          </button>
          <button
            className="containerTab"
            onClick={() => {
              setInitializeValues(freeFormat)
              setSum(0)
            }}
          >
            自由記述
          </button>
        </div>
        <div className="containerContents">
          <p className="description">
            問. 次の事例について、割増賃金の合計を計算してください。
          </p>
          <div className="p-4">
            <InputForm
              sum={sum}
              setSum={setSum}
              initialValues={initialValues}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const case1: AllowancesType = {
  laborRegulations: {
    yearPrescribedWorkingDays: {
      value: '252',
    },
    dailyPrescribedWorkingHours: {
      hour: { value: '8' },
    },
    closingDate: {
      value: '15',
    },
    payDate: {
      value: '20',
      payMonth: 'currentMonth',
    },
  },
  allowances: {
    baseSalary: {
      value: '225000',
    },
    positionAllowance: {
      value: '15000',
    },
    commutingAllowance: {
      value: '15830',
    },
    otherAllowance: [
      {
        name: '家族手当',
        value: '20000',
        isRelatedLabor: false,
      },
    ],
  },
  attendances: [
    {
      attendanceName: 'overtime',
      value: '62',
    },
    {
      attendanceName: 'overtime',
      value: '192',
    },
    {
      attendanceName: 'overtime',
      value: '240',
    },
    {
      attendanceName: 'late_night',
      value: '55',
    },
    {
      attendanceName: 'overtime',
      value: '87',
    },
    {
      attendanceName: 'overtime',
      value: '125',
    },
    {
      attendanceName: 'legal_holiday',
      value: '420',
    },
    {
      attendanceName: 'overtime',
      value: '152',
    },
    {
      attendanceName: 'overtime',
      value: '135',
    },
  ],
}

const case2: AllowancesType = {
  laborRegulations: {
    yearPrescribedWorkingDays: {
      value: '240',
    },
    dailyPrescribedWorkingHours: {
      hour: { value: '7' },
      minute: { value: '30' },
    },
    closingDate: {
      value: '30',
    },
    payDate: {
      value: '25',
      payMonth: 'nextMonth',
    },
  },
  allowances: {
    baseSalary: {
      value: '250000',
    },
    positionAllowance: {
      value: '30000',
    },
    qualificationAllowance: {
      value: '4000',
    },
    housingAllowance: {
      value: '12000',
      isUniform: false,
    },
    commutingAllowance: {
      value: '2500',
      isUniform: false,
      payUnit: '1month',
    },
    otherAllowance: [
      {
        name: '家族手当',
        value: '1000',
        isRelatedLabor: false,
      },
    ],
  },
  attendances: [
    {
      value: '45',
      attendanceName: 'overtime',
    },
    {
      value: '70',
      attendanceName: 'overtime',
    },
    {
      value: '30',
      attendanceName: 'overtime',
    },
    {
      value: '148',
      attendanceName: 'overtime',
    },
    {
      value: '85',
      attendanceName: 'overtime',
    },
    {
      value: '90',
      attendanceName: 'overtime',
    },
    {
      value: '240',
      attendanceName: 'overtime',
    },
    {
      attendanceName: 'late_night',
      value: '45',
    },
    {
      attendanceName: 'legal_holiday',
      value: '500',
    },
  ],
}

const freeFormat: AllowancesType = {
  laborRegulations: {
    yearPrescribedWorkingDays: {
      value: '0',
    },
    dailyPrescribedWorkingHours: {
      hour: { value: '0' },
    },
  },
  allowances: {
    baseSalary: { value: '0' },
  },
}

export default Practice2
