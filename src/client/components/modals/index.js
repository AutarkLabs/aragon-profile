import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@aragon/ui'
import uuidv1 from 'uuid/v1'

import { BoxContext } from '../../wrappers/box'
import { ModalContext } from '../../wrappers/modal'
import {
  editField,
  savingProfile,
  savedProfile,
  saveProfileError,
  removingItem,
  removedItem,
  removedItemError,
} from '../../stateManagers/box'
import { unlockAndCreateBoxIfRequired } from '../../utils'
import { close, open } from '../../stateManagers/modal'
import WorkHistoryModal from './WorkHistory'
import BasicInformationModal from './BasicInformation'
import EducationHistoryModal from './EducationHistory'
import OrganizationModal from './Organization'
import RemoveItem from './RemoveItem'
import BoxState from './BoxState'
import AfterSave from './AfterSave'

const UserInfoModal = ({ ethereumAddress, onSignatures }) => {
  const { boxes, dispatch } = useContext(BoxContext)
  const { modal, dispatchModal } = useContext(ModalContext)
  const [key, setKey] = useState(uuidv1())

  const userLoaded = !!boxes[ethereumAddress]

  const onChange = (value, field, uniqueId, nestedField) => {
    dispatch(editField(ethereumAddress, field, value, uniqueId, nestedField))
  }

  const getFormValue = (field, uniqueId, nestedField) => {
    let value
    if (!userLoaded) value = ''
    else if (!uniqueId) value = boxes[ethereumAddress].forms[field]
    else if (!nestedField) value = boxes[ethereumAddress].forms[field][uniqueId]
    else
      value =
        boxes[ethereumAddress].forms[field][uniqueId] &&
        boxes[ethereumAddress].forms[field][uniqueId][nestedField]

    return value || ''
  }

  const delay = ms =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, ms)
    })

  const saveProfile = async ethereumAddress => {
    dispatch(savingProfile(ethereumAddress))
    dispatchModal(open('savingProfile'))

    try {
      const { changed, forms } = boxes[ethereumAddress]
      const calculateChanged = field => {
        if (
          field === 'workHistory' ||
          field === 'educationHistory' ||
          field === 'organizations'
        ) {
          return Object.keys(forms[field]).map(id => forms[field][id])
        }
        return forms[field]
      }

      const changedValues = changed.map(calculateChanged)
      // unlockAndCreateBoxIfRequired opens the signature modal, and handles errors
      const unlockedBox = await unlockAndCreateBoxIfRequired(
        boxes[ethereumAddress],
        dispatch,
        dispatchModal,
        ethereumAddress,
        onSignatures
      )
      if (unlockedBox) {
        await unlockedBox.setPublicFields(changed, changedValues)
        dispatch(savedProfile(ethereumAddress, forms))
        await delay(500)
        dispatchModal(open('savedProfileSuccess'))
        await delay(2000)
        dispatchModal(close())
        setKey(uuidv1())
      }
    } catch (error) {
      dispatch(saveProfileError(ethereumAddress, error))
      dispatchModal(open('savedProfileError'))
      await delay(2000)
      dispatchModal(close())
    }
  }

  if (!userLoaded) return null

  const removeItem = async () => {
    dispatch(removingItem(ethereumAddress))
    try {
      const { forms } = boxes[ethereumAddress]
      const { itemType, id } = modal

      const unlockedBox = await unlockAndCreateBoxIfRequired(
        boxes[ethereumAddress],
        dispatch,
        dispatchModal,
        ethereumAddress,
        onSignatures
      )
      if (unlockedBox) {
        if (itemType === 'image' || itemType === 'coverPhoto') {
          await unlockedBox.removePublicField(itemType)
        } else {
          delete forms[itemType][id]
          const newBoxVals = Object.keys(forms[itemType]).map(
            id => forms[itemType][id]
          )
          await unlockedBox.setPublicFields([itemType], [newBoxVals])
        }

        const updatedProfile = await unlockedBox.getPublic()

        dispatch(removedItem(ethereumAddress, updatedProfile))
        dispatchModal(open('savedProfileSuccess'))
        await delay(2000)
        dispatchModal(close())
      }
    } catch (err) {
      dispatch(removedItemError(ethereumAddress, err))
      dispatchModal(open('savedProfileError'))
      await delay(2000)
      dispatchModal(close())
    }
  }

  const { error } = boxes[ethereumAddress]

  const savingError =
    boxes[ethereumAddress].savedProfile &&
    !boxes[ethereumAddress].savedProfileSucess
      ? { error: `Error saving profile: ${error.message}` }
      : {}
  const removingError =
    boxes[ethereumAddress].removedItem &&
    !boxes[ethereumAddress].removedItemSuccess
      ? { error: `Error removing item: ${error.message}` }
      : {}

  const modalsCommonProps = {
    ethereumAddress,
    getFormValue,
    onChange,
    saveProfile,
    savingError,
    removingError,
  }

  return (
    <Modal visible={!!modal.type} padding="0">
      <div css="position: relative">
        {modal.type === 'basicInformation' && (
          <BasicInformationModal {...modalsCommonProps} />
        )}

        {modal.type === 'educationHistory' && (
          <EducationHistoryModal
            educationHistoryId={modal.id || key}
            {...modalsCommonProps}
          />
        )}

        {modal.type === 'workHistory' && (
          <WorkHistoryModal
            workHistoryId={modal.id || key}
            {...modalsCommonProps}
          />
        )}
        {modal.type === 'organization' && (
          <OrganizationModal
            organizationId={modal.id || key}
            {...modalsCommonProps}
          />
        )}
        {modal.type === 'removeItem' && (
          <RemoveItem
            itemType={modal.itemType}
            onRemove={removeItem}
            removingError={removingError}
          />
        )}
        {modal.type === '3boxState' && (
          <BoxState
            messageSigning={boxes[ethereumAddress].messageSigning}
            signaturesRequired={modal.sigsRequired}
          />
        )}
        {modal.type === 'savingProfile' && <AfterSave savingProfile />}
        {modal.type === 'savedProfileSuccess' && (
          <AfterSave savedProfileSuccess />
        )}
        {modal.type === 'savedProfileError' && <AfterSave savedProfileError />}
      </div>
    </Modal>
  )
}

UserInfoModal.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  onSignatures: PropTypes.func.isRequired,
}

export default UserInfoModal
