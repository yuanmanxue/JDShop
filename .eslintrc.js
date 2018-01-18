/**
 * @Author: yuanmanxue
 * @Date:   2017-10-20 04:58:18
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2017-12-07 03:43:09
 */

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals:{
    AMap:"AMap"
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'eol-last' : 0,
    'space-before-function-paren' : 0,
    'indent': 0,//忽略indent
    'no-multi-spaces': 0,//不能用多余的空格
    'no-trailing-spaces': 0, //一行结束后面不要有空格
    'key-spacing': 0, //对象字面量中冒号的前后空格
    'semi': 0, //语句强制分号结尾
    'space-before-blocks':0 //不以新行开始的块{前面要不要有空
  }
}
