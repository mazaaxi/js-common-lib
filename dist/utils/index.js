"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * パス先頭のスラッシュを除去します。
 * @param path
 */
function removeStartSlash(path) {
    if (!path)
        return '';
    return path.replace(/^\//, '');
}
exports.removeStartSlash = removeStartSlash;
/**
 * パス末尾のスラッシュを除去します。
 * @param path
 */
function removeEndSlash(path) {
    if (!path)
        return '';
    return path.replace(/\/$/, '');
}
exports.removeEndSlash = removeEndSlash;
/**
 * パスの両端のスラッシュを除去します。
 * @param path
 */
function removeBothEndsSlash(path) {
    if (!path)
        return '';
    return removeStartSlash(removeEndSlash(path));
}
exports.removeBothEndsSlash = removeBothEndsSlash;
/**
 * ファイルパスをファイル名とディレクトリパスに分割します。
 * @param filePath
 */
function splitFilePath(filePath) {
    const segments = filePath.split('/');
    const fileName = segments[segments.length - 1];
    let dirPath = '';
    if (segments.length >= 2) {
        dirPath = segments.slice(0, segments.length - 1).join('/');
    }
    return { fileName, dirPath };
}
exports.splitFilePath = splitFilePath;
//# sourceMappingURL=index.js.map