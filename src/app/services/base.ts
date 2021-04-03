import { Dayjs } from 'dayjs'
import dayjs = require('dayjs')

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
  : T

type ToEntityTimestamp<T> = T extends undefined
  ? undefined
  : T extends null
  ? null
  : {
      [K in keyof T]: K extends 'createdAt' ? ToEntityDate<T[K]> : K extends 'updatedAt' ? ToEntityDate<T[K]> : T[K]
    }

type RawTimestamp = { createdAt: string; updatedAt: string }

type ToRawDate<T> = T extends undefined ? undefined : T extends null ? null : T extends Dayjs ? string : T

type ToDeepRawDate<T> = {
  [K in keyof T]: T[K] extends Dayjs
    ? string
    : T[K] extends Dayjs | undefined
    ? string | undefined
    : T[K] extends Dayjs | null
    ? string | null
    : T[K] extends Record<any, any>
    ? ToDeepRawDate<T[K]>
    : T[K] extends Record<any, any> | undefined
    ? ToDeepRawDate<T[K]> | undefined
    : T[K] extends Record<any, any> | null
    ? ToDeepRawDate<T[K]> | null
    : T[K]
}

type ToRawTimestamp<T> = T extends undefined
  ? undefined
  : T extends null
  ? null
  : {
      [K in keyof T]: K extends 'createdAt' ? ToRawDate<T[K]> : K extends 'updatedAt' ? ToRawDate<T[K]> : T[K]
    }

//========================================================================
//
//  Implementation
//
//========================================================================

function toEntityDate<T extends string | undefined | null>(rawDate: T): ToEntityDate<T> {
  if (rawDate === undefined) return undefined as ToEntityDate<T>
  if (rawDate === null) return null as ToEntityDate<T>
  return dayjs(rawDate as string) as ToEntityDate<T>
}

function toEntityTimestamp<T extends Partial<RawTimestamp> | Record<any, any> | undefined | null>(rawEntity: T): ToEntityTimestamp<T> {
  if (rawEntity === undefined) return undefined as ToEntityTimestamp<T>
  if (rawEntity === null) return null as ToEntityTimestamp<T>

  const { createdAt, updatedAt } = rawEntity as Partial<RawTimestamp>
  const result: any = { ...rawEntity }
  if (createdAt) {
    result.createdAt = toEntityDate(createdAt)
  }
  if (updatedAt) {
    result.updatedAt = toEntityDate(updatedAt)
  }
  return result
}

function toEntityTimestamps<T extends Partial<RawTimestamp>>(rawEntities: T[]): ToEntityTimestamp<T>[] {
  return rawEntities.map(rawEntity => toEntityTimestamp(rawEntity)!)
}

function toRawDate<T extends Dayjs | undefined | null>(entityDate: T): ToRawDate<T> {
  if (entityDate === undefined) return undefined as ToRawDate<T>
  if (entityDate === null) return null as ToRawDate<T>
  return entityDate.toISOString() as ToRawDate<T>
}

function toRawTimestamp<T extends Partial<EntityTimestamp> | Record<any, any> | undefined | null>(entity: T): ToRawTimestamp<T> {
  if (entity === undefined) return undefined as ToRawTimestamp<T>
  if (entity === null) return null as ToRawTimestamp<T>

  const { createdAt, updatedAt } = entity as any
  const result: any = { ...entity }
  if (dayjs.isDayjs(createdAt)) {
    result.createdAt = toRawDate(createdAt)
  }
  if (dayjs.isDayjs(updatedAt)) {
    result.updatedAt = toRawDate(updatedAt)
  }
  return result
}

function toRawTimestamps<T extends Partial<EntityTimestamp>>(entities: T[]): ToRawTimestamp<T>[] {
  return entities.map(entity => toRawTimestamp(entity)!)
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
  RawTimestamp,
  TimestampEntity,
  ToDeepRawDate,
  ToEntityDate,
  ToEntityTimestamp,
  ToRawDate,
  ToRawTimestamp,
  toEntityDate,
  toEntityTimestamp,
  toEntityTimestamps,
  toRawDate,
  toRawTimestamp,
  toRawTimestamps,
}
