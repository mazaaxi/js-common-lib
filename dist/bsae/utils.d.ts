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
 * 指定されたパスの先頭にHTTPプロトコルを付与します。
 * @param path
 * @param https
 */
declare function prependHTTP(path: string, { https }?: {
    https?: boolean | undefined;
}): string;
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
 * // ]
 *
 * @param array
 * @param field
 */
declare function findDuplicateItems<T, K extends keyof T>(array: T[], field: K): DuplicateItem<T>[];
/**
 * 指定された値が`null`または`undefined`でないことをチェックします。
 * `null`または`undefined`の場合は`false`を、それ以外の場合は`true`を返します。
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
 * `OBJECT`が`INTERFACE`を実装しているか静的に検証します。
 * @param object
 */
declare function isImplemented<INTERFACE, OBJECT extends INTERFACE>(object: OBJECT): OBJECT;
/**
 * 指定されたミリ秒の間スリープします。
 * @param ms
 */
declare function sleep(ms?: number): Promise<void>;
/**
 * 配列をシャッフルします。
 * @param array
 */
declare function shuffleArray<T>(array: T[]): T[];
declare class Version {
    constructor(value: Version | string);
    /**
     * バージョン文字列です。
     */
    readonly value: string;
    /**
     * 指定されたバージョンが自身と同じかを判定します。
     * @param other
     */
    equal(other: Version | string): boolean;
    /**
     * 指定されたバージョンより自身の方が小さいかを判定します。
     * @param other
     */
    lessThan(other: Version | string): boolean;
    /**
     * 指定されたバージョンより自身の方が小さい、または同じかを判定します。
     * @param other
     */
    lessThanOrEqual(other: Version | string): boolean;
    /**
     * 指定されたバージョンより自身の方が大きいかを判定します。
     * @param other
     */
    greaterThan(other: Version | string): boolean;
    /**
     * 指定されたバージョンより自身の方が大きい、または同じかを判定します。
     * @param other
     */
    greaterThanOrEqual(other: Version | string): boolean;
    private compare;
}
/**
 * 準備が整うまで待機を行い、準備が整ったら指定の関数を実行します。
 * @param isReady
 *   準備が整ったか否かを判定する関数を指定します。この関数の初回は即時
 *   実行され、その後は`options.interval`で指定された間隔で実行されます。
 * @param readyFunc 準備が整ったら実行する関数を指定します。
 * @param options
 * - interval: isReady()を実行する間隔をミリ秒で指定します。
 *   この値を指定しないと最速(0ms)でisReady()の実行が行われます。<br>
 * - timeout: 準備が整うまでの制限時間をミリ秒で指定します。
 *   この値を指定しないと準備が整わなくてもタイムアウトしないので注意してください。
 */
declare function runWhenReady<T = undefined>(isReady: () => boolean, readyFunc: (() => T) | (() => Promise<T>), options?: {
    interval?: number;
    timeout?: number;
}): Promise<T | undefined>;
export { Version, arrayToDict, findDuplicateItems, findDuplicateValues, isImplemented, nonNullable, notEmpty, pickProps, prependHTTP, removeBothEndsSlash, removeEndSlash, removeStartDirChars, removeStartSlash, runWhenReady, shuffleArray, sleep, splitArrayChunk, splitFilePath, splitHierarchicalPaths, summarizeFamilyPaths, };
