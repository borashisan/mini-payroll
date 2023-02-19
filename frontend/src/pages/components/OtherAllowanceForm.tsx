import { type FC } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import {
  required,
  mustBeNumber,
  composeValidators,
} from '../utils/formValidators'

type AllowanceProps = {
  push: (name: string, value: undefined) => void
  pop: (name: string) => object
}
const OtherAllowanceForm: FC<AllowanceProps> = (props) => {
  const { push, pop } = props
  return (
    <>
      <div className="buttons middleButtons">
        <button
          className="mdButton bg-gray-200"
          type="button"
          onClick={() => push('allowances.otherAllowance', undefined)}
        >
          追加
        </button>
        <button
          className="mdButton bg-red-500"
          type="button"
          onClick={() => pop('allowances.otherAllowance')}
        >
          削除
        </button>
      </div>
      <FieldArray name="allowances.otherAllowance">
        {({ fields }) => (
          <div className="otherAllowanceContainers">
            {fields.map((name, index) => (
              <div className="otherAllowanceContainer" key={name}>
                <Field
                  name={`${name}.name`}
                  validate={composeValidators(required)}
                >
                  {({ input, meta }) => (
                    <div className="inputColumns">
                      <label className="allowanceInputLabel">名称</label>
                      <input
                        className="inputForm"
                        {...input}
                        type="text"
                        placeholder="名称"
                      />
                      {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name={`${name}.value`}
                  validate={composeValidators(mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div className="inputColumns">
                      <label className="allowanceInputLabel">単価</label>
                      <input
                        className="inputForm"
                        {...input}
                        type="text"
                        placeholder="その他支給"
                      />
                      {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className="inputColumns">
                  <label className="allowanceInputLabel">支給単位</label>
                  <Field
                    className="inputSelectBox"
                    name={`${name}.payUnit`}
                    component="select"
                    type="select"
                  >
                    <option value="1month">1ヶ月</option>
                    <option value="3month">3ヶ月</option>
                    <option value="6month">6ヶ月</option>
                  </Field>
                  <label className="inputLabel">直接労働と関係があるか</label>
                  <div className="inputLabel">
                    <Field
                      className="inputCheckBox"
                      name={`allowances.${name}.isRelatedLabor`}
                      component="input"
                      type="checkbox"
                    />
                  </div>
                  <label className="inputLabel">一律支給かどうか</label>
                  <div className="inputLabel">
                    <Field
                      className="inputCheckBox"
                      name={`allowances.${name}.isUniform`}
                      component="input"
                      type="checkbox"
                    />
                  </div>
                  <button
                    className="smButton bg-red-500"
                    onClick={() => fields.remove(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </FieldArray>
    </>
  )
}

export default OtherAllowanceForm
