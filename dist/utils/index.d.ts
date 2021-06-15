/**
 * パス先頭のスラッシュを除去します。
 * @param path
 */
declare function removeStartSlash(path: string | undefined | null): string;
/**
 * パス末尾のスラッシュを除去します。
 * @param path
 */
declare function removeEndSlash(path: string | undefined | null): string;
/**
 * パスの両端のスラッシュを除去します。
 * @param path
 */
declare function removeBothEndsSlash(path: string | undefined | null): string;
/**
 * パスの先頭にあるディレクトリを表す文字を削除します。
 * 例: './aaa'  → 'aaa'
 *     '../aaa' → 'aaa'
 *     '/aaa'   → 'aaa'
 * @param path
 */
declare function removeStartDirChars(path: string | undefined | null): string;
/**
 * ファイルパスをファイル名とディレクトリパスに分割します。
 * @param filePath
 */
declare function splitFilePath(filePath: string): {
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
declare function splitHierarchicalPaths(...paths: (string | undefined | null)[]): string[];
/**
 * パスリストの中でまとめられるファミリーパスをサマリーします。
 *
 * `paths`に次が指定された場合:
 *   + d1/d11
 *   + d1/d11/d111
 *   + d1/d11/d112
 *   + d2/d21
 *   + d2/d21/d211
 *
 * 結果として次のようにサマリーされます:
 *   + d1/d11/d111
 *   + d1/d11/d112
 *   + d2/d21/d211
 */
declare function summarizeFamilyPaths(paths: string[]): string[];
/**
 * オブジェクトから指定されたプロパテを取り出します。
 * @param obj 対象オブジェクト
 * @param props 取り出したいプロパティ
 * @param excludeValues 除外したいプロパティ値
 */
declare function pickProps<T, K extends keyof T>(obj: T, props: K[], excludeValues?: any[]): {
    [P in K]: T[P];
};
/**
 * オブジェクト配列を指定されたキーの値でマップ化します。
 * @param list オブジェクト配列
 * @param key オブジェクトのキーを指定。この値がマップのキーに使用されます。
 */
declare function arrayToDict<T>(list: T[], key: keyof T): Record<string | number, T>;
/**
 * 配列を塊に分割します。
 * @param array 分割したい配列
 * @param size 塊のアイテム数
 */
declare function splitArrayChunk<T>(array: T[], size: number): T[][];
declare class DuplicateItem<T> {
    constructor(container: BaseDuplicateContainer<T>, value: T, index: number);
    readonly container: BaseDuplicateContainer<T>;
    value: T;
    index: number;
    first: boolean;
    last: boolean;
    removed: boolean;
    remove(): void;
}
declare abstract class BaseDuplicateContainer<T> {
    constructor(array: T[]);
    protected array: T[];
    duplicates: DuplicateItem<T>[];
    remove(target: DuplicateItem<T>): void;
}
/**
 * 配列の中から重複した値を取得します。
 *
 * @example
 * findDuplicateValues(['a', 'b', 'c', 'a', 'd', 'c'])
 * // [
 * //   { value: 'a', index: 0, first: true, last: false, removed: false },
 * //   { value: 'c', index: 2, first: true, last: false, removed: false },
 * //   { value: 'a', index: 3, first: false, last: true, removed: false },
 * //   { value: 'c', index: 5, first: false, last: true, removed: false },
 * //]
 *
 * @param array
 */
declare function findDuplicateValues<T>(array: T[]): DuplicateItem<T>[];
/**
 * 配列アイテムの指定フィールドが重複しているアイテムを取得します。
 *
 * @example
 * findDuplicateItems([
 *   { id: 0, str: 'a' },
 *   { id: 1, str: 'b' },
 *   { id: 2, str: 'c' },
 *   { id: 3, str: 'a' },
 *   { id: 4, str: 'd' },
 *   { id: 5, str: 'c' },
 * ], 'str')
 * // [
 * //   { value: { id: 0, str: 'a' }, index: 0, first: true, last: false, removed: false },
 * //   { value: { id: 2, str: 'c' }, index: 2, first: true, last: false, removed: false },
 * //   { value: { id: 3, str: 'a' }, index: 3, first: false, last: true, removed: false },
 * //   { value: { id: 5, str: 'c' }, index: 5, first: false, last: true, removed: false },
 * //]
 *
 * @param array
 * @param field
 */
declare function findDuplicateItems<T, K extends keyof T>(array: T[], field: K): DuplicateItem<T>[];
/**
 * 指定されたミリ秒の間スリープします。
 * @param ms
 */
declare function sleep(ms?: number): Promise<void>;
/**
 * 指定された値が`null`または`undefined`でないことをチェックします。
 * `null`または`undefined`の場合`false`を、そうでない場合は`true`を返します。
 * @param value
 */
declare const nonNullable: <T>(value: T) => value is NonNullable<T>;
/**
 * 指定された値が空でないことをチェックします。
 * 以下の場合は「空」と判定し、`false`を返します。
 * - `null`または`undefined`の場合
 * - 空文字の場合
 * - 空オブジェクトの場合
 * @param value
 */
declare function notEmpty<T>(value: T): value is NonNullable<T>;
/**
 * 配列をシャッフルします。
 * @param array
 */
declare function shuffleArray<T>(array: T[]): T[];
export { arrayToDict, findDuplicateItems, findDuplicateValues, nonNullable, notEmpty, pickProps, removeBothEndsSlash, removeEndSlash, removeStartDirChars, removeStartSlash, shuffleArray, sleep, splitArrayChunk, splitFilePath, splitHierarchicalPaths, summarizeFamilyPaths, };
