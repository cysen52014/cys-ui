<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value1:'',
        value2:'Beijing',
        value3: ['选项1', '选项2'],
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Cysanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Cysenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }]
      }
    },
    methods: {
      sel(val) {
        console.log(val, "selectvae")
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../styles/cys-select';
</style>

# CysSelect 下拉框

## 基础用法

:::demo `v-model`的值为当前被选中的`cys-option`的 value 属性值

```html
<template>
  <cys-select v-model="value" @change="sel" placeholder="请选择">
    <cys-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item">
    </cys-option>
  </cys-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>
```

:::

## 禁用状态

:::demo 为`cys-select`设置`disabled`属性，则整个选择器不可用

```html
<template>
  <cys-select v-model="value1" disabled placeholder="请选择">
    <cys-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </cys-option>
  </cys-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: ''
      }
    }
  }
</script>
```

:::

### 自定义模板

:::demo 将自定义的 HTML 模板插入`cys-option`的 slot 中即可。

```html
<template>
  <cys-select v-model="value2" placeholder="请选择">
    <cys-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </cys-option>
  </cys-select>
</template>

<script>
  export default {
    data() {
      return {
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Cysanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Cysenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value2: ''
      }
    }
  }
</script>
```

:::

## 可搜索

:::demo 为`cys-select`设置`filter`为`true`则可进行搜索 label 内容的选项

```html
<template>
  <cys-select v-model="value3" :multiple="true" :filter="true" clearable placeholder="请选择">
    <cys-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </cys-option>
  </cys-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value3: ''
      }
    }
  }
</script>
```

:::

## CysSelect Attributes

| 参数        | 说明              | 类型    | 可选值 | 默认值 |
| ----------- | ----------------- | ------- | ------ | ------ |
| value       | 绑定选中的 vue 值 | —       | —      | —      |
| disabled    | 是否禁用          | boolean | —      | false  |
| placeholder | 占位符            | string  | —      | 请选择 |
| filter      | 是否可搜索        | boolean | —      | false  |

## CysOption Attributes

| 参数  | 说明                                      | 类型                 | 可选值 | 默认值 |
| ----- | ----------------------------------------- | -------------------- | ------ | ------ |
| value | 选项的值                                  | string/number/object | —      | —      |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string/number        | —      | —      |

## CysOption Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 选项的文本内容 |
