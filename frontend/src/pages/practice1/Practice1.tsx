import { type FC, useState } from 'react'
import AllowanceForm from './components/AllowanceForm'

const Practice1: FC = () => {
  const [initialValues, setInitializeValues] = useState(case1)
  return (
    <div className="main">
      <div className="mainContainer">
        <h1 className="containerHeader">演習1</h1>
        <div>
          <button onClick={() => setInitializeValues(case1)}>事例1</button>
          <button onClick={() => setInitializeValues(case2)}>事例2</button>
          <button onClick={() => setInitializeValues(freeFormat)}>
            自由記述
          </button>
        </div>
        <div>
          <AllowanceForm initialValues={initialValues} />
        </div>
      </div>
    </div>
  )
}

const case1: AllowancesType = {
  baseSalary: { value: '320000', isRelatedLabor: true },
  positionAllowance: { value: '70000', isRelatedLabor: true },
  housingAllowance: {
    value: '35000',
    isRelatedLabor: false,
    isUniform: false,
  },
  commutingAllowance: {
    value: '14000',
    isRelatedLabor: false,
    isUniform: false,
    payUnit: '1month',
  },
}

const case2: AllowancesType = {
  baseSalary: { value: '215000', isRelatedLabor: true },
  qualificationAllowance: { value: '5000', isRelatedLabor: true },
  housingAllowance: {
    value: '10000',
    isRelatedLabor: false,
    isUniform: true,
  },
  commutingAllowance: {
    value: '24372',
    isRelatedLabor: false,
    isUniform: false,
    payUnit: '3month',
  },
  otherAllowance: [
    {
      name: '家族手当',
      value: '16000',
      isRelatedLabor: false,
      isUniform: false,
    },
  ],
}

const freeFormat: AllowancesType = {
  baseSalary: { value: '0', isRelatedLabor: true },
}

export default Practice1
