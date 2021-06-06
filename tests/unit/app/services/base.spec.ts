import { toDeepEntityDate, toDeepRawDate, toEntityDate, toRawDate } from '../../../../src'
import { Dayjs } from 'dayjs'
import dayjs = require('dayjs')

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

describe('toDeepEntityDate', () => {
  class BaseObject {
    constructor() {
      this.createdAt = '2020-01-01T10:01:01.001Z'
      this.updatedAt = '2020-01-01T10:01:01.001Z'
    }

    createdAt: string
    updatedAt: string
  }

  class RawObject extends BaseObject {
    constructor() {
      super()
      this.str = 'str'
      this.strArr = ['strArr1', 'strArr2']
      this.day = dayjs()
      this.obj1 = {
        name: 'obj1',
        createdAt: '2020-01-01T10:01:01.001Z',
        updatedAt: '2020-01-01T10:01:01.001Z',
      }
      this.obj2 = {
        name: 'obj2',
        createdAt: undefined,
        updatedAt: undefined,
      }
      this.obj3 = {
        name: 'obj3',
        createdAt: null,
        updatedAt: null,
      }
      this.objArr = [
        {
          name: 'objArr1',
          createdAt: '2020-01-01T10:01:01.001Z',
          updatedAt: '2020-01-01T10:01:01.001Z',
        },
        {
          name: 'objArr2',
          createdAt: '2020-01-01T10:01:01.002Z',
          updatedAt: '2020-01-01T10:01:01.002Z',
        },
      ]
    }

    str: string
    strArr: string[]
    day: Dayjs
    obj1: { name: string; createdAt: string; updatedAt: string }
    obj2: { name: string; createdAt?: string; updatedAt?: string }
    obj3: { name: string; createdAt: string | null; updatedAt: string | null }
    objArr: { name: string; createdAt: string; updatedAt: string }[]
  }

  it('ベーシックケース', async () => {
    const original = new RawObject()
    const dummy = new RawObject()

    const actual = toDeepEntityDate(dummy, ['createdAt', 'updatedAt'])

    expect(actual).toBe(dummy)
    expect(actual.str).toBe(original.str)
    expect(actual.strArr).toEqual(original.strArr)
    // ---> エンティティ日付型だがプロパティ名が'createdAt'または'updatedAt'でないため型変換されない
    expect(actual.day).toEqual(original.day)
    // <---
    expect(actual.createdAt).toEqual(dayjs(original.createdAt))
    expect(actual.updatedAt).toEqual(dayjs(original.updatedAt))
    expect(actual.obj1).toEqual({
      name: original.obj1.name,
      createdAt: dayjs(original.obj1.createdAt),
      updatedAt: dayjs(original.obj1.updatedAt),
    })
    expect(actual.obj2).toEqual({
      name: original.obj2.name,
      createdAt: undefined,
      updatedAt: undefined,
    })
    expect(actual.obj3).toEqual({
      name: original.obj3.name,
      createdAt: null,
      updatedAt: null,
    })
    expect(actual.objArr).toEqual([
      {
        name: original.objArr[0].name,
        createdAt: dayjs(original.objArr[0].createdAt),
        updatedAt: dayjs(original.objArr[0].updatedAt),
      },
      {
        name: original.objArr[1].name,
        createdAt: dayjs(original.objArr[1].createdAt),
        updatedAt: dayjs(original.objArr[1].updatedAt),
      },
    ])
  })

  it('エンティティ日付変換後に日付オブジェクトを設定できるか検証', async () => {
    const dummy = new RawObject()

    const actual = toDeepEntityDate(dummy, ['createdAt', 'updatedAt'])

    const now = dayjs()
    actual.createdAt = now
    actual.updatedAt = now
    actual.obj1.createdAt = now
    actual.obj1.updatedAt = now
    actual.obj2.createdAt = now
    actual.obj2.updatedAt = now
    actual.obj3.createdAt = now
    actual.obj3.updatedAt = now
    actual.objArr[0].createdAt = now
    actual.objArr[0].updatedAt = now
    actual.objArr[1].createdAt = now
    actual.objArr[1].updatedAt = now

    expect(actual.createdAt).toEqual(now)
    expect(actual.updatedAt).toEqual(now)
    expect(actual.obj1.createdAt).toEqual(now)
    expect(actual.obj1.updatedAt).toEqual(now)
    expect(actual.obj2.createdAt).toEqual(now)
    expect(actual.obj2.updatedAt).toEqual(now)
    expect(actual.obj3.createdAt).toEqual(now)
    expect(actual.obj3.updatedAt).toEqual(now)
    expect(actual.objArr[0].createdAt).toEqual(now)
    expect(actual.objArr[0].updatedAt).toEqual(now)
    expect(actual.objArr[1].createdAt).toEqual(now)
    expect(actual.objArr[1].updatedAt).toEqual(now)
  })
})

