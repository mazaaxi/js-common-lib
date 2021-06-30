import { Dayjs } from 'dayjs'
import dayjs = require('dayjs')
import { nonNullable } from '../../utils'

//========================================================================
//
//  Interfaces
//
//========================================================================

type OmitTimestamp<T = unknown> = Omit<T, 'createdAt' | 'updatedAt'>

interface Entity {
  id: string
  version: number
}

interface EntityTimestamp {
  createdAt: Dayjs
  updatedAt: Dayjs
}

type TimestampEntity = Entity & EntityTimestamp

type ToEntityDate<T> = T extends undefined
  ? undefined
  : T extends null
  ? null
  : T extends string
  ? Dayjs
  : T extends string | undefined
  ? Dayjs | undefined
  : T extends string | null
  ? Dayjs | null
  : T extends string | undefined | null
  ? Dayjs | undefined | null
  : T

type ToDeepEntityDateAre<T, K extends keyof any> = {
  [P in keyof T]: P extends K ? Dayjs : ToDeepEntityDateAre<T[P], K>
}

type ToRawDate<T> = T extends Dayjs
  ? string
  : T extends Dayjs | undefined
  ? string | undefined
  : T extends Dayjs | null
  ? string | null
  : T extends Dayjs | undefined | null
  ? string | undefined | null
  : T

type ToDeepRawDate<T> = {
  [K in keyof T]: T[K] extends Dayjs
    ? string
    : T[K] extends Dayjs | undefined
    ? string | undefined
    : T[K] extends Dayjs | null
    ? string | null
    : T[K] extends Dayjs | undefined | null
    ? string | undefined | null
    : T[K] extends Array<infer R>
    ? Array<ToDeepRawDate<R>>
    : T[K] extends Array<infer R> | undefined
    ? Array<ToDeepRawDate<R>> | undefined
    : T[K] extends Array<infer R> | null
    ? Array<ToDeepRawDate<R>> | null
    : T[K] extends Array<infer R> | undefined | null
    ? Array<ToDeepRawDate<R>> | undefined | null
    : ToDeepRawDate<T[K]>
}

type ToNull<T> = T extends undefined ? null : T

type ToDeepNull<T> = {
  [K in keyof T]-?: T[K] extends Record<any, any>
    ? ToDeepNull<T[K]>
    : T[K] extends Record<any, any> | undefined
    ? ToDeepNull<T[K]> | null
    : ToNull<T[K]>
}

type ToDeepNullable<T> = {
  [K in keyof T]?: T[K] extends Dayjs | undefined | null
    ? T[K] | null
    : T[K] extends Array<infer R> | undefined | null
    ? Array<ToDeepNullable<R>> | null
    : T[K] extends Record<any, any> | undefined | null
    ? ToDeepNullable<T[K]> | null
    : T[K] | null
}

type ToUndefined<T> = T extends null ? undefined : T

type ToDeepUndefined<T> = {
  [K in keyof T]: T[K] extends Dayjs | undefined | null
    ? ToUndefined<T[K]>
    : T[K] extends Record<any, any> | undefined | null
    ? ToUndefined<ToDeepUndefined<T[K]>>
    : ToUndefined<T[K]>
}

//========================================================================
//
//  Implementation
//
//========================================================================

/**
 * 指定された文字列日付型をエンティティ日付型に変換します。
 * @param rawDate
 */
function toEntityDate<T extends string | undefined | null>(rawDate: T): ToEntityDate<T> {
  if (rawDate === undefined) return undefined as ToEntityDate<T>
  if (rawDate === null) return null as ToEntityDate<T>
  return dayjs(rawDate as string) as ToEntityDate<T>
}

/**
 * 指定されたオブジェクトの文字列日付型のプロパティをエンティティ日付型に変換します。
 * @param obj 対象オブジェクトを指定します。
 * @param props プロパティ名を指定します。
 */
