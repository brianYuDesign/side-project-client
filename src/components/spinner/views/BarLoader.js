import React from "react"
import { css } from "@emotion/core"
import { BarLoader } from "react-spinners"
import PropTypes from "prop-types"

const override = css`
  display: block;
  margin: 0 auto;
  text-align: center;
  height: 5px;
  witdh: 100%;
`

const Loader = ({ loading }) => {
  return (
    <div className="bar-loader">
      <BarLoader
        css={override}
        height={4}
        width="100%"
        color={"#123abc"}
        loading={loading}
      />
    </div>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default Loader
