import { type FC } from 'react'
import { Form, Field } from 'react-final-form'

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

const onSubmit = async (values: object): Promise<void> => {
  await sleep(300)
  window.alert(JSON.stringify(values))
}

const initialValues = {
  baseSalary: { value: '320000' },
  positionAllowance: { value: '70000' },
  housingAllowance: { value: '35000', isUniform: false },
  commutingAllowance: { value: '14000', isUniform: false }
}

type ErrorMessage = string | undefined

const required = (value: any): ErrorMessage =>
  value !== undefined ? undefined : '値を入力してください'

const mustBeNumber = (value: any): ErrorMessage =>
  isNaN(value) ? '数値を入力してください' : undefined

const composeValidators =
  (...validators: Array<(value: any) => ErrorMessage>) =>
    (value: any) =>
      validators.reduce(
        (error: ErrorMessage, validator) => error ?? validator(value),
        undefined
      )

const Practice1: FC = () => {
  return (
    <>
      <h1>問題1</h1>
      <div>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
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
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              <pre>{JSON.stringify(values)}</pre>
            </form>
          )}
        />
      </div>
    </>
  )
}

export default Practice1
