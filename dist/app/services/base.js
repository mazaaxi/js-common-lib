"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUndefined = exports.toRawDate = exports.toNull = exports.toEntityDate = exports.toDeepUndefinedWithoutTyped = exports.toDeepUndefined = exports.toDeepRawDate = exports.toDeepNullWithoutTyped = exports.toDeepNull = exports.toDeepEntityDate = void 0;
const dayjs = require("dayjs");
const utils_1 = require("../../utils");
//========================================================================
//
//  Implementation
//
//========================================================================
/**
 * 指定された文字列日付型をエンティティ日付型に変換します。
 * @param rawDate
 */
function toEntityDate(rawDate) {
    if (rawDate === undefined)
        return undefined;
    if (rawDate === null)
        return null;
    return dayjs(rawDate);
}
exports.toEntityDate = toEntityDate;
/**
 * 指定されたオブジェクトの文字列日付型のプロパティをエンティティ日付型に変換します。
 * @param obj 対象オブジェクトを指定します。
 * @param props プロパティ名を指定します。
 */
function toDeepEntityDate(obj, props) {
    if (!obj)
        return obj;
    for (const prop of Object.getOwnPropertyNames(obj)) {
        const value = obj[prop];
        if (!utils_1.nonNullable(value) || dayjs.isDayjs(value))
            continue;
        if (props.includes(prop) && typeof value === 'string') {
            ;
            obj[prop] = dayjs(value);
        }
        if (Array.isArray(value)) {
            value.forEach(item => toDeepEntityDate(item, props));
        }
        else if (typeof value === 'object') {
            toDeepEntityDate(value, props);
        }
    }
    return obj;
}
exports.toDeepEntityDate = toDeepEntityDate;
/**
 * 指定されたエンティティ日付型を文字列日付型に変換します。
 * @param entityDate
 */
function toRawDate(entityDate) {
    if (entityDate === undefined)
        return undefined;
    if (entityDate === null)
        return null;
    return entityDate.toISOString();
}
exports.toRawDate = toRawDate;
/**
 * 指定されたオブジェクトのエンティティ日付型のプロパティを文字列日付型に変換します。
 * @param obj 対象オブジェクトを指定します。
 */
function toDeepRawDate(obj) {
    if (!obj)
        return obj;
    for (const prop of Object.getOwnPropertyNames(obj)) {
        const value = obj[prop];
        if (!utils_1.nonNullable(value))
            continue;
        if (dayjs.isDayjs(value)) {
            ;
            obj[prop] = toRawDate(value);
        }
        if (Array.isArray(value)) {
            value.forEach(item => toDeepRawDate(item));
        }
        else if (typeof value === 'object') {
            toDeepRawDate(value);
        }
    }
    return obj;
}
exports.toDeepRawDate = toDeepRawDate;
function toNull(value) {
    return value === undefined ? null : value;
}
exports.toNull = toNull;
function toDeepNull(obj) {
    if (!obj)
        return obj;
    for (const prop of Object.getOwnPropertyNames(obj)) {
        const value = obj[prop];
        if (value === undefined) {
            ;
            obj[prop] = null;
        }
        else if (Array.isArray(value)) {
            value.forEach(item => toDeepNull(item));
        }
        else if (typeof value === 'object') {
            toDeepNull(value);
        }
    }
    return obj;
}
exports.toDeepNull = toDeepNull;
function toDeepNullWithoutTyped(obj) {
    return toDeepNull(obj);
}
exports.toDeepNullWithoutTyped = toDeepNullWithoutTyped;
function toUndefined(value) {
    return value === null ? undefined : value;
}
exports.toUndefined = toUndefined;
function toDeepUndefined(obj) {
    if (!obj)
        return obj;
    for (const prop of Object.getOwnPropertyNames(obj)) {
        const value = obj[prop];
        if (value === null) {
            ;
            obj[prop] = undefined;
        }
        else if (Array.isArray(value)) {
            value.forEach(item => toDeepUndefined(item));
        }
        else if (typeof value === 'object') {
            toDeepUndefined(value);
        }
    }
    return obj;
}
exports.toDeepUndefined = toDeepUndefined;
function toDeepUndefinedWithoutTyped(obj) {
    return toDeepUndefined(obj);
}
exports.toDeepUndefinedWithoutTyped = toDeepUndefinedWithoutTyped;
//# sourceMappingURL=base.js.map