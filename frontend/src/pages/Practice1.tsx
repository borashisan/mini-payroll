import axios from 'axios'
import { type FC, useState } from 'react'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import applyCaseMiddleware from 'axios-case-converter'

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

type ErrorMessage = string | undefined

type inputValue = number

type AllowanceValuesType = {
  value: string
  isRelatedLabor: boolean
  isUniform?: boolean
  payUnit?: string
}

type OtherAllowanceValuesType = {
  name: string
  value: string
  isRelatedLabor: boolean
  isUniform?: boolean
  payUnit?: string
}

type AllowancesType = {
  baseSalary: AllowanceValuesType
  positionAllowance?: AllowanceValuesType
  qualificationAllowance?: AllowanceValuesType
  housingAllowance?: AllowanceValuesType
  commutingAllowance?: AllowanceValuesType
  otherAllowance?: OtherAllowanceValuesType[]
}

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
  //  const initialValues = {
  //    baseSalary: { value: '320000', isRelatedLabor: true },
  //    positionAllowance: { value: '70000', isRelatedLabor: true },
  //    housingAllowance: {
  //      value: '35000',
  //      isRelatedLabor: false,
  //      isUniform: false,
  //    },
  //    commutingAllowance: {
  //      value: '14000',
  //      isRelatedLabor: false,
  //      isUniform: false,
  //      payUnit: '1month',
  //    },
  //  }

  const initialValues: AllowancesType = {
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

  return (
    <>
      <h1>問題1</h1>
      <div>
        <AllowanceForm initialValues={initialValues} />
      </div>
    </>
  )
}

type FormProps = {
  initialValues: AllowancesType
}

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
            <FieldArray name="otherAllowance">
              {({ fields }) =>
                fields.map((name, index) => (
                  <div key={name}>
                    <Field
                      name={`${name}.name`}
                      validate={composeValidators(required)}
                    >
                      {({ input, meta }) => (
                        <div>
                          <label>名称</label>
                          <input {...input} type="text" placeholder="名称" />
                          {meta.error ?? meta.touched ?? (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field
                      name={`${name}.value`}
                      validate={composeValidators(mustBeNumber)}
                    >
                      {({ input, meta }) => (
                        <div>
                          <label>単価</label>
                          <input
                            {...input}
                            type="text"
                            placeholder="その他支給"
                          />
                          {meta.error ?? meta.touched ?? (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <label>支給単位</label>
                    <Field
                      name={`${name}.payUnit`}
                      component="select"
                      type="select"
                    >
                      <option value="1month">１ヶ月</option>
                      <option value="3month">3ヶ月</option>
                      <option value="6month">6ヶ月</option>
                    </Field>
                    <label>直接労働と関係があるか</label>
                    <Field
                      name={`${name}.isRelatedLabor`}
                      component="input"
                      type="checkbox"
                    />
                    <label>一律支給かどうか</label>
                    <Field
                      name={`${name}.isUniform`}
                      component="input"
                      type="checkbox"
                    />
                    <button
                      onClick={() => fields.remove(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      削除
                    </button>
                  </div>
                ))
              }
            </FieldArray>
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

export default Practice1
