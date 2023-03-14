import type { Dayjs } from 'dayjs'

//========================================================================
//
//  Interfaces
//
//========================================================================

type Primitive = string | number | boolean | bigint | symbol | undefined | null

type IterableCollections = Map<any, any> | Set<any>

type WeakCollections = WeakMap<any, any> | WeakSet<any>

type CollectionTypes = IterableCollections | WeakCollections

type BaseTypes = string | number | boolean

type Builtin = Primitive | Function | Date | Error | RegExp | Dayjs

type Constructor<T = any> = new (...args: any[]) => T

type RequiredAre<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

type PartialAre<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type DeepPartial<T> = T extends Function | Date | Error | RegExp | Dayjs
  ? T
  : T extends Array<infer R>
  ? Array<DeepPartial<R>>
  : T extends ReadonlyArray<infer R>
  ? ReadonlyArray<DeepPartial<R>>
  : T extends Map<infer K, infer V>
  ? Map<DeepPartial<K>, DeepPartial<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepPartial<K>, DeepPartial<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepPartial<K>, DeepPartial<V>>
  : T extends Set<infer U>
  ? Set<DeepPartial<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepPartial<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepPartial<U>>
  : T extends Promise<infer U>
  ? Promise<DeepPartial<U>>
  : T extends Record<any, any>
  ? {
      [K in keyof T]?: DeepPartial<T[K]>
    }
  : T

type DeepReadonly<T> = T extends Function | Date | Error | RegExp | Dayjs
  ? T
  : T extends Array<infer R>
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends ReadonlyArray<infer R>
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends Record<any, any>
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>
    }
  : T

type DeepUnreadonly<T> = T extends Function | Date | Error | RegExp | Dayjs
  ? T
  : T extends Array<infer R>
  ? Array<DeepUnreadonly<R>>
  : T extends ReadonlyArray<infer R>
  ? Array<DeepUnreadonly<R>>
  : T extends Map<infer K, infer V>
  ? Map<DeepUnreadonly<K>, DeepUnreadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? Map<DeepUnreadonly<K>, DeepUnreadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepUnreadonly<K>, DeepUnreadonly<V>>
  : T extends Set<infer U>
  ? Set<DeepUnreadonly<U>>
  : T extends ReadonlySet<infer U>
  ? Set<DeepUnreadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepUnreadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepUnreadonly<U>>
  : T extends Record<any, any>
  ? {
      -readonly [K in keyof T]: DeepUnreadonly<T[K]>
    }
  : T

/**
 * `TARGET`型に`SOURCE`型をマージします。
 *
 * @example
 * type Target = { name: string; age: number }
 * type Source = { name: string; age?: number; weight: number }
 * type Person = Merge<Target, Source>
 * const p: Person = null as any
 * p.name = 'Taro' // string
 * p.age = undefined // number | undefined
 * p.weight = 170 // number
 */
type Merge<T, S> = T extends Date | Error | RegExp | Dayjs
  ? T
  : T extends Function
  ? S
  : T extends Array<infer TR>
  ? S extends Array<infer SR>
    ? Array<Merge<TR, SR>>
    : S extends ReadonlyArray<infer SR>
    ? ReadonlyArray<Merge<TR, SR>>
    : S
  : T extends Map<infer TK, infer TV>
  ? S extends Map<infer SK, infer SV>
    ? Map<SK, Merge<TV, SV>>
    : S extends ReadonlyMap<infer SK, infer SV>
    ? ReadonlyMap<SK, Merge<TV, SV>>
    : S extends WeakMap<infer SK, infer SV>
    ? WeakMap<SK, Merge<TV, SV>>
    : S
  : T extends Set<infer TR>
  ? S extends Set<infer SR>
    ? Set<Merge<TR, SR>>
    : S extends ReadonlySet<infer SR>
    ? ReadonlySet<Merge<TR, SR>>
    : S extends WeakSet<infer SR>
    ? WeakSet<Merge<TR, SR>>
    : S
  : T extends Record<any, any>
  ? {
      [K in keyof (T & S)]: K extends keyof S ? (S[K] extends Record<any, any> ? Merge<T[K], S[K]> : S[K]) : T[K]
    }
  : S

/**
 * `T`型の中で`S`型のメンバーを`R`型に置き換えます。
 *
 * @example
 * type Article = { title: string; createdAt: Date; updatedAt: Date }
 * type RawArticle = ReplaceType<Article, Date, string>
 * const article: RawArticle = {
 *   title: `Today's events`, // string型
 *   createdAt: '2021-01-01T01:15:00.000Z', // Date → string
 *   updatedAt: '2021-01-01T01:20:00.000Z', // Date → string
 * }
 */
type ReplaceType<T, S, R> = ReplaceType1<T, S> & ReplaceType2<T, R>

type ReplaceType1<T, S> = {
  [K in keyof T]: T[K] extends S ? unknown : T[K]
}
type ReplaceType2<T, R> = {
  [K in keyof T]: T[K] extends unknown ? R : T[K]
}

type SnakeToCamel<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${SnakeToCamel<P3>}`
  : Lowercase<S>

type KeysToCamel<T> = T extends Date | Error | RegExp | Dayjs
  ? T
  : T extends Array<infer R>
  ? Array<KeysToCamel<R>>
  : T extends ReadonlyArray<infer R>
  ? ReadonlyArray<KeysToCamel<R>>
  : T extends Map<infer K, infer V>
  ? Map<KeysToCamel<K>, KeysToCamel<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<KeysToCamel<K>, KeysToCamel<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<KeysToCamel<K>, KeysToCamel<V>>
  : T extends Set<infer U>
  ? Set<KeysToCamel<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<KeysToCamel<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<KeysToCamel<U>>
  : T extends Promise<infer U>
  ? Promise<KeysToCamel<U>>
  : T extends Record<any, any>
  ? {
      [K in keyof T as SnakeToCamel<string & K>]: KeysToCamel<T[K]>
    }
  : T

type CamelToSnake<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnake<U>}` : S

type KeysToSnake<T> = T extends Date | Error | RegExp | Dayjs
  ? T
  : T extends Array<infer R>
  ? Array<KeysToSnake<R>>
  : T extends ReadonlyArray<infer R>
  ? ReadonlyArray<KeysToSnake<R>>
  : T extends Map<infer K, infer V>
  ? Map<KeysToSnake<K>, KeysToSnake<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<KeysToSnake<K>, KeysToSnake<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<KeysToSnake<K>, KeysToSnake<V>>
  : T extends Set<infer U>
  ? Set<KeysToSnake<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<KeysToSnake<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<KeysToSnake<U>>
  : T extends Promise<infer U>
  ? Promise<KeysToSnake<U>>
  : T extends Record<any, any>
  ? {
      [K in keyof T as CamelToSnake<string & K>]: KeysToSnake<T[K]>
    }
  : T

//========================================================================
//
//  Exports
//
//========================================================================

export {
  Primitive,
  IterableCollections,
  WeakCollections,
  CollectionTypes,
  BaseTypes,
  Builtin,
  Constructor,
  RequiredAre,
  PartialAre,
  DeepPartial,
  DeepReadonly,
  DeepUnreadonly,
  Merge,
  ReplaceType,
  SnakeToCamel,
  KeysToCamel,
  CamelToSnake,
  KeysToSnake,
}
