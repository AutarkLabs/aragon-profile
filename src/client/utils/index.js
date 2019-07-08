import moment from 'moment'
import uuidv1 from 'uuid/v1'
// import { isAddress } from 'web3-utils'
const isAddress = () => true

/* TIME HELPERS */
export const toUnix = date => moment(date, 'YYYY-MM-DD').unix()

export const unixToCalendar = unix => moment.unix(unix).format('YYYY-MM-DD')
export const yearFromUnix = unix => moment.unix(unix).format('YYYY')
export const monthFromUnix = unix => moment.unix(unix).format('MM')
export const unixToTileDate = unix => moment.unix(unix).format('MMM YYYY')

export const todayInUnix = () => Number(moment().format('X'))

/* FORM HELPERS */

const assignArbitraryIds = fieldArray => {
  const returnObj = {}
  fieldArray.forEach(field => (returnObj[uuidv1()] = field))
  return returnObj
}

export const reformatNestedFields = forms => {
  const copiedForms = { ...forms }
  if (copiedForms.educationHistory) {
    copiedForms.educationHistory = assignArbitraryIds(
      copiedForms.educationHistory
    )
  }
  if (copiedForms.workHistory) {
    copiedForms.workHistory = assignArbitraryIds(copiedForms.workHistory)
  }
  if (copiedForms.organizations) {
    copiedForms.organizations = assignArbitraryIds(copiedForms.organizations)
  }
  return copiedForms
}

export const months = [
  'Month',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const currentYear = yearFromUnix(todayInUnix())
export const years = Array.apply(0, Array(74)).map((_x, index) =>
  index === 0 ? 'Year' : (currentYear - index + 1).toString()
)

export const displayStartEndDates = data => {
  if (data.startDate && data.endDate) {
    if (data.startDate === data.endDate) {
      return `${unixToTileDate(data.startDate)}`
    } else {
      return `${unixToTileDate(data.startDate)} - ${unixToTileDate(
        data.endDate
      )}`
    }
  } else if (data.startDate) {
    return `${unixToTileDate(data.startDate)} - Present`
  } else {
    return ''
  }
}

export const determineAddress = (connectedAccount, queryParams) => {
  if (queryParams.length > 0 && isAddress(queryParams[0])) {
    return queryParams[0]
  }
  return connectedAccount
}

export const isViewMode = (connectedAccount, queryParams) => {
  if (queryParams.length === 0) return false

  if (isAddress(queryParams[0])) {
    return queryParams[0] !== connectedAccount
  }

  if (!queryParams[0]) {
    return false
  }

  if (!isAddress(queryParams[0])) {
    return true
  }
}

export const assetsPath = asset => asset.replace(/.*\//, '/')

export const shortDAOAddress = (address = '') => {
  if (address.endsWith('.eth')) return address
  return address.slice(0, 6) + '…' + address.slice(-4)
}

export const fakeIsMember = async (ethereumAddress, address) => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(Math.random() >= 0.99), 2000)
  })
  return promise
}

export * from './login'
