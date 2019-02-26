# CysCircle 进度环

## 基础用法

:::demo 使用`clearable`属性即可得到一个可清空的输入框

```html
<template>
    <cys-circle :percent="80">
        <span style="font-size:24px">80%</span>
    </cys-circle>
</template>
```

:::

## CysCircle Attributes

| 参数           | 说明                                                  | 类型   | 可选值       | 默认值  |
| -------------- | ----------------------------------------------------- | ------ | ------------ | ------- |
| percent        | 百分比                                                | number | —            | 0       |
| size           | 图表的宽度和高度，单位 px                             | number | —            | 120     |
| stroke-linecap | 进度环顶端的形状，可选值为 square（方）和 round（圆） | string | round/square | round   |
| stroke-width   | 进度环的线宽，单位 px                                 | number | —            | 6       |
| stroke-color   | 进度环的颜色                                          | string | —            | #41a259 |
| trail-width    | 进度环背景的线宽，单位 px                             | number | —            | 5       |
| trail-color    | 进度环背景的颜色                                      | string | —            | #eaeef2 |

## CysCircle Slots

| 事件名称 | 说明                         |
| -------- | ---------------------------- |
| —        | 进度环内容可以自定义各种效果 |
