import { dateAlias } from './date'

export const isNull = (str: unknown): str is null => {
  return str === null
}

export const isUndefined = (str: unknown): str is undefined => {
  return str === undefined
}

export const isDate = (str: string): str is dateAlias => {
  switch (str) {
    case dateAlias.Y:
    case dateAlias.Q:
    case dateAlias.M:
    case dateAlias.W:
    case dateAlias.D:
    case dateAlias.H:
    case dateAlias.MIN:
    case dateAlias.S:
    case dateAlias.MS:
      return true
    default:
      return false
  }
}

export const toString = (value: unknown): string => {
  return String(value)
}

// 补 0
export const digit = (num: number, count = 2): string => {
  return String(num).padStart(count, '0')
}

// 将对象转变成 Map 格式
export function transformObjectToMap<K, V>(o: Object): Map<K, V> {
  const result = new Map()
  for (const [key, value] of Object.entries(o)) {
    result.set(key, value)
  }
  return result
}

// Invalid Date
export const INVALID_DATE_STRING = 'Invalid Date'

// default format
export const FORMAT_DEFAULT = 'YYYY-MM-DD HH:mm:ss'

// 验证 2020-02-01 12:10:20:123 格式
export const REGEX_PARSE = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/
// 验证 YYYY-MM-DD HH:mm:ss:SSS 格式
export const REGEX_FORMAT = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g

// 时间简写 - 全称对照
export const prettierDateMap = transformObjectToMap<string, string>({
  MS: dateAlias.MS,
  S: dateAlias.S,
  MIN: dateAlias.MIN,
  H: dateAlias.H,
  D: dateAlias.D,
  W: dateAlias.W,
  M: dateAlias.M,
  Q: dateAlias.Q,
  Y: dateAlias.Y
})

// 格式化时间
export const pretty = (u: string): string => {
  return u && prettierDateMap.has(u.toUpperCase())
    ? prettierDateMap.get(u.toUpperCase())!
    : String(u || '')
        .toLowerCase()
        .replace(/s$/, '')
}

/**
 * 获取具体的单位时间信息
 * @param date 时间对象
 * @param unit 获取的指定时间单位
 * @param local 是否为本地时间
 */
export const get = (date: Date, unit: dateAlias, local: boolean): number => {
  switch (unit) {
    case dateAlias.Y:
      return local ? date.getFullYear() : date.getUTCFullYear()

    case dateAlias.M:
      return local ? date.getMonth() : date.getUTCMonth()

    case dateAlias.D:
      return local ? date.getDate() : date.getUTCDate()

    case dateAlias.W:
      return local ? date.getDay() : date.getUTCDay()

    case dateAlias.H:
      return local ? date.getHours() : date.getUTCHours()

    case dateAlias.MIN:
      return local ? date.getMinutes() : date.getUTCMinutes()

    case dateAlias.S:
      return local ? date.getSeconds() : date.getUTCSeconds()

    case dateAlias.MS:
      return local ? date.getMilliseconds() : date.getUTCMilliseconds()

    default:
      return NaN
  }
}

/**
 * 设置具体的单位时间信息
 * @param date 时间对象
 * @param unit 设置的指定时间单位
 * @param local 是否为本地时间
 */
export const set = (
  date: Date,
  unit: dateAlias,
  args: number[],
  local: boolean
): number => {
  const firstValue = args.shift()!
  switch (unit) {
    case dateAlias.Y:
      // yearValue[, monthValue[, dayValue]]
      return local
        ? date.setFullYear(firstValue, ...args)
        : date.setUTCFullYear(firstValue, ...args)

    case dateAlias.M:
      // monthValue[, dayValue]
      return local
        ? date.setMonth(firstValue, ...args)
        : date.setUTCMonth(firstValue, ...args)

    case dateAlias.W:
      // dayValue
      return local ? date.setDate(firstValue) : date.setUTCDate(firstValue)

    case dateAlias.D:
      // dayValue
      return local ? date.setDate(firstValue) : date.setUTCDate(firstValue)

    case dateAlias.H:
      // hoursValue[, minutesValue[, secondsValue[, msValue]]]
      return local
        ? date.setHours(firstValue, ...args)
        : date.setUTCHours(firstValue, ...args)

    case dateAlias.MIN:
      // minutesValue[, secondsValue[, msValue]]
      return local
        ? date.setMinutes(firstValue, ...args)
        : date.setUTCMinutes(firstValue, ...args)

    case dateAlias.S:
      // secondsValue[, msValue]
      return local
        ? date.setSeconds(firstValue, ...args)
        : date.setUTCSeconds(firstValue, ...args)

    case dateAlias.MS:
      // msValue
      return local
        ? date.setMilliseconds(firstValue)
        : date.setUTCMilliseconds(firstValue)

    default:
      return NaN
  }
}

/**
 * 时间格式转换
 * @param date
 * null -> Invalid Date
 * '' -> Invalid Date
 * undefined -> now
 * unright -> 1970
 * second -> millisecond
 */
export const parseDate = (date?: any): Date => {
  // 入参是 null 时返回 Invalid Date
  if (isNull(date)) return new Date('')

  // 入参是 undefined 时返回当前时间
  if (isUndefined(date)) return new Date()

  // 入参是时间子类的时候返回
  if (date instanceof Date) return new Date(date)

  if (typeof date === 'string') {
    if (!/Z$/i.test(date)) {
      const d: Array<number> = []
      const dateMatch = date.match(REGEX_PARSE)

      if (dateMatch) {
        dateMatch.forEach((v, k) => {
          if (k > 0 && k < 8) {
            let value: number
            if (k === 1) value = Number.parseInt(v, 10)
            else if (k === 2) value = Number.parseInt(v, 10) - 1
            else if (k === 3) value = v ? Number.parseInt(v, 10) : 1
            else value = v ? Number.parseInt(v, 10) : 0
            d.push(value)
          }
        })
        return new Date(d[0], d[1], d[2], d[3], d[4], d[5], d[6])
      } else {
        return new Date(date)
      }
    } else if (
      /^[1-9]*[1-9][0-9]*$/.test(date) &&
      /^(-)?\d{9,10}$/.test(date)
    ) {
      // 秒时间戳转毫秒时间戳
      const intDate = Number.parseInt(date, 10) * 1000
      return new Date(intDate)
    } else {
      return new Date(date)
    }
  }

  // 秒级时间戳转毫秒级
  if (
    typeof date === 'number' &&
    /^[1-9]*[1-9][0-9]*$/.test(String(date)) &&
    /^(-)?\d{9,10}$/.test(String(date))
  ) {
    return new Date(date)
  }

  return new Date(date)
}
