import axios from 'axios'
import { type FC, useState } from 'react'
import { Form, Field } from 'react-final-form'
import applyCaseMiddleware from 'axios-case-converter'

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

const initialValues = {
  baseSalary: { value: '320000' },
  positionAllowance: { value: '70000' },
  housingAllowance: { value: '35000', isUniform: false },
  commutingAllowance: { value: '14000', isUniform: false, payUnit: '1month' },
}

type ErrorMessage = string | undefined

type inputValue = number

const required = (value: inputValue): ErrorMessage =>
  value !== undefined ? undefined : '値を入力してください'

const mustBeNumber = (value: inputValue): ErrorMessage => {
  return isNaN(value) && value !== undefined
    ? '数値を入力してください'
    : undefined
}

const composeValidators =
  (...validators: Array<(value: inputValue) => ErrorMessage>) =>
  (value: inputValue) =>
    validators.reduce(
      (error: ErrorMessage, validator) => error ?? validator(value),
      undefined
    )

const Practice1: FC = () => {
  const [sum, setSum] = useState(0)

  const onSubmit = async (values: object): Promise<void> => {
    axios.defaults.baseURL = 'http://localhost:4500'
    const url = '/practices/practice1'
    await sleep(300)
    const client = applyCaseMiddleware(axios.create())
    client
      .post(url, values)
      .then((response) => {
        setSum(response.data.payload.basisForExtraPay)
      })
      .catch(() => {
        console.log('error')
      })
  }

  return (
    <>
      <h1>問題1</h1>
      <div>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, form, submitting, values }) => (
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
                  validate={composeValidators(required, mustBeNumber)}
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
                <Field
                  name="housingAllowance.value"
                  validate={composeValidators(required, mustBeNumber)}
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
                <Field name="familyAllowance.value" validate={mustBeNumber}>
                  {({ input, meta }) => (
                    <div>
                      <label>家族手当</label>
                      <input {...input} type="text" placeholder="家族手当" />
                      {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
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
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting}
                >
                  Reset
                </button>
              </div>
              <h2>合計: {sum}</h2>
              <pre>{JSON.stringify(values)}</pre>
            </form>
          )}
        />
      </div>
    </>
  )
}

export default Practice1
