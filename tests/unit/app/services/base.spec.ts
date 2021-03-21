import {
  EntityTimestamp,
  RawTimestamp,
  toEntityDate,
  toEntityTimestamp,
  toEntityTimestamps,
  toRawTimestamps,
} from '../../../../src/app/services/base'
import dayjs = require('dayjs')
import { toRawDate, toRawTimestamp } from '../../../../dist/app/services/base'

describe('toEntityDate', () => {
  const rawDate = '2020-01-01T10:15:30.001Z'
  const entityDate = dayjs('2020-01-01T10:15:30.001Z')

  it('ベーシックケース', async () => {
    const actual = toEntityDate(rawDate)

    expect(actual).toEqual(entityDate)
  })

  it('undefinedを指定した場合 ', async () => {
    const actual = toEntityDate(undefined)

    expect(actual).toBeUndefined()
  })

  it('nullを指定した場合 ', async () => {
    const actual = toEntityDate(null)

    expect(actual).toBeNull()
  })
})

describe('toEntityTimestamp', () => {
  const rawTimestamp: RawTimestamp = { createdAt: '2020-01-01T10:15:30.001Z', updatedAt: '2020-02-01T09:10:15.998Z' }
  const entityTimestamp: EntityTimestamp = { createdAt: dayjs(rawTimestamp.createdAt), updatedAt: dayjs(rawTimestamp.updatedAt) }

  it('ベーシックケース', async () => {
    const actual = toEntityTimestamp(rawTimestamp)

    expect(actual).toEqual(entityTimestamp)
  })

  it('createdAtのみを指定した場合', async () => {
    const actual = toEntityTimestamp({ createdAt: rawTimestamp.createdAt })

    expect(actual.createdAt).toEqual(entityTimestamp.createdAt)
  })

  it('updatedAtのみを指定した場合', async () => {
    const actual = toEntityTimestamp({ updatedAt: rawTimestamp.updatedAt })

    expect(actual.updatedAt).toEqual(entityTimestamp.updatedAt)
  })

  it('createdAtとupdatedAt両方指定しなかった場合', async () => {
    const actual = toEntityTimestamp({ id: '12345' })

    expect(actual).toEqual({ id: '12345' })
  })

  it('undefinedを指定した場合 ', async () => {
    const actual = toEntityTimestamp(undefined)

    expect(actual).toBeUndefined()
  })

  it('nullを指定した場合 ', async () => {
    const actual = toEntityTimestamp(null)

    expect(actual).toBeNull()
  })
})

describe('toEntityTimestamps', () => {
  const rawTimestamps: RawTimestamp[] = [
    { createdAt: '2020-01-01T10:15:30.001Z', updatedAt: '2020-02-01T09:10:15.998Z' },
    { createdAt: '2020-02-01T09:10:15.998Z', updatedAt: '2020-02-01T09:10:15.998Z' },
  ]
  const entityTimestamps: EntityTimestamp[] = [
    { createdAt: dayjs(rawTimestamps[0].createdAt), updatedAt: dayjs(rawTimestamps[0].updatedAt) },
    { createdAt: dayjs(rawTimestamps[1].createdAt), updatedAt: dayjs(rawTimestamps[1].updatedAt) },
  ]

  it('ベーシックケース', async () => {
    const actual = toEntityTimestamps(rawTimestamps)

    expect(actual).toEqual(entityTimestamps)
  })

  it('createdAtのみを指定した場合', async () => {
    const actual = toEntityTimestamps([{ createdAt: rawTimestamps[0].createdAt }, { createdAt: rawTimestamps[1].createdAt }])

    expect(actual).toEqual([{ createdAt: entityTimestamps[0].createdAt }, { createdAt: entityTimestamps[1].createdAt }])
  })

  it('updatedAtのみを指定した場合', async () => {
    const actual = toEntityTimestamps([{ updatedAt: rawTimestamps[0].updatedAt }, { updatedAt: rawTimestamps[1].updatedAt }])

    expect(actual).toEqual([{ updatedAt: entityTimestamps[0].updatedAt }, { updatedAt: entityTimestamps[1].updatedAt }])
  })

  it('空配列を指定した場合 ', async () => {
    const actual = toEntityTimestamps([])

    expect(actual).toEqual([])
  })
})

