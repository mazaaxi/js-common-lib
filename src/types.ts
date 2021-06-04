import { Dayjs } from 'dayjs'

//========================================================================
//
//  Interfaces
//
//========================================================================

type Constructor<T = any> = new (...args: any[]) => T

type RequiredAre<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

type PartialAre<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends undefined
    ? undefined
    : T[K] extends null
    ? null
    : T[K] extends Function | undefined | null
    ? T[K]
    : T[K] extends Dayjs | undefined | null
    ? T[K]
    : T[K] extends Array<infer R> | undefined
    ? Array<DeepPartial<R>>
    : T[K] extends Array<infer R> | null
    ? Array<DeepPartial<R>> | null
    : T[K] extends Array<infer R> | undefined | null
    ? Array<DeepPartial<R>> | undefined | null
    : T[K] extends Record<any, any> | undefined | null
    ? DeepPartial<T[K]>
    : T[K]
}

type DeepReadonly<T> = {
  readonly [K in keyof T]?: T[K] extends undefined
    ? undefined
    : T[K] extends null
    ? null
    : T[K] extends Function | undefined | null
    ? T[K]
    : T[K] extends Dayjs | undefined | null
    ? T[K]
    : T[K] extends Array<infer R> | undefined
    ? Array<DeepReadonly<R>>
    : T[K] extends Array<infer R> | null
    ? Array<DeepReadonly<R>> | null
    : T[K] extends Array<infer R> | undefined | null
    ? Array<DeepReadonly<R>> | undefined | null
    : T[K] extends Record<any, any> | undefined | null
    ? DeepReadonly<T[K]>
    : T[K]
}

type ToNull<T> = T extends undefined ? null : T

type ToDeepNull<T> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? ToDeepNull<T[K]>
    : T[K] extends Record<any, any> | undefined
    ? ToDeepNull<T[K]> | null
    : ToNull<T[K]>
}

type ToStrictDeepNull<T> = {
  [K in keyof T]-?: T[K] extends Record<any, any>
    ? ToStrictDeepNull<T[K]>
    : T[K] extends Record<any, any> | undefined
    ? ToStrictDeepNull<T[K]> | null
    : ToNull<T[K]>
}

/**
 * `TARGET`型に`SOURCE`型を上書きします。
 *
 * @example
 * type Target = { name: string; age: number }
 * type Source = { name: string; age?: number; weight: number }
 * type Person = Overwrite<Target, Source>
 * const p: Person = null as any
 * p.name = 'Taro' // string
 * p.age = undefined // number | undefined
 * p.weight = 170 // number
 */
type Overwrite<TARGET, SOURCE> = Omit<TARGET, keyof SOURCE> & SOURCE

type ReplaceType1<T, S> = {
  [K in keyof T]: T[K] extends S ? unknown : T[K]
}
type ReplaceType2<T, R> = {
  [K in keyof T]: T[K] extends unknown ? R : T[K]
}

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

//========================================================================
//
//  Exports
//
//========================================================================

export { Constructor, DeepPartial, DeepReadonly, Overwrite, PartialAre, ReplaceType, RequiredAre, ToDeepNull, ToNull, ToStrictDeepNull }
