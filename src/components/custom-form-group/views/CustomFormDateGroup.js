import React from "react"
import moment from "moment"
import Datetime from "react-datetime"
import { FormGroup, Label } from "reactstrap"

const CustomFormDateGroup = props => {
  const { label, fieldName, isRequired, onFieldChange, value } = props

  return (
    <FormGroup row>
      <Label for={fieldName}>
        {label} {isRequired && "*"}
      </Label>

      <div style={{ width: "100%" }}>
        <Datetime
          dateFormat="YYYY-MM-DD"
          timeFormat="HH:mm"
          closeOnSelect={true}
          closeOnTab={true}
          value={value ? moment(value).format("YYYY-MM-DD HH:mm") : ""}
          onChange={date => {
            onFieldChange(fieldName, date.format("YYYY-MM-DD HH:mm"))
          }}
          inputProps={{ placeholder: label, readOnly: true }}
        />
      </div>
    </FormGroup>
  )
}

export default CustomFormDateGroup
