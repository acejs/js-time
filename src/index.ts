import {
  parseDate,
  INVALID_DATE_STRING,
  FORMAT_DEFAULT,
  digit,
  REGEX_FORMAT,
  transformObjectToMap,
  toString,
  get,
  set,
  pretty,
  isDate
} from './tools'

import {
  dateAlias,
  MILLISECONDS_A_SECOND,
  MILLISECONDS_A_MINUTE,
  MILLISECONDS_A_HOUR,
  MILLISECONDS_A_DAY
} from './date'

class JSTime {
  $DATE: Date
  local: boolean
  $Y = NaN //年
  $M = NaN // 月
  $D = NaN // 一月的日
  $W = NaN // 一周的日
  $H = NaN // 小时
  $MIN = NaN // 分
  $S = NaN // 秒
  $MS = NaN // 毫秒

  /**
   * @param date 任意时间格式
   * @param local 是否为本地时间
   */
  constructor(date: unknown, local: boolean) {
    this.$DATE = parseDate(date)
    this.local = local
    this.init()
  }

  /**
   * 根据 $DATE 对象 初始化当前日期的  年月日等 更多信息
   */
  private init() {
    const { $DATE } = this

    this.$Y = get($DATE, dateAlias.Y, this.local)
    this.$M = get($DATE, dateAlias.M, this.local)
    this.$D = get($DATE, dateAlias.D, this.local)
    this.$W = get($DATE, dateAlias.W, this.local)
    this.$H = get($DATE, dateAlias.H, this.local)
    this.$MIN = get($DATE, dateAlias.MIN, this.local)
    this.$S = get($DATE, dateAlias.S, this.local)
    this.$MS = get($DATE, dateAlias.MS, this.local)
  }

  /**
   * @description 判断当前时间是否合法
   */
  private isValid(): boolean {
    return !(this.$DATE.toString() === INVALID_DATE_STRING)
  }

  /**
   * 获取当前对象的复制，以供多日期操作的时候使用
   */
  private clone(): JSTime {
    return wrapper(this.$DATE, this.local)
  }

  /**
   * @description 获取毫秒级时间戳
   */
  valueOf(): number {
    return this.$DATE.getTime()
  }

  /**
   * @description 获取秒级时间戳
   */
  unix(): number {
    return Math.floor(this.valueOf() / 1000)
  }

  /**
   * 时间格式的转换
   * @param pattern 匹配规则
   */
  format(pattern = FORMAT_DEFAULT): string {
    if (!this.isValid()) return INVALID_DATE_STRING

    const matches = transformObjectToMap<string, string>({
      YY: this.year('YY'),
      YYYY: this.year('YYYY'),
      M: this.month('M'),
      MM: this.month('MM'),
      D: this.day('D'),
      DD: this.day('DD'),
      H: this.hour('H'),
      HH: this.hour('HH'),
      m: this.minute('m'),
      mm: this.minute('mm'),
      s: this.second('s'),
      ss: this.second('ss')
    })

    return pattern.replace(REGEX_FORMAT, (item: string): string => {
      return matches.has(item) ? matches.get(item) || '' : ''
    })
  }

  /**
   * 获取开始时间
   * @param unit 时间维度
   * @param isStartOf 是否获取开始时间
   */
  startOf(unit: string, isStartOf = true): JSTime {
    unit = pretty(unit)

    // 设置 年月日 的信息
    const instanceFactory = (month: number, day: number): JSTime => {
      const ins = wrapper(new Date(this.$Y, month, day), this.local)
      return isStartOf ? ins : ins.endOf(dateAlias.D)
    }

    // 设置 时分秒 的信息
    const instanceFactorySet = (unit: dateAlias, slice: number) => {
      const argumentStart = [0, 0, 0, 0]
      const argumentEnd = [23, 59, 59, 999]

      set(
        this.$DATE,
        unit,
        (isStartOf ? argumentStart : argumentEnd).slice(slice),
        this.local
      )
      this.init()
      return this
    }

    switch (unit) {
      case dateAlias.Y:
        return isStartOf ? instanceFactory(0, 1) : instanceFactory(11, 31)

      case dateAlias.Q:
        const q = Math.floor((this.$M + 3) / 3)

        return isStartOf
          ? instanceFactory((q - 1) * 3, 1)
          : instanceFactory(q * 3, 0)

      case dateAlias.M:
        return isStartOf
          ? instanceFactory(this.$M, 1)
          : instanceFactory(this.$M + 1, 0)

      case dateAlias.W:
        return isStartOf
          ? instanceFactory(this.$M, this.$D - this.$W)
          : instanceFactory(this.$M, this.$D - this.$W + 6)

      case dateAlias.D:
        return instanceFactorySet(dateAlias.H, 0)

      case dateAlias.H:
        return instanceFactorySet(dateAlias.MIN, 1)

      case dateAlias.MIN:
        return instanceFactorySet(dateAlias.S, 1)

      case dateAlias.S:
        return instanceFactorySet(dateAlias.MS, 1)

      default:
        return this.clone()
    }
  }

  /**
   * 获取结束时间
   * @param unit 时间维度
   */
  endOf(unit: string): JSTime {
    return this.startOf(unit, false)
  }

