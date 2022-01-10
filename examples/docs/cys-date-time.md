<script>
    import moment from 'moment';
    export default {
        data(){
            return {
                time: '',
                date:'2222-02-22',
                date1:''
            }
        },
        methods:{
            calendarDisabledDate(current){
                // 小于当前时间的禁用
                return  current.isBefore(moment().endOf('day')) ;
            }
        }
    }
</script>
<style lang="stylus" scoped>
  @import '../styles/cys-date-time';
</style>

# CysDateTime 日期时间

## 基础用法

:::demo `cys-date-picker`基础的日期选择

```html
<template>
    <cys-date-picker v-model="date" placeholder="选择日期"></cys-date-picker>
    <cys-date-picker v-model="date1" placeholder="选择日期" :show-icon="false"></cys-date-picker>
</template>
<script>
    export default {
        data(){
            return {
                date:'2222-02-22',
                date1:''
            }
        }
    }
</script>
```

:::

## 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用日期选择

```html
<template>
    <cys-date-picker placeholder="选择日期" disabled></cys-date-picker>
</template>
```

:::

## 日期选择

:::demo 通过 `type` 指定选择模式`date` `month` `year`

```html
<template>
    <cys-date-picker placeholder="选择年份" type="year"></cys-date-picker>
    <cys-date-picker placeholder="选择月份" type="month"></cys-date-picker>
    <cys-date-picker placeholder="选择日期" type="date"></cys-date-picker>
</template>
```

:::

## 日期禁用

:::demo 设置`disabled-date`属性，方法返回`true`禁用，参数`moment` 可以参照相关的文档 [moment](http://momentjs.cn/docs/)

```html
<template>
    <cys-date-picker placeholder="选择年份" type="year" :disabled-date="calendarDisabledDate"></cys-date-picker>
    <cys-date-picker placeholder="选择月份" type="month" :disabled-date="calendarDisabledDate"></cys-date-picker>
    <cys-date-picker placeholder="选择日期" type="date" :disabled-date="calendarDisabledDate"></cys-date-picker>
</template>

<script>
    export default {
        methods:{
            calendarDisabledDate(current){
                // 小于当前日期的禁用
                return  current.isBefore(moment().endOf('day')) ;
            }
        }
    }
</script>
```

:::

## 时间选择

:::demo 通过 `type` 指定选择模式`time` `datetime`

```html
<template>
    <cys-date-picker placeholder="选择时间" v-model="time" type="time"></cys-date-picker>
    <cys-date-picker placeholder="选择时间" type="datetime"></cys-date-picker>
</template>
```

:::

## 日历选择

:::demo 通过 `type` 指定选择模式`date` `month` `year` `time`,设置选中配置`value`

```html
<template>
    <cys-calendar type="year"></cys-calendar>
    <cys-calendar type="month"></cys-calendar>
    <cys-calendar type="date"></cys-calendar>
    <cys-calendar type="time"></cys-calendar>
</template>
```

:::

## 日历禁用

:::demo 设置`disabled-date`属性，方法返回`true`禁用，参数`moment` 可以参照相关的文档 [moment](http://momentjs.cn/docs/)

```html
<template>
    <cys-calendar type="year" :disabled-date="calendarDisabledDate"></cys-calendar>
    <cys-calendar type="month" :disabled-date="calendarDisabledDate"></cys-calendar>
    <cys-calendar type="date" :disabled-date="calendarDisabledDate"></cys-calendar>
</template>

<script>
    export default {
        methods:{
            calendarDisabledDate(current){
                // 小于当前日期的禁用
                return  current.isBefore(moment().endOf('day')) ;
            }
        }
    }
</script>
```

:::

## CysDatePicker Attributes

| 参数          | 说明                                                                                | 类型                  | 可选值               | 默认值 |
| ------------- | ----------------------------------------------------------------------------------- | --------------------- | -------------------- | ------ |
| type          | 时间选择模式                                                                        | string                | year/month/date/time | date   |
| disabled      | 禁用                                                                                | boolean               | —                    | false  |
| readonly      | 是否只读                                                                            | boolean               | —                    | false  |
| placeholder   | 输入框占位文本                                                                      | string                | —                    | —      |
| value         | 绑定值                                                                              | string                | —                    | —      |
| format        | 日期格式化，参照 moment.js 的格式化规则                                             | string                | —                    | —      |
| disabled-date | 禁用部分日期选择,参数为[moment](http://momentjs.cn/docs/)对象，返回 true 禁用该日期 | function(currnetDate) | —                    | —      |
| show-icon     | 是否显示图标                                                                        | boolean               | —                    | true   |

## CysCalendar Attributes

| 参数          | 说明                                                                                | 类型                  | 可选值               | 默认值 |
| ------------- | ----------------------------------------------------------------------------------- | --------------------- | -------------------- | ------ |
| type          | 时间选择模式                                                                        | string                | year/month/date/time | date   |
| value         | 绑定值                                                                              | string                | —                    | —      |
| border        | 绑定值                                                                              | boolean               | —                    | true   |
| disabled-date | 禁用部分日期选择,参数为[moment](http://momentjs.cn/docs/)对象，返回 true 禁用该日期 | function(currnetDate) | —                    | —      |

## CysCalendar Events

| 事件名称    | 说明     | 回调参数       |
| ----------- | -------- | -------------- |
| date-select | 选中触发 | (date: Moment) |
