import { toUnix } from './index'

describe('toUnix', () => {
  describe.each`
    given           | expected
    ${'1987-03-14'} | ${542696400}
    ${'2017-05-18'} | ${1495080000}
    ${'2019-05-28'} | ${1559016000}
  `('given $given', ({ given, expected }) => {
    test(`expect ${expected}`, () => {
      expect(toUnix(given)).toEqual(expected)
    })
  })
})
