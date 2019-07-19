import dayjs from 'dayjs'
import uuidv1 from 'uuid/v1'
// import { isAddress } from 'web3-utils'
const isAddress = () => true

export const str: string = 42

/* TIME HELPERS */
export const toUnix = (date: string) => dayjs(date, 'YYYY-MM-DD').unix()

export const yearFromUnix = (unix: number) => dayjs.unix(unix).format('YYYY')
export const monthFromUnix = (unix: number) => dayjs.unix(unix).format('MM')
export const unixToCalendar = (unix: number) =>
  dayjs.unix(unix).format('YYYY-MM-DD')
export const unixToTileDate = (unix: number) =>
  dayjs.unix(unix).format('MMM YYYY')

export const todayInUnix = () => dayjs().unix()

/* FORM HELPERS */

const assignArbitraryIds = (fieldArray: any[]) => {
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
  index === 0 ? 'Year' : (Number(currentYear) - index + 1).toString()
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

export const fakeIsMember = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(Math.random() >= 0.99), 2000)
  })
}

export * from './login'
