import {
  KeysToCamel,
  KeysToSnake,
  Version,
  arrayToDict,
  assertNonNullable,
  convertObject,
  extensibleMethod,
  findDuplicateItems,
  findDuplicateValues,
  isImplemented,
  keysToCamel,
  keysToSnake,
  nonNullable,
  notEmpty,
  pickProps,
  prependHTTP,
  removeBothEndsSlash,
  removeEndSlash,
  removeStartDirChars,
  removeStartSlash,
  runWhenReady,
  sleep,
  snakeToCamel,
  splitArrayChunk,
  splitFilePath,
  splitHierarchicalPaths,
  summarizeFamilyPaths,
} from '../../../src'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { performance } from 'perf_hooks'

describe('removeStartSlash', () => {
  it('ベーシックケース', async () => {
    const actual = removeStartSlash('/aaa/bbb/')
    expect(actual).toBe('aaa/bbb/')
  })

  it('複数のスラッシュがある場合', async () => {
    const actual = removeStartSlash('///aaa/bbb/')
    expect(actual).toBe('aaa/bbb/')
  })

  it('先頭にスラッシュがない場合', async () => {
    const actual = removeStartSlash('aaa/bbb/')
    expect(actual).toBe('aaa/bbb/')
  })

  it('undefinedを指定した場合', async () => {
    const actual = removeStartSlash(undefined)
    expect(actual).toBe('')
  })

  it('nullを指定した場合', async () => {
    const actual = removeStartSlash(null)
    expect(actual).toBe('')
  })
})

describe('removeEndSlash', () => {
  it('ベーシックケース', async () => {
    const actual = removeEndSlash('/aaa/bbb/')
    expect(actual).toBe('/aaa/bbb')
  })

  it('複数のスラッシュがある場合', async () => {
    const actual = removeEndSlash('/aaa/bbb///')
    expect(actual).toBe('/aaa/bbb')
  })

  it('末尾にスラッシュがない場合', async () => {
    const actual = removeEndSlash('/aaa/bbb')
    expect(actual).toBe('/aaa/bbb')
  })

  it('undefinedを指定した場合', async () => {
    const actual = removeEndSlash(undefined)
    expect(actual).toBe('')
  })

  it('nullを指定した場合', async () => {
    const actual = removeEndSlash(null)
    expect(actual).toBe('')
  })
})

describe('removeBothEndsSlash', () => {
  it('ベーシックケース', async () => {
    const actual = removeBothEndsSlash('/aaa/bbb/')
    expect(actual).toBe('aaa/bbb')
  })

  it('undefinedを指定した場合', async () => {
    const actual = removeBothEndsSlash(undefined)
    expect(actual).toBe('')
  })

  it('nullを指定した場合', async () => {
    const actual = removeBothEndsSlash(null)
    expect(actual).toBe('')
  })
})

describe('removeStartDirChars', () => {
  it('カレントディレクトリを示している場合', async () => {
    const actual = removeStartDirChars('./aaa/bbb/')
    expect(actual).toBe('aaa/bbb/')
  })

  it('上位ディレクトリを示している場合', async () => {
    const actual = removeStartDirChars('../aaa/bbb/')
    expect(actual).toBe('aaa/bbb/')
  })

  it('スラッシュで始まっている場合', async () => {
    const actual = removeStartDirChars('./aaa/bbb/')
    expect(actual).toBe('aaa/bbb/')
  })

  it('undefinedを指定した場合', async () => {
    const actual = removeStartDirChars(undefined)
    expect(actual).toBe('')
  })

  it('nullを指定した場合', async () => {
    const actual = removeStartDirChars(null)
    expect(actual).toBe('')
  })
})

describe('splitFilePath', () => {
  it('先頭に"/"がある場合', async () => {
    const actual = splitFilePath('/aaa/bbb/fileA.txt')
    expect(actual.dirPath).toBe('/aaa/bbb')
    expect(actual.fileName).toBe('fileA.txt')
  })

  it('先頭に"/"がない場合', async () => {
    const actual = splitFilePath('aaa/bbb/fileA.txt')
    expect(actual.dirPath).toBe('aaa/bbb')
    expect(actual.fileName).toBe('fileA.txt')
  })
})

describe('splitHierarchicalPaths', () => {
  it('ベーシックケース', async () => {
    const actual = splitHierarchicalPaths(`d1`, `d1/d11/fileA.txt`, 'd2/d21/fileC.txt', `d1/d11/fileB.txt`)

    expect(actual.length).toBe(7)
    expect(actual[0]).toBe(`d1`)
    expect(actual[1]).toBe(`d1/d11`)
    expect(actual[2]).toBe(`d1/d11/fileA.txt`)
    expect(actual[3]).toBe(`d1/d11/fileB.txt`)
    expect(actual[4]).toBe(`d2`)
    expect(actual[5]).toBe(`d2/d21`)
    expect(actual[6]).toBe(`d2/d21/fileC.txt`)
  })

  it('undefinedまたはnullが含まれた場合', async () => {
    const actual = splitHierarchicalPaths(`d1`, undefined, null)

    expect(actual.length).toBe(1)
    expect(actual[0]).toBe(`d1`)
  })

  it('undefinedが指定された場合', async () => {
    const actual = splitHierarchicalPaths(undefined)

    expect(actual.length).toBe(0)
  })

  it('nullが指定された場合', async () => {
    const actual = splitHierarchicalPaths(undefined)

    expect(actual.length).toBe(0)
  })

  it('何も指定しない場合', async () => {
    const actual = splitHierarchicalPaths()

    expect(actual.length).toBe(0)
  })
})

describe('summarizeFamilyPaths', () => {
  it('ベーシックケース', async () => {
    const actual = summarizeFamilyPaths([`d1/d11`, `d1/d11/d111`, `d1/d11/d112`, `d2/d21`, `d2/d21/d211`])

    expect(actual[0]).toBe(`d1/d11/d111`)
    expect(actual[1]).toBe(`d1/d11/d112`)
    expect(actual[2]).toBe(`d2/d21/d211`)
  })
})

