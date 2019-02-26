<script>
  const data = [{
    label: '一级 1',
    children: [{
      label: '二级 1-1',
      children: [{
        label: '三级 1-1-1'
      }]
    }]
  }, {
    label: '一级 2',
    children: [{
      label: '二级 2-1',
      children: [{
        label: '三级 2-1-1'
      }]
    }, {
      label: '二级 2-2',
      children: [{
        label: '三级 2-2-1'
      }]
    }]
  }, {
    label: '一级 3',
    children: [{
      label: '二级 3-1',
      children: [{
        label: '三级 3-1-1'
      }]
    }, {
      label: '二级 3-2',
      children: [{
        label: '三级 3-2-1'
      }]
    }]
  }];


const data1 = [{
    label: '一级 1',
    children: [{
      label: '二级 1-1',
      children: [{
        label: '三级 1-1-1'
      }]
    }]
  }, {
    label: '一级 2',
    children: [{
      label: '二级 2-1',
      children: [{
        label: '三级 2-1-1'
      }]
    }, {
      label: '二级 2-2',
      children: [{
        label: '三级 2-2-1'
      }]
    }]
  }, {
    label: '一级 3',
    children: [{
      label: '二级 3-1',
      children: [{
        label: '三级 3-1-1'
      }]
    }, {
      label: '二级 3-2',
      children: [{
        label: '三级 3-2-1'
      }]
    }]
  }];

export default {
    data(){
        return {
            data:data,
            data1:data1
        }
    }
}
</script>

# CysTree 树结构

## 基础用法

:::demo 基础的树形结构展示。

```html
<template>
  <cys-tree :data="data" ></cys-tree>
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>
```

:::

## 可选择

:::demo 复选框勾选级联操作

```html
<template>
  <cys-tree
    :data="data"
    show-checkbox>
  </cys-tree>
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }]
      };
    }
  };
</script>
```

:::

## 默认展开和选中

:::demo `default-expand-all`默认展开所有节点，`default-checked-keys`数组包含`node-key`字段的值选中

```html
<template>
  <cys-tree
    :data="data1"
    node-key="label"
    :default-expand-all="true"
    :default-checked-keys="['一级 2']"
    show-checkbox>
  </cys-tree>
</template>

<script>
  export default {
    data() {
      return {
        data1: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }]
      };
    }
  };
</script>
```

:::

## 自定义节点内容

:::demo `slot-scoped`设置自定义内容渲染，`node`包装数据，`data`原始数据

```html
<template>
  <cys-tree
    :data="data1"
    node-key="label"
    :default-expand-all="true">
    <span slot-scope="{ node, data }">
        {{data.label}} 【{{data.children?data.children.length:0}}】
    </span>
  </cys-tree>
</template>

<script>
  export default {
    data() {
      return {
        data1: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }]
      };
    }
  };
</script>
```

:::

## CysTree Attributes

| 参数                  | 说明                                       | 类型                | 可选值 | 默认值   |
| --------------------- | ------------------------------------------ | ------------------- | ------ | -------- |
| data                  | 展示数据                                   | array               | —      | —        |
| childrenKey           | 子节点对应的字段                           | string              | —      | children |
| textKey               | 节点显示文本字段                           | string              | —      | label    |
| indent                | 节点缩进左侧边距                           | number              | —      | 18       |
| showCheckbox          | 显示复选框                                 | boolean             | —      | false    |
| defaultExpandAll      | 默认展开素有的节点                         | boolean             | —      | false    |
| autoExpandParent      | 勾选自动展开父节点                         | boolean             | —      | true     |
| showCollapse          | 显示折叠三角图标                           | boolean             | —      | true     |
| filterNode            | 节点过滤方法                               | Function(node,data) | —      | —        |
| emptyText             | 无数据显示文本                             | string              | —      | 暂无数据 |
| nodeKey               | 节点数据唯一标识字段                       | string              | —      | id       |
| defaultCheckedKeys    | 默认选中节点`node-key`对应的数组           | array               | —      | —        |
| checkParentStrictly   | 父节点严格模式，勾选子节点，父节点不级联   | boolean             | —      | false    |
| checkChildrenStrictly | 子节点严格模式，勾选自父节点，子节点不级联 | boolean             | —      | false    |
| defaultSelectKey      | 默认选中节点的`node-key`对应的值           | string              | —      | —        |
| disabledSelect        | 禁用单行选中                               | boolean             | —      | true     |

## CysTree Methods

| 方法名         | 说明                             | 参数                                                        |
| -------------- | -------------------------------- | ----------------------------------------------------------- |
| getNodes       | 获取所有的节点                   | —                                                           |
| setCheckedKeys | 设置选中节点，必须设置`node-key` | (keys, leafOnly=false) 勾选的 keys ，只是叶子节点选中不级联 |
| setSelectKey   | 设置选中节点，必须设置`node-key` | key 要选中节点的 key                                        |

## CysTree Events

| 事件名称          | 说明                   | 回调参数                                              |
| ----------------- | ---------------------- | ----------------------------------------------------- |
| node-click        | 节点被点击时的回调     | (node,data,treeNode) 节点包装数据、节点数据、节点本身 |
| check-change      | 节点选中状态           | (node,data,treeNode) 节点包装数据、节点数据、节点本身 |
| node-expand       | 节点展开               | (node,data,treeNode) 节点包装数据、节点数据、节点本身 |
| node-collapse     | 节点折叠               | (node,data,treeNode) 节点包装数据、节点数据、节点本身 |
| parent-node-check | 父节点勾选状态改变触发 | (node,data,treeNode) 节点包装数据、节点数据、节点本身 |

## CysTree Slot

| 名称 | 说明                                      |
| ---- | ----------------------------------------- |
| —    | 自定义树节点的内容，参数为 { node, data } |
