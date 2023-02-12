import { type FC, useState } from 'react'
import axios from 'axios'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import applyCaseMiddleware from 'axios-case-converter'
import OtherAllowanceForm from './OtherAllowanceForm'
import { required, mustBeNumber, composeValidators } from './formValidators'

const AllowanceForm: FC<FormProps> = (props) => {
  const { initialValues } = props
  const [sum, setSum] = useState(0)

  const onSubmit = async (values: object): Promise<void> => {
    axios.defaults.baseURL = 'http://localhost:4500'
    const url = '/practices/practice1'
    await sleep(300)
    const client = applyCaseMiddleware(axios.create())
    client
      .post(url, { payDeductionParams: values })
      .then((response) => {
        setSum(response.data.payload.basisForExtraPay)
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
          <div>
            <Field
              name="baseSalary.value"
              validate={composeValidators(required, mustBeNumber)}
            >
              {({ input, meta }) => (
                <div>
                  <label>基本給</label>
                  <input {...input} type="text" placeholder="基本給" />
                  {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="positionAllowance.value"
              validate={composeValidators(mustBeNumber)}
            >
              {({ input, meta }) => (
                <div>
                  <label>役職手当</label>
                  <input {...input} type="text" placeholder="役職手当" />
                  {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field name="qualificationAllowance.value" validate={mustBeNumber}>
              {({ input, meta }) => (
                <div>
                  <label>資格手当</label>
                  <input {...input} type="text" placeholder="資格手当" />
                  {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="housingAllowance.value"
              validate={composeValidators(mustBeNumber)}
            >
              {({ input, meta }) => (
                <div>
                  <label>住宅手当</label>
                  <input {...input} type="text" placeholder="住宅手当" />
                  {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <label>一律支給かどうか</label>
            <Field
              name="housingAllowance.isUniform"
              component="input"
              type="checkbox"
            />
          </div>
          <div>
            <Field
              name="commutingAllowance.value"
              validate={composeValidators(required, mustBeNumber)}
            >
              {({ input, meta }) => (
                <div>
                  <label>通勤手当</label>
                  <input {...input} type="text" placeholder="通勤手当" />
                  {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <label>支給単位</label>
            <Field
              name="commutingAllowance.payUnit"
              component="select"
              type="select"
            >
              <option value="1month">１ヶ月</option>
              <option value="3month">3ヶ月</option>
              <option value="6month">6ヶ月</option>
            </Field>
            <label>一律支給かどうか</label>
            <Field
              name="commutingAllowance.isUniform"
              component="input"
              type="checkbox"
            />
          </div>
          <div>
            <label>その他支給</label>
            <div className="buttons">
              <button
                type="button"
                onClick={() => push('otherAllowance', undefined)}
              >
                追加
              </button>
              <button type="button" onClick={() => pop('otherAllowance')}>
                削除
              </button>
            </div>
            <OtherAllowanceForm />
          </div>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button type="button" onClick={form.reset} disabled={submitting}>
              Reset
            </button>
          </div>
          <h2>合計: {sum}</h2>
          <pre>{JSON.stringify(values)}</pre>
        </form>
      )}
    />
  )
}

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export default AllowanceForm