describe('prependHTTP', () => {
  it('ベーシックケース', async () => {
    expect(prependHTTP('example.com', { https: false })).toBe('http://example.com')
    expect(prependHTTP('http://example.com', { https: false })).toBe('http://example.com')
    expect(prependHTTP('https://example.com', { https: false })).toBe('https://example.com')
    expect(prependHTTP('//example.com', { https: false })).toBe('//example.com')
    expect(prependHTTP('localhost', { https: false })).toBe('http://localhost')
    expect(prependHTTP('localhost:8000', { https: false })).toBe('http://localhost:8000')
    expect(prependHTTP('localhost:8000  ', { https: false })).toBe('http://localhost:8000')
    expect(prependHTTP('./relative')).toBe('./relative')
    expect(prependHTTP('../relative')).toBe('../relative')
    expect(prependHTTP('/relative')).toBe('/relative')
    expect(prependHTTP('mailto:info@site.com')).toBe('mailto:info@site.com')
    expect(prependHTTP('tel:1234567890')).toBe('tel:1234567890')
  })

  it('https option', async () => {
    expect(prependHTTP('example.com', { https: true })).toBe('https://example.com')
    expect(prependHTTP('//example.com', { https: true })).toBe('//example.com')
    expect(prependHTTP('localhost:8000', { https: true })).toBe('https://localhost:8000')
  })
})

describe('pickProps', () => {
  interface Person {
    first: string
    last: string
    age: number
    gender: 'man' | 'woman'
    address: Address
  }

  interface Address {
    pref: string
    city: string
  }

  it('ベーシックケース', async () => {
    const person: Person = {
      first: 'Taro',
      last: 'Yamamoto',
      age: 18,
      gender: 'man',
      address: { pref: 'Ibaraki', city: 'Tsukuba-Shi' },
    }

    const actual = pickProps(person, ['first', 'age', 'address'])

    expect(Object.keys(actual).length).toBe(3)
    expect(actual.first).toBe('Taro')
    expect(actual.age).toBe(18)
    expect(actual.address.pref).toEqual('Ibaraki')
    expect(actual.address.city).toEqual('Tsukuba-Shi')
  })

  it('存在しないプロパティを取り出そうとした場合', async () => {
    // 「last」に値を設定しない
    const person: Partial<Person> = {
      first: 'Taro',
      age: 18,
    }

    // 存在しない「last」を取り出すよう指定
    const actual = pickProps(person, ['first', 'last', 'age'])

    // 「last」は存在しないので除外される
    expect(Object.keys(actual).length).toBe(2)
    expect(actual.first).toBe('Taro')
    expect(actual.age).toBe(18)
  })

  it('undefinedが指定されたプロパティを取り出そうとした場合', async () => {
    // 「last」に「undefined」を指定
    const person: Partial<Person> = {
      first: 'Taro',
      last: undefined,
      age: 18,
    }

    // 「undefined」が指定された「last」を取り出すよう指定
    const actual = pickProps(person, ['first', 'last', 'age'])

    // 「last」は「undefined」だがプロパティは存在するので取得される
    expect(Object.keys(actual).length).toBe(3)
    expect(actual.first).toBe('Taro')
    expect(actual.last).toBeUndefined()
    expect(actual.age).toBe(18)
  })

  it('除外指定した場合', async () => {
    const address = { pref: 'Ibaraki', city: 'Tsukuba-Shi' }
    const person: Partial<Person> = {
      first: 'Taro',
      age: undefined,
      gender: 'man',
      address,
    }

    // 除外指定を行う
    const actual = pickProps(person, ['first', 'last', 'age', 'gender', 'address'], [undefined, 'man', address])

    // - 「last」は存在しないので除外される
    // - 「age」は「undefined」が除外指定されているので除外される
    // - 「gender」は「man」が除外指定されているので除外される
    // - 「address」は「address」が除外指定されているので除外される
    expect(Object.keys(actual).length).toBe(1)
    expect(actual.first).toBe('Taro')
  })
})

describe('arrayToDict', () => {
  interface Person {
    id: number
    name: string
    phones: string[]
  }
  const ichiro: Person = { id: 1, name: 'ichiro', phones: ['090-0001-0001', '090-0001-0002'] }
  const jiro: Person = { id: 2, name: 'jiro', phones: ['090-0002-0001', '090-0002-0002'] }
  const saburo: Person = { id: 3, name: 'saburo', phones: ['090-0003-0001', '090-0003-0002'] }

  it('keyにnumber型を指定', async () => {
    const array = [ichiro, jiro, saburo]

    const actual = arrayToDict(array, 'id')

    expect(actual[1]).toBe(ichiro)
    expect(actual[2]).toBe(jiro)
    expect(actual[3]).toBe(saburo)
  })

  it('keyにstring型を指定', async () => {
    const array = [ichiro, jiro, saburo]

    const actual = arrayToDict(array, 'name')

    expect(actual['ichiro']).toBe(ichiro)
    expect(actual['jiro']).toBe(jiro)
    expect(actual['saburo']).toBe(saburo)
  })

  it('keyにnumber、string型以外を指定', async () => {
    const array = [ichiro, jiro, saburo]

    const actual = arrayToDict(array, 'phones')

    expect(Object.keys(actual).length).toBe(0)
  })

  it('listが空配列の場合', async () => {
    const array: Person[] = []

    const actual = arrayToDict(array, 'name')

    expect(Object.keys(actual).length).toBe(0)
  })
})

describe('splitArrayChunk', () => {
  it('ベーシックケース', async () => {
    const array: number[] = []
    for (let i = 1; i <= 100; i++) {
      array.push(i)
    }

    const actual = splitArrayChunk(array, 10)

    expect(actual.length).toBe(10)
    let num = 1
    for (let i = 0; i < actual.length; i++) {
      const chunk = actual[i]
      for (let j = 0; j < chunk.length; j++) {
        expect(chunk[j]).toBe(num)
        num++
      }
    }
  })
})

