"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRawTimestamps = exports.toRawTimestamp = exports.toRawDate = exports.toEntityTimestamps = exports.toEntityTimestamp = exports.toEntityDate = void 0;
const dayjs = require("dayjs");
//========================================================================
//
//  Implementation
//
//========================================================================
function toEntityDate(rawDate) {
    if (rawDate === undefined)
        return undefined;
    if (rawDate === null)
        return null;
    return dayjs(rawDate);
}
exports.toEntityDate = toEntityDate;
function toEntityTimestamp(rawEntity) {
    if (rawEntity === undefined)
        return undefined;
    if (rawEntity === null)
        return null;
    const { createdAt, updatedAt } = rawEntity;
    const result = { ...rawEntity };
    if (createdAt) {
        result.createdAt = toEntityDate(createdAt);
    }
    if (updatedAt) {
        result.updatedAt = toEntityDate(updatedAt);
    }
    return result;
}
exports.toEntityTimestamp = toEntityTimestamp;
function toEntityTimestamps(rawEntities) {
    return rawEntities.map(rawEntity => toEntityTimestamp(rawEntity));
}
exports.toEntityTimestamps = toEntityTimestamps;
function toRawDate(entityDate) {
    if (entityDate === undefined)
        return undefined;
    if (entityDate === null)
        return null;
    return entityDate.toISOString();
}
exports.toRawDate = toRawDate;
function toRawTimestamp(entity) {
    if (entity === undefined)
        return undefined;
    if (entity === null)
        return null;
    const { createdAt, updatedAt } = entity;
    const result = { ...entity };
    if (dayjs.isDayjs(createdAt)) {
        result.createdAt = toRawDate(createdAt);
    }
    if (dayjs.isDayjs(updatedAt)) {
        result.updatedAt = toRawDate(updatedAt);
    }
    return result;
}
exports.toRawTimestamp = toRawTimestamp;
function toRawTimestamps(entities) {
    return entities.map(entity => toRawTimestamp(entity));
}
exports.toRawTimestamps = toRawTimestamps;
//# sourceMappingURL=base.js.map