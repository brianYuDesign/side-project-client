import { SET_ONSUBMIT } from "./actions"

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ONSUBMIT:
      return { ...state, onSubmit: action.payload }
    default:
      return state
  }
}

export default reducer
