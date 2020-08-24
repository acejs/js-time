declare class JSTime {
    $DATE: Date;
    local: boolean;
    $Y: number;
    $M: number;
    $D: number;
    $W: number;
    $H: number;
    $MIN: number;
    $S: number;
    $MS: number;
    /**
     * @param date 任意时间格式
     * @param local 是否为本地时间
     */
    constructor(date: unknown, local: boolean);
    /**
     * 根据 $DATE 对象 初始化当前日期的  年月日等 更多信息
     */
    private init;
    /**
     * @description 判断当前时间是否合法
     */
    private isValid;
    /**
     * 获取当前对象的复制，以供多日期操作的时候使用
     */
    private clone;
    /**
     * @description 获取毫秒级时间戳
     */
    valueOf(): number;
    /**
     * @description 获取秒级时间戳
     */
    unix(): number;
    /**
     * 时间格式的转换
     * @param pattern 匹配规则
     */
    format(pattern?: string): string;
    /**
     * 获取开始时间
     * @param unit 时间维度
     * @param isStartOf 是否获取开始时间
     */
    startOf(unit: string, isStartOf?: boolean): JSTime;
    /**
     * 获取结束时间
     * @param unit 时间维度
     */
    endOf(unit: string): JSTime;
    /**
     * 在日期上新增指定的时间
     * @param input 需要新增的数量
     * @param unit 时间维度
     */
    add(input: number, unit: string): this;
    /**
     * 在日期上减去指定的时间
     * @param input 需要减少的数量
     * @param unit 时间维度
     */
    subtract(input: number, unit: string): this;
    /**
     * 获取一个月的天数
     */
    monthDay(): number;
    /**
     * 获取一年的天数
     */
    yearDay(): number;
    /**
     * @description 是否为闰年
     */
    isLeapYear(): boolean;
    /**
     * 是否在当前日期之前
     * @param input 输入的值
     */
    isBefore(input: unknown): boolean;
    /**
     * 是否在当前日期之前
     * @param input 输入的值
     */
    isAfter(input: unknown): boolean;
    /**
     * 根据具体单位设置当前的日期信息
     * @param unit 时间维度
     * @param input 变更的值
     */
    set(unit: string, input: number): this;
    /**
     * 获取年份
     * @param pattern 年份格式 支持 YYYY: 四位数年份   YY 两位数表示的年份
     */
    year(pattern?: string): string;
    /**
     * 获取月份
     * @param pattern 月份格式 支持 MM: 单月补0   M: 默认的格式
     */
    month(pattern?: string): string;
    /**
     * 0 ~ 6 0代表第一天
     * @param input 输入的值
     */
    week(start?: 'Sunday' | 'Monday'): number;
    /**
     * 获取月中的天
     * @param pattern 天的格式 支持  DD: 单日期补0   D: 默认格式
     */
    day(pattern?: string): string;
    /**
     * 获取小时
     * @param pattern 小时格式 支持  HH: 单 补0   H: 默认格式
     */
    hour(pattern?: string): string;
    /**
     * 获取分钟
     * @param pattern 分钟格式 支持  mm: 单 补0   m: 默认格式
     */
    minute(pattern?: string): string;
    /**
     * 获取秒
     * @param pattern 秒 格式 支持  ss: 单 补0   s: 默认格式
     */
    second(pattern?: string): string;
    /**
     * 获取毫秒
     * @param pattern 毫秒 格式 支持  sss: 单 补0   s: 默认格式
     */
    millisecond(pattern?: string): string;
}
export default function jsTime(date?: unknown, local?: boolean): JSTime;
export {};
