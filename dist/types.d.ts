export declare type Constructor<T = any> = new (...args: any[]) => T;
export declare type RequiredAre<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export declare type PartialAre<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends null ? null : T[K] extends undefined ? undefined : T[K] extends Array<infer R> ? Array<DeepPartial<R>> : DeepPartial<T[K]>;
};