describe('findDuplicateValues', () => {
  const originalA = ['c', 'b', 'a', 'f', 'c', 'b', 'c', 'd', 'f', 'e', 'f']
  const originalB = ['a', 'c', 'b', 'b', 'c', 'f', 'c', 'd', 'f', 'e', 'f']

  it('ベーシックケース', async () => {
    const array = [...originalA]
    const actual = findDuplicateValues(array)

    expect(actual).toMatchObject([
      { value: 'c', index: 0, first: true, last: false, removed: false },
      { value: 'b', index: 1, first: true, last: false, removed: false },
      { value: 'f', index: 3, first: true, last: false, removed: false },
      { value: 'c', index: 4, first: false, last: false, removed: false },
      { value: 'b', index: 5, first: false, last: true, removed: false },
      { value: 'c', index: 6, first: false, last: true, removed: false },
      { value: 'f', index: 8, first: false, last: false, removed: false },
      { value: 'f', index: 10, first: false, last: true, removed: false },
    ])
  })

  it('先頭の重複を削除', async () => {
    const array = [...originalA]
    const actual = findDuplicateValues(array)

    actual[0].remove()

    expect(actual).toMatchObject([
      { value: 'c', index: 0, first: true, last: false, removed: true }, // 削除された
      { value: 'b', index: 1 - 1, first: true, last: false, removed: false },
      { value: 'f', index: 3 - 1, first: true, last: false, removed: false },
      { value: 'c', index: 4 - 1, first: false, last: false, removed: false },
      { value: 'b', index: 5 - 1, first: false, last: true, removed: false },
      { value: 'c', index: 6 - 1, first: false, last: true, removed: false },
      { value: 'f', index: 8 - 1, first: false, last: false, removed: false },
      { value: 'f', index: 10 - 1, first: false, last: true, removed: false },
    ])

    expect(array).toEqual(['b', 'a', 'f', 'c', 'b', 'c', 'd', 'f', 'e', 'f'])
  })

  it('中間の重複を削除', async () => {
    const array = [...originalA]
    const actual = findDuplicateValues(array)

    actual[2].remove()

    expect(actual).toMatchObject([
      { value: 'c', index: 0, first: true, last: false, removed: false },
      { value: 'b', index: 1, first: true, last: false, removed: false },
      { value: 'f', index: 3, first: true, last: false, removed: true }, // 削除された
      { value: 'c', index: 4 - 1, first: false, last: false, removed: false },
      { value: 'b', index: 5 - 1, first: false, last: true, removed: false },
      { value: 'c', index: 6 - 1, first: false, last: true, removed: false },
      { value: 'f', index: 8 - 1, first: false, last: false, removed: false },
      { value: 'f', index: 10 - 1, first: false, last: true, removed: false },
    ])

    expect(array).toEqual(['c', 'b', 'a', 'c', 'b', 'c', 'd', 'f', 'e', 'f'])
  })

  it('最後尾の重複を削除', async () => {
    const array = [...originalA]
    const actual = findDuplicateValues(array)

    actual[7].remove()

    expect(actual).toMatchObject([
      { value: 'c', index: 0, first: true, last: false, removed: false },
      { value: 'b', index: 1, first: true, last: false, removed: false },
      { value: 'f', index: 3, first: true, last: false, removed: false },
      { value: 'c', index: 4, first: false, last: false, removed: false },
      { value: 'b', index: 5, first: false, last: true, removed: false },
      { value: 'c', index: 6, first: false, last: true, removed: false },
      { value: 'f', index: 8, first: false, last: false, removed: false },
      { value: 'f', index: 10, first: false, last: true, removed: true }, // 削除された
    ])

    expect(array).toEqual(['c', 'b', 'a', 'f', 'c', 'b', 'c', 'd', 'f', 'e'])
  })

  it('先頭の重複は残し、他の重複は全て削除', async () => {
    const array = [...originalA]
    const duplicates = findDuplicateValues(array)

    duplicates.forEach(item => !item.last && item.remove())

    expect(array).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })

  it('最後尾の重複は残し、他の重複は全て削除', async () => {
    const array = [...originalB]
    const duplicates = findDuplicateValues(array)

    duplicates.forEach(item => !item.last && item.remove())

    expect(array).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })
})

