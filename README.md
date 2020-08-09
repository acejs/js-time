## js-math

**A lightweight Javascript math library.**

### Installing

```bash
npm install @cdjs/js-math
// or
yarn add @cdjs/js-math
```

### Usage

```javascript
// es6 module
import jsMath, { multiply, add, subtract, devide, round } from '@cdjs/js-math'
// commonjs
const { multiply, add, subtract, devide, round, default: jsMath } = require('@cdjs/js-math')
```

### Documentation

| Method       | Desc                                                     | Args                                                   |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------ |
| multiply     | 乘                                                       | ...Array                                               |
| add          | 加                                                       | ...Array                                               |
| subtract     | 减                                                       | ...Array                                               |
| devide       | 除                                                       | ...Array                                               |
| round        | 四舍五入                                                 | ratio: Number 精度<br />number?: Number 需要处理的数字 |
| value        | 获取最终值                                               | /                                                      |
| setPrecision | 设置浮点数最大保留精度，默认 12 位                       | number: Number                                         |
| enableCheck  | 是否开启对运算结果是否超出 js 安全数值的提醒，默认 false | check: Boolean                                         |

### How to use

#####Simple use

```javascript
// 乘
multiply(3, 2) // 6
add(0,1, 0.2)  // 0.3
// 四舍五入
round(0.345, 2) // 0.35
```

#####Chained use

```javascript
jsMath
  .multiply(0.2, 10, 100)
  .add(1, 2, 3, 5, 10, 1000)
  .subtract(0.1, 0.3, 0.4)
  .devide(2, 5, 5, 20)
  .round(2)
  .value() // 1.22
```