describe('toRawDate', () => {
  const rawDate = '2020-01-01T10:15:30.001Z'
  const entityDate = dayjs('2020-01-01T10:15:30.001Z')

  it('ベーシックケース', async () => {
    const actual = toRawDate(entityDate)

    expect(actual).toEqual(rawDate)
  })

  it('undefinedを指定した場合 ', async () => {
    const actual = toRawDate(undefined)

    expect(actual).toBeUndefined()
  })

  it('nullを指定した場合 ', async () => {
    const actual = toRawDate(null)

    expect(actual).toBeNull()
  })
})

describe('toRawTimestamp', () => {
  const rawTimestamp: RawTimestamp = { createdAt: '2020-01-01T10:15:30.001Z', updatedAt: '2020-02-01T09:10:15.998Z' }
  const entityTimestamp: EntityTimestamp = { createdAt: dayjs(rawTimestamp.createdAt), updatedAt: dayjs(rawTimestamp.updatedAt) }

  it('ベーシックケース', async () => {
    const actual = toRawTimestamp(entityTimestamp)

    expect(actual).toEqual(rawTimestamp)
  })

  it('createdAtのみを指定した場合', async () => {
    const actual = toRawTimestamp({ createdAt: entityTimestamp.createdAt })

    expect(actual.createdAt).toEqual(rawTimestamp.createdAt)
  })

  it('updatedAtのみを指定した場合', async () => {
    const actual = toRawTimestamp({ updatedAt: entityTimestamp.updatedAt })

    expect(actual.updatedAt).toEqual(rawTimestamp.updatedAt)
  })

  it('createdAtとupdatedAt両方指定しなかった場合', async () => {
    const actual = toRawTimestamp({ id: '12345' })

    expect(actual).toEqual({ id: '12345' })
  })

  it('undefinedを指定した場合 ', async () => {
    const actual = toRawTimestamp(undefined)

    expect(actual).toBeUndefined()
  })

  it('nullを指定した場合 ', async () => {
    const actual = toRawTimestamp(null)

    expect(actual).toBeNull()
  })
})

describe('toRawTimestamps', () => {
  const rawTimestamps: RawTimestamp[] = [
    { createdAt: '2020-01-01T10:15:30.001Z', updatedAt: '2020-02-01T09:10:15.998Z' },
    { createdAt: '2020-02-01T09:10:15.998Z', updatedAt: '2020-02-01T09:10:15.998Z' },
  ]
  const entityTimestamps: EntityTimestamp[] = [
    { createdAt: dayjs(rawTimestamps[0].createdAt), updatedAt: dayjs(rawTimestamps[0].updatedAt) },
    { createdAt: dayjs(rawTimestamps[1].createdAt), updatedAt: dayjs(rawTimestamps[1].updatedAt) },
  ]

  it('ベーシックケース', async () => {
    const actual = toRawTimestamps(entityTimestamps)

    expect(actual).toEqual(rawTimestamps)
  })

  it('createdAtのみを指定した場合', async () => {
    const actual = toRawTimestamps([{ createdAt: entityTimestamps[0].createdAt }, { createdAt: entityTimestamps[1].createdAt }])

    expect(actual).toEqual([{ createdAt: rawTimestamps[0].createdAt }, { createdAt: rawTimestamps[1].createdAt }])
  })

  it('updatedAtのみを指定した場合', async () => {
    const actual = toRawTimestamps([{ updatedAt: entityTimestamps[0].updatedAt }, { updatedAt: entityTimestamps[1].updatedAt }])

    expect(actual).toEqual([{ updatedAt: rawTimestamps[0].updatedAt }, { updatedAt: rawTimestamps[1].updatedAt }])
  })

  it('空配列を指定した場合 ', async () => {
    const actual = toRawTimestamps([])

    expect(actual).toEqual([])
  })
})
