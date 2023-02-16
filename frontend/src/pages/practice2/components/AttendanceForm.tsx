import { type FC } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import {
  required,
  mustBeNumber,
  composeValidators,
} from '../../utils/formValidators'

type AttendanceProps = {
  push: (name: string, value: undefined) => void
  pop: (name: string) => object
}

const AttendanceForm: FC<AttendanceProps> = (props) => {
  const { push, pop } = props
  return (
    <>
      <div className="mt-4">勤怠状況</div>
      <div className="buttons middleButtons">
        <button
          className="mdButton bg-gray-200"
          type="button"
          onClick={() => push('attendances', undefined)}
        >
          追加
        </button>
        <button
          className="mdButton bg-red-500"
          type="button"
          onClick={() => pop('attendances')}
        >
          削除
        </button>
      </div>
      <FieldArray name="attendances">
        {({ fields }) => (
          <div className="otherAllowanceContainers">
            {fields.map((name, index) => (
              <div className="otherAllowanceContainer" key={name}>
                <div className="inputColumns">
                  <label className="allowanceInputLabel">勤怠情報</label>
                  <Field
                    className="inputSelectBox"
                    name={`${name}.attendanceName`}
                    component="select"
                    type="select"
                  >
                    <option value="overtime">時間外労働時間</option>
                    <option value="lateNight">深夜労働時間</option>
                    <option value="legalHoliday">法定休日労働時間</option>
                  </Field>
                  <Field
                    name={`${name}.value`}
                    validate={composeValidators(mustBeNumber)}
                  >
                    {({ input, meta }) => (
                      <div className="inputColumns">
                        <input
                          className="inputForm"
                          {...input}
                          type="text"
                          placeholder="時間"
                        />
                        {meta.error ?? meta.touched ?? (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
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

export default AttendanceForm
