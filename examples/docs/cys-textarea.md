<script>
  module.exports = {
    data() {
      return {
        input: '',
        input1: '',
        input2:''
      };
    }
  };
</script>
<style lang="stylus" scoped>
  @import '../styles/cys-textarea';
</style>

# CysTextarea 文本域

## 基础用法

:::demo

```html
<template>
  <cys-textarea v-model="input" placeholder="请输入内容"></cys-textarea>
</template>
<script>
  export default {
    data() {
      return {
        input: ''
      }
    }
  }
</script>
```

:::

## 可自适应文本高度的文本域

:::demo

```html
<template>
  <cys-textarea v-model="input1" placeholder="无限自动加高" autosize></cys-textarea>
  <cys-textarea v-model="input2" placeholder="限制从2行到5行超出滚动条" :autosize="{minRows: 2,maxRows: 5}"></cys-textarea>
</template>
<script>
export default {
  data() {
    return {
      input1: '',
      input2: ''
    }
  }
}
</script>
```

:::

## CysTextarea Attributes

| 参数          | 说明                   | 类型            | 可选值  | 默认值 |
| ------------- | ---------------------- | --------------- | ------- | ------ |
| value         | 绑定值                 | string / number | —       | —      |
| maxlength     | 原生属性，最大输入长度 | number          | —       | —      |
| minlength     | 原生属性，最小输入长度 | number          | —       | —      |
| placeholder   | 输入框占位文本         | string          | —       | —      |
| clearable     | 是否可清空             | boolean         | —       | false  |
| disabled      | 禁用                   | boolean         | —       | false  |
| auto-complete | 原生属性，自动补全     | string          | on, off | off    |
| name          | 原生属性               | string          | —       | —      |
| readonly      | 原生属性，是否只读     | boolean         | —       | false  |

## CysTextarea Events

| 事件名称 | 说明                       | 回调参数                  |
| -------- | -------------------------- | ------------------------- |
| blur     | 在 textarea 失去焦点时触发 | (event: Event)            |
| focus    | 在 textarea 获得焦点时触发 | (event: Event)            |
| change   | 在 textarea 值改变时触发   | (value: string \| number) |
