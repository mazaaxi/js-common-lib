import { Dayjs } from 'dayjs';
declare type OmitTimestamp<T = unknown> = Omit<T, 'createdAt' | 'updatedAt'>;
interface Entity {
    id: string;
    version: number;
}
interface EntityTimestamp {
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
declare type TimestampEntity = Entity & EntityTimestamp;
declare type ToEntityDate<T> = T extends undefined ? undefined : T extends null ? null : T extends string ? Dayjs : T extends string | undefined ? Dayjs | undefined : T extends string | null ? Dayjs | null : T extends string | undefined | null ? Dayjs | undefined | null : T;
declare type ToDeepEntityDateAre<T, K extends keyof any> = {
    [P in keyof T]: P extends K ? Dayjs : ToDeepEntityDateAre<T[P], K>;
};
declare type ToRawDate<T> = T extends Dayjs ? string : T extends Dayjs | undefined ? string | undefined : T extends Dayjs | null ? string | null : T extends Dayjs | undefined | null ? string | undefined | null : T;
declare type ToDeepRawDate<T> = {
    [K in keyof T]: T[K] extends Dayjs ? string : T[K] extends Dayjs | undefined ? string | undefined : T[K] extends Dayjs | null ? string | null : T[K] extends Dayjs | undefined | null ? string | undefined | null : T[K] extends Array<infer R> ? Array<ToDeepRawDate<R>> : T[K] extends Array<infer R> | undefined ? Array<ToDeepRawDate<R>> | undefined : T[K] extends Array<infer R> | null ? Array<ToDeepRawDate<R>> | null : T[K] extends Array<infer R> | undefined | null ? Array<ToDeepRawDate<R>> | undefined | null : ToDeepRawDate<T[K]>;
};
/**
 * 指定された文字列日付型をエンティティ日付型に変換します。
 * @param rawDate
 */
declare function toEntityDate<T extends string | undefined | null>(rawDate: T): ToEntityDate<T>;
/**
 * 指定されたオブジェクトの文字列日付型のプロパティをエンティティ日付型に変換します。
 * @param obj 対象オブジェクトを指定します。
 * @param props プロパティ名を指定します。
 */
declare function toDeepEntityDate<T, K extends keyof any>(obj: T, props: K[]): ToDeepEntityDateAre<T, K>;
/**
 * 指定されたエンティティ日付型を文字列日付型に変換します。
 * @param entityDate
 */
declare function toRawDate<T extends Dayjs | undefined | null>(entityDate: T): ToRawDate<T>;
/**
 * 指定されたオブジェクトのエンティティ日付型のプロパティを文字列日付型に変換します。
 * @param obj 対象オブジェクトを指定します。
 */
declare function toDeepRawDate<T>(obj: T): ToDeepRawDate<T>;
export { Entity, EntityTimestamp, OmitTimestamp, TimestampEntity, ToDeepEntityDateAre, ToDeepRawDate, ToEntityDate, ToRawDate, toDeepEntityDate, toDeepRawDate, toEntityDate, toRawDate, };
