import React from "react"
import { Input, FormGroup, Label } from "reactstrap"

const CustomFormInputGroup = props => {
  const {
    label,
    fieldName,
    fieldType,
    isRequired,
    onFieldChange,
    disabled,
    value
  } = props

  return (
    <FormGroup row>
      <Label for={fieldName}>
        {label} {isRequired && "*"}
      </Label>
      <Input
        type={fieldType}
        name={fieldName}
        id={fieldName}
        placeholder={label}
        value={value}
        disabled={disabled}
        onChange={e => onFieldChange(fieldName, e.target.value)}
      />
    </FormGroup>
  )
}

export default CustomFormInputGroup
