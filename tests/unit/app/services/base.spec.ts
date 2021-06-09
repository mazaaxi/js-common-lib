import {
  ToDeepNullable,
  ToDeepUndefined,
  toDeepEntityDate,
  toDeepNull,
  toDeepRawDate,
  toDeepUndefined,
  toEntityDate,
  toRawDate,
} from '../../../../src'
import { Dayjs } from 'dayjs'
import dayjs = require('dayjs')

//========================================================================
//
//  Test helpers
//
//========================================================================

interface NullableObject {
  str1: string
  str2: string | undefined
  str3: string | null
  str4: string | undefined | null
  day1: Dayjs
  day2: Dayjs | undefined
  day3: Dayjs | null
  day4: Dayjs | undefined | null
  obj1: { name: string; age: number }
  obj2: { name: string | undefined; age: number } | undefined
  obj3: { name: string | null; age: number } | null
  obj4: { name: string | undefined | null; age: number } | undefined | null
  objArr1: { name: string; age: number }[]
  objArr2: { name: string | undefined; age: number }[] | undefined
  objArr3: { name: string | null; age: number }[] | null
  objArr4: { name: string | undefined | null; age: number }[] | undefined | null
  strArr1: string[]
  strArr2: string[] | undefined
  strArr3: string[] | null
  strArr4: string[] | undefined | null
}

//========================================================================
//
//  Tests
//
//========================================================================

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
    const target = new RawObject()

    const actual = toDeepEntityDate(target, ['createdAt', 'updatedAt'])

    expect(actual).toBe(target)
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
    const actual = toDeepEntityDate(new RawObject(), ['createdAt', 'updatedAt'])

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

  it('undefinedを指定した場合', async () => {
    const actual = toDeepEntityDate(undefined, ['createdAt', 'updatedAt'])

    expect(actual).toBeUndefined()
  })

  it('nullを指定した場合', async () => {
    const actual = toDeepEntityDate(null, ['createdAt', 'updatedAt'])

    expect(actual).toBeNull()
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
    const target = new EntityObject()

    const actual = toDeepRawDate(target)

    expect(actual).toBe(target)
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
    const actual = toDeepRawDate(new EntityObject())

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

  it('undefinedを指定した場合', async () => {
    const actual = toDeepRawDate(undefined)

    expect(actual).toBeUndefined()
  })

  it('nullを指定した場合', async () => {
    const actual = toDeepRawDate(null)

    expect(actual).toBeNull()
  })
})

