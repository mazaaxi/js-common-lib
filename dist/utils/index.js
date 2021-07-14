"use strict";
//========================================================================
//
//  Implementation
//
//========================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeFamilyPaths = exports.splitHierarchicalPaths = exports.splitFilePath = exports.splitArrayChunk = exports.sleep = exports.shuffleArray = exports.removeStartSlash = exports.removeStartDirChars = exports.removeEndSlash = exports.removeBothEndsSlash = exports.pickProps = exports.notEmpty = exports.nonNullable = exports.findDuplicateValues = exports.findDuplicateItems = exports.arrayToDict = exports.Version = void 0;
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
 * @param obj 対象オブジェクト
 * @param props 取り出したいプロパティ
 * @param excludeValues 除外したいプロパティ値
 */
function pickProps(obj, props, excludeValues) {
    const result = {};
    for (const prop of props) {
        // オブジェクトに指定されたキーが存在しない場合、そのキーを無視
        if (!(prop in obj))
            continue;
        // プロパティの値を取得
        const propValue = obj[prop];
        // プロパティの値が除外リストに一致する場合、無視
        const isExclude = (excludeValues !== null && excludeValues !== void 0 ? excludeValues : []).some(excludeValue => propValue === excludeValue);
        if (isExclude)
            continue;
        // 戻り値に指定されたキーの値を設定
        result[prop] = obj[prop];
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
class DuplicateItem {
    constructor(container, value, index) {
        this.first = false;
        this.last = false;
        this.removed = false;
        this.container = container;
        this.value = value;
        this.index = index;
    }
    remove() {
        this.container.remove(this);
    }
}
class BaseDuplicateContainer {
    constructor(array) {
        this.duplicates = [];
        this.array = array;
    }
    remove(target) {
        this.array.splice(target.index, 1);
        for (const item of this.duplicates) {
            if (target.index < item.index && !item.removed) {
                item.index = item.index - 1;
            }
        }
        target.removed = true;
    }
}
class DuplicateValueContainer extends BaseDuplicateContainer {
    constructor(array) {
        super(array);
        this.array = array;
        let duplicateValues = this.array.filter((item, index) => {
            return this.array.indexOf(item) != index;
        });
        duplicateValues = Array.from(new Set(duplicateValues));
        for (const duplicateValue of duplicateValues) {
            const myDuplicates = [];
            let fromIndex = 0;
            do {
                fromIndex = this.array.indexOf(duplicateValue, fromIndex);
                if (fromIndex >= 0) {
                    const duplicateItem = new DuplicateItem(this, duplicateValue, fromIndex);
                    myDuplicates.push(duplicateItem);
                    this.duplicates.push(duplicateItem);
                    fromIndex += 1;
                }
            } while (fromIndex >= 0);
            myDuplicates[0].first = true;
            myDuplicates[myDuplicates.length - 1].last = true;
        }
        this.duplicates.sort((a, b) => {
            return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
        });
    }
}
class DuplicateItemContainer extends BaseDuplicateContainer {
    constructor(array, field) {
        super(array);
        this.array = array;
        this.field = field;
        const values = this.array.map(item => item[this.field]);
        let duplicateValues = values.filter((item, index) => {
            return values.indexOf(item) != index;
        });
        duplicateValues = Array.from(new Set(duplicateValues));
        for (const duplicateValue of duplicateValues) {
            const myDuplicates = [];
            let fromIndex = 0;
            do {
                fromIndex = this.array.findIndex((item, index) => {
                    if (index < fromIndex)
                        return false;
                    return item[this.field] === duplicateValue;
                });
                if (fromIndex >= 0) {
                    const duplicateItem = new DuplicateItem(this, this.array[fromIndex], fromIndex);
                    myDuplicates.push(duplicateItem);
                    this.duplicates.push(duplicateItem);
                    fromIndex += 1;
                }
            } while (fromIndex >= 0);
            myDuplicates[0].first = true;
            myDuplicates[myDuplicates.length - 1].last = true;
        }
        this.duplicates.sort((a, b) => {
            return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
        });
    }
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
function findDuplicateValues(array) {
    return new DuplicateValueContainer(array).duplicates;
}
exports.findDuplicateValues = findDuplicateValues;
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
function findDuplicateItems(array, field) {
    return new DuplicateItemContainer(array, field).duplicates;
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
 * 指定された値が`null`または`undefined`でないことをチェックします。
 * `null`または`undefined`の場合`false`を、そうでない場合は`true`を返します。
 * @param value
 */
const nonNullable = (value) => {
    return value !== null && value !== undefined;
};
exports.nonNullable = nonNullable;
/**
 * 指定された値が空でないことをチェックします。
 * 以下の場合は「空」と判定し、`false`を返します。
 * - `null`または`undefined`の場合
 * - 空文字の場合
 * - 空オブジェクトの場合
 * @param value
 */
function notEmpty(value) {
    if (!nonNullable(value))
        return false;
    if (typeof value === 'string') {
        return value !== '';
    }
    else if (typeof value === 'object' && !Array.isArray(value)) {
        return Object.keys(value).length > 0;
    }
    return true;
}
exports.notEmpty = notEmpty;
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
class Version {
    constructor(value) {
        this.value = typeof value === 'string' ? value : value.value;
    }
    /**
     * 指定されたバージョンが自身と同じかを判定します。
     * @param other
     */
    equal(other) {
        const compared = this.compare(other);
        return compared === 0;
    }
    /**
     * 指定されたバージョンより自身の方が小さいかを判定します。
     * @param other
     */
    lessThan(other) {
        const compared = this.compare(other);
        return compared === 0 ? false : compared === -1 ? true : false;
    }
    /**
     * 指定されたバージョンより自身の方が小さい、または同じかを判定します。
     * @param other
     */
    lessThanOrEqual(other) {
        const compared = this.compare(other);
        return compared === 0 ? true : compared === -1 ? true : false;
    }
    /**
     * 指定されたバージョンより自身の方が大きいかを判定します。
     * @param other
     */
    greaterThan(other) {
        const compared = this.compare(other);
        return compared === 0 ? false : compared === 1 ? true : false;
    }
    /**
     * 指定されたバージョンより自身の方が大きい、または同じかを判定します。
     * @param other
     */
    greaterThanOrEqual(other) {
        const compared = this.compare(other);
        return compared === 0 ? true : compared === 1 ? true : false;
    }
    compare(otherVersion) {
        function _split(value) {
            return value.split('.');
        }
        const selfArray = _split(this.value);
        const otherArray = _split(typeof otherVersion === 'string' ? otherVersion : otherVersion.value);
        const length = selfArray.length < otherArray.length ? otherArray.length : selfArray.length;
        for (let i = 0; i < length; i++) {
            const subLength = selfArray[i].length < otherArray[i].length ? otherArray[i].length : selfArray[i].length;
            if (selfArray.length < length)
                selfArray.push('');
            if (otherArray.length < length)
                otherArray.push('');
            selfArray[i] = selfArray[i].padStart(subLength, '0');
            otherArray[i] = otherArray[i].padStart(subLength, '0');
        }
        const self = BigInt(selfArray.join(''));
        const other = BigInt(otherArray.join(''));
        return self < other ? -1 : self > other ? 1 : 0;
    }
}
exports.Version = Version;
//# sourceMappingURL=index.js.map