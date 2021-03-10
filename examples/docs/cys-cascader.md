<script>
  module.exports = {
    data() {
      return {
        value: "",
        options: [{
          label: "一级菜单",
          value: 1,
          children: [{
            label: "二级菜单1",
            value: 2,
            children: [
                {
                label: "三年级菜单1",
                value: 3
                },
                {
                label: "三年级菜单2",
                value: 5
                }
            ]
          }, {
            label: "二级菜单2",
            value: 4
          }]
        }, {
          label: "指南",
          value: 6,
          children: [
            {
              label: "指南2",
              value: 7
            }
          ]
        }]
      };
    },
    methods: {
      change(val) {
        console.log(val, "change")
      }
    }
  }; 
</script>

# CysCascader 级联菜单

## 基础用法

::: demo

```html
<template>
  <cys-cascader
    v-model="value"
    :options="options"
    @change="change"
    :clearable="true"
    :filter="true"
    placeholder="请选择"
  ></cys-cascader>
</template>
<script>
  export default {
    data() {
      return {
        value: "",
        options: [
          {
            label: "一级菜单",
            value: 1,
            children: [
              {
                label: "二级菜单1",
                value: 2,
                children: [
                  {
                    label: "三年级菜单1",
                    value: 3
                  },
                  {
                    label: "三年级菜单2",
                    value: 5
                  }
                ]
              },
              {
                label: "二级菜单2",
                value: 4
              }
            ]
          },
          {
            label: "指南",
            value: 6,
            children: [
              {
                label: "指南2",
                value: 7
              }
            ]
          }
        ]
      };
    },
    methods: {
      change(val) {
        console.log(val, "change");
      }
    }
  };
</script>
```

:::