describe('ToDeepNullable', () => {
  class MyNullableObject {
    constructor() {
      this.str1 = undefined
      this.str2 = 'str'
      this.day1 = undefined
      this.day2 = dayjs()
      this.obj1 = undefined
      this.obj2 = { name: undefined, age: 10 }
      this.objArr1 = undefined
      this.objArr2 = [
        { name: undefined, age: 10 },
        { name: undefined, age: 20 },
      ]
      this.strArr1 = undefined
      this.strArr2 = ['one', 'two']
    }

    str1: string | undefined
    str2: string | undefined
    day1: Dayjs | undefined
    day2: Dayjs | undefined
    obj1: { name: string | undefined; age: number } | undefined
    obj2: { name: string | undefined; age: number } | undefined
    objArr1: { name: string | undefined; age: number }[] | undefined
    objArr2: { name: string | undefined; age: number }[] | undefined
    strArr1: string[] | undefined
    strArr2: string[] | undefined
  }

  it('ベーシックケース', async () => {
    const original = new MyNullableObject()

    const actual = toDeepNull(new MyNullableObject())

    expect(actual.str1).toBeNull()
    expect(actual.str2).toBe(original.str2)
    expect(actual.day1).toBeNull()
    expect(actual.day2).toEqual(original.day2)
    expect(actual.obj1).toBeNull()
    expect(actual.obj2).toEqual({ name: null, age: 10 })
    expect(actual.objArr1).toBeNull()
    expect(actual.objArr2).toEqual([
      { name: null, age: 10 },
      { name: null, age: 20 },
    ])
    expect(actual.strArr1).toBeNull()
    expect(actual.strArr2).toEqual(original.strArr2)
  })

  it('静的解析', async () => {
    const actual: ToDeepNullable<NullableObject> = {}

    /* ---> TypeScriptの静的解析の結果を確認するには、
            このコメントブロックを削除してください

    //--------------------------------------------------
    //  string
    //--------------------------------------------------

    actual.str1 = undefined
    actual.str1 = null
    actual.str1 = 'str'

    actual.str2 = undefined
    actual.str2 = null
    actual.str2 = 'str'

    actual.str3 = undefined
    actual.str3 = null
    actual.str3 = 'str'

    actual.str4 = undefined
    actual.str4 = null
    actual.str4 = 'str'

    //--------------------------------------------------
    //  Dayjs
    //--------------------------------------------------

    actual.day1 = undefined
    actual.day1 = null
    actual.day1 = dayjs()

    actual.day2 = undefined
    actual.day2 = null
    actual.day2 = dayjs()

    actual.day3 = undefined
    actual.day3 = null
    actual.day3 = dayjs()

    actual.day4 = undefined
    actual.day4 = null
    actual.day4 = dayjs()

    //--------------------------------------------------
    //  object
    //--------------------------------------------------

    actual.obj1 = undefined
    actual.obj1 = null
    actual.obj1 = { name: 'one', age: 1 }
    actual.obj1.name = undefined
    actual.obj1.name = null
    actual.obj1.name = 'one1'

    actual.obj2 = undefined
    actual.obj2 = null
    actual.obj2 = { name: 'one', age: 1 }
    actual.obj2.name = undefined
    actual.obj2.name = null
    actual.obj2.name = 'one1'

    actual.obj3 = undefined
    actual.obj3 = null
    actual.obj3 = { name: 'one', age: 1 }
    actual.obj3.name = undefined
    actual.obj3.name = null
    actual.obj3.name = 'one1'

    actual.obj4 = undefined
    actual.obj4 = null
    actual.obj4 = { name: 'one', age: 1 }
    actual.obj4.name = undefined
    actual.obj4.name = null
    actual.obj4.name = 'one1'

    //--------------------------------------------------
    //  object array
    //--------------------------------------------------

    actual.objArr1 = undefined
    actual.objArr1 = null
    actual.objArr1 = [{ name: 'one', age: 1 }]
    actual.objArr1[0].name = undefined
    actual.objArr1[0].name = null
    actual.objArr1[0].name = 'one1'

    actual.objArr2 = undefined
    actual.objArr2 = null
    actual.objArr2 = [{ name: 'one', age: 1 }]
    actual.objArr2[0].name = undefined
    actual.objArr2[0].name = null
    actual.objArr2[0].name = 'one1'

    actual.objArr3 = undefined
    actual.objArr3 = null
    actual.objArr3 = [{ name: 'one', age: 1 }]
    actual.objArr3[0].name = undefined
    actual.objArr3[0].name = null
    actual.objArr3[0].name = 'one1'

    actual.objArr4 = undefined
    actual.objArr4 = null
    actual.objArr4 = [{ name: 'one', age: 1 }]
    actual.objArr4[0].name = undefined
    actual.objArr4[0].name = null
    actual.objArr4[0].name = 'one1'

    //--------------------------------------------------
    //  string array
    //--------------------------------------------------

    // プリミティブな配列の要素はNullableにならない!
    // このため配列の要素にundefinedまたはnullは設定不可

    actual.strArr1 = undefined
    actual.strArr1 = null
    actual.strArr1 = ['one']
    actual.strArr1[0] = undefined // undefined設定不可
    actual.strArr1[0] = null // null設定不可
    actual.strArr1[0] = 'one1'

    actual.strArr2 = undefined
    actual.strArr2 = null
    actual.strArr2 = ['one']
    actual.strArr2[0] = undefined // undefined設定不可
    actual.strArr2[0] = null // null設定不可
    actual.strArr2[0] = 'one1'

    actual.strArr3 = undefined
    actual.strArr3 = null
    actual.strArr3 = ['one']
    actual.strArr3[0] = undefined // undefined設定不可
    actual.strArr3[0] = null // null設定不可
    actual.strArr3[0] = 'one1'

    actual.strArr4 = undefined
    actual.strArr4 = null
    actual.strArr4 = ['one']
    actual.strArr4[0] = undefined // undefined設定不可
    actual.strArr4[0] = null // null設定不可
    actual.strArr4[0] = 'one1'

    <--- */
  })
})

