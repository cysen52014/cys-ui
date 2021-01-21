# CysAvatar 头像

## 基础用法

:::demo

```html
<template>
    <cys-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" ></cys-avatar>
</template>
```

:::

## 图标头像

:::demo

```html
<template>
    <cys-avatar icon="icon-icon_logo" ></cys-avatar>
</template>
```

:::

## 文字头像

:::demo

```html
<template>
    <cys-avatar>Cys</cys-avatar>
</template>
```

:::

## CysAvatar Attributes

| 参数 | 说明                 | 类型   | 可选值 | 默认值 |
| ---- | -------------------- | ------ | ------ | ------ |
| src  | 图片类头像的资源地址 | string | —      | —      |
| icon | 图标类名             | string | —      | —      |

## CysButton Slots

| 事件名称 | 说明               |
| -------- | ------------------ |
| —        | 头像内容对自动缩放 |
