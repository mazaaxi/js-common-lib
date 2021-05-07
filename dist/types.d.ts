import { Dayjs } from 'dayjs';
declare type Constructor<T = any> = new (...args: any[]) => T;
declare type RequiredAre<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
declare type PartialAre<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
declare type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends undefined ? undefined : T[K] extends null ? null : T[K] extends Function ? T[K] : T[K] extends Function | undefined ? T[K] : T[K] extends Dayjs ? T[K] : T[K] extends Dayjs | undefined ? T[K] : T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K] extends Array<infer R> ? Array<DeepPartial<R>> : DeepPartial<T[K]>;
};
declare type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends undefined ? undefined : T[K] extends null ? null : T[K] extends Function ? T[K] : T[K] extends Function | undefined ? T[K] : T[K] extends Dayjs ? T[K] : T[K] extends Dayjs | undefined ? T[K] : T[K] extends Record<any, any> ? DeepReadonly<T[K]> : T[K] extends Array<infer R> ? Array<DeepReadonly<R>> : DeepReadonly<T[K]>;
};
declare type ToNull<T> = T extends undefined ? null : T;
declare type ToDeepNull<T> = {
    [K in keyof T]: T[K] extends Record<any, any> ? ToDeepNull<T[K]> : T[K] extends Record<any, any> | undefined ? ToDeepNull<T[K]> | null : ToNull<T[K]>;
};
declare type ToStrictDeepNull<T> = {
    [K in keyof T]-?: T[K] extends Record<any, any> ? ToStrictDeepNull<T[K]> : T[K] extends Record<any, any> | undefined ? ToStrictDeepNull<T[K]> | null : ToNull<T[K]>;
};
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
declare type Overwrite<TARGET, SOURCE> = Omit<TARGET, keyof SOURCE> & SOURCE;
declare type ReplaceType1<T, S> = {
    [K in keyof T]: T[K] extends S ? unknown : T[K];
};
declare type ReplaceType2<T, R> = {
    [K in keyof T]: T[K] extends unknown ? R : T[K];
};
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
declare type ReplaceType<T, S, R> = ReplaceType1<T, S> & ReplaceType2<T, R>;
export { Constructor, DeepPartial, DeepReadonly, Overwrite, PartialAre, ReplaceType, RequiredAre, ToDeepNull, ToNull, ToStrictDeepNull };
