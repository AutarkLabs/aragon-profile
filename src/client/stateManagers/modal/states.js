import { REMOVE_ITEM, BOX_STATE } from './types'

export const initialState = {
  type: null,
  id: null,
  itemType: null,
  sigsRequired: [],
}

export const openedModal = (state, type, id) => ({
  ...state,
  type,
  id,
})

export const closedModal = state => ({
  type: null,
  id: null,
  itemType: null,
  sigsRequired: [],
})

export const removeItem = (state, id, itemType) => ({
  ...state,
  type: REMOVE_ITEM,
  itemType,
  id,
})

export const openedBoxStateModal = (state, sigsRequired) => ({
  ...state,
  type: BOX_STATE,
  sigsRequired,
})
