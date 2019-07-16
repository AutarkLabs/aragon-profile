import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { ipfsGateway } from '../../ipfs'
import { removeItem } from '../stateManagers/modal'
import { BoxContext } from '../wrappers/box'
import { ModalContext } from '../wrappers/modal'
import { DragContext } from '../wrappers/drag'
import { image } from '../../modules/things'
import { unlockAndCreateBoxIfRequired } from '../utils'
import { IconCamera } from './styled-components'

import {
  uploadingImage,
  uploadedImage,
  uploadedImageFailure,
  savingProfile,
  savedProfile,
  saveProfileError,
} from '../stateManagers/box'

const ImageMenu = ({
  ethereumAddress,
  top,
  right,
  imageExists,
  imageTag,
  imageTitle,
  onSignatures,
}) => {
  const [active, setActive] = useState(false)
  const { boxes, dispatch } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)
  const { dragState } = useContext(DragContext)

  const onDrop = useCallback(
    acceptedFiles => {
      dispatch(uploadingImage(ethereumAddress))

      const reader = new FileReader()

      reader.onerror = error => {
        reader.onabort = () =>
          console.log('file reading failed and was aborted')
        dispatch(uploadedImageFailure(error))
      }

      reader.onload = async () => {
        try {
          const file = Buffer.from(reader.result)
          const unlockedBox = await unlockAndCreateBoxIfRequired(
            boxes[ethereumAddress],
            dispatch,
            dispatchModal,
            ethereumAddress,
            onSignatures
          )
          if (unlockedBox) {
            const result = await ipfsGateway.add(file)
            dispatch(uploadedImage(ethereumAddress, imageTag, result[0].hash))

            try {
              dispatch(savingProfile(ethereumAddress))
              await unlockedBox.setPublicFields(
                [imageTag],
                [image(result[0].hash)]
              )
              dispatch(
                savedProfile(ethereumAddress, {
                  [imageTag]: image(result[0].hash),
                })
              )
            } catch (error2) {
              dispatch(saveProfileError(ethereumAddress, error2))
            }
          }
        } catch (error) {
          dispatch(uploadedImageFailure(error))
        }
      }

      acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))
    },
    [boxes, dispatch, dispatchModal, ethereumAddress, imageTag, onSignatures]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: 'image/*',
    onDrop,
    noDragEventsBubbling: true,
    noClick: true,
    noKeyboard: true,
  })

  const imageCid =
    imageExists &&
    boxes[ethereumAddress].publicProfile[imageTag][0].contentUrl['/']

  return (
    <ClickOutHandler onBlur={() => setActive(false)}>
      <ImageMenuStyled
        top={top}
        right={right}
        dragging={dragState.dragging}
        active={active}
        {...getRootProps({
          className: 'dropzone',
          isDragActive,
          isDragAccept,
          isDragReject,
          imageCid,
        })}
      >
        <Button
          aria-controls={`${imageTag}-photo-actions`}
          css="font-weight: bold"
          onClick={() => (imageExists ? setActive(!active) : open())}
        >
          <IconCamera width="16px" height="16px" />
          Update {imageTitle} photo
        </Button>

        <div role="region" aria-live="polite" id={`${imageTag}-photo-actions`}>
          <input {...getInputProps({ disabled: false })} />
          {active && (
            <React.Fragment>
              <Button onClick={open}>Upload new image</Button>
              {imageExists && (
                <Button
                  onClick={() => dispatchModal(removeItem(imageCid, imageTag))}
                >
                  Delete
                </Button>
              )}
            </React.Fragment>
          )}
        </div>
      </ImageMenuStyled>
    </ClickOutHandler>
  )
}

ImageMenu.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  imageExists: PropTypes.bool.isRequired,
  imageTag: PropTypes.oneOf(['image', 'coverPhoto']),
  imageTitle: PropTypes.string.isRequired,
  onSignatures: PropTypes.func.isRequired,
}

const ClickOutHandler = ({ children, onBlur }) => {
  const wrap = React.createRef()

  const handleBlur = e => {
    if (wrap.current && wrap.current.contains(e.relatedTarget)) return
    onBlur()
  }

  return (
    <div tabIndex="-1" ref={wrap} onBlur={handleBlur}>
      {children}
    </div>
  )
}

ClickOutHandler.propTypes = {
  children: PropTypes.node.isRequired,
  onBlur: PropTypes.func.isRequired,
}

const getBorder = props => {
  if (props.isDragAccept) return `2px #00e676 dashed;`
  if (props.isDragReject) return `2px #ff1744 dashed;`
  if (props.isDragActive) return `2px #2196f3 dashed;`
  if (props.dragging) return `2px #446fe9 dashed;`

  return `1px solid rgba(209, 209, 209, 0.9);`
}

const isVisible = props =>
  props.isDragAccept ||
  props.isDragReject ||
  props.isDragActive ||
  props.dragging ||
  props.active

const ImageMenuStyled = styled.div`
  transition: opacity 0.3s;
  background-color: rgba(255, 255, 255, 0.9);
  border: ${getBorder};
  border-radius: 2px;
  width: 170px;
  z-index: 1;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  right: ${({ right }) => `${right}px`};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.03);
  opacity: ${props => (isVisible(props) ? 1 : 0)};

  :hover,
  :focus-within {
    background-color: white;
  }

  &:focus-within,
  .imageHover:hover & {
    opacity: 1;
  }
`

const Button = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  padding: 8px 8px 6px 8px;
  text-align: left;
  width: 100%;
  svg {
    margin-right: 8px;
    vertical-align: text-bottom;
  }
  :not(:first-child) {
    :hover,
    :focus {
      background: #eee;
    }
  }
`

export default ImageMenu