describe('findDuplicateItems', () => {
  const originalA = [
    { id: 0, str: 'c' },
    { id: 1, str: 'b' },
    { id: 2, str: 'a' }, // 重複なし
    { id: 3, str: 'f' },
    { id: 4, str: 'c' },
    { id: 5, str: 'b' },
    { id: 6, str: 'c' },
    { id: 7, str: 'd' }, // 重複なし
    { id: 8, str: 'f' },
    { id: 9, str: 'e' }, // 重複なし
    { id: 10, str: 'f' },
  ]

  const originalB = [
    { id: 0, str: 'a' }, // 重複なし
    { id: 1, str: 'c' },
    { id: 2, str: 'b' },
    { id: 3, str: 'b' },
    { id: 4, str: 'c' },
    { id: 5, str: 'f' },
    { id: 6, str: 'c' },
    { id: 7, str: 'd' }, // 重複なし
    { id: 8, str: 'f' },
    { id: 9, str: 'e' }, // 重複なし
    { id: 10, str: 'f' },
  ]

  it('ベーシックケース', async () => {
    const array = [...originalA]
    const actual = findDuplicateItems(array, 'str')

    expect(actual).toMatchObject([
      { value: { id: 0, str: 'c' }, index: 0, first: true, last: false, removed: false },
      { value: { id: 1, str: 'b' }, index: 1, first: true, last: false, removed: false },
      { value: { id: 3, str: 'f' }, index: 3, first: true, last: false, removed: false },
      { value: { id: 4, str: 'c' }, index: 4, first: false, last: false, removed: false },
      { value: { id: 5, str: 'b' }, index: 5, first: false, last: true, removed: false },
      { value: { id: 6, str: 'c' }, index: 6, first: false, last: true, removed: false },
      { value: { id: 8, str: 'f' }, index: 8, first: false, last: false, removed: false },
      { value: { id: 10, str: 'f' }, index: 10, first: false, last: true, removed: false },
    ])
  })

  it('先頭の重複を削除', async () => {
    const array = [...originalA]
    const actual = findDuplicateItems(array, 'str')

    // インデックス0番目の要素を削除
    actual[0].remove()

    expect(actual).toMatchObject([
      { value: { id: 0, str: 'c' }, index: 0, first: true, last: false, removed: true }, // 削除された
      { value: { id: 1, str: 'b' }, index: 1 - 1, first: true, last: false, removed: false },
      { value: { id: 3, str: 'f' }, index: 3 - 1, first: true, last: false, removed: false },
      { value: { id: 4, str: 'c' }, index: 4 - 1, first: false, last: false, removed: false },
      { value: { id: 5, str: 'b' }, index: 5 - 1, first: false, last: true, removed: false },
      { value: { id: 6, str: 'c' }, index: 6 - 1, first: false, last: true, removed: false },
      { value: { id: 8, str: 'f' }, index: 8 - 1, first: false, last: false, removed: false },
      { value: { id: 10, str: 'f' }, index: 10 - 1, first: false, last: true, removed: false },
    ])

    expect(array).toEqual([
      { id: 1, str: 'b' },
      { id: 2, str: 'a' },
      { id: 3, str: 'f' },
      { id: 4, str: 'c' },
      { id: 5, str: 'b' },
      { id: 6, str: 'c' },
      { id: 7, str: 'd' },
      { id: 8, str: 'f' },
      { id: 9, str: 'e' },
      { id: 10, str: 'f' },
    ])
  })

  it('中間の重複を削除', async () => {
    const array = [...originalA]
    const actual = findDuplicateItems(array, 'str')

    // インデックス2番目の要素を削除
    actual[2].remove()

    expect(actual).toMatchObject([
      { value: { id: 0, str: 'c' }, index: 0, first: true, last: false, removed: false },
      { value: { id: 1, str: 'b' }, index: 1, first: true, last: false, removed: false },
      { value: { id: 3, str: 'f' }, index: 3, first: true, last: false, removed: true }, // <- 削除された
      { value: { id: 4, str: 'c' }, index: 4 - 1, first: false, last: false, removed: false },
      { value: { id: 5, str: 'b' }, index: 5 - 1, first: false, last: true, removed: false },
      { value: { id: 6, str: 'c' }, index: 6 - 1, first: false, last: true, removed: false },
      { value: { id: 8, str: 'f' }, index: 8 - 1, first: false, last: false, removed: false },
      { value: { id: 10, str: 'f' }, index: 10 - 1, first: false, last: true, removed: false },
    ])

    expect(array).toEqual([
      { id: 0, str: 'c' },
      { id: 1, str: 'b' },
      { id: 2, str: 'a' },
      // { id: 3, str: 'f' }, <- 削除された
      { id: 4, str: 'c' },
      { id: 5, str: 'b' },
      { id: 6, str: 'c' },
      { id: 7, str: 'd' },
      { id: 8, str: 'f' },
      { id: 9, str: 'e' },
      { id: 10, str: 'f' },
    ])
  })

  it('最後尾の重複を削除', async () => {
    const array = [...originalA]
    const actual = findDuplicateItems(array, 'str')

    // インデックス7番目の要素を削除
    actual[7].remove()

    expect(actual).toMatchObject([
      { value: { id: 0, str: 'c' }, index: 0, first: true, last: false, removed: false },
      { value: { id: 1, str: 'b' }, index: 1, first: true, last: false, removed: false },
      { value: { id: 3, str: 'f' }, index: 3, first: true, last: false, removed: false },
      { value: { id: 4, str: 'c' }, index: 4, first: false, last: false, removed: false },
      { value: { id: 5, str: 'b' }, index: 5, first: false, last: true, removed: false },
      { value: { id: 6, str: 'c' }, index: 6, first: false, last: true, removed: false },
      { value: { id: 8, str: 'f' }, index: 8, first: false, last: false, removed: false },
      { value: { id: 10, str: 'f' }, index: 10, first: false, last: true, removed: true }, // <- 削除された
    ])

    expect(array).toEqual([
      { id: 0, str: 'c' },
      { id: 1, str: 'b' },
      { id: 2, str: 'a' },
      { id: 3, str: 'f' },
      { id: 4, str: 'c' },
      { id: 5, str: 'b' },
      { id: 6, str: 'c' },
      { id: 7, str: 'd' },
      { id: 8, str: 'f' },
      { id: 9, str: 'e' },
      // { id: 10, str: 'f' }, <- 削除された
    ])
  })

  it('先頭の重複は残し、他の重複は全て削除', async () => {
    const array = [...originalA]
    const duplicates = findDuplicateItems(array, 'str')

    // 先頭の重複は残し、他の重複は全て削除
    duplicates.forEach(item => !item.last && item.remove())

    expect(array).toEqual([
      { id: 2, str: 'a' },
      { id: 5, str: 'b' },
      { id: 6, str: 'c' },
      { id: 7, str: 'd' },
      { id: 9, str: 'e' },
      { id: 10, str: 'f' },
    ])
  })

  it('最後尾の重複は残し、他の重複は全て削除', async () => {
    const array = [...originalB]
    const duplicates = findDuplicateItems(array, 'str')

    // 最後尾の重複は残し、他の重複は全て削除
    duplicates.forEach(item => !item.last && item.remove())

    expect(array).toEqual([
      { id: 0, str: 'a' },
      { id: 3, str: 'b' },
      { id: 6, str: 'c' },
      { id: 7, str: 'd' },
      { id: 9, str: 'e' },
      { id: 10, str: 'f' },
    ])
  })
})

describe('assertNonNullable', () => {
  it('nullの場合', async () => {
    let actual!: Error
    try {
      assertNonNullable(null)
    } catch (err: any) {
      actual = err
    }

    expect(actual.message).toBe(`Expected \`value\` to be defined, but received ${null}`)
  })

  it('undefinedの場合', async () => {
    let actual!: Error
    try {
      assertNonNullable(undefined)
    } catch (err: any) {
      actual = err
    }

    expect(actual.message).toBe(`Expected \`value\` to be defined, but received ${undefined}`)
  })

  it('空文字の場合', async () => {
    const value = ''
    assertNonNullable(value)
    expect(value).toBe('')
  })

  it('空オブジェクトの場合', async () => {
    const value = {}
    assertNonNullable(value)
    expect(value).toEqual({})
  })

  it('nullまたはundefined以外の場合', async () => {
    const value = {
      name: 'John Doe',
    } as { name: string; age: number } | undefined

    assertNonNullable(value)
    // `assertNonNullable()`を実行することで`value`が`null`または`undefined`でないことが確定するため、
    // `value.name`と記述してもエラーが発生しなくなる
    expect(value.name).toBe('John Doe')
  })
})

