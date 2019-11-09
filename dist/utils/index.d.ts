/**
 * パス先頭のスラッシュを除去します。
 * @param path
 */
export declare function removeStartSlash(path?: string): string;
/**
 * パス末尾のスラッシュを除去します。
 * @param path
 */
export declare function removeEndSlash(path?: string): string;
/**
 * パスの両端のスラッシュを除去します。
 * @param path
 */
export declare function removeBothEndsSlash(path?: string): string;
/**
 * ファイルパスをファイル名とディレクトリパスに分割します。
 * @param filePath
 */
export declare function splitFilePath(filePath: string): {
    fileName: string;
    dirPath: string;
};
