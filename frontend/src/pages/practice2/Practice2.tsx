import { type FC, useState } from 'react'
import InputForm from './components/InputForm'

const Practice2: FC = () => {
  const [sum, setSum] = useState(0)
  return (
    <div className="main">
      <div className="mainContainer">
        <h1 className="containerHeader">演習2</h1>
        <div className="containerTabs"></div>
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

const initialValues = {
  attendances: [
    {
      attendanceName: 'overtime',
      value: '62',
    },
    {
      value: '192',
    },
    {
      value: '240',
    },
    {
      attendanceName: 'lateNight',
      value: '55',
    },
    {
      value: '87',
    },
    {
      value: '125',
    },
    {
      attendanceName: 'legalHoliday',
      value: '420',
    },
    {
      value: '152',
    },
    {
      value: '135',
    },
  ],
  yearPrescribedWorkingDays: {
    value: '252',
  },
  dailyPrescribedWorkingHours: {
    value: '8',
  },
  closingDate: {
    value: '15',
  },
  payDate: {
    value: '20',
  },
  payMonth: 'currentMonth',
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
}

export default Practice2