describe('nonNullable', () => {
  it('nullの場合', async () => {
    const actual = nonNullable(null)
    expect(actual).toBeFalsy()
  })

  it('undefinedの場合', async () => {
    const actual = nonNullable(undefined)
    expect(actual).toBeFalsy()
  })

  it('空文字の場合', async () => {
    const actual = nonNullable('')
    expect(actual).toBeTruthy()
  })

  it('空オブジェクトの場合', async () => {
    const actual = nonNullable({})
    expect(actual).toBeTruthy()
  })

  it('nullまたはundefined以外の場合', async () => {
    const actual = nonNullable('abc')
    expect(actual).toBeTruthy()
  })
})

describe('notEmpty', () => {
  it('nullの場合', async () => {
    const actual = notEmpty(null)
    expect(actual).toBeFalsy()
  })

  it('undefinedの場合', async () => {
    const actual = notEmpty(undefined)
    expect(actual).toBeFalsy()
  })

  it('空文字の場合', async () => {
    const actual = notEmpty('')
    expect(actual).toBeFalsy()
  })

  it('空オブジェクトの場合', async () => {
    const actual = notEmpty({})
    expect(actual).toBeFalsy()
  })

  it('nullまたはundefined以外の場合', async () => {
    const actual = notEmpty('abc')
    expect(actual).toBeTruthy()
  })
})

describe('isImplemented', () => {
  interface Person {
    first: string
    last: string
    fullName(): string
  }

  it('ベーシックケース', async () => {
    const first = 'Taro'
    const last = 'Yamada'
    const person = {
      first,
      last,
      fullName: () => `${first} ${last}`,
      age: 18,
    }

    const actual = isImplemented<Person, typeof person>(person)

    expect(actual.age).toBe(18)
  })

  it('実装漏れがある場合', async () => {
    const first = 'Taro'
    const last = 'Yamada'
    const person = {
      first,
      last,
      age: 18,
    }

    // コメントアウトすると「`fullName`が未実装」というコンパイルエラーが出る
    // isImplemented<Person>(person)
  })
})

describe('sleep', () => {
  it('ベーシックケース', async () => {
    const startTime = performance.now()
    await sleep(1000)
    const endTime = performance.now()
    expect(Math.ceil(endTime - startTime)).toBeGreaterThanOrEqual(1000)
  })
})

describe('Version', () => {
  it('ベーシックケース - 1', async () => {
    // otherの方が3桁目が大きい
    const self = new Version('1.2.3')
    const other = new Version('1.2.30.1')

    const actual = self.lessThanOrEqual(other)

    expect(actual).toBeTruthy()
  })

  it('ベーシックケース - 2', async () => {
    // selfの方が3桁目が大きい
    const self = new Version('1.2.300.001')
    const other = new Version('1.2.3.999.888.777')

    const actual = self.lessThanOrEqual(other)

    expect(actual).toBeFalsy()
  })

  it('ベーシックケース - 3', async () => {
    // 桁数は違うが同じバージョン
    const self = new Version('1.2.3.0.0.0')
    const other = new Version('1.2.3')

    const actual = self.lessThanOrEqual(other)

    expect(actual).toBeTruthy()
  })

  it('バージョンにVersionオブジェクトを指定', async () => {
    // 桁数は違うが同じバージョン
    const self = new Version('1.2.3')
    const other = new Version('1.2.4')

    const actual = self.lessThanOrEqual(other)

    expect(actual).toBeTruthy()
  })

  it('バージョンに文字列を指定', async () => {
    // 桁数は違うが同じバージョン
    const self = new Version('1.2.3')
    const other = '1.2.4'

    const actual = self.lessThanOrEqual(other)

    expect(actual).toBeTruthy()
  })

  describe('equal', () => {
    it('自身が相手より小さい場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.4')

      const actual = self.equal(other)

      expect(actual).toBeFalsy()
    })

    it('自身が相手より大きい場合', async () => {
      const self = new Version('1.2.4')
      const other = new Version('1.2.3')

      const actual = self.equal(other)

      expect(actual).toBeFalsy()
    })

    it('自身と相手が同じ場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.3')

      const actual = self.equal(other)

      expect(actual).toBeTruthy()
    })
  })

  describe('lessThan', () => {
    it('自身が相手より小さい場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.4')

      const actual = self.lessThan(other)

      expect(actual).toBeTruthy()
    })

    it('自身が相手より大きい場合', async () => {
      const self = new Version('1.2.4')
      const other = new Version('1.2.3')

      const actual = self.lessThan(other)

      expect(actual).toBeFalsy()
    })

    it('自身と相手が同じ場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.3')

      const actual = self.lessThan(other)

      expect(actual).toBeFalsy()
    })
  })

  describe('lessThanOrEqual', () => {
    it('自身が相手より小さい場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.4')

      const actual = self.lessThanOrEqual(other)

      expect(actual).toBeTruthy()
    })

    it('自身が相手より大きい場合', async () => {
      const self = new Version('1.2.4')
      const other = new Version('1.2.3')

      const actual = self.lessThanOrEqual(other)

      expect(actual).toBeFalsy()
    })

    it('自身と相手が同じ場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.3')

      const actual = self.lessThanOrEqual(other)

      expect(actual).toBeTruthy()
    })
  })

  describe('greaterThan', () => {
    it('自身が相手より小さい場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.4')

      const actual = self.greaterThan(other)

      expect(actual).toBeFalsy()
    })

    it('自身が相手より大きい場合', async () => {
      const self = new Version('1.2.4')
      const other = new Version('1.2.3')

      const actual = self.greaterThan(other)

      expect(actual).toBeTruthy()
    })

    it('自身と相手が同じ場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.3')

      const actual = self.greaterThan(other)

      expect(actual).toBeFalsy()
    })
  })

  describe('greaterThanOrEqual', () => {
    it('自身が相手より小さい場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.4')

      const actual = self.greaterThanOrEqual(other)

      expect(actual).toBeFalsy()
    })

    it('自身が相手より大きい場合', async () => {
      const self = new Version('1.2.4')
      const other = new Version('1.2.3')

      const actual = self.greaterThanOrEqual(other)

      expect(actual).toBeTruthy()
    })

    it('自身と相手が同じ場合', async () => {
      const self = new Version('1.2.3')
      const other = new Version('1.2.3')

      const actual = self.greaterThanOrEqual(other)

      expect(actual).toBeTruthy()
    })
  })
})

