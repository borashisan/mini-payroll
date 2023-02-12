import { type FC } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { required, mustBeNumber, composeValidators } from './formValidators'

const OtherAllowanceForm: FC = () => {
  return (
    <FieldArray name="otherAllowance">
      {({ fields }) =>
        fields.map((name, index) => (
          <div key={name}>
            <Field name={`${name}.name`} validate={composeValidators(required)}>
              {({ input, meta }) => (
                <div>
                  <label>名称</label>
                  <input {...input} type="text" placeholder="名称" />
                  {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
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
                  <input {...input} type="text" placeholder="その他支給" />
                  {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <label>支給単位</label>
            <Field name={`${name}.payUnit`} component="select" type="select">
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
  )
}

export default OtherAllowanceForm
