"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * パス先頭のスラッシュを除去します。
 * @param path
 */
function removeStartSlash(path) {
    if (!path)
        return '';
    return path.replace(/^\/*/, '');
}
exports.removeStartSlash = removeStartSlash;
/**
 * パス末尾のスラッシュを除去します。
 * @param path
 */
function removeEndSlash(path) {
    if (!path)
        return '';
    return path.replace(/\/*$/, '');
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
 * パスの先頭にあるディレクトリを表す文字を削除します。
 * 例: './aaa'  → 'aaa'
 *     '../aaa' → 'aaa'
 *     '/aaa'   → 'aaa'
 * @param path
 */
function removeStartDirChars(path) {
    if (!path)
        return '';
    return path.replace(/^\.*\/*/, '');
}
exports.removeStartDirChars = removeStartDirChars;
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
/**
 * 指定されたパスを階層的に分割します。
 *
 * 例: ['d1/d11/fileA.txt', `d1/d11/fileB.txt`]が指定された場合、
 *     ['d1', 'd1/d11', 'd1/d11/fileA.txt', 'd1/d11/fileB.txt']を返します。
 *
 * @param paths
 */
function splitHierarchicalPaths(...paths) {
    const set = new Set();
    for (const dirPath of paths) {
        if (!dirPath)
            continue;
        const segments = dirPath.split('/').filter(item => !!item);
        for (let i = 0; i < segments.length; i++) {
            const currentDirPath = segments.slice(0, i + 1).join('/');
            set.add(currentDirPath);
        }
    }
    // ディレクトリ階層順にソート
    return Array.from(set).sort((a, b) => {
        return a < b ? -1 : a > b ? 1 : 0;
    });
}
exports.splitHierarchicalPaths = splitHierarchicalPaths;
/**
 * オブジェクト配列を指定されたキーの値でマップ化します。
 * @param list オブジェクト配列
 * @param key オブジェクトのキーを指定。この値がマップのキーに使用されます。
 */
function arrayToDict(list, key) {
    return list.reduce((result, item) => {
        const k = item[key];
        if (typeof k === 'string') {
            result[k] = item;
        }
        else if (typeof k === 'number') {
            result[k] = item;
        }
        return result;
    }, {});
}
exports.arrayToDict = arrayToDict;
//# sourceMappingURL=index.js.map