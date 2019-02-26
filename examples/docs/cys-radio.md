<script>
  module.exports = {
    data() {
      return {
        radio: '1',
        radio1: '1'
      };
    }
  };
</script>

# CysRadio 单选框

## 基础用法

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `label`属性的值，`label`可以是`String`、`Number`或`Boolean`。

```html
<template>
  <cys-radio-group v-model="radio">
    <cys-radio label="1">备选项</cys-radio>
    <cys-radio label="2">备选项</cys-radio>
  </cys-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```

:::

### 禁用状态

:::demo 只要在`cys-radio`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。

```html
<template>
  <cys-radio-group v-model="radio1">
    <cys-radio label="1" disabled>备选项1</cys-radio>
    <cys-radio label="2" disabled>备选项2</cys-radio>
  </cys-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '1'
      };
    }
  }
</script>
```

:::

## CysRadio Attributes

| 参数     | 说明           | 类型                      | 可选值 | 默认值 |
| -------- | -------------- | ------------------------- | ------ | ------ |
| label    | Radio 的 value | string / number / boolean | —      | —      |
| disabled | 是否禁用       | boolean                   | —      | false  |

## Cysadio Slots

| 名称 | 说明       |
| ---- | ---------- |
| —    | 单选框文本 |

## CysRadioGroup Attributes

| 参数     | 说明         | 类型                      | 可选值 | 默认值 |
| -------- | ------------ | ------------------------- | ------ | ------ |
| value    | 当前是否勾选 | string / number / boolean | —      | —      |
| disabled | 是否禁用     | boolean                   | —      | false  |
