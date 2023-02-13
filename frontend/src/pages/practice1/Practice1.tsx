import { type FC, useState } from 'react'
import AllowanceForm from './components/AllowanceForm'

const Practice1: FC = () => {
  const [initialValues, setInitializeValues] = useState(case1)
  return (
    <div className="main">
      <div className="mainContainer">
        <h1 className="containerHeader">演習1</h1>
        <div className="containerTabs">
          <button
            className="containerTab"
            onClick={() => setInitializeValues(case1)}
          >
            事例1
          </button>
          <button
            className="containerTab"
            onClick={() => setInitializeValues(case2)}
          >
            事例2
          </button>
          <button
            className="containerTab"
            onClick={() => setInitializeValues(freeFormat)}
          >
            自由記述
          </button>
        </div>
        <div className="containerContents">
          <p className="description">
            問.
            次の事例について、割増賃金の基礎となる賃金の合計を計算してください。
          </p>
          <div className="p-4">
            <AllowanceForm initialValues={initialValues} />
          </div>
        </div>
      </div>
    </div>
  )
}

const case1: AllowancesType = {
  baseSalary: { value: '320000' },
  positionAllowance: { value: '70000' },
  housingAllowance: {
    value: '35000',
    isUniform: false,
  },
  commutingAllowance: {
    value: '14000',
    isUniform: false,
    payUnit: '1month',
  },
}

const case2: AllowancesType = {
  baseSalary: { value: '215000' },
  qualificationAllowance: { value: '5000' },
  housingAllowance: {
    value: '10000',
    isUniform: true,
  },
  commutingAllowance: {
    value: '24372',
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
  baseSalary: { value: '0' },
}

export default Practice1
