import React from "react"
import { Input, FormGroup, Label } from "reactstrap"

const CustomFormCheckBoxGroup = props => {
  const { label, fieldName, onFieldChange, value } = props

  return (
    <FormGroup check>
      <Label check>
        <Input
          type="checkbox"
          checked={value}
          onChange={e => onFieldChange(fieldName, e.target.checked)}
        />{" "}
        {label}
      </Label>
    </FormGroup>
  )
}

export default CustomFormCheckBoxGroup
