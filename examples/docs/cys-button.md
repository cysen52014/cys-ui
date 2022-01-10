# CysButton 文本域

## 基础用法

:::demo 通过`plain`属性可以设置为朴素的按钮

```html
<template>
    <cys-button>确认</cys-button>
    <cys-button plain>取消</cys-button>
</template>
```

:::

## 图标按钮

:::demo 通过`left-icon`和`right-icon`设置文字左右的图标，没文字默认居中

```html
<template>
    <cys-button left-icon="cysicon icon-anonymous"></cys-button>
    <cys-button left-icon="cysicon icon-bianji"></cys-button>
    <cys-button left-icon="cysicon icon-delete"></cys-button>
    <cys-button left-icon="cysicon icon-bianji">编辑</cys-button>
    <cys-button right-icon="cysicon icon-bianji">编辑</cys-button>
</template>
```
:::

## 颜色

:::demo 通过`left-icon`和`right-icon`设置文字左右的图标，没文字默认居中

```html
<template>
    <cys-button disabled>编辑</cys-button>
    <cys-button :type="'success'">编辑</cys-button>
    <cys-button :type="'warning'">编辑</cys-button>
    <cys-button :type="'danger'">编辑</cys-button>
</template>
```

:::

## 圆角按钮

:::demo 通过`circle`设置为圆角按钮

```html
<template>
    <cys-button left-icon="cysicon icon-anonymous" circle></cys-button>
    <cys-button left-icon="cysicon icon-bianji" circle plain></cys-button>
    <cys-button circle>编辑</cys-button>
    <cys-button circle plain>编辑</cys-button>
    <cys-button left-icon="cysicon icon-bianji" circle>编辑</cys-button>
    <cys-button right-icon="cysicon icon-bianji" circle>编辑</cys-button>
</template>
```

:::

## CysButton Attributes

| 参数       | 说明         | 类型    | 可选值 | 默认值 |
| ---------- | ------------ | ------- | ------ | ------ |
| plain      | 是否朴素按钮 | boolean | —      | false  |
| circle     | 是否圆角按钮 | boolean | —      | false  |
| left-icon  | 左侧图标     | string  | —      | —      |
| right-icon | 右侧图标     | string  | —      | —      |

## CysButton Slots

| 名称 | 说明           |
| ---- | -------------- |
| —    | 按钮的文本内容 |
