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
export function splitHierarchicalPaths(...paths: string[]): string[] {
  const set: Set<string> = new Set<string>()

  for (const dirPath of paths) {
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
