<script>
  module.exports = {
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
            },
            {
              type: "datetimerange",
              label: "申请时间",
              field: "date",
              value: ["2020-12-03 00:00:00", "2021-01-23 23:59:59"],
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
      search(val) {
        console.log(val);
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
      :data="form.data"
      :btns="form.btns"
      :direction="'vertical'"
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
              val2Object: {
                startTime: "",
                endTime: ""
              }
            }
          ]
        }
      };
    },
    methods: {
      search(val) {
        console.log(val);
      }
    }
  };
</script>
```

:::
