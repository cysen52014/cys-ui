<script>
  module.exports = {
    componentName: "formexmple",
    data() {
      return {
        form: {
          btns: [
            {
              label: "查询",
              action: this.search
            }
          ],
          data: [
            {
              type: "input",
              label: "申请时间",
              field: "ipu",
              value: "",
              placeholder: "全部",
              clearable: true
            },
            {
              type: "cascader",
              label: "日期",
              field: "ipu2",
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
              ],
              placeholder: "全部",
              clearable: true
            },
            {
              type: "select",
              label: "收件方式",
              field: "receiptType",
              value: "",
              placeholder: "全部",
              options: [],
              filter: true,
              clearable: true
            },
            {
              type: "daterange",
              label: "申请时间",
              field: "date",
              value: [],
              placeholder: "申请时间",
              clearable: true,
              arr2Obj: {
                startTime: "",
                endTime: ""
              }
            }
          ]
        }
      };
    },
    created() {
      setTimeout(() => {
        this.form.data[2].options = [
                {
                  label: "邮寄",
                  value: "1"
                },
                {
                  label: "电子邮箱",
                  value: "2"
                },
                {
                  label: "自取",
                  value: "3"
                },
                {
                  label: "邮寄",
                  value: "1"
                },
                {
                  label: "电子邮箱",
                  value: "2"
                },
                {
                  label: "自取",
                  value: "3"
                },
                {
                  label: "邮寄",
                  value: "1"
                },
                {
                  label: "电子邮箱",
                  value: "2"
                },
                {
                  label: "自取",
                  value: "3"
                }
              ]
      }, 1000)
    },
    methods: {
      change(val) {
        console.log(val);
      },
      search(val) {
        console.log(val, '==');
      }
    }
  };
</script>

# CysFormSearch 表单

## 基础用法

:::demo 通过`plain`属性可以设置为朴素的按钮

```html
<template>
  <div>
    <cys-form-search
      :props="{ showRest: true }"
      :data="form.data"
      :btns="form.btns"
      :direction="'vertical'"
      @change="change"
    ></cys-form-search>
  </div>
</template>

<script>
  export default {
    componentName: "formexmple",
    data() {
      return {
        form: {
          btns: [
            {
              label: "查询",
              action: "search"
            }
          ],
          data: [
            {
              type: "input",
              label: "输&nbsp;&nbsp;入&nbsp;&nbsp;框",
              field: "ipu",
              value: "",
              placeholder: "全部",
            },
            {
              type: "select",
              label: "收件方式",
              field: "receiptType",
              value: "",
              placeholder: "全部",
              options: [
                {
                  label: "邮寄",
                  value: "1"
                },
                {
                  label: "电子邮箱",
                  value: "2"
                },
                {
                  label: "自取",
                  value: "3"
                }
              ],
              filter: true,
              clearable: true
            }
            {
              type: "daterange",
              label: "申请时间",
              field: "date",
              value: [],
              placeholder: "申请时间",
              clearable: true,
              arr2Obj: {
                startTime: "",
                endTime: ""
              }
            }
          ]
        }
      };
    },
    methods: {
      change(val) {
        console.log(val);
      },
      search(val) {
        console.log(val);
      }
    }
  };
</script>
```

:::


## cysFormSearch Attributes

| 参数        | 说明              | 类型    | 可选值 | 默认值 |
| ----------- | ----------------- | ------- | ------ | ------ |
| btns        | 按钮定义          | array   | —      | —      |
| data        | 表单元素          | array   | —      | -  |
| direction   | 排列方向          | string  | vertical,horizontal     | horizontal |
| pointer     | 绑定表格组件ref的名称，如在表格组件上加ref="cys-ref-table",就能让表单搜索关联表格组件          | string  |  -  | cys-ref-table |
| parent      | 表单父层组件绑定, 例如在想要父组件加上componentName: "pm"        | string  |  -  | - |


## btns 数组配置说明

| 参数        | 说明              | 类型    | 可选值 | 默认值 |
| ----------- | ----------------- | ------- | ------ | ------ |
| label       | 按钮名称          |  string  | —      | —      |
| action      | 点击按钮响应方法，且返回表单元素返回值 |  funciton  | —      | —      |

## data 数组配置说明

| 参数        | 说明              | 类型    | 可选值 | 默认值 |
| ----------- | ----------------- | ------- | ------ | ------ |
| type        | 类型              | input,select,daterange,date,cascader   | —      | —      |
| field       | 表单元素绑定搜索字段名称 | string  | —      | —      |
| label       | 表单元素label名称 | string  | —      | —      |
| value       | 表单元绑定值      | string,array  | —      | —      |
| placeholder | 表单元默认值      | string  | —      | —      |
| clearable   | 表单元素是否可清除 | boolean  | true,false |  false  |
| options     | 在类型为select,cascader使用，下拉框默认选项   | array  | —      | —      |
| filter      | 在类型为cascader使用,是否可搜索 | boolean  | true,false |  false  |
| interface      | 在类型为select,cascader使用,接收一个后台接口请求 | function  | - |  -  |
| cKey      | 在类型为select,cascader使用,接收一个后台接口请求返回值code字段名配置 | string  | - |  errorCode  |
| cVal      | 在类型为select,cascader使用,接收一个后台接口请求返回值code字段值配置 | string,number  | - |  "0"  |
| dKey      | 在类型为select,cascader使用,接收一个后台接口请求返回对象名配置 | string  | - |  data  |
| optionLabel | 在类型为select使用,配置option数组对象里的绑定的对象名称 | string  | - |  -  |
| optionValue | 在类型为select使用,配置option数组对象里的绑定的对象值 | string  | - |  -  |
| cashName | 在类型为select并且为interface接口使用, 配一个下拉元素字段值做为另一个下拉元素的拉取接口条件 | string  | - |  -  |
| arr2Obj     | 在类型为daterange使用,将日期控件返回数组值转换为表单想要的字段值 | object  | - |  -  |
| placeholder | 表单元默认值      | string  | —      | —      |