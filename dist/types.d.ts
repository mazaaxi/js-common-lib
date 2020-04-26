export declare type Constructor<T = any> = new (...args: any[]) => T;
export declare type AreRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export declare type AreOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