function toDeepEntityDate<T, K extends keyof any>(obj: T, props: K[]): ToDeepEntityDateAre<T, K> {
  if (!obj) return obj as any

  for (const prop of Object.getOwnPropertyNames(obj)) {
    const value = (obj as any)[prop]
    if (!nonNullable(value) || dayjs.isDayjs(value)) continue

    if (props.includes(prop as any) && typeof value === 'string') {
      ;(obj as any)[prop] = dayjs(value)
    }

    if (Array.isArray(value)) {
      value.forEach(item => toDeepEntityDate(item, props))
    } else if (typeof value === 'object') {
      toDeepEntityDate(value, props)
    }
  }

  return (obj as any) as ToDeepEntityDateAre<T, K>
}

/**
 * 指定されたエンティティ日付型を文字列日付型に変換します。
 * @param entityDate
 */
function toRawDate<T extends Dayjs | undefined | null>(entityDate: T): ToRawDate<T> {
  if (entityDate === undefined) return undefined as ToRawDate<T>
  if (entityDate === null) return null as ToRawDate<T>
  return entityDate.toISOString() as ToRawDate<T>
}

/**
 * 指定されたオブジェクトのエンティティ日付型のプロパティを文字列日付型に変換します。
 * @param obj 対象オブジェクトを指定します。
 */
function toDeepRawDate<T>(obj: T): ToDeepRawDate<T> {
  if (!obj) return obj as any

  for (const prop of Object.getOwnPropertyNames(obj)) {
    const value = (obj as any)[prop]
    if (!nonNullable(value)) continue

    if (dayjs.isDayjs(value)) {
      ;(obj as any)[prop] = toRawDate(value)
    }

    if (Array.isArray(value)) {
      value.forEach(item => toDeepRawDate(item))
    } else if (typeof value === 'object') {
      toDeepRawDate(value)
    }
  }

  return (obj as any) as ToDeepRawDate<T>
}

function toNull<T>(value: T): ToNull<T> {
  return value === undefined ? (null as any) : value
}

function toDeepNull<T>(obj: T): ToDeepNull<T> {
  if (!obj) return obj as any

  for (const prop of Object.getOwnPropertyNames(obj)) {
    const value = (obj as any)[prop]

    if (value === undefined) {
      ;(obj as any)[prop] = null
    } else if (Array.isArray(value)) {
      value.forEach(item => toDeepNull(item))
    } else if (typeof value === 'object' && !dayjs.isDayjs(value)) {
      toDeepNull(value)
    }
  }

  return (obj as any) as ToDeepNull<T>
}

function toDeepNullWithoutTyped<T>(obj: T): T {
  return toDeepNull(obj) as T
}

function toUndefined<T>(value: T): ToUndefined<T> {
  return value === null ? (undefined as any) : value
}

function toDeepUndefined<T>(obj: T): ToDeepUndefined<T> {
  if (!obj) return obj as any

  for (const prop of Object.getOwnPropertyNames(obj)) {
    const value = (obj as any)[prop]

    if (value === null) {
      ;(obj as any)[prop] = undefined
    } else if (Array.isArray(value)) {
      value.forEach(item => toDeepUndefined(item))
    } else if (typeof value === 'object' && !dayjs.isDayjs(value)) {
      toDeepUndefined(value)
    }
  }

  return (obj as any) as ToDeepUndefined<T>
}

function toDeepUndefinedWithoutTyped<T>(obj: T): T {
  return toDeepUndefined(obj) as T
}

//========================================================================
//
//  Exports
//
//========================================================================

export {
  Entity,
  EntityTimestamp,
  OmitTimestamp,
  TimestampEntity,
  ToDeepEntityDateAre,
  ToDeepNull,
  ToDeepNullable,
  ToDeepRawDate,
  ToDeepUndefined,
  ToEntityDate,
  ToNull,
  ToRawDate,
  ToUndefined,
  toDeepEntityDate,
  toDeepNull,
  toDeepNullWithoutTyped,
  toDeepRawDate,
  toDeepUndefined,
  toDeepUndefinedWithoutTyped,
  toEntityDate,
  toNull,
  toRawDate,
  toUndefined,
}
