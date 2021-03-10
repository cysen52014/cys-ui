<script>
  module.exports = {
    methods: {
      deleted() {
        console.log("deleted");
      },
      toggleRowExpansion(row) {
        row.isOpen = !row.isOpen
        this.$refs["expanTable"].toggleRowExpansion(row, row.isOpen);
      },
      selectionChange(row) {
        console.log("selectionChange", row);
      }
    },
    data() {
      return {
        options: {
          isPagination: false,
          isIndex: true,
          thead: {
            column: [
              {
                label: "表头列一",
                prop: "aa"
              },
              {
                label: "表头列二",
                prop: "bb",
                slotName: "bb",
                style: {
                  width: "100px"
                }
              },
              {
                label: "表头列三",
                prop: "cc"
              }
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  },
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  },
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        },
        options1: {
          isPagination: false,
          thead: {
            column: [
              {
                label: "表头列一",
                prop: "aa",
                style: {
                  width: "100px"
                }
              },
              {
                label: "表头列二",
                prop: "bb"
              },
              {
                label: "表头列三",
                prop: "cc"
              }
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三"
                  },
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三"
                  },
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三"
                  },
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        },
        options2: {
          isPagination: false,
          thead: {
            column: [
              {
                label: "表头列一",
                prop: "aa"
              },
              {
                label: "表头列二",
                prop: "bb"
              },
              {
                label: "表头列三",
                prop: "cc",
                fixed: "right",
                style: {
                  width: "200px"
                }
              },
              {
                label: "操作",
                prop: "dd",
                slotName: "dd",
                fixed: "right",
                style: {
                  width: "200px"
                }
              }
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三",
                    dd: "cz"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三",
                    dd: "cz"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三",
                    dd: "cz"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        },
        options3: {
          isPagination: true,
          isLoading: true,
          isSelection: true,
          selectionFixed: "left",
          isIndex: true,
          thead: {
            column: [
              {
                label: "表头列一",
                prop: "aa"
              },
              {
                label: "表头列二",
                prop: "bb"
              },
              {
                label: "表头列三",
                prop: "cc"
              }
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: {
                  total: 19,
                  list: [
                    {
                      aa: "列1一",
                      bb: "列1二",
                      cc: "列1三"
                    },
                    {
                      aa: "列2一",
                      bb: "列2二",
                      cc: "列2三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列1一",
                      bb: "列1二",
                      cc: "列1三",
                      dd: "cz"
                    },
                    {
                      aa: "列2一",
                      bb: "列2二",
                      cc: "列2三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列2一",
                      bb: "列2二",
                      cc: "列2三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列2一",
                      bb: "列2二",
                      cc: "列2三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列2一",
                      bb: "列2二",
                      cc: "列2三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列2一",
                      bb: "列2二",
                      cc: "列2三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    }
                  ]
                }
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        },
        options4: {
          isLoading: true,
          isIndex: true,
          indexFixed: true,
          selectionFixed: true,
          isSelection: true,
          thead: {
            column: [[
              {id:"1",label:"商务中心", prop: "orgName", rowspan:2, colspan:1},
              {id:"2",label:"月累",rowspan:1,colspan:4},
              {id:"3",label:"年累",rowspan:1,colspan:4}
            ],[
               	{id:"21",label:"实际",prop:"actM"},
                {id:"22",label:"偏差",prop:"diffM"},
                {id:"23",label:"同比",prop:"tbM"},
                {id:"24",label:"环比",prop:"hbM"},
                {id:"31",label:"实际",prop:"actY"},
                {id:"32",label:"偏差",prop:"diffY"},
                {id:"33",label:"同比",prop:"tbY"},
                {id:"34",label:"环比",prop:"hbY"}
            ]]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    id: 1,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  },
                  {
                    id: 2,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  },
                  {
                    id: 3,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        },
        options5: {
          isPagination: false,
          thead: {
            column: [
              {
                label: "内表格列一",
                prop: "aa",
                style: {
                  width: "100px"
                }
              },
              {
                label: "内表格列二",
                prop: "bb"
              },
              {
                label: "内表格列三",
                prop: "cc"
              }
            ]
          },
          method: {
            interface: (parmas) => {
              console.log("parmas", parmas)
              return {
                errorCode: "0",
                data: [
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  },
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  },
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {
              id: "aaaa"
            }, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        },
        options6: {
          isLoading: true,
          thead: {
            column: [
              [
                {
                  id: "1",
                  label: "商务中心",
                  prop: "orgName",
                  expand: true,
                  rowspan: 2,
                  colspan: 1
                },
                { id: "2", label: "月累", rowspan: 1, colspan: 4 },
                { id: "3", label: "年累", rowspan: 1, colspan: 4 }
              ],
              [
                { id: "21", label: "实际", prop: "actM" },
                { id: "22", label: "偏差", prop: "diffM" },
                { id: "23", label: "同比", prop: "tbM" },
                { id: "24", label: "环比", prop: "hbM" },
                { id: "31", label: "实际", prop: "actY" },
                { id: "32", label: "偏差", prop: "diffY" },
                { id: "33", label: "同比", prop: "tbY" },
                { id: "34", label: "环比", prop: "hbY" }
              ]
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    id: 1,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  },
                  {
                    id: 2,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  },
                  {
                    id: 3,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        }
      };
    }
  };
</script>

# CysTable 表格

## 基础用法

:::demo

```html
<template>
  <cys-table :options="options" :striped="true" :border="true"
    ><div slot="bb" slot-scope="scope">插槽</div></cys-table
  >
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
                label: "表头列一",
                prop: "aa"
              },
              {
                label: "表头列二",
                prop: "bb",
                slotName: "bb",
                style: {
                  width: "100px"
                }
              },
              {
                label: "表头列三",
                prop: "cc"
              }
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  },
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  },
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        }
      };
    }
  };
</script>
```

:::

## 固定表头

:::demo 只要在 cys-table 元素中定义了 height 属性，即可实现固定表头的表格，而不需要额外的代码。

```html
<template>
  <cys-table :options="options1" :border="true" height="250"
    ><div slot="bb" slot-scope="scope">额鹅鹅鹅</div></cys-table
  >
</template>
<script>
  export default {
    data() {
      return {
        options1: {
          isPagination: false,
          thead: {
            column: [
              {
                label: "表头列一",
                prop: "aa",
                style: {
                  width: "100px"
                }
              },
              {
                label: "表头列二",
                prop: "bb"
              },
              {
                label: "表头列三",
                prop: "cc"
              }
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三"
                  },
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三"
                  },
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三"
                  },
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        }
      };
    }
  };
</script>
```

:::

## 固定列

:::demo 固定列需要使用 fixed 属性，它接受值 left, right，表示左边固定还是右边固定。

```html
<template>
  <cys-table :options="options2"
    ><div slot="dd" slot-scope="scope">
      固定列<a @click="deleted">删除</a><a>添加</a>
    </div></cys-table
  >
</template>
<script>
  export default {
    data() {
      return {
        options2: {
          isPagination: false,
          thead: {
            column: [
              {
                label: "表头列一",
                prop: "aa"
              },
              {
                label: "表头列二",
                prop: "bb"
              },
              {
                label: "表头列三",
                prop: "cc",
                fixed: "right",
              },
              {
                label: "操作",
                prop: "dd",
                slotName: "dd",
                fixed: "right",
                style: {
                  width: "200px"
                }
              }
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    aa: "列1一",
                    bb: "列1二",
                    cc: "列1三",
                    dd: "cz"
                  },
                  {
                    aa: "列2一",
                    bb: "列2二",
                    cc: "列2三",
                    dd: "cz"
                  },
                  {
                    aa: "列3一",
                    bb: "列3二",
                    cc: "列3三",
                    dd: "cz"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        }
      };
    },
    methods: {
      deleted() {
        console.log("deleted");
      }
    }
  };
</script>
```

:::

## 表格分页

:::demo

```html
<template>
  <cys-table :options="options3" :striped="true" :border="true" @change="selectionChange"></cys-table>
</template>
<script>
  export default {
    data() {
      return {
        options3: {
          isPagination: true,
          isLoading: true,
          isSelection: true,
          isIndex: true,
          thead: {
            column: [
              {
                label: "表头列一",
                prop: "aa"
              },
              {
                label: "表头列二",
                prop: "bb"
              },
              {
                label: "表头列三",
                prop: "cc"
              }
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: {
                  total: 100,
                  list: [
                    {
                      aa: "列1一",
                      bb: "列1二",
                      cc: "列1三"
                    },
                    {
                      aa: "列2一",
                      bb: "列2二",
                      cc: "列2三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列1一",
                      bb: "列1二",
                      cc: "列1三",
                      dd: "cz"
                    },
                    {
                      aa: "列2一",
                      bb: "列2二",
                      cc: "列2三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    },
                    {
                      aa: "列3一",
                      bb: "列3二",
                      cc: "列3三"
                    }
                  ]
                }
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        }
      };
    }
  };
</script>
```

:::

## 多表头

:::demo

```html
<template>
  <cys-table
    :options="options4"
    :striped="true"
    :border="true"
    ></cys-table>
</template>
<script>
  export default {
    data() {
      return {
        options4: {
          isLoading: true,
          isIndex: true,
          thead: {
            column: [[
              {id:"1",label:"商务中心", prop: "orgName", rowspan:2, colspan:1},
              {id:"2",label:"月累",rowspan:1,colspan:4},
              {id:"3",label:"年累",rowspan:1,colspan:4}
            ],[
               	{id:"21",label:"实际",prop:"actM"},
                {id:"22",label:"偏差",prop:"diffM"},
                {id:"23",label:"同比",prop:"tbM"},
                {id:"24",label:"环比",prop:"hbM"},
                {id:"31",label:"实际",prop:"actY"},
                {id:"32",label:"偏差",prop:"diffY"},
                {id:"33",label:"同比",prop:"tbY"},
                {id:"34",label:"环比",prop:"hbY"}
            ]]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    id: 1,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  },
                  {
                    id: 2,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  },
                  {
                    id: 3,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        }
      };
    }
  };
</script>

```

:::

## 展开表格

:::demo

```html

<template>
  <cys-table
    ref="expanTable"
    :options="options6"
    :striped="true"
    :border="true"
    row-key="id"
    ><div slot="expand" slot-scope="scope"><cys-table :options="options5" :striped="true" :border="true"></cys-table></div></cys-table>
</template>
<script>
  export default {
    data() {
      return {
        options5: {
          isPagination: false,
          thead: {
            column: [
              {
                label: "内表格列一",
                prop: "aa",
                style: {
                  width: "100px"
                }
              },
              {
                label: "内表格列二",
                prop: "bb"
              },
              {
                label: "内表格列三",
                prop: "cc"
              }
            ]
          },
          method: {
            interface: (parmas) => {
              console.log("parmas", parmas)
              return {
                errorCode: "0",
                data: [
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  },
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  },
                  {
                    aa: "列一",
                    bb: "列二",
                    cc: "列三"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {
              id: "aaaa"
            }, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        },
        options6: {
          isLoading: true,
          thead: {
            column: [
              [
                {
                  id: "1",
                  label: "商务中心",
                  prop: "orgName",
                  expand: true,
                  rowspan: 2,
                  colspan: 1
                },
                { id: "2", label: "月累", rowspan: 1, colspan: 4 },
                { id: "3", label: "年累", rowspan: 1, colspan: 4 }
              ],
              [
                { id: "21", label: "实际", prop: "actM" },
                { id: "22", label: "偏差", prop: "diffM" },
                { id: "23", label: "同比", prop: "tbM" },
                { id: "24", label: "环比", prop: "hbM" },
                { id: "31", label: "实际", prop: "actY" },
                { id: "32", label: "偏差", prop: "diffY" },
                { id: "33", label: "同比", prop: "tbY" },
                { id: "34", label: "环比", prop: "hbY" }
              ]
            ]
          },
          method: {
            interface: () => {
              return {
                errorCode: "0",
                data: [
                  {
                    id: 1,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  },
                  {
                    id: 2,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  },
                  {
                    id: 3,
                    orgName: "wwww",
                    actM: "111",
                    tbM: "222",
                    hbM: "333",
                    actY: "44",
                    diffY: "55",
                    tbY: "6666",
                    hbY: "788"
                  }
                ]
              };
            }, // 调用表格数据接口方法
            parmas: {}, // 参数
            cVal: 0, // 接口返回参数值 默认0
            cKey: "errorCode", // 接口返回参数key 默认errorCode
            failed: () => {}, // 接口失败回调
            success: () => {} // 接口成功回调
          }
        }
      };
    }
  };
</script>

```

:::