describe('runWhenReady', () => {
  it('ベーシックケース', async () => {
    let counter = 1
    const actual = await runWhenReady(
      // `counter`が10以上になったら準備完了とする
      () => ++counter >= 10,
      // 準備が整ったあかつきとして999を返す
      () => 999,
      { interval: 10, timeout: 100 }
    )

    expect(actual).toBe(999)
  })

  it('isReady()が即時実行されることを検証', async () => {
    const startTime = performance.now()

    const actual = await runWhenReady(
      () => true,
      async () => 999,
      { interval: 100 }
    )

    const endTime = performance.now()

    expect(actual).toBe(999)
    // `interval`に100msが設定されているが、isReady()の初回は即時実行されるので、
    // 待ち時間はない。このため処理は100msより早く終わる。
    expect(Math.ceil(endTime - startTime)).toBeLessThan(100)
  })

  it('readyFunc()が非同期だった場合', async () => {
    const startTime = performance.now()

    const actual = await runWhenReady(
      () => true,
      async () => {
        await sleep(1000) // 1秒待機
        return 999
      },
      { interval: 10, timeout: 100 }
    )

    const endTime = performance.now()

    expect(actual).toBe(999)
    // readyFunc()は非同期で実行時間は1秒かかるはずなので、その検証
    expect(endTime - startTime).toBeGreaterThan(1000)
  })

  it('準備が整わなかった場合', async () => {
    let counter = 1
    const actual = await runWhenReady(
      () => ++counter >= 10,
      () => 999,
      // 準備が整うことがない設定をする
      // ※1ms以内に準備が整う必要がある
      { interval: 10, timeout: 1 }
    )

    // 準備が整わないので、結果としてundefinedが取得される
    expect(actual).toBeUndefined()
  })
})

namespace Boo {
  export function newInstance() {
    // greetはサブクラスでオーバーライドされることを想定するので、
    // extensionMethodで拡張可能な状態にしておく。
    const greet = extensibleMethod<(str: string) => string>(str => {
      return `${str} Boo`
    })

    return { greet }
  }
}

namespace Foo {
  export function newInstance() {
    const base = Boo.newInstance()

    // greetはさらにサブクラスでオーバーライドされるのを想定しているので、
    // extensionMethodで拡張可能な状態にしておく。
    const greet = (base.greet.body = extensibleMethod(str => {
      return `${base.greet.super(str)}, ${str} Foo`
    }))

    // base.greetを上書きするために本クラスで作成したgreetを設定している
    return { ...base, greet }
  }
}

namespace Woo {
  export function newInstance() {
    const base = Foo.newInstance()

    base.greet.body = str => {
      return `${base.greet.super(str)}, ${str} Woo`
    }

    return { ...base }
  }
}

describe('extensibleMethod', () => {
  it('ベーシックケース', async () => {
    const woo = Woo.newInstance()

    const actual = woo.greet('Hi')

    expect(actual).toBe('Hi Boo, Hi Foo, Hi Woo')
  })
})

