import {
  arrayToDict,
  findDuplicateItems,
  findDuplicateValues,
  pickProps,
  removeBothEndsSlash,
  removeEndSlash,
  removeStartDirChars,
  removeStartSlash,
  sleep,
  splitArrayChunk,
  splitFilePath,
  splitHierarchicalPaths,
  summarizeFamilyPaths,
} from '../../../src'
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

    expect(actual.first).toBe('Taro')
    expect(actual.age).toBe(18)
    expect(actual.address.pref).toEqual('Ibaraki')
    expect(actual.address.city).toEqual('Tsukuba-Shi')
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
  it('ベーシックケース', async () => {
    const actual = findDuplicateValues(['aaa', 'bbb', 'aaa', 'ccc', 'ddd', 'ccc'])

    expect(actual[0]).toBe('aaa')
    expect(actual[1]).toBe('ccc')
  })
})

describe('findDuplicateItems', () => {
  interface Language {
    id: string
    name: string
  }

  it('ベーシックケース', async () => {
    const JavaScript: Language = { id: '001', name: 'JavaScript' }
    const Python: Language = { id: '002', name: 'Python' }
    const Dart: Language = { id: '003', name: 'Dart' }
    const TypeScript: Language = { id: '004', name: 'TypeScript' }
    const PHP: Language = { id: '005', name: 'PHP' }

    const languages = [JavaScript, Python, JavaScript, Dart, TypeScript, PHP, TypeScript]
    const actual = findDuplicateItems(languages, 'id')

    expect(actual[0]).toBe(JavaScript)
    expect(actual[1]).toBe(TypeScript)
  })
})

describe('sleep', () => {
  it('ベーシックケース', async () => {
    const startTime = performance.now()
    await sleep(1000)
    const endTime = performance.now()
    expect(endTime - startTime).toBeGreaterThanOrEqual(1000)
  })
})
