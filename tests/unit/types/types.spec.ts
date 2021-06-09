import { DeepPartial, DeepReadonly, ToDeepNullable, ToDeepUndefined } from '../../../src'
import { Dayjs } from 'dayjs'
import dayjs = require('dayjs')

interface Dummy {
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

describe('DeepPartial', () => {
  it('静的解析', async () => {
    /* ---> TypeScriptの静的解析の結果を確認するには、
            このコメントブロックを削除してください

    const dummy: DeepPartial<Dummy> = {}

    //--------------------------------------------------
    //  string
    //--------------------------------------------------

    dummy.str1 = undefined
    dummy.str1 = null // null設定不可
    dummy.str1 = 'str'

    dummy.str2 = undefined
    dummy.str2 = null // null設定不可
    dummy.str2 = 'str'

    dummy.str3 = undefined
    dummy.str3 = null
    dummy.str3 = 'str'

    dummy.str4 = undefined
    dummy.str4 = null
    dummy.str4 = 'str'

    //--------------------------------------------------
    //  Dayjs
    //--------------------------------------------------

    dummy.day1 = undefined
    dummy.day1 = null // null設定不可
    dummy.day1 = dayjs()

    dummy.day2 = undefined
    dummy.day2 = null // null設定不可
    dummy.day2 = dayjs()

    dummy.day3 = undefined
    dummy.day3 = null
    dummy.day3 = dayjs()

    dummy.day4 = undefined
    dummy.day4 = null
    dummy.day4 = dayjs()

    //--------------------------------------------------
    //  object
    //--------------------------------------------------

    dummy.obj1 = undefined
    dummy.obj1 = null // null設定不可
    dummy.obj1 = { name: 'one', age: 1 }
    dummy.obj1.name = undefined
    dummy.obj1.name = null // null設定不可
    dummy.obj1.name = 'one1'

    dummy.obj2 = undefined
    dummy.obj2 = null // null設定不可
    dummy.obj2 = { name: 'one', age: 1 }
    dummy.obj2.name = undefined
    dummy.obj2.name = null // null設定不可
    dummy.obj2.name = 'one1'

    dummy.obj3 = undefined
    dummy.obj3 = null
    dummy.obj3 = { name: 'one', age: 1 }
    dummy.obj3.name = undefined
    dummy.obj3.name = null
    dummy.obj3.name = 'one1'

    dummy.obj4 = undefined
    dummy.obj4 = null
    dummy.obj4 = { name: 'one', age: 1 }
    dummy.obj4.name = undefined
    dummy.obj4.name = null
    dummy.obj4.name = 'one1'

    //--------------------------------------------------
    //  object array
    //--------------------------------------------------

    dummy.objArr1 = undefined
    dummy.objArr1 = null // null設定不可
    dummy.objArr1 = [{ name: 'one', age: 1 }]
    dummy.objArr1[0].name = undefined
    dummy.objArr1[0].name = null // null設定不可
    dummy.objArr1[0].name = 'one1'

    dummy.objArr2 = undefined
    dummy.objArr2 = null // null設定不可
    dummy.objArr2 = [{ name: 'one', age: 1 }]
    dummy.objArr2[0].name = undefined
    dummy.objArr2[0].name = null // null設定不可
    dummy.objArr2[0].name = 'one1'

    dummy.objArr3 = undefined
    dummy.objArr3 = null
    dummy.objArr3 = [{ name: 'one', age: 1 }]
    dummy.objArr3[0].name = undefined
    dummy.objArr3[0].name = null
    dummy.objArr3[0].name = 'one1'

    dummy.objArr4 = undefined
    dummy.objArr4 = null
    dummy.objArr4 = [{ name: 'one', age: 1 }]
    dummy.objArr4[0].name = undefined
    dummy.objArr4[0].name = null
    dummy.objArr4[0].name = 'one1'

    //--------------------------------------------------
    //  string array
    //--------------------------------------------------

    // プリミティブな配列の要素はPartialにならない!
    // このため配列の要素にundefinedまたはnullの設定はできない

    dummy.strArr1 = undefined
    dummy.strArr1 = null // null設定不可
    dummy.strArr1 = ['one']
    dummy.strArr1[0] = undefined // undefined設定不可
    dummy.strArr1[0] = null // null設定不可
    dummy.strArr1[0] = 'one1'

    dummy.strArr2 = undefined
    dummy.strArr2 = null // null設定不可
    dummy.strArr2 = ['one']
    dummy.strArr2[0] = undefined // undefined設定不可
    dummy.strArr2[0] = null // null設定不可
    dummy.strArr2[0] = 'one1'

    dummy.strArr3 = undefined
    dummy.strArr3 = null
    dummy.strArr3 = ['one']
    dummy.strArr3[0] = undefined // undefined設定不可
    dummy.strArr3[0] = null // null設定不可
    dummy.strArr3[0] = 'one1'

    dummy.strArr4 = undefined
    dummy.strArr4 = null
    dummy.strArr4 = ['one']
    dummy.strArr4[0] = undefined // undefined設定不可
    dummy.strArr4[0] = null // null設定不可
    dummy.strArr4[0] = 'one1'

    <--- */
  })
})

describe('DeepReadonly', () => {
  it('静的解析', async () => {
    /* ---> TypeScriptの静的解析の結果を確認するには、
            このコメントブロックを削除してください

    const dummy: DeepReadonly<Dummy> = {} as any

    //--------------------------------------------------
    //  string
    //--------------------------------------------------

    dummy.str1 = undefined
    dummy.str1 = null
    dummy.str1 = 'str'

    dummy.str2 = undefined
    dummy.str2 = null
    dummy.str2 = 'str'

    dummy.str3 = undefined
    dummy.str3 = null
    dummy.str3 = 'str'

    dummy.str4 = undefined
    dummy.str4 = null
    dummy.str4 = 'str'

    //--------------------------------------------------
    //  Dayjs
    //--------------------------------------------------

    dummy.day1 = undefined
    dummy.day1 = null
    dummy.day1 = dayjs()

    dummy.day2 = undefined
    dummy.day2 = null
    dummy.day2 = dayjs()

    dummy.day3 = undefined
    dummy.day3 = null
    dummy.day3 = dayjs()

    dummy.day4 = undefined
    dummy.day4 = null
    dummy.day4 = dayjs()

    //--------------------------------------------------
    //  object
    //--------------------------------------------------

    dummy.obj1 = undefined
    dummy.obj1 = null
    dummy.obj1 = { name: 'one', age: 1 }
    dummy.obj1.name = undefined
    dummy.obj1.name = null
    dummy.obj1.name = 'one1'

    dummy.obj2 = undefined
    dummy.obj2 = null
    dummy.obj2 = { name: 'one', age: 1 }
    dummy.obj2.name = undefined
    dummy.obj2.name = null
    dummy.obj2.name = 'one1'

    dummy.obj3 = undefined
    dummy.obj3 = null
    dummy.obj3 = { name: 'one', age: 1 }
    dummy.obj3.name = undefined
    dummy.obj3.name = null
    dummy.obj3.name = 'one1'

    dummy.obj4 = undefined
    dummy.obj4 = null
    dummy.obj4 = { name: 'one', age: 1 }
    dummy.obj4.name = undefined
    dummy.obj4.name = null
    dummy.obj4.name = 'one1'

    //--------------------------------------------------
    //  object array
    //--------------------------------------------------

    dummy.objArr1 = undefined
    dummy.objArr1 = null
    dummy.objArr1 = [{ name: 'one', age: 1 }]
    dummy.objArr1[0].name = undefined
    dummy.objArr1[0].name = null
    dummy.objArr1[0].name = 'one1'

    dummy.objArr2 = undefined
    dummy.objArr2 = null
    dummy.objArr2 = [{ name: 'one', age: 1 }]
    dummy.objArr2[0].name = undefined
    dummy.objArr2[0].name = null
    dummy.objArr2[0].name = 'one1'

    dummy.objArr3 = undefined
    dummy.objArr3 = null
    dummy.objArr3 = [{ name: 'one', age: 1 }]
    dummy.objArr3[0].name = undefined
    dummy.objArr3[0].name = null
    dummy.objArr3[0].name = 'one1'

    dummy.objArr4 = undefined
    dummy.objArr4 = null
    dummy.objArr4 = [{ name: 'one', age: 1 }]
    dummy.objArr4[0].name = undefined
    dummy.objArr4[0].name = null
    dummy.objArr4[0].name = 'one1'

    //--------------------------------------------------
    //  string array
    //--------------------------------------------------

    // プリミティブな配列の要素はReadonlyにならない!
    // このため配列の要素に値を設定可能

    dummy.strArr1 = undefined
    dummy.strArr1 = null
    dummy.strArr1 = ['one']
    dummy.strArr1[0] = undefined
    dummy.strArr1[0] = null
    dummy.strArr1[0] = 'one1' // 値を設定可能

    dummy.strArr2 = undefined
    dummy.strArr2 = null
    dummy.strArr2 = ['one']
    dummy.strArr2[0] = undefined
    dummy.strArr2[0] = null
    dummy.strArr2[0] = 'one1' // 値を設定可能

    dummy.strArr3 = undefined
    dummy.strArr3 = null
    dummy.strArr3 = ['one']
    dummy.strArr3[0] = undefined
    dummy.strArr3[0] = null
    dummy.strArr3[0] = 'one1' // 値を設定可能

    dummy.strArr4 = undefined
    dummy.strArr4 = null
    dummy.strArr4 = ['one']
    dummy.strArr4[0] = undefined
    dummy.strArr4[0] = null
    dummy.strArr4[0] = 'one1' // 値を設定可能

    <--- */
  })
})
