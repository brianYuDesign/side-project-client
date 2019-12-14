import React from "react"
import { Button } from "reactstrap"
import Img from "react-image"
import { BrowserView, MobileView } from "react-device-detect"
import PropTypes from "prop-types"
import { Spinner } from "../../spinner"
import withModal from "../../modal"

const ImageButton = ({ src, name, style, modal }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => {
          modal.setModalSize("lg")
          modal.setHeaderText(name || "圖片顯示")
          modal.setHideCancel(true)
          modal.setSubmitText("關閉")
          modal.setModalContent(
            <div style={{ textAlign: "center" }}>
              <BrowserView>
                <Img
                  src={src}
                  style={{
                    width: "100%",
                    height: "auto"
                  }}
                  loader={<Spinner />}
                />
              </BrowserView>
              <MobileView>
                <Img
                  src={src}
                  style={{
                    width: "100%",
                    height: "auto"
                  }}
                  loader={<Spinner />}
                />
              </MobileView>
            </div>
          )
          modal.toggle()
        }}
        style={style}
        size="sm"
        round="true"
        icon="true"
        color="inverse"
      >
        <i className="fas fa-file-image" />
      </Button>
    </div>
  )
}

ImageButton.propTypes = {
  modal: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string,
  style: PropTypes.object
}

export default withModal(ImageButton)
