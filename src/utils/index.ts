/**
 * パス先頭のスラッシュを除去します。
 * @param path
 */
export function removeStartSlash(path: string | undefined | null): string {
  if (!path) return ''
  return path.replace(/^\/*/, '')
}

/**
 * パス末尾のスラッシュを除去します。
 * @param path
 */
export function removeEndSlash(path: string | undefined | null): string {
  if (!path) return ''
  return path.replace(/\/*$/, '')
}

/**
 * パスの両端のスラッシュを除去します。
 * @param path
 */
export function removeBothEndsSlash(path: string | undefined | null): string {
  if (!path) return ''
  return removeStartSlash(removeEndSlash(path))
}

/**
 * パスの先頭にあるディレクトリを表す文字を削除します。
 * 例: './aaa'  → 'aaa'
 *     '../aaa' → 'aaa'
 *     '/aaa'   → 'aaa'
 * @param path
 */
export function removeStartDirChars(path: string | undefined | null): string {
  if (!path) return ''
  return path.replace(/^\.*\/*/, '')
}

/**
 * ファイルパスをファイル名とディレクトリパスに分割します。
 * @param filePath
 */
export function splitFilePath(filePath: string): { fileName: string; dirPath: string } {
  const segments = filePath.split('/')
  const fileName = segments[segments.length - 1]
  let dirPath = ''
  if (segments.length >= 2) {
    dirPath = segments.slice(0, segments.length - 1).join('/')
  }
  return { fileName, dirPath }
}

/**
 * 指定されたパスを階層的に分割します。
 *
 * 例: ['d1/d11/fileA.txt', `d1/d11/fileB.txt`]が指定された場合、
 *     ['d1', 'd1/d11', 'd1/d11/fileA.txt', 'd1/d11/fileB.txt']を返します。
 *
 * @param paths
 */
export function splitHierarchicalPaths(...paths: (string | undefined | null)[]): string[] {
  const set: Set<string> = new Set<string>()

  for (const dirPath of paths) {
    if (!dirPath) continue
    const segments = dirPath.split('/').filter(item => !!item)
    for (let i = 0; i < segments.length; i++) {
      const currentDirPath = segments.slice(0, i + 1).join('/')
      set.add(currentDirPath)
    }
  }

  // ディレクトリ階層順にソート
  return Array.from(set).sort((a, b) => {
    return a < b ? -1 : a > b ? 1 : 0
  })
}

/**
 * オブジェクト配列を指定されたキーの値でマップ化します。
 * @param list オブジェクト配列
 * @param key オブジェクトのキーを指定。この値がマップのキーに使用されます。
 */
export function arrayToDict<T>(list: T[], key: keyof T): Record<string | number, T> {
  return list.reduce(
    (result, item) => {
      const k = item[key]
      if (typeof k === 'string') {
        result[k] = item
      } else if (typeof k === 'number') {
        result[k] = item
      }
      return result
    },
    {} as Record<string | number, any>
  )
}

/**
 * 配列を塊に分割します。
 * @param array 分割したい配列
 * @param size 塊のアイテム数
 */
export function splitArrayChunk<T>(array: T[], size: number): T[][] {
  return array.reduce<T[][]>((result, value, index) => {
    if (index % size) {
      return result
    } else {
      return [...result, array.slice(index, index + size)]
    }
  }, [])
}

/**
 * 配列の中から重複した値を取得します。
 *
 * @example
 * findDuplicates(['aaa', 'bbb', 'aaa', 'ccc', 'ddd', 'ccc'])
 * // ['aaa', 'ccc']
 *
 * @param array
 */
export function findDuplicateValues<T>(array: T[]): T[] {
  return array.filter((item, index) => array.indexOf(item) != index)
}

/**
 * 配列アイテムの指定フィールドが重複しているアイテムを取得します。
 *
 * @example
 * const JavaScript: Language = { id: '001', name: 'JavaScript' }
 * const Python: Language = { id: '002', name: 'Python' }
 * const Dart: Language = { id: '003', name: 'Dart' }
 * const TypeScript: Language = { id: '004', name: 'TypeScript' }
 * const PHP: Language = { id: '005', name: 'PHP' }
 *
 * const languages = [JavaScript, Python, JavaScript, Dart, TypeScript, PHP, TypeScript]
 * findDuplicateItems(languages, 'id')
 * // [{ id: '001', name: 'JavaScript' }, { id: '004', name: 'TypeScript' }]
 *
 * @param array
 * @param field
 */
export function findDuplicateItems<T, K extends keyof T>(array: T[], field: K): T[] {
  const values = findDuplicateValues(array.map(input => input[field]))
  const result: T[] = []
  for (const value of values) {
    const item = array.find(item => item[field] === value)
    item && result.push(item)
  }
  return result
}

/**
 * 指定されたミリ秒の間スリープします。
 * @param ms
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  }) as Promise<void>
}

/**
 * 配列をシャッフルします。
 * @param array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = Object.assign([], array)
  for (let i = result.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = result[i]
    result[i] = result[r]
    result[r] = tmp
  }
  return result
}
