import type { Dayjs } from 'dayjs';
declare type Primitive = string | number | boolean | bigint | symbol | undefined | null;
declare type IterableCollections = Map<any, any> | Set<any>;
declare type WeakCollections = WeakMap<any, any> | WeakSet<any>;
declare type CollectionTypes = IterableCollections | WeakCollections;
declare type BaseTypes = string | number | boolean;
declare type Builtin = Primitive | Function | Date | Error | RegExp | Dayjs;
declare type Constructor<T = any> = new (...args: any[]) => T;
declare type RequiredAre<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
declare type PartialAre<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer R> ? Array<DeepPartial<R>> : T extends Map<infer K, infer V> ? Map<DeepPartial<K>, DeepPartial<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepPartial<K>, DeepPartial<V>> : T extends WeakMap<infer K, infer V> ? WeakMap<DeepPartial<K>, DeepPartial<V>> : T extends Set<infer U> ? Set<DeepPartial<U>> : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPartial<U>> : T extends WeakSet<infer U> ? WeakSet<DeepPartial<U>> : T extends Promise<infer U> ? Promise<DeepPartial<U>> : T extends Record<any, any> ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type DeepReadonly<T> = T extends Builtin ? T : T extends Array<infer R> ? Array<DeepReadonly<R>> : T extends Map<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> : T extends WeakMap<infer K, infer V> ? WeakMap<DeepReadonly<K>, DeepReadonly<V>> : T extends Set<infer U> ? ReadonlySet<DeepReadonly<U>> : T extends ReadonlySet<infer U> ? ReadonlySet<DeepReadonly<U>> : T extends WeakSet<infer U> ? WeakSet<DeepReadonly<U>> : T extends Promise<infer U> ? Promise<DeepReadonly<U>> : T extends Record<any, any> ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : Readonly<T>;
declare type DeepUnreadonly<T> = T extends Builtin ? T : T extends Array<infer R> ? Array<DeepUnreadonly<R>> : T extends Map<infer K, infer V> ? Map<DeepUnreadonly<K>, DeepUnreadonly<V>> : T extends ReadonlyMap<infer K, infer V> ? Map<DeepUnreadonly<K>, DeepUnreadonly<V>> : T extends WeakMap<infer K, infer V> ? WeakMap<DeepUnreadonly<K>, DeepUnreadonly<V>> : T extends Set<infer U> ? Set<DeepUnreadonly<U>> : T extends ReadonlySet<infer U> ? Set<DeepUnreadonly<U>> : T extends WeakSet<infer U> ? WeakSet<DeepUnreadonly<U>> : T extends Promise<infer U> ? Promise<DeepUnreadonly<U>> : T extends Record<any, any> ? {
    -readonly [K in keyof T]: DeepUnreadonly<T[K]>;
} : DeepUnreadonly<T>;
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
export { Primitive, IterableCollections, WeakCollections, CollectionTypes, BaseTypes, Builtin, Constructor, RequiredAre, PartialAre, DeepPartial, DeepReadonly, DeepUnreadonly, Overwrite, ReplaceType, };
