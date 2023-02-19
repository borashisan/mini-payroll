import { type FC } from 'react'
import { Field } from 'react-final-form'
import {
  required,
  mustBeNumber,
  mustBeHour,
  mustBeMinute,
  mustBeDay,
  composeValidators,
} from '../../utils/formValidators'

const LaborRegulationForm: FC = () => {
  return (
    <div className="mb-4">
      <div className="inputRows">
        <div>
          <Field
            name="laborRegulations.yearPrescribedWorkingDays.value"
            validate={composeValidators(required, mustBeNumber)}
          >
            {({ input, meta }) => (
              <div className="inputColumns">
                <label className="laborRegulationInputLabel">
                  一年間の所定労働日数
                </label>
                <input
                  className="inputForm"
                  {...input}
                  type="text"
                  placeholder="一年間の所定労働日数"
                />
                {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </div>
        <div>
          <div className="inputColumns">
            <label className="laborRegulationInputLabel">
              1日の所定労働時間
            </label>
            <Field
              name="laborRegulations.dailyPrescribedWorkingHours.hour.value"
              validate={composeValidators(required, mustBeHour, mustBeNumber)}
            >
              {({ input, meta }) => (
                <>
                  <input
                    className="timeInputForm"
                    {...input}
                    type="text"
                    placeholder="1日の所定労働時間"
                  />
                  {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                </>
              )}
            </Field>
            <label className="timeLabel">時間</label>
            <Field
              name="laborRegulations.dailyPrescribedWorkingHours.minute.value"
              validate={composeValidators(mustBeNumber, mustBeMinute)}
            >
              {({ input, meta }) => (
                <>
                  <input
                    className="timeInputForm"
                    {...input}
                    type="text"
                    placeholder="1日の所定労働時間"
                  />
                  {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
                </>
              )}
            </Field>
            <label className="timeLabel">分</label>
          </div>
        </div>
        <div>
          <Field
            name="laborRegulations.closingDate.value"
            validate={composeValidators(mustBeNumber, mustBeDay)}
          >
            {({ input, meta }) => (
              <div className="inputColumns">
                <label className="laborRegulationInputLabel">賃金締め日</label>
                <input
                  className="inputForm"
                  {...input}
                  type="text"
                  placeholder="賃金締め日"
                />
                {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </div>
        <div className="inputColumns">
          <Field
            name="laborRegulations.payDate.value"
            validate={composeValidators(mustBeNumber, mustBeDay)}
          >
            {({ input, meta }) => (
              <div className="inputColumns">
                <label className="laborRegulationInputLabel">賃金支給日</label>
                <input
                  className="inputForm"
                  {...input}
                  type="text"
                  placeholder="賃金支給日"
                />
                {meta.error ?? meta.touched ?? <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            className="inputSelectBox"
            name="laborRegulations.payDate.payMonth"
            component="select"
            type="select"
          >
            <option value="nextMonth">翌月支給</option>
            <option value="currentMonth">当月支給</option>
          </Field>
        </div>
      </div>
    </div>
  )
}

export default LaborRegulationForm
