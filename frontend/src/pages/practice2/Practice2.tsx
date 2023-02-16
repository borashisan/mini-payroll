import { type FC } from 'react'
import AllowanceForm from './components/AllowanceForm'

const Practice2: FC = () => {
  return (
    <div className="main">
      <div className="mainContainer">
        <h1 className="containerHeader">演習2</h1>
        <div className="containerTabs"></div>
        <div className="containerContents">
          <p className="description">
            問.
            次の事例について、割増賃金の基礎となる賃金の合計を計算してください。
          </p>
          <div className="p-4">
            <AllowanceForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Practice2
