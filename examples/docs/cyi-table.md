<script>
  module.exports = {
    methods: {
    },
    data() {
      return {
        options: {
          isPagination: false,
          isIndex: true,
          thead: {
            column: [
              {
                label: "姓名",
                prop: "name"
              },
              {
                label: "年龄",
                prop: "age"
              }
            ]
          },
          data: [
            {
              name: "张三",
              age: 20
            },
            {
              name: "李四",
              age: 25
            },
            {
              name: "王五",
              age: 28
            }
          ]
        }
      }
    }
  };
</script>

# CysTable 表格

## 基础用法

:::demo

```html
<template>
  <cyi-table
    :options="options"
    :data="options.data"
    :show-header="false"
    :striped="true"
    :border="true"
  ></cyi-table>
</template>
<script>
  export default {
    data() {
      return {
        options: {
          isPagination: false,
          thead: {
            column: [
              {
                label: "姓名",
                prop: "name"
              },
              {
                label: "年龄",
                prop: "age"
              }
            ]
          },
          data: [
            {
              name: "张三",
              age: 20
            },
            {
              name: "李四",
              age: 25
            },
            {
              name: "王五",
              age: 28
            }
          ]
        }
      };
    }
  };
</script>
```

:::
