# CysSwitch 开关

## 基础用法

:::demo

```html
<template>
  <cys-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
  </cys-switch>
</template>

<script>
  export default {
    data() {
      return {
        value: false
      }
    }
  }
</script>
```
