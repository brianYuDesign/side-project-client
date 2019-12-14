import React, { useState, useReducer } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { SET_ONSUBMIT } from "../actions"
import reducer from "../reducer"
import { BarLoader } from "../../spinner"

const INITIAL_STATE = { onSubmit: () => {} }

const withModal = Component => props => {
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [headerText, setHeaderText] = useState("")
  const [submitText, setSubmitText] = useState("確定")
  const [cancelText, setCancelText] = useState("取消")
  const [modalContent, setModalContent] = useState(null)
  const [modalSize, setModalSize] = useState("sm")
  const [hideCancel, setHideCancel] = useState(false)
  const [centered, setCentered] = useState(true)
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const onSubmit = () => {
    state.onSubmit()
  }

  const setOnSubmit = callback => {
    dispatch({ type: SET_ONSUBMIT, payload: callback })
  }

  const reset = () => {
    setIsOpen(false)
    setOnSubmit(() => {})
    setHeaderText("")
    setSubmitText("確定")
    setCancelText("取消")
    setModalContent(null)
    setModalSize("sm")
    setHideCancel(false)
    setCentered(true)
  }

  const toggle = async (isSubmit = false) => {
    if (isSubmit === true) {
      setSubmitting(true)
      onSubmit && (await onSubmit())
    }

    setIsOpen(!isOpen)
    isOpen === false && setSubmitting(false)
  }

  const renderSubmitButton = () => {
    return (
      <Button
        color="primary"
        onClick={() => {
          toggle(true)
        }}
      >
        {submitText}
      </Button>
    )
  }

  const renderCancelButton = () => {
    return (
      <Button
        color="secondary"
        className="ml-2"
        onClick={() => {
          toggle(false)
        }}
      >
        {cancelText}
      </Button>
    )
  }

  const renderButtons = () => {
    return (
      <div>
        {renderSubmitButton()}
        {!hideCancel && renderCancelButton()}
      </div>
    )
  }

  const modal = {
    setIsOpen,
    setHeaderText,
    setSubmitText,
    setCancelText,
    setModalContent,
    setModalSize,
    setOnSubmit,
    setHideCancel,
    setCentered,
    toggle,
    reset
  }

  return (
    <>
      <Component {...props} modal={modal} />
      <Modal
        toggle={toggle}
        isOpen={isOpen}
        size={modalSize}
        centered={centered}
      >
        <ModalHeader>{headerText}</ModalHeader>
        <ModalBody>{modalContent}</ModalBody>
        <ModalFooter>{renderButtons()}</ModalFooter>
        <BarLoader loading={submitting} />
      </Modal>
    </>
  )
}

export default withModal
