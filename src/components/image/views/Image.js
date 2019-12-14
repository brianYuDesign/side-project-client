import React from "react"
import Img from "react-image"
import { BrowserView, MobileView } from "react-device-detect"
import PropTypes from "prop-types"
import { Spinner } from "../../spinner"
import withModal from "../../modal"

const Image = ({ src, name, className, style, modal }) => {
  return (
    <div className={className}>
      <BrowserView>
        <Img
          onClick={() => {
            modal.setModalSize("lg")
            modal.setHeaderText(name || "圖片顯示")
            modal.setHideCancel(true)
            modal.setSubmitText("關閉")
            modal.setModalContent(
              <div style={{ textAlign: "center" }}>
                <Img
                  src={src}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "760px"
                  }}
                  loader={<Spinner />}
                />
              </div>
            )
            modal.toggle()
          }}
          src={src}
          style={
            style || {
              width: "auto",
              height: "auto",
              maxWidth: "320px",
              maxHeight: "320px"
            }
          }
          loader={<Spinner />}
          className="unselectable pointer"
        />
      </BrowserView>
      <MobileView>
        <Img
          onClick={() => {
            modal.setModalSize("lg")
            modal.setHeaderText(name || "圖片顯示")
            modal.setHideCancel(true)
            modal.setSubmitText("關閉")
            modal.setModalContent(
              <div style={{ textAlign: "center" }}>
                <Img
                  src={src}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: `${window.innerHeight - 50}px`
                  }}
                  loader={<Spinner />}
                />
              </div>
            )
            modal.toggle()
          }}
          src={src}
          style={
            style || {
              width: "auto",
              height: "auto",
              maxWidth: `${window.innerWidth - 185}px`,
              maxHeight: `${window.innerWidth - 185}px`
            }
          }
          loader={<Spinner />}
          className="unselectable pointer"
        />
      </MobileView>
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  modal: PropTypes.object.isRequired
}

export default withModal(Image)