  /**
   * 在日期上新增指定的时间
   * @param input 需要新增的数量
   * @param unit 时间维度
   */
  add(input: number, unit: string): this {
    unit = pretty(unit)

    switch (unit) {
      case dateAlias.Y:
        return this.set(unit, this.$Y + input)

      case dateAlias.Q:
        return this.set(dateAlias.M, this.$M + input * 3)

      case dateAlias.M:
        return this.set(unit, this.$M + input)

      case dateAlias.D:
      case dateAlias.W:
        return this.set(unit, this.$D + input)

      case dateAlias.H:
      case dateAlias.MIN:
      case dateAlias.S:
      case dateAlias.MS:
        const map = transformObjectToMap<string, number>({
          [dateAlias.H]: MILLISECONDS_A_HOUR,
          [dateAlias.MIN]: MILLISECONDS_A_MINUTE,
          [dateAlias.S]: MILLISECONDS_A_SECOND,
          [dateAlias.MS]: 1
        })

        const step = map.get(unit) || 1
        return this.set(dateAlias.MS, input * step)
      default:
        return this
    }
  }

  /**
   * 在日期上减去指定的时间
   * @param input 需要减少的数量
   * @param unit 时间维度
   */
  subtract(input: number, unit: string): this {
    return this.add(-1 * input, unit)
  }

  /**
   * 获取一个月的天数
   */
  monthDay() {
    return this.endOf(dateAlias.M).$D
  }

  /**
   * 获取一年的天数
   */
  yearDay() {
    return (
      (this.endOf(dateAlias.Y).valueOf() -
        this.subtract(1, 'year')
          .endOf(dateAlias.Y)
          .valueOf()) /
      MILLISECONDS_A_DAY
    )
  }

  /**
   * @description 是否为闰年
   */
  isLeapYear(): boolean {
    return this.yearDay() === 366
  }

  /**
   * 是否在当前日期之前
   * @param input 输入的值
   */
  isBefore(input: unknown): boolean {
    return this.valueOf() < wrapper(input, this.local).valueOf()
  }

  /**
   * 是否在当前日期之前
   * @param input 输入的值
   */
  isAfter(input: unknown): boolean {
    return this.valueOf() > wrapper(input, this.local).valueOf()
  }

  /**
   * 根据具体单位设置当前的日期信息
   * @param unit 时间维度
   * @param input 变更的值
   */
  set(unit: string, input: number): this {
    // 当设置的日期格式不合法时，直接返回当前对象
    if (!isDate(unit)) return this

    // 当计算一周的第几天时，用表示一月的日加上 (当前输入的值 与 表示一周的日的差)
    const args = unit === dateAlias.W ? this.$D + (input - this.$W) : input

    if (unit === dateAlias.M || unit === dateAlias.Y) {
      // 闰年2月 和 非闰年2月 的天数不一样
      // 每月的天数也不同  所以需要单独比较

      // 备份当前的时间对象，并将其设置成对应的月  以便找出月份的天数
      const date = this.clone().set(dateAlias.D, 1)
      // 2020-7-31 -> 2月时  需要显示成 2月29号  因为2月只有29天
      set(date.$DATE, unit, [args], this.local)
      date.init()

      // 设置当前时间对象
      this.$DATE = date.set(
        dateAlias.D,
        Math.min(this.$D, date.monthDay())
      ).$DATE
    } else {
      set(this.$DATE, unit, [args], this.local)
    }

    this.init()
    return this
  }

  /**
   * 获取年份
   * @param pattern 年份格式 支持 YYYY: 四位数年份   YY 两位数表示的年份
   */
  year(pattern = 'YYYY'): string {
    return pattern === 'YYYY' ? toString(this.$Y) : toString(this.$Y).slice(-2)
  }

  /**
   * 获取月份
   * @param pattern 月份格式 支持 MM: 单月补0   M: 默认的格式
   */
  month(pattern = 'M'): string {
    return pattern === 'M' ? toString(this.$M + 1) : digit(this.$M + 1)
  }

  /**
   * 0 ~ 6 0代表第一天
   * @param input 输入的值
   */
  week(start: 'Sunday' | 'Monday' = 'Sunday'): number {
    return start === 'Sunday' ? this.$W : this.$W === 0 ? 6 : this.$W - 1
  }

  /**
   * 获取月中的天
   * @param pattern 天的格式 支持  DD: 单日期补0   D: 默认格式
   */
  day(pattern = 'D'): string {
    return pattern === 'D' ? toString(this.$D) : digit(this.$D)
  }

  /**
   * 获取小时
   * @param pattern 小时格式 支持  HH: 单 补0   H: 默认格式
   */
  hour(pattern = 'H'): string {
    return pattern === 'H' ? toString(this.$H) : digit(this.$H)
  }

  /**
   * 获取分钟
   * @param pattern 分钟格式 支持  mm: 单 补0   m: 默认格式
   */
  minute(pattern = 'm'): string {
    return pattern === 'm' ? toString(this.$MIN) : digit(this.$MIN)
  }

  /**
   * 获取秒
   * @param pattern 秒 格式 支持  ss: 单 补0   s: 默认格式
   */
  second(pattern = 's'): string {
    return pattern === 's' ? toString(this.$S) : digit(this.$S)
  }

  /**
   * 获取毫秒
   * @param pattern 毫秒 格式 支持  sss: 单 补0   s: 默认格式
   */
  millisecond(pattern = 's'): string {
    return pattern === 's' ? toString(this.$MS) : digit(this.$MS, 3)
  }
}

export default function jsTime(date?: unknown, local = true): JSTime {
  return new JSTime(date, local)
}

// 获取一个新的时间处理对象
const wrapper = (date: unknown, local: boolean): JSTime => jsTime(date, local)

console.log(
  jsTime()
    .endOf('year')
    .format()
)