describe('convertObject', () => {
  interface APIUser {
    first_name: string
    last_name: string
    age: string
    birthday: string
    phone_numbers: string[]
    physical: { height: string; weight: string; sitting_height: string }
  }

  interface User {
    firstName: string
    lastName: string
    age: number
    birthday: Dayjs
    phoneNumbers: string[]
    physical: { height: number; weight: number; sittingHeight: number }
  }

  it('ベーシックケース - オブジェクト', () => {
    const user: APIUser = {
      first_name: 'taro',
      last_name: 'yamada',
      age: '18',
      birthday: '2000-01-01T00:00:00.000Z',
      phone_numbers: ['03-1234-5678', '090-1234-5678'],
      physical: { height: '170', weight: '60', sitting_height: '90' },
    }

    const actual = convertObject<typeof user, User>(user, {
      convertor: (key, value) => {
        if (key === 'age') return { key: snakeToCamel(key), value: Number(value) }
        if (key === 'birthday') return { key: snakeToCamel(key), value: dayjs(value) }
        if (key === 'physical') {
          type APIPhysical = APIUser['physical']
          return {
            key: snakeToCamel(key),
            value: convertObject<APIPhysical>(value, {
              convertor: (key, value) => {
                if (key === 'height') return { key: snakeToCamel(key), value: Number(value) }
                if (key === 'weight') return { key: snakeToCamel(key), value: Number(value) }
                if (key === 'sitting_height') return { key: snakeToCamel(key), value: Number(value) }
                return { key: snakeToCamel(key), value }
              },
            }),
          }
        }
        return { key: snakeToCamel(key), value }
      },
      // `value`にネストしたオブジェクトを指定し、かつ`convertor`を指定する場合は、
      // 基本的に`deep: false`を指定
      deep: false,
    })

    expect<User>(actual).toEqual<User>({
      firstName: 'taro',
      lastName: 'yamada',
      age: 18,
      birthday: dayjs('2000-01-01T00:00:00.000Z'),
      phoneNumbers: ['03-1234-5678', '090-1234-5678'],
      physical: { height: 170, weight: 60, sittingHeight: 90 },
    })
  })

  it('ベーシックケース - 配列', () => {
    const user1: APIUser = {
      first_name: 'taro',
      last_name: 'yamada',
      age: '18',
      birthday: '2000-01-01T00:00:00.000Z',
      phone_numbers: ['03-1234-5678', '090-1234-5678'],
      physical: { height: '170', weight: '60', sitting_height: '90' },
    }
    const user2: APIUser = {
      first_name: 'hanako',
      last_name: 'yamada',
      age: '20',
      birthday: '1998-01-01T00:00:00.000Z',
      phone_numbers: ['03-8765-4321', '090-8765-4321'],
      physical: { height: '160', weight: '50', sitting_height: '85' },
    }
    const users = [user1, user2]

    const actual = convertObject<typeof users, User[]>(users, {
      convertor: (key, value) => {
        if (key === 'age') return { key: snakeToCamel(key), value: Number(value) }
        if (key === 'birthday') return { key: snakeToCamel(key), value: dayjs(value) }
        if (key === 'physical') {
          type APIPhysical = APIUser['physical']
          return {
            key: snakeToCamel(key),
            value: convertObject<APIPhysical>(value, {
              convertor: (key, value) => {
                if (key === 'height') return { key: snakeToCamel(key), value: Number(value) }
                if (key === 'weight') return { key: snakeToCamel(key), value: Number(value) }
                if (key === 'sitting_height') return { key: snakeToCamel(key), value: Number(value) }
                return { key: snakeToCamel(key), value }
              },
            }),
          }
        }
        return { key: snakeToCamel(key), value }
      },
      // `value`にネストしたオブジェクトを指定し、かつ`convertor`を指定する場合は、
      // 基本的に`deep: false`を指定
      deep: false,
    })

    expect<User[]>(actual).toEqual<User[]>([
      {
        firstName: 'taro',
        lastName: 'yamada',
        age: 18,
        birthday: dayjs('2000-01-01T00:00:00.000Z'),
        phoneNumbers: ['03-1234-5678', '090-1234-5678'],
        physical: { height: 170, weight: 60, sittingHeight: 90 },
      },
      {
        firstName: 'hanako',
        lastName: 'yamada',
        age: 20,
        birthday: dayjs('1998-01-01T00:00:00.000Z'),
        phoneNumbers: ['03-8765-4321', '090-8765-4321'],
        physical: { height: 160, weight: 50, sittingHeight: 85 },
      },
    ])
  })

  it('`deep: false`の場合', () => {
    const user: APIUser = {
      first_name: 'taro',
      last_name: 'yamada',
      age: '18',
      birthday: '2000-01-01T00:00:00.000Z',
      phone_numbers: ['03-1234-5678', '090-1234-5678'],
      physical: { height: '170', weight: '60', sitting_height: '90' },
    }

    // 単純にキーをキャメルケース変換する
    const actual = convertObject<typeof user>(user, {
      convertor: (key, value) => {
        return { key: snakeToCamel(key), value }
      },
      deep: false, // ネストして変換しない
    })

    expect(actual).toEqual({
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      birthday: user.birthday,
      phoneNumbers: user.phone_numbers,
      // `deep: false`なので、オブジェクトはネストして変換されない
      physical: {
        height: user.physical.height,
        weight: user.physical.weight,
        sitting_height: user.physical.sitting_height,
      },
    })
  })

  it('`deep: true`の場合', () => {
    const user: APIUser = {
      first_name: 'taro',
      last_name: 'yamada',
      age: '18',
      birthday: '2000-01-01T00:00:00.000Z',
      phone_numbers: ['03-1234-5678', '090-1234-5678'],
      physical: { height: '170', weight: '60', sitting_height: '90' },
    }

    // 単純にキーをキャメルケース変換する
    const actual = convertObject<typeof user>(user, {
      convertor: (key, value) => {
        return { key: snakeToCamel(key), value }
      },
      deep: true, // ネストして変換する (デフォルト)
    })

    expect(actual).toEqual({
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      birthday: user.birthday,
      phoneNumbers: user.phone_numbers,
      // `deep: true`なので、オブジェクトはネストして変換される
      physical: {
        height: user.physical.height,
        weight: user.physical.weight,
        sittingHeight: user.physical.sitting_height,
      },
    })
  })

  it('ビルトインオブジェクトを指定した場合', () => {
    type Item = {
      dateValue: Date
      errorValue: Error
      regexpValue: RegExp
      dayjsValue: Dayjs
    }

    const item = {
      date_value: new Date(),
      error_value: new Error(''),
      regexp_value: new RegExp(''),
      dayjs_value: dayjs(),
    }

    const actual = convertObject<typeof item, Item>(item, {
      convertor: (key, value) => {
        return { key: snakeToCamel(key), value }
      },
    })

    // ビルトインオブジェクト内のキーはキャメルケースに変換されない想定
    expect<Item>(actual).toEqual(<typeof actual>{
      dateValue: item.date_value,
      errorValue: item.error_value,
      regexpValue: item.regexp_value,
      dayjsValue: item.dayjs_value,
    })
  })
})

