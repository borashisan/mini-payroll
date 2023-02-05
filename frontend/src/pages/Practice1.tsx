import { type FC } from 'react'
import { Form, Field } from 'react-final-form'

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

const onSubmit = async (values: object): Promise<void> => {
  await sleep(300)
  window.alert(JSON.stringify(values))
}

const Practice1: FC = () => {
  return (
    <>
      <h1>問題1</h1>
      <div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>基本給</label>
                <Field
                  name="baseSalary.value"
                  component="input"
                  type="text"
                  placeholder="基本給"
                />
              </div>
              <div>
                <label>役職手当</label>
                <Field
                  name="positionAllowance.value"
                  component="input"
                  type="text"
                  placeholder="役職手当"
                />
              </div>
              <div>
                <label>住宅手当</label>
                <Field
                  name="housingAllowance.value"
                  component="input"
                  type="text"
                  placeholder="住宅手当"
                />
                <label>一律支給かどうか</label>
                <Field
                  name="housingAllowance.isUniform"
                  component="input"
                  type="checkbox"
                />
              </div>
              <div>
                <label>通勤手当</label>
                <Field
                  name="commutingAllowance.value"
                  component="input"
                  type="text"
                  placeholder="通勤手当"
                />
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
