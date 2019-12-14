/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react"
import { FormGroup, Label } from "reactstrap"
import { Img } from "components/image"
import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const CustomFormFilePondGroup = props => {
  const { label, fieldName, onFieldChange, photoUrl, fileUrl, fileType } = props

  const validateType = type => (fileType ? fileType.includes(type) : true)

  return (
    <>
      <FormGroup row style={{ marginBottom: "0" }}>
        <Label>{label}</Label>
      </FormGroup>
      <FormGroup row>
        {photoUrl && <Img style={{ maxWidth: "100%" }} src={`${photoUrl}`} />}
        {fileUrl && <a href={`${fileUrl}`}></a>}
      </FormGroup>
      <FilePond
        labelIdle='將檔案拖拉至此 或 <span class="filepond--label-action">瀏覽檔案</span>'
        allowMultiple={false}
        beforeAddFile={e => {
          return new Promise(resolve => {
            if (validateType(e.file.type)) {
              onFieldChange(fieldName, e.file)
              return resolve(true)
            }
            return resolve(false)
          })
        }}
        beforeRemoveFile={() => {
          onFieldChange(fieldName, null)
        }}
      />
    </>
  )
}

export default CustomFormFilePondGroup