describe('toDeepRawDate', () => {
  class BaseObject {
    constructor() {
      this.createdAt = dayjs('2020-01-01T10:01:01.001Z')
      this.updatedAt = dayjs('2020-01-01T10:01:01.001Z')
    }

    createdAt: Dayjs
    updatedAt: Dayjs
  }

  class EntityObject extends BaseObject {
    constructor() {
      super()
      this.str = 'str'
      this.strArr = ['strArr1', 'strArr2']
      this.day = dayjs()
      this.obj1 = {
        name: 'obj1',
        createdAt: dayjs('2020-01-01T10:01:01.001Z'),
        updatedAt: dayjs('2020-01-01T10:01:01.001Z'),
      }
      this.obj2 = {
        name: 'obj2',
        createdAt: undefined,
        updatedAt: undefined,
      }
      this.obj3 = {
        name: 'obj3',
        createdAt: null,
        updatedAt: null,
      }
      this.objArr = [
        {
          name: 'objArr1',
          createdAt: dayjs('2020-01-01T10:01:01.001Z'),
          updatedAt: dayjs('2020-01-01T10:01:01.001Z'),
        },
        {
          name: 'objArr2',
          createdAt: dayjs('2020-01-01T10:01:01.002Z'),
          updatedAt: dayjs('2020-01-01T10:01:01.002Z'),
        },
      ]
    }

    str: string
    strArr: string[]
    day: Dayjs
    obj1: { name: string; createdAt: Dayjs; updatedAt: Dayjs }
    obj2: { name: string; createdAt?: Dayjs; updatedAt?: Dayjs }
    obj3: { name: string; createdAt: Dayjs | null; updatedAt: Dayjs | null }
    objArr: { name: string; createdAt: Dayjs; updatedAt: Dayjs }[]
  }

  it('ベーシックケース', async () => {
    const original = new EntityObject()
    const dummy = new EntityObject()

    const actual = toDeepRawDate(dummy)

    expect(actual).toBe(dummy)
    expect(actual.str).toBe(original.str)
    expect(actual.strArr).toEqual(original.strArr)
    expect(actual.day).toEqual(original.day.toISOString())
    expect(actual.createdAt).toEqual(original.createdAt.toISOString())
    expect(actual.updatedAt).toEqual(original.updatedAt.toISOString())
    expect(actual.obj1).toEqual({
      name: original.obj1.name,
      createdAt: original.obj1.createdAt.toISOString(),
      updatedAt: original.obj1.updatedAt.toISOString(),
    })
    expect(actual.obj2).toEqual({
      name: original.obj2.name,
      createdAt: undefined,
      updatedAt: undefined,
    })
    expect(actual.obj3).toEqual({
      name: original.obj3.name,
      createdAt: null,
      updatedAt: null,
    })
    expect(actual.objArr).toEqual([
      {
        name: original.objArr[0].name,
        createdAt: original.objArr[0].createdAt.toISOString(),
        updatedAt: original.objArr[0].updatedAt.toISOString(),
      },
      {
        name: original.objArr[1].name,
        createdAt: original.objArr[1].createdAt.toISOString(),
        updatedAt: original.objArr[1].updatedAt.toISOString(),
      },
    ])
  })

  it('エンティティ日付変換後に日付オブジェクトを設定できるか検証', async () => {
    const dummy = new EntityObject()

    const actual = toDeepRawDate(dummy)

    const now = dayjs().toISOString()
    actual.day = now
    actual.createdAt = now
    actual.updatedAt = now
    actual.obj1.createdAt = now
    actual.obj1.updatedAt = now
    actual.obj2.createdAt = now
    actual.obj2.updatedAt = now
    actual.obj3.createdAt = now
    actual.obj3.updatedAt = now
    actual.objArr[0].createdAt = now
    actual.objArr[0].updatedAt = now
    actual.objArr[1].createdAt = now
    actual.objArr[1].updatedAt = now

    expect(actual.day).toEqual(now)
    expect(actual.createdAt).toEqual(now)
    expect(actual.updatedAt).toEqual(now)
    expect(actual.obj1.createdAt).toEqual(now)
    expect(actual.obj1.updatedAt).toEqual(now)
    expect(actual.obj2.createdAt).toEqual(now)
    expect(actual.obj2.updatedAt).toEqual(now)
    expect(actual.obj3.createdAt).toEqual(now)
    expect(actual.obj3.updatedAt).toEqual(now)
    expect(actual.objArr[0].createdAt).toEqual(now)
    expect(actual.objArr[0].updatedAt).toEqual(now)
    expect(actual.objArr[1].createdAt).toEqual(now)
    expect(actual.objArr[1].updatedAt).toEqual(now)
  })
})
