import { Dayjs } from 'dayjs';
export declare type Constructor<T = any> = new (...args: any[]) => T;
export declare type RequiredAre<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export declare type PartialAre<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends undefined ? undefined : T[K] extends null ? null : T[K] extends Function ? T[K] : T[K] extends Function | undefined ? T[K] : T[K] extends Dayjs ? T[K] : T[K] extends Dayjs | undefined ? T[K] : T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K] extends Array<infer R> ? Array<DeepPartial<R>> : DeepPartial<T[K]>;
};
export declare type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends undefined ? undefined : T[K] extends null ? null : T[K] extends Function ? T[K] : T[K] extends Function | undefined ? T[K] : T[K] extends Dayjs ? T[K] : T[K] extends Dayjs | undefined ? T[K] : T[K] extends Record<any, any> ? DeepReadonly<T[K]> : T[K] extends Array<infer R> ? Array<DeepReadonly<R>> : DeepReadonly<T[K]>;
};
export declare type ToNull<T> = T extends undefined ? null : T;
export declare type ToDeepNull<T> = {
    [K in keyof T]: T[K] extends Record<any, any> ? ToDeepNull<T[K]> : T[K] extends Record<any, any> | undefined ? ToDeepNull<T[K]> | null : ToNull<T[K]>;
};
export declare type ToStrictDeepNull<T> = {
    [K in keyof T]-?: T[K] extends Record<any, any> ? ToStrictDeepNull<T[K]> : T[K] extends Record<any, any> | undefined ? ToStrictDeepNull<T[K]> | null : ToNull<T[K]>;
};
