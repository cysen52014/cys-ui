<script>
  module.exports = {
    data: () => ({
      show: true,
      show2: true,
      show3: true
    })
  }
</script>

# 过渡动画

## collapse 展开折叠

:::demo 使用 `cys-collapse-transition` 组件实现折叠展开效果。

```html
<template>
  <div>
    <cys-button @click="show3 = !show3" plain>折叠/展开</cys-button>

    <div style="margin-top: 20px; height: 100px;">
      <cys-collapse-transition>
        <div v-show="show3">
          <div class="transition-box">cys-collapse-transition</div>
        </div>
      </cys-collapse-transition>
    </div>
  </div>
</template>

<script>
    export default {
    data: () => ({
      show3: true
    })
  }
</script>

<style scoped>
  .transition-box {
    margin-bottom: 10px;
    width: 300px;
    height: 100px;
    border-radius: 4px;
    background-color: #41a259;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```

:::
