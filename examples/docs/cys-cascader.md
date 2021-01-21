<script>
  module.exports = {
    data() {
      return {
        value: 1,
        options: [{
          label: "一级菜单",
          value: 1,
          children: [{
            label: "二级菜单",
            value: 2,
            children: [
                {
                label: "三年级菜单",
                value: 3
                },
                {
                label: "三年级菜单",
                value: 5
                }
            ]
          }, {
            label: "二级菜单",
            value: 4
          }]
        }]
      };
    }
  }; 
</script>

# CysCascader 级联菜单

## 基础用法

::: demo

```html
<template>
  <cys-cascader v-model="value" :options="options"></cys-cascader>
</template>
<script>
  export default {
    data() {
      return {
        value: 1,
        options: [
          {
            label: "一级菜单",
            value: 1,
            children: [
              {
                label: "二级菜单",
                value: 2,
                children: [
                  {
                    label: "三年级菜单",
                    value: 3
                  },
                  {
                    label: "三年级菜单",
                    value: 5
                  }
                ]
              },
              {
                label: "二级菜单",
                value: 4
              }
            ]
          }
        ]
      };
    }
  };
</script>
```

:::
