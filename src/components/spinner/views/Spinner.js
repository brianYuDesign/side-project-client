import React from "react"
import { css } from "@emotion/core"
import { BeatLoader } from "react-spinners"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  text-align: center;
`

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <br />
      <BeatLoader
        css={override}
        sizeUnit={"px"}
        size={12}
        color={"#123abc"}
        loading={true}
      />
    </div>
  )
}

export default Spinner
