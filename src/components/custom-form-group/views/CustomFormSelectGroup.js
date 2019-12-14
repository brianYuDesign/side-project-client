import React from "react"
import Select from "react-select"
import { FormGroup, Label, Button } from "reactstrap"

const CustomFormSelectGroup = props => {
  const {
    label,
    fieldName,
    isRequired,
    isMulti,
    options,
    onFieldChange,
    value
  } = props

  return (
    <FormGroup row>
      <Label for={fieldName}>
        {label} {isRequired && "*"}
      </Label>
      {isMulti && (
        <Button
          className="ml-2"
          onClick={() => {
            onFieldChange(options)
          }}
        >
          全選
        </Button>
      )}
      <div style={{ width: "100%" }}>
        <Select
          placeholder={label}
          isMulti={isMulti || false}
          value={value}
          options={options}
          onChange={option => {
            !option && isMulti && onFieldChange([])
            option && onFieldChange(option)
          }}
        />
      </div>
    </FormGroup>
  )
}

export default CustomFormSelectGroup
