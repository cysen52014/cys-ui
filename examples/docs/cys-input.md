<script>
  module.exports = {
    data() {
      return {
        input: '',
        input1:'',
        input2:'鼠标移上去清空图标'
      };
    }
  };
</script>
<style lang="stylus" scoped>
  @import '../styles/cys-input';
</style>

# CysInput 输入框

## 基础用法

:::demo

```html
<template>
  <cys-input v-model="input" type="password" placeholder="请输入内容"></cys-input>
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

## 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件

```html
<template>
  <cys-input
    placeholder="请输入内容"
    v-model="input1"
    :disabled="true">
  </cys-input>
</template>

<script>
  export default {
    data() {
      return {
        input1: ''
      }
    }
  }
</script>
```

:::

## 可清空

:::demo 使用`clearable`属性即可得到一个可清空的输入框

```html
<template>
  <cys-input
    placeholder="请输入内容"
    v-model="input2"
    clearable>
  </cys-input>
</template>


<script>
  export default {
    data() {
      return {
        input2: ''
      }
    }
  }
</script>
```

:::

## Icon 图标

:::demo

```html
<template>
  <cys-input placeholder="请输入警告信息">
      <i slot="prefix" class="cysicon icon-icon_topbar_gaojingtongzhi"></i>
  </cys-input>

  <cys-input placeholder="输入搜索内容">
      <i slot="suffix" class="cysicon icon-icon_shipinjiankong_suofang"></i>
  </cys-input>
</template>
```

:::

## 复合型输入框

:::demo

```html
<template>
  <cys-input placeholder="请输入文本">
      <template slot="prepend">Http://</template>
  </cys-input>

  <cys-input placeholder="请输入内容">
      <template slot="append">.com</template>
  </cys-input>

  <cys-input placeholder="请输入网址">
      <template slot="prepend">www.</template>
      <template slot="append">.com</template>
  </cys-input>
</template>
```

:::

## CysInput Attributes

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

## CysInput Slots

| 名称    | 说明                         |
| ------- | ---------------------------- |
| prefix  | 输入框头部内容，用于设置图标 |
| suffix  | 输入框尾部内容，用于设置图标 |
| prepend | 输入框前置内容               |
| append  | 输入框后置内容               |

## CysInput Events

| 事件名称 | 说明                                          | 回调参数                  |
| -------- | --------------------------------------------- | ------------------------- |
| blur     | 在 Input 失去焦点时触发                       | (event: Event)            |
| focus    | 在 Input 获得焦点时触发                       | (event: Event)            |
| change   | 在 Input 值改变时触发                         | (value: string \| number) |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发 | —                         |
