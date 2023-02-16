import { FC, Dispatch, SetStateAction } from 'react'

type SubmitButtons = {
  submitting: boolean
  reset: () => void
  setSum: Dispatch<SetStateAction<number>>
}

const SubmitButtons: FC<SubmitButtons> = (props) => {
  const { submitting, reset, setSum } = props
  return (
    <div className="buttons largeButtons">
      <button
        className="lgButton bg-blue-400"
        type="submit"
        disabled={submitting}
      >
        計算
      </button>
      <button
        className="lgButton bg-gray-200"
        type="button"
        onClick={() => {
          reset()
          setSum(0)
        }}
        disabled={submitting}
      >
        元に戻す
      </button>
    </div>
  )
}

export default SubmitButtons
