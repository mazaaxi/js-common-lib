export declare type Constructor<T = any> = new (...args: any[]) => T;
export declare type Require<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
