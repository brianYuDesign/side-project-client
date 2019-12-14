// import packages
import React from "react"
import { useApolloClient } from "@apollo/react-hooks"
import { CustomInput, Button, ListGroup, ListGroupItem } from "reactstrap"

const TableController = props => {
  const client = useApolloClient()

  const renderFieldSetting = (
    objectName,
    fields,
    title,
    fieldName,
    show,
    order,
    setRefresh
  ) => {
    return (
      <ListGroupItem
        key={fieldName}
        className="d-flex justify-content-between align-items-center px-0 py-2"
      >
        <CustomInput
          id={fieldName}
          type="checkbox"
          label={title}
          checked={show}
          onChange={e => {
            updateFieldDef(
              objectName,
              fields,
              fieldName,
              e.target.checked,
              order,
              setRefresh
            )
          }}
        />
        <div>
          {order !== 1 && (
            <Button
              onClick={e => {
                e.preventDefault()
                reorderField(objectName, fields, order, order - 1, setRefresh)
              }}
              style={{ marginLeft: "6px" }}
              size="sm"
              round="true"
              icon="true"
            >
              <i className="fas fa-caret-up" />
            </Button>
          )}
          {order !== fields.length && (
            <Button
              onClick={e => {
                e.preventDefault()
                reorderField(objectName, fields, order, order + 1, setRefresh)
              }}
              style={{ marginLeft: "6px" }}
              size="sm"
              round="true"
              icon="true"
            >
              <i className="fas fa-caret-down" />
            </Button>
          )}
        </div>
      </ListGroupItem>
    )
  }

  const reorderField = (
    objectName,
    fieldsDef,
    preOrder,
    newOrder,
    setRefresh
  ) => {
    const origin = fieldsDef[preOrder - 1]
    origin.order = newOrder
    const dest = fieldsDef[newOrder - 1]
    dest.order = preOrder
    fieldsDef[preOrder - 1] = dest
    fieldsDef[newOrder - 1] = origin
    setRefresh([...fieldsDef])
    client.writeData({
      data: {
        [objectName]: [...fieldsDef]
      }
    })
  }

  const updateFieldDef = (
    objectName,
    fieldsDef,
    fieldName,
    show,
    order,
    setRefresh
  ) => {
    const newFields = fieldsDef.map(field => {
      if (field.name === fieldName) {
        field.show = show
        field.order = order
      }
      return field
    })
    setRefresh([...newFields])

    client.writeData({
      data: {
        [objectName]: [...newFields]
      }
    })
  }

  const renderAllFields = () => {
    return props.fieldsDef.map(field => {
      return renderFieldSetting(
        props.objectName,
        props.fieldsDef,
        field.title,
        field.name,
        field.show,
        field.order,
        props.setRefresh
      )
    })
  }

  return (
    <ListGroup flush>
      <ListGroupItem className="text-center h5">
        控制欄位顯示及順序
      </ListGroupItem>
      {renderAllFields()}
    </ListGroup>
  )
}

export default TableController