describe('keysToCamel', () => {
  interface APIUser {
    first_name: string
    last_name: string
    age: string
    birthday: string
    phone_numbers: string[]
    physical: { height: string; weight: string; sitting_height: string }
  }

  interface User {
    firstName: string
    lastName: string
    age: number
    birthday: Dayjs
    phoneNumbers: string[]
    physical: { height: number; weight: number; sittingHeight: number }
  }

  it('ベーシックケース', () => {
    const user: APIUser = {
      first_name: 'taro',
      last_name: 'yamada',
      age: '18',
      birthday: '2000-01-01T00:00:00.000Z',
      phone_numbers: ['03-1234-5678', '090-1234-5678'],
      physical: { height: '170', weight: '60', sitting_height: '90' },
    }

    const actual = keysToCamel<typeof user, User>(user, {
      convertor: (key, value) => {
        if (key === 'age') return Number(value)
        if (key === 'birthday') return dayjs(value)
        if (key === 'physical') {
          type APIPhysical = APIUser['physical']
          return keysToCamel<APIPhysical>(value, {
            convertor: (key, value) => {
              if (key === 'height') return Number(value)
              if (key === 'weight') return Number(value)
              if (key === 'sitting_height') return Number(value)
              return value
            },
          })
        }
        return value
      },
      // `value`にネストしたオブジェクトを指定し、かつ`convertor`を指定する場合は、
      // 基本的に`deep: false`を指定
      deep: false,
    })

    expect<User>(actual).toEqual<User>({
      firstName: 'taro',
      lastName: 'yamada',
      age: 18,
      birthday: dayjs('2000-01-01T00:00:00.000Z'),
      phoneNumbers: ['03-1234-5678', '090-1234-5678'],
      physical: { height: 170, weight: 60, sittingHeight: 90 },
    })
  })

  describe('`convertor`を指定しない場合', () => {
    it('`deep: false`の場合', () => {
      const user: APIUser = {
        first_name: 'taro',
        last_name: 'yamada',
        age: '18',
        birthday: '2000-01-01T00:00:00.000Z',
        phone_numbers: ['03-1234-5678', '090-1234-5678'],
        physical: { height: '170', weight: '60', sitting_height: '90' },
      }

      // 単純にキーをキャメルケース変換する
      const actual = keysToCamel<typeof user>(user, {
        deep: false, // ネストして変換しない
      })

      expect(actual).toEqual({
        firstName: user.first_name,
        lastName: user.last_name,
        age: user.age,
        birthday: user.birthday,
        phoneNumbers: user.phone_numbers,
        // `deep: false`なので、オブジェクトはネストして変換されない
        physical: {
          height: user.physical.height,
          weight: user.physical.weight,
          // キャメルケースに変換されていないことに注目
          sitting_height: user.physical.sitting_height,
        },
      })
    })

    it('`deep: true`の場合', () => {
      type User = KeysToCamel<APIUser>

      const user: APIUser = {
        first_name: 'taro',
        last_name: 'yamada',
        age: '18',
        birthday: '2000-01-01T00:00:00.000Z',
        phone_numbers: ['03-1234-5678', '090-1234-5678'],
        physical: { height: '170', weight: '60', sitting_height: '90' },
      }

      // 単純にキーをキャメルケース変換する
      const actual = keysToCamel<typeof user, User>(user, {
        deep: true, // ネストして変換する (デフォルト)
      })

      expect<User>(actual).toEqual<User>({
        firstName: user.first_name,
        lastName: user.last_name,
        age: user.age,
        birthday: user.birthday,
        phoneNumbers: user.phone_numbers,
        // `deep: true`なので、オブジェクトはネストして変換される
        physical: {
          height: user.physical.height,
          weight: user.physical.weight,
          sittingHeight: user.physical.sitting_height,
        },
      })
    })
  })
})

describe('keysToSnake', () => {
  interface APIUser {
    first_name: string
    last_name: string
    age: string
    birthday: string
    phone_numbers: string[]
    physical: { height: string; weight: string; sitting_height: string }
  }

  interface User {
    firstName: string
    lastName: string
    age: number
    birthday: Dayjs
    phoneNumbers: string[]
    physical: { height: number; weight: number; sittingHeight: number }
  }

  it('ベーシックケース', () => {
    const user: User = {
      firstName: 'taro',
      lastName: 'yamada',
      age: 18,
      birthday: dayjs('2000-01-01T00:00:00.000Z'),
      phoneNumbers: ['03-1234-5678', '090-1234-5678'],
      physical: { height: 170, weight: 60, sittingHeight: 90 },
    }

    const actual = keysToSnake<typeof user, APIUser>(user, {
      convertor: (key, value) => {
        if (key === 'age') return value.toString()
        if (key === 'birthday') return value.toISOString()
        if (key === 'physical') {
          type Physical = User['physical']
          return keysToSnake<Physical>(value, {
            convertor: (key, value) => {
              if (key === 'height') return value.toString()
              if (key === 'weight') return value.toString()
              if (key === 'sittingHeight') return value.toString()
              return value
            },
          })
        }
        return value
      },
      // `value`にネストしたオブジェクトを指定し、かつ`convertor`を指定する場合は、
      // 基本的に`deep: false`を指定
      deep: false,
    })

    expect<APIUser>(actual).toEqual<APIUser>({
      first_name: 'taro',
      last_name: 'yamada',
      age: '18',
      birthday: '2000-01-01T00:00:00.000Z',
      phone_numbers: ['03-1234-5678', '090-1234-5678'],
      physical: { height: '170', weight: '60', sitting_height: '90' },
    })
  })

  describe('`convertor`を指定しない場合', () => {
    it('`deep: false`の場合', () => {
      const user: User = {
        firstName: 'taro',
        lastName: 'yamada',
        age: 18,
        birthday: dayjs('2000-01-01T00:00:00.000Z'),
        phoneNumbers: ['03-1234-5678', '090-1234-5678'],
        physical: { height: 170, weight: 60, sittingHeight: 90 },
      }

      // 単純にキーをスネークケース変換する
      const actual = keysToSnake<typeof user>(user, {
        deep: false, // ネストして変換しない
      })

      expect(actual).toEqual({
        first_name: user.firstName,
        last_name: user.lastName,
        age: user.age,
        birthday: user.birthday,
        phone_numbers: user.phoneNumbers,
        // `deep: false`なので、オブジェクトはネストして変換されない
        physical: {
          height: user.physical.height,
          weight: user.physical.weight,
          // スネークケースに変換されていないことに注目
          sittingHeight: user.physical.sittingHeight,
        },
      })
    })

    it('`deep: true`の場合', () => {
      type APIUser = KeysToSnake<User>

      const user: User = {
        firstName: 'taro',
        lastName: 'yamada',
        age: 18,
        birthday: dayjs('2000-01-01T00:00:00.000Z'),
        phoneNumbers: ['03-1234-5678', '090-1234-5678'],
        physical: { height: 170, weight: 60, sittingHeight: 90 },
      }

      // 単純にキーをスネークケース変換する
      const actual = keysToSnake<typeof user, APIUser>(user, {
        deep: true, // ネストして変換する (デフォルト)
      })

      expect<APIUser>(actual).toEqual<APIUser>({
        first_name: user.firstName,
        last_name: user.lastName,
        age: user.age,
        birthday: user.birthday,
        phone_numbers: user.phoneNumbers,
        // `deep: true`なので、オブジェクトはネストして変換される
        physical: {
          height: user.physical.height,
          weight: user.physical.weight,
          sitting_height: user.physical.sittingHeight,
        },
      })
    })
  })
})
