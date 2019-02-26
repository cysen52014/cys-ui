<script>
  export default {
    data() {
      return {
        modalVisible: false,
        visible: false
      };
    }
  };
</script>

# CysModal 对话框

## 基本用法

:::demo 需要设置`v-model`属性，它接收`Boolean`，当为`true`时显示

```html
<template>
  <cys-button type="text" @click="modalVisible = true">点击打开 Modal</cys-button>

  <cys-modal
    title="提示"
    v-model="modalVisible">
    <span>这是一段信息</span>
    <span slot="footer">
      <cys-button @click="modalVisible = false" plain>取 消</cys-button>
      <cys-button @click="modalVisible = false">确 定</cys-button>
    </span>
  </cys-modal>
</template>

<script>
  export default {
    data() {
      return {
        modalVisible: false
      };
    }
  };
</script>
```

:::

:::demo `width`来设置对话框的宽度大小支持百分比和像素设置

```html
<template>
  <cys-button type="text" @click="visible = true">点击打开 Modal</cys-button>

  <cys-modal
    title="提示"
    v-model="visible"
    width="60%"
    height="60%">
    <span>这是一段信息</span>
    <span slot="footer">
      <cys-button @click="visible = false" plain>取 消</cys-button>
      <cys-button @click="visible = false">确 定</cys-button>
    </span>
  </cys-modal>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      };
    }
  };
</script>
```

:::

## CysModal Attributes

| 参数       | 说明                                           | 类型    | 可选值 | 默认值 |
| ---------- | ---------------------------------------------- | ------- | ------ | ------ |
| value      | 是否显示 Modal,使用 v-model 绑定才可以图标关闭 | boolean | —      | false  |
| title      | Modal 的标题，也可通过具名 slot （见下表）传入 | string  | —      | —      |
| show-close | 是否显示关闭按钮                               | boolean | —      | true   |
| width      | 设置宽度                                       | string  | —      | —      |

## CysModal Events

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| close    | 窗体关闭触发 | —        |

## CysModal Slot

| 名称   | 说明                   |
| ------ | ---------------------- |
| —      | Modal 的内容           |
| footer | Modal 按钮操作区的内容 |
