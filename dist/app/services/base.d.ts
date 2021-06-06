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
declare type ToEntityTimestamp<T> = T extends undefined ? undefined : T extends null ? null : {
    [K in keyof T]: K extends 'createdAt' ? ToEntityDate<T[K]> : K extends 'updatedAt' ? ToEntityDate<T[K]> : T[K];
};
declare type RawTimestamp = {
    createdAt: string;
    updatedAt: string;
};
declare type ToRawDate<T> = T extends Dayjs ? string : T extends Dayjs | undefined ? string | undefined : T extends Dayjs | null ? string | null : T extends Dayjs | undefined | null ? string | undefined | null : T;
declare type ToDeepRawDate<T> = {
    [K in keyof T]: T[K] extends Dayjs ? string : T[K] extends Dayjs | undefined ? string | undefined : T[K] extends Dayjs | null ? string | null : T[K] extends Dayjs | undefined | null ? string | undefined | null : T[K] extends Array<infer R> ? Array<ToDeepRawDate<R>> : T[K] extends Array<infer R> | undefined ? Array<ToDeepRawDate<R>> | undefined : T[K] extends Array<infer R> | null ? Array<ToDeepRawDate<R>> | null : T[K] extends Array<infer R> | undefined | null ? Array<ToDeepRawDate<R>> | undefined | null : ToDeepRawDate<T[K]>;
};
declare type ToRawTimestamp<T> = T extends undefined ? undefined : T extends null ? null : {
    [K in keyof T]: K extends 'createdAt' ? ToRawDate<T[K]> : K extends 'updatedAt' ? ToRawDate<T[K]> : T[K];
};
declare function toEntityDate<T extends string | undefined | null>(rawDate: T): ToEntityDate<T>;
declare function toEntityTimestamp<T extends Partial<RawTimestamp> | Record<any, any> | undefined | null>(rawEntity: T): ToEntityTimestamp<T>;
declare function toEntityTimestamps<T extends Partial<RawTimestamp>>(rawEntities: T[]): ToEntityTimestamp<T>[];
declare function toRawDate<T extends Dayjs | undefined | null>(entityDate: T): ToRawDate<T>;
declare function toRawTimestamp<T extends Partial<EntityTimestamp> | Record<any, any> | undefined | null>(entity: T): ToRawTimestamp<T>;
declare function toRawTimestamps<T extends Partial<EntityTimestamp>>(entities: T[]): ToRawTimestamp<T>[];
export { Entity, EntityTimestamp, OmitTimestamp, RawTimestamp, TimestampEntity, ToDeepRawDate, ToEntityDate, ToEntityTimestamp, ToRawDate, ToRawTimestamp, toEntityDate, toEntityTimestamp, toEntityTimestamps, toRawDate, toRawTimestamp, toRawTimestamps, };
