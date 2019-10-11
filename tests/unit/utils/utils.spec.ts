import { removeBothEndsSlash, removeEndSlash, removeStartSlash, splitFilePath } from '../../../src/utils'

describe('removeStartSlash', () => {
  it('ベーシックケース', async () => {
    const actual = removeStartSlash('/aaa/bbb/')
    expect(actual).toBe('aaa/bbb/')
  })
})

describe('removeEndSlash', () => {
  it('ベーシックケース', async () => {
    const actual = removeEndSlash('/aaa/bbb/')
    expect(actual).toBe('/aaa/bbb')
  })
})

describe('removeBothEndsSlash', () => {
  it('ベーシックケース', async () => {
    const actual = removeBothEndsSlash('/aaa/bbb/')
    expect(actual).toBe('aaa/bbb')
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
