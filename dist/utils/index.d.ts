/**
 * パス先頭のスラッシュを除去します。
 * @param path
 */
export declare function removeStartSlash(path: string | undefined | null): string;
/**
 * パス末尾のスラッシュを除去します。
 * @param path
 */
export declare function removeEndSlash(path: string | undefined | null): string;
/**
 * パスの両端のスラッシュを除去します。
 * @param path
 */
export declare function removeBothEndsSlash(path: string | undefined | null): string;
/**
 * パスの先頭にあるディレクトリを表す文字を削除します。
 * 例: './aaa'  → 'aaa'
 *     '../aaa' → 'aaa'
 *     '/aaa'   → 'aaa'
 * @param path
 */
export declare function removeStartDirChars(path: string | undefined | null): string;
/**
 * ファイルパスをファイル名とディレクトリパスに分割します。
 * @param filePath
 */
export declare function splitFilePath(filePath: string): {
    fileName: string;
    dirPath: string;
};
/**
 * 指定されたパスを階層的に分割します。
 *
 * 例: ['d1/d11/fileA.txt', `d1/d11/fileB.txt`]が指定された場合、
 *     ['d1', 'd1/d11', 'd1/d11/fileA.txt', 'd1/d11/fileB.txt']を返します。
 *
 * @param paths
 */
export declare function splitHierarchicalPaths(...paths: (string | undefined | null)[]): string[];
/**
 * オブジェクト配列を指定されたキーの値でマップ化します。
 * @param list オブジェクト配列
 * @param key オブジェクトのキーを指定。この値がマップのキーに使用されます。
 */
export declare function arrayToDict<T>(list: T[], key: keyof T): Record<string | number, T>;
/**
 * 配列を塊に分割します。
 * @param array 分割したい配列
 * @param size 塊のアイテム数
 */
export declare function splitArrayChunk<T>(array: T[], size: number): T[][];
/**
 * 配列の中から重複した値を取得します。
 *
 * @example
 * findDuplicates(['aaa', 'bbb', 'aaa', 'ccc', 'ddd', 'ccc'])
 * // ['aaa', 'ccc']
 *
 * @param array
 */
export declare function findDuplicateValues<T>(array: T[]): T[];
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
export declare function findDuplicateItems<T, K extends keyof T>(array: T[], field: K): T[];
/**
 * 指定されたミリ秒の間スリープします。
 * @param ms
 */
export declare function sleep(ms: number): Promise<void>;
