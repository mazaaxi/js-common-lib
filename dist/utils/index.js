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
function summarizeFamilyPaths(paths) {
    const pushMaxPathToArray = (array, newPath) => {
        for (let i = 0; i < array.length; i++) {
            const path = array[i];
            if (path.startsWith(newPath)) {
                return;
            }
            else if (newPath.startsWith(path)) {
                array[i] = newPath;
                return;
            }
        }
        array.push(newPath);
    };
    const result = [];
    for (const path of paths) {
        pushMaxPathToArray(result, path);
    }
    return result;
}
exports.summarizeFamilyPaths = summarizeFamilyPaths;
/**
 * オブジェクトから指定されたプロパテを取り出します。
 * @param obj
 * @param keys
 */
function pickProps(obj, keys) {
    const result = {};
    for (const key of keys) {
        if (typeof obj[key] === 'undefined')
            continue;
        result[key] = obj[key];
    }
    return result;
}
exports.pickProps = pickProps;
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
/**
 * 配列を塊に分割します。
 * @param array 分割したい配列
 * @param size 塊のアイテム数
 */
function splitArrayChunk(array, size) {
    return array.reduce((result, value, index) => {
        if (index % size) {
            return result;
        }
        else {
            return [...result, array.slice(index, index + size)];
        }
    }, []);
}
exports.splitArrayChunk = splitArrayChunk;
/**
 * 配列の中から重複した値を取得します。
 *
 * @example
 * findDuplicates(['aaa', 'bbb', 'aaa', 'ccc', 'ddd', 'ccc'])
 * // ['aaa', 'ccc']
 *
 * @param array
 */
function findDuplicateValues(array) {
    return array.filter((item, index) => array.indexOf(item) != index);
}
exports.findDuplicateValues = findDuplicateValues;
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
function findDuplicateItems(array, field) {
    const values = findDuplicateValues(array.map(input => input[field]));
    const result = [];
    for (const value of values) {
        const item = array.find(item => item[field] === value);
        item && result.push(item);
    }
    return result;
}
exports.findDuplicateItems = findDuplicateItems;
/**
 * 指定されたミリ秒の間スリープします。
 * @param ms
 */
async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
/**
 * 配列をシャッフルします。
 * @param array
 */
function shuffleArray(array) {
    const result = Object.assign([], array);
    for (let i = result.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = result[i];
        result[i] = result[r];
        result[r] = tmp;
    }
    return result;
}
exports.shuffleArray = shuffleArray;
//# sourceMappingURL=index.js.map