describe('ToDeepUndefined', () => {
  class MyNullableObject {
    constructor() {
      this.str1 = null
      this.str2 = 'str'
      this.day1 = null
      this.day2 = dayjs()
      this.obj1 = null
      this.obj2 = { name: null, age: 10 }
      this.objArr1 = null
      this.objArr2 = [
        { name: null, age: 10 },
        { name: null, age: 20 },
      ]
      this.strArr1 = null
      this.strArr2 = ['one', 'two']
    }

    str1: string | null
    str2: string | null
    day1: Dayjs | null
    day2: Dayjs | null
    obj1: { name: string | null; age: number } | null
    obj2: { name: string | null; age: number } | null
    objArr1: { name: string | null; age: number }[] | null
    objArr2: { name: string | null; age: number }[] | null
    strArr1: string[] | null
    strArr2: string[] | null
  }

  it('ベーシックケース', async () => {
    const original = new MyNullableObject()

    const actual = toDeepUndefined(new MyNullableObject())

    expect(actual.str1).toBeUndefined()
    expect(actual.str2).toBe(original.str2)
    expect(actual.day1).toBeUndefined()
    expect(actual.day2).toEqual(original.day2)
    expect(actual.obj1).toBeUndefined()
    expect(actual.obj2).toEqual({ name: undefined, age: 10 })
    expect(actual.objArr1).toBeUndefined()
    expect(actual.objArr2).toEqual([
      { name: undefined, age: 10 },
      { name: undefined, age: 20 },
    ])
    expect(actual.strArr1).toBeUndefined()
    expect(actual.strArr2).toEqual(original.strArr2)
  })

  it('静的解析', async () => {
    const actual: ToDeepUndefined<NullableObject> = {} as any

    /* ---> TypeScriptの静的解析の結果を確認するには、
            このコメントブロックを削除してください

    //--------------------------------------------------
    //  string
    //--------------------------------------------------

    actual.str1 = undefined // undefined設定不可
    actual.str1 = null // null設定不可
    actual.str1 = 'str'

    actual.str2 = undefined
    actual.str2 = null // null設定不可
    actual.str2 = 'str'

    actual.str3 = undefined
    actual.str3 = null // null設定不可
    actual.str3 = 'str'

    actual.str4 = undefined
    actual.str4 = null // null設定不可
    actual.str4 = 'str'

    //--------------------------------------------------
    //  Dayjs
    //--------------------------------------------------

    actual.day1 = undefined // undefined設定不可
    actual.day1 = null // null設定不可
    actual.day1 = dayjs()

    actual.day2 = undefined
    actual.day2 = null // null設定不可
    actual.day2 = dayjs()

    actual.day3 = undefined
    actual.day3 = null // null設定不可
    actual.day3 = dayjs()

    actual.day4 = undefined
    actual.day4 = null // null設定不可
    actual.day4 = dayjs()

    //--------------------------------------------------
    //  object
    //--------------------------------------------------

    actual.obj1 = undefined // undefined設定不可
    actual.obj1 = null // null設定不可
    actual.obj1 = { name: 'one', age: 1 }
    actual.obj1.name = undefined // undefined設定不可
    actual.obj1.name = null // null設定不可
    actual.obj1.name = 'one1'

    actual.obj2 = undefined
    actual.obj2 = null // null設定不可
    actual.obj2 = { name: 'one', age: 1 }
    actual.obj2.name = undefined
    actual.obj2.name = null // null設定不可
    actual.obj2.name = 'one1'

    actual.obj3 = undefined
    actual.obj3 = null // null設定不可
    actual.obj3 = { name: 'one', age: 1 }
    actual.obj3.name = undefined
    actual.obj3.name = null // null設定不可
    actual.obj3.name = 'one1'

    actual.obj4 = undefined
    actual.obj4 = null // null設定不可
    actual.obj4 = { name: 'one', age: 1 }
    actual.obj4.name = undefined
    actual.obj4.name = null // null設定不可
    actual.obj4.name = 'one1'

    //--------------------------------------------------
    //  object array
    //--------------------------------------------------

    actual.objArr1 = undefined // undefined設定不可
    actual.objArr1 = null // null設定不可
    actual.objArr1 = [{ name: 'one', age: 1 }]
    actual.objArr1[0].name = undefined // undefined設定不可
    actual.objArr1[0].name = null // null設定不可
    actual.objArr1[0].name = 'one1'

    actual.objArr2 = undefined
    actual.objArr2 = null // null設定不可
    actual.objArr2 = [{ name: 'one', age: 1 }]
    actual.objArr2[0].name = undefined
    actual.objArr2[0].name = null // null設定不可
    actual.objArr2[0].name = 'one1'

    actual.objArr3 = undefined
    actual.objArr3 = null // null設定不可
    actual.objArr3 = [{ name: 'one', age: 1 }]
    actual.objArr3[0].name = undefined
    actual.objArr3[0].name = null // null設定不可
    actual.objArr3[0].name = 'one1'

    actual.objArr4 = undefined
    actual.objArr4 = null // null設定不可
    actual.objArr4 = [{ name: 'one', age: 1 }]
    actual.objArr4[0].name = undefined
    actual.objArr4[0].name = null // null設定不可
    actual.objArr4[0].name = 'one1'

    //--------------------------------------------------
    //  string array
    //--------------------------------------------------

    actual.strArr1 = undefined // undefined設定不可
    actual.strArr1 = null // null設定不可
    actual.strArr1 = ['one']
    actual.strArr1[0] = undefined // undefined設定不可
    actual.strArr1[0] = null // null設定不可
    actual.strArr1[0] = 'one1'

    actual.strArr2 = undefined
    actual.strArr2 = null // null設定不可
    actual.strArr2 = ['one']
    actual.strArr2[0] = undefined // undefined設定不可
    actual.strArr2[0] = null // null設定不可
    actual.strArr2[0] = 'one1'

    actual.strArr3 = undefined
    actual.strArr3 = null // null設定不可
    actual.strArr3 = ['one']
    actual.strArr3[0] = undefined // undefined設定不可
    actual.strArr3[0] = null // null設定不可
    actual.strArr3[0] = 'one1'

    actual.strArr4 = undefined
    actual.strArr4 = null // null設定不可
    actual.strArr4 = ['one']
    actual.strArr4[0] = undefined // undefined設定不可
    actual.strArr4[0] = null // null設定不可
    actual.strArr4[0] = 'one1'

    <--- */
  })
})
