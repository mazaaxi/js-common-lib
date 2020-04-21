export type Constructor<T = any> = new (...args: any[]) => T

export type Require<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
