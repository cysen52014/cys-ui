<script>
  module.exports = {
    data() {
      return {
        checkList: ['4','5'],
        checked: true,
        checked1: false,
        checked2: true
      };
    }
  };
</script>

# CysCheckbox 复选框

## 基础用法

:::demo `v-model`进行双向绑定

```html
<template>
  <cys-checkbox v-model="checked">备选项</e-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  };
</script>
```

:::

## 禁用状态

:::demo 设置`disabled`属性即可

```html
<template>
  <cys-checkbox v-model="checked1" disabled>备选项1</cys-checkbox>
  <cys-checkbox v-model="checked2" disabled>备选项</cys-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked1: false,
        checked2: true
      };
    }
  };
</script>
```

:::

## 复选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo `cys-checkbox-group`元素能把多个 checkbox 管理为一组，只需要在 Group 中使用`v-model`绑定`Array`类型的变量即可。 `cys-checkbox` 的 `label`属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

```html
<template>
  <cys-checkbox-group v-model="checkList">
    <cys-checkbox label="1">复选框 A</cys-checkbox>
    <cys-checkbox label="2">复选框 B</cys-checkbox>
    <cys-checkbox label="3">复选框 C</cys-checkbox>
    <cys-checkbox label="4" disabled>禁用</cys-checkbox>
    <cys-checkbox label="5" disabled>选中且禁用</cys-checkbox>
  </cys-checkbox-group>
</template>

<script>
  export default {
    data () {
      return {
        checkList: ['4','5']
      };
    }
  };
</script>
```

:::

## CysCheckbox Attributes

| 参数          | 说明                                    | 类型    | 可选值 | 默认值 |
| ------------- | --------------------------------------- | ------- | ------ | ------ |
| disabled      | 是否禁用                                | boolean | —      | false  |
| value         | 当前是否勾选                            | boolean | —      | false  |
| label         | 复选框在分组中勾选追加到数组的值        | boolean | —      | false  |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | —      | false  |

## CysCheckbox Events

| 事件名称 | 说明                     | 回调参数   |
| -------- | ------------------------ | ---------- |
| change   | 当绑定值变化时触发的事件 | 更新后的值 |

## CysCheckbox Slots

| 名称 | 说明       |
| ---- | ---------- |
| —    | 复选框文本 |

## CysCheckboxGroup Attributes

| 参数     | 说明         | 类型    | 可选值 | 默认值 |
| -------- | ------------ | ------- | ------ | ------ |
| disabled | 是否禁用     | boolean | —      | false  |
| value    | 当前是否勾选 | array   | —      | —      |
