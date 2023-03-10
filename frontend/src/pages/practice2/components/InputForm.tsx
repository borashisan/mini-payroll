import { type FC } from 'react'
import axios from 'axios'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import applyCaseMiddleware from 'axios-case-converter'
import SubmitButtons from '../../components/SubmitButtons'
import { type FormProps } from '../../types'
import AllowanceForm from '../../components/AllowanceForm'
import LaborRegulationForm from './LaborRegulationForm'
import AttendanceForm from './AttendanceForm'

const InputForm: FC<FormProps> = (props) => {
  const { initialValues, sum, setSum } = props
  const onSubmit = async (values: object): Promise<void> => {
    axios.defaults.baseURL = 'http://localhost:4500'
    const url = '/practices/practice2'
    const sleep = async (ms: number): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, ms))
    }
    await sleep(300)
    const client = applyCaseMiddleware(axios.create())
    client
      .post(url, { payDeductionParams: values })
      .then((response) => {
        setSum(response.data.payload.extraPayAmount)
      })
      .catch(() => {
        console.log('error')
      })
  }

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators,
      }}
      initialValues={initialValues}
      render={({
        handleSubmit,
        form,
        form: {
          mutators: { push, pop },
        },
        submitting,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-8">
            <div>
              <LaborRegulationForm />
              <AllowanceForm push={push} pop={pop} />
            </div>
            <div>
              <div>
                <AttendanceForm push={push} pop={pop} />
              </div>
            </div>
          </div>
          <SubmitButtons
            submitting={submitting}
            reset={form.reset}
            setSum={setSum}
          />
          <div className="grid gap-y-4">
            <h2 className="result">合計: {sum}</h2>
            <pre className="json">{JSON.stringify(values, null, '\t')}</pre>
          </div>
        </form>
      )}
    />
  )
}

export default InputForm
