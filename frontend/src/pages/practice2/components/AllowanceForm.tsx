import { type FC, useState } from 'react'
import axios from 'axios'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import applyCaseMiddleware from 'axios-case-converter'
import OtherAllowanceForm from './OtherAllowanceForm'
import SubmitButtons from '../../components/SubmitButtons'
import {
  required,
  mustBeNumber,
  composeValidators,
} from '../../utils/formValidators'

const AllowanceForm: FC = () => {
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
          <div className="flex">
            <div>
              <div className="inputRows">
                <div>
                  <Field
                    name="baseSalary.value"
                    validate={composeValidators(required, mustBeNumber)}
                  >
                    {({ input, meta }) => (
                      <div className="inputColumns">
                        <label className="allowanceInputLabel">基本給</label>
                        <input
                          className="inputForm"
                          {...input}
                          type="text"
                          placeholder="基本給"
                        />
                        {meta.error ?? meta.touched ?? (
                          <span>{meta.error}</span>
                        )}
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
                      <div className="inputColumns">
                        <label className="allowanceInputLabel">役職手当</label>
                        <input
                          className="inputForm"
                          {...input}
                          type="text"
                          placeholder="役職手当"
                        />
                        {meta.error ?? meta.touched ?? (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <Field
                    name="qualificationAllowance.value"
                    validate={mustBeNumber}
                  >
                    {({ input, meta }) => (
                      <div className="inputColumns">
                        <label className="allowanceInputLabel">資格手当</label>
                        <input
                          className="inputForm"
                          {...input}
                          type="text"
                          placeholder="資格手当"
                        />
                        {meta.error ?? meta.touched ?? (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="inputColumns">
                  <label className="allowanceInputLabel">住宅手当</label>
                  <Field
                    name="housingAllowance.value"
                    validate={composeValidators(mustBeNumber)}
                  >
                    {({ input, meta }) => (
                      <>
                        <input
                          className="inputForm"
                          {...input}
                          type="text"
                          placeholder="住宅手当"
                        />
                        {meta.error ?? meta.touched ?? (
                          <span>{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                  <label className="inputLabel">一律支給かどうか</label>
                  <div className="inputLabel">
                    <Field
                      className="inputCheckBox"
                      name="housingAllowance.isUniform"
                      component="input"
                      type="checkbox"
                    />
                  </div>
                </div>
                <div>
                  <div className="inputColumns">
                    <label className="allowanceInputLabel">通勤手当</label>
                    <Field
                      name="commutingAllowance.value"
                      validate={composeValidators(mustBeNumber)}
                    >
                      {({ input, meta }) => (
                        <>
                          <input
                            className="inputForm"
                            {...input}
                            type="text"
                            placeholder="通勤手当"
                          />
                          {meta.error ?? meta.touched ?? (
                            <span>{meta.error}</span>
                          )}
                        </>
                      )}
                    </Field>
                    <label className="inputLabel">一律支給かどうか</label>
                    <div className="inputLabel">
                      <Field
                        className="inputCheckBox"
                        name="commutingAllowance.isUniform"
                        component="input"
                        type="checkbox"
                      />
                    </div>

                    <label className="inputLabel">支給単位</label>
                    <Field
                      className="inputSelectBox"
                      name="commutingAllowance.payUnit"
                      component="select"
                      type="select"
                    >
                      <option value="1month">1ヶ月</option>
                      <option value="3month">3ヶ月</option>
                      <option value="6month">6ヶ月</option>
                    </Field>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-4">その他支給</div>
                <div className="buttons middleButtons">
                  <button
                    className="mdButton bg-gray-200"
                    type="button"
                    onClick={() => push('otherAllowance', undefined)}
                  >
                    追加
                  </button>
                  <button
                    className="mdButton bg-red-500"
                    type="button"
                    onClick={() => pop('otherAllowance')}
                  >
                    削除
                  </button>
                </div>
                <OtherAllowanceForm />
              </div>
            </div>
            <div>aaa</div>
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

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export default AllowanceForm
