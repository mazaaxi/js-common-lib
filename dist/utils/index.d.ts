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
export declare function arrayToDict<ITEM>(list: ITEM[], key: keyof ITEM): Record<string | number, ITEM>;
/**
 * 配列を塊に分割します。
 * @param array 分割したい配列
 * @param size 塊のアイテム数
 */
export declare function splitArrayChunk<T>(array: T[], size: number): T[][];
/**
 * 指定されたミリ秒の間スリープします。
 * @param ms
 */
export declare function sleep(ms: number): Promise<void>;
