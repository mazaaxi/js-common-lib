import { Dayjs } from 'dayjs';
declare type Constructor<T = any> = new (...args: any[]) => T;
declare type RequiredAre<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
declare type PartialAre<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
declare type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends Dayjs | undefined | null ? T[K] : T[K] extends Array<infer R> ? Array<DeepPartial<R>> : T[K] extends Array<infer R> | undefined ? Array<DeepPartial<R>> | undefined : T[K] extends Array<infer R> | null ? Array<DeepPartial<R>> | null : T[K] extends Array<infer R> | undefined | null ? Array<DeepPartial<R>> | undefined | null : DeepPartial<T[K]>;
};
declare type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends Dayjs | undefined | null ? T[K] : T[K] extends Array<infer R> ? Array<DeepReadonly<R>> : T[K] extends Array<infer R> | undefined ? Array<DeepReadonly<R>> | undefined : T[K] extends Array<infer R> | null ? Array<DeepReadonly<R>> | null : T[K] extends Array<infer R> | undefined | null ? Array<DeepReadonly<R>> | undefined | null : DeepReadonly<T[K]>;
};
declare type DeepUnreadonly<T> = {
    readonly [K in keyof T]: T[K] extends Dayjs | undefined | null ? T[K] : T[K] extends Array<infer R> ? Array<DeepUnreadonly<R>> : T[K] extends Array<infer R> | undefined ? Array<DeepUnreadonly<R>> | undefined : T[K] extends Array<infer R> | null ? Array<DeepUnreadonly<R>> | null : T[K] extends Array<infer R> | undefined | null ? Array<DeepUnreadonly<R>> | undefined | null : DeepUnreadonly<T[K]>;
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
export { Constructor, DeepPartial, DeepReadonly, DeepUnreadonly, Overwrite, PartialAre, ReplaceType, RequiredAre };
