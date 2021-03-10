<script>
  export default {
    data() {
      return {
        modalVisible: false,
        visible: false
      };
    },
    methods: {
      defult(val) {
        this.$cysMessage({
            type: "default",
            message: "默认提示！"
        })
      },
      success(val) {
        this.$cysMessage({
            type: "success",
            message: "成功提示！"
        })
      },
      warning(val) {
        this.$cysMessage({
            type: "warning",
            message: "警告提示！"
        })
      },
      error(val) {
        this.$cysMessage({
            type: "error",
            message: "错误提示！"
        })
      }
    }
  };
</script>

## 基础用法

:::demo 

```html
<template>
  <cys-button @click="defult">默认</cys-button>
  <cys-button @click="success">成功</cys-button>
  <cys-button @click="warning">警告</cys-button>
  <cys-button @click="error">错误</cys-button>
</template>
<script>
  export default {
    data() {
      return {
        modalVisible: false,
        visible: false
      };
    },
    methods: {
      defult(val) {
        this.$cysMessage({
            type: "default",
            message: "默认提示！"
        })
      },
      success(val) {
        this.$cysMessage({
            type: "success",
            message: "成功提示！"
        })
      },
      warning(val) {
        this.$cysMessage({
            type: "warning",
            message: "警告提示！"
        })
      },
      error(val) {
        this.$cysMessage({
            type: "error",
            message: "错误提示！"
        })
      }
    }
  };
</script>
```

:::
