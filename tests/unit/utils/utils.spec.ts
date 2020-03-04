import { removeBothEndsSlash, removeEndSlash, removeStartDirChars, removeStartSlash, splitFilePath } from '../../../src'

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
