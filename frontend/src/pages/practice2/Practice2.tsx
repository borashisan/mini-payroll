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
            <InputForm sum={sum} setSum={setSum} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Practice2
