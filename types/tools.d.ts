import { dateAlias } from './date';
export declare const isNull: (str: unknown) => str is null;
export declare const isUndefined: (str: unknown) => str is undefined;
export declare const isDate: (str: string) => str is dateAlias;
export declare const toString: (value: unknown) => string;
export declare const digit: (num: number, count?: number) => string;
export declare function transformObjectToMap<K, V>(o: Object): Map<K, V>;
export declare const INVALID_DATE_STRING = "Invalid Date";
export declare const FORMAT_DEFAULT = "YYYY-MM-DD HH:mm:ss";
export declare const REGEX_PARSE: RegExp;
export declare const REGEX_FORMAT: RegExp;
export declare const prettierDateMap: Map<string, string>;
export declare const pretty: (u: string) => string;
/**
 * 获取具体的单位时间信息
 * @param date 时间对象
 * @param unit 获取的指定时间单位
 * @param local 是否为本地时间
 */
export declare const get: (date: Date, unit: dateAlias, local: boolean) => number;
/**
 * 设置具体的单位时间信息
 * @param date 时间对象
 * @param unit 设置的指定时间单位
 * @param local 是否为本地时间
 */
export declare const set: (date: Date, unit: dateAlias, args: number[], local: boolean) => number;
/**
 * 时间格式转换
 * @param date
 * null -> Invalid Date
 * '' -> Invalid Date
 * undefined -> now
 * unright -> 1970
 * second -> millisecond
 */
export declare const parseDate: (date?: any) => Date;
