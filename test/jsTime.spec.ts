import jsTime from '../src'

test('format', () => {
  expect(jsTime(1596007178613).format()).toBe('2020-07-29 15:19:38')
})

test('startOf year', () => {
  expect(
    jsTime(1596007561104)
      .startOf('year')
      .format()
  ).toBe('2020-01-01 00:00:00')
})

test('startOf quarter', () => {
  expect(
    jsTime(1590768000000)
      .startOf('quarter')
      .format()
  ).toBe('2020-04-01 00:00:00')
})

test('startOf month', () => {
  expect(
    jsTime(1596007680340)
      .startOf('month')
      .format()
  ).toBe('2020-07-01 00:00:00')
})

test('startOf week', () => {
  expect(
    jsTime(1590768000000)
      .startOf('week')
      .format()
  ).toBe('2020-05-24 00:00:00')
})

test('startOf day', () => {
  expect(
    jsTime(1596007817041)
      .startOf('day')
      .format()
  ).toBe('2020-07-29 00:00:00')
})

test('startOf hour', () => {
  expect(
    jsTime(1596008037294)
      .startOf('hour')
      .format()
  ).toBe('2020-07-29 15:00:00')
})

test('startOf minute', () => {
  expect(
    jsTime(1596008073453)
      .startOf('minute')
      .format()
  ).toBe('2020-07-29 15:34:00')
})

test('startOf second', () => {
  expect(
    jsTime(1596008127197)
      .startOf('second')
      .format()
  ).toBe('2020-07-29 15:35:27')
})

test('startOf millisecond', () => {
  expect(
    jsTime(1596008151641)
      .startOf('millisecond')
      .format()
  ).toBe('2020-07-29 15:35:51')
})

test('endOf year', () => {
  expect(
    jsTime(1596008151641)
      .endOf('year')
      .format()
  ).toBe('2020-12-31 23:59:59')
})

test('add year', () => {
  expect(
    jsTime(1596008406077)
      .add(1, 'year')
      .format()
  ).toBe('2021-07-29 15:40:06')
})

test('add year', () => {
  expect(
    jsTime(1596008406077)
      .add(1, 'quarter')
      .format()
  ).toBe('2020-10-29 15:40:06')
})

test('add month', () => {
  expect(
    jsTime(1596008440439)
      .add(1, 'month')
      .format()
  ).toBe('2020-08-29 15:40:40')
})

test('add day', () => {
  expect(
    jsTime(1596008523355)
      .add(3, 'day')
      .format()
  ).toBe('2020-08-01 15:42:03')
})

test('add hour', () => {
  expect(
    jsTime(1596008559964)
      .add(12, 'hour')
      .format()
  ).toBe('2020-07-30 03:42:39')
})

test('add minute', () => {
  expect(
    jsTime(1596008618618)
      .add(30, 'minute')
      .format()
  ).toBe('2020-07-29 16:13:38')
})

test('add second', () => {
  expect(
    jsTime(1596008663742)
      .add(100, 'second')
      .format()
  ).toBe('2020-07-29 15:46:03')
})

test('add millisecond', () => {
  expect(
    jsTime(1596008866973)
      .add(10000, 'millisecond')
      .format()
  ).toBe('2020-07-29 15:47:56')
})

test('add null', () => {
  expect(
    jsTime(1596008406077)
      .add(1, 'null') // 测试入参错误
      .format()
  ).toBe('2020-07-29 15:40:06')
})

test('subtract year', () => {
  expect(
    jsTime(1596008406077)
      .subtract(1, 'year')
      .format()
  ).toBe('2019-07-29 15:40:06')
})

test('get full year', () => {
  expect(jsTime(1596008866973).year()).toBe('2020')
})

test('get year', () => {
  expect(jsTime(1596008866973).year('YY')).toBe('20')
})

test('get full month', () => {
  expect(jsTime(1596008866973).month('MM')).toBe('07')
})

test('get single month', () => {
  expect(jsTime(1596008866973).month()).toBe('7')
})

test('get full day', () => {
  expect(jsTime(1596969888989).day('DD')).toBe('09')
})

test('get single day', () => {
  expect(jsTime(1596969888989).day()).toBe('9')
})

test('get week Sunday first', () => {
  expect(jsTime(1596969888989).week()).toBe(0)
})

test('get week Monday first', () => {
  expect(jsTime(1596969888989).week('Monday')).toBe(6)
})

test('get millisecond', () => {
  expect(jsTime(1596969888989).millisecond()).toBe('989')
})

test('isLeapYear', () => {
  expect(jsTime(1596969888989).isLeapYear()).toBe(true)
})

test('isAfter', () => {
  expect(jsTime(1596969888989).isAfter(1596008866973)).toBe(true)
})

test('isBefore', () => {
  expect(jsTime(1596969888989).isBefore(1596008866973)).toBe(false)
})

test('yearDay', () => {
  expect(jsTime(1596969888989).yearDay()).toBe(366)
})

test('monthDay', () => {
  expect(jsTime(1596969888989).monthDay()).toBe(31)
})

test('valueOf', () => {
  expect(jsTime(1596969888989).valueOf()).toBe(1596969888989)
})

test('unix', () => {
  expect(jsTime(1596969888989).unix()).toBe(1596969888)
})
