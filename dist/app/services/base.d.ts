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
declare type ToEntityDate<T> = T extends undefined ? undefined : T extends null ? null : T extends string ? Dayjs : T extends string | undefined ? Dayjs | undefined : T extends string | null ? Dayjs | null : T;
declare type ToEntityTimestamp<T> = T extends undefined ? undefined : T extends null ? null : {
    [K in keyof T]: K extends 'createdAt' ? ToEntityDate<T[K]> : K extends 'updatedAt' ? ToEntityDate<T[K]> : T[K];
};
declare type RawTimestamp = {
    createdAt: string;
    updatedAt: string;
};
declare type ToRawDate<T> = T extends undefined ? undefined : T extends null ? null : T extends Dayjs ? string : T extends Dayjs | undefined ? string | undefined : T extends Dayjs | null ? string | null : T;
declare type ToRawTimestamp<T> = T extends undefined ? undefined : T extends null ? null : {
    [K in keyof T]: K extends 'createdAt' ? ToRawDate<T[K]> : K extends 'updatedAt' ? ToRawDate<T[K]> : T[K];
};
declare function toEntityDate<T extends string | undefined | null>(rawDate: T): ToEntityDate<T>;
declare function toEntityTimestamp<T extends Partial<RawTimestamp> | Record<any, any> | undefined | null>(rawEntity: T): ToEntityTimestamp<T>;
declare function toEntityTimestamps<T extends Partial<RawTimestamp>>(rawEntities: T[]): ToEntityTimestamp<T>[];
declare function toRawDate<T extends Dayjs | undefined | null>(entityDate: T): ToRawDate<T>;
declare function toRawTimestamp<T extends Partial<EntityTimestamp> | Record<any, any> | undefined | null>(entity: T): ToRawTimestamp<T>;
declare function toRawTimestamps<T extends Partial<EntityTimestamp>>(entities: T[]): ToRawTimestamp<T>[];
export { Entity, EntityTimestamp, OmitTimestamp, RawTimestamp, TimestampEntity, ToEntityDate, ToEntityTimestamp, ToRawDate, ToRawTimestamp, toEntityDate, toEntityTimestamp, toEntityTimestamps, toRawDate, toRawTimestamp, toRawTimestamps, };
