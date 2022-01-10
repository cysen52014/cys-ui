<script>
  module.exports = {
    data() {
      return {
        value: "",
        options: [
          {
            id: "sb_1",
            checkProjectName: "软件类",
            parentId: "sb_0",
            children: [
              {
                id: "sb_2",
                checkProjectName: "同步服务",
                parentId: "sb_1",
                children: []
              },
              {
                id: "sb_3",
                checkProjectName: "岗亭系统",
                parentId: "sb_1",
                children: [{ id: 3, checkProjectName: "软件失联", parentId: 3 }]
              },
              {
                id: "sb_4",
                checkProjectName: "本地数据库",
                parentId: "sb_1",
                children: [{ id: 4, checkProjectName: "订单表", parentId: 4 }]
              },
              {
                id: "sb_5",
                checkProjectName: "AI机器人软件",
                parentId: "sb_1",
                children: [
                  { id: 5, checkProjectName: "软件失联", parentId: 5 },
                  { id: 6, checkProjectName: "呼叫异常", parentId: 5 }
                ]
              },
              {
                id: "sb_6",
                checkProjectName: "软件运行",
                parentId: "sb_1",
                children: [
                  { id: 7, checkProjectName: "软件运行缓慢", parentId: 6 }
                ]
              }
            ]
          },
          {
            id: "sb_7",
            checkProjectName: "硬件类",
            parentId: "sb_0",
            children: [
              {
                id: "sb_8",
                checkProjectName: "电脑",
                parentId: "sb_7",
                children: [
                  { id: 8, checkProjectName: "硬盘分区情况", parentId: 8 }
                ]
              },
              {
                id: "sb_9",
                checkProjectName: "出口闸道",
                parentId: "sb_7",
                children: [
                  { id: 9, checkProjectName: "出口落杆异常/断杆", parentId: 9 }
                ]
              },
              {
                id: "sb_10",
                checkProjectName: "识别一体机",
                parentId: "sb_7",
                children: [
                  { id: 10, checkProjectName: "相机无响应/卡死", parentId: 10 }
                ]
              },
              {
                id: "sb_11",
                checkProjectName: "AI机器人硬件",
                parentId: "sb_7",
                children: [
                  { id: 11, checkProjectName: "麦克风损坏", parentId: 11 },
                  { id: 12, checkProjectName: "钱箱已满", parentId: 11 },
                  { id: 13, checkProjectName: "打印机缺纸", parentId: 11 }
                ]
              }
            ]
          },
          {
            id: "sb_12",
            checkProjectName: "综合类",
            parentId: "sb_0",
            children: [
              {
                id: "sb_13",
                checkProjectName: "某一关键环境故障",
                parentId: "sb_12",
                children: [
                  { id: 14, checkProjectName: "系统异常", parentId: 13 }
                ]
              }
            ]
          }
        ]
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
    style="width: 212px;"
    :props="{ showAllLevels: true, checkStrictly: true, label: 'checkProjectName', value: 'id' }"
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
            id: "sb_1",
            checkProjectName: "软件类",
            parentId: "sb_0",
            children: [
              {
                id: "sb_2",
                checkProjectName: "同步服务",
                parentId: "sb_1",
                children: [
                  { id: 1, checkProjectName: "软件失联", parentId: 2 },
                  { id: 2, checkProjectName: "与云端通信不稳定", parentId: 2 }
                ]
              },
              {
                id: "sb_3",
                checkProjectName: "岗亭系统",
                parentId: "sb_1",
                children: [{ id: 3, checkProjectName: "软件失联", parentId: 3 }]
              },
              {
                id: "sb_4",
                checkProjectName: "本地数据库",
                parentId: "sb_1",
                children: [{ id: 4, checkProjectName: "订单表", parentId: 4 }]
              },
              {
                id: "sb_5",
                checkProjectName: "AI机器人软件",
                parentId: "sb_1",
                children: [
                  { id: 5, checkProjectName: "软件失联", parentId: 5 },
                  { id: 6, checkProjectName: "呼叫异常", parentId: 5 }
                ]
              },
              {
                id: "sb_6",
                checkProjectName: "软件运行",
                parentId: "sb_1",
                children: [
                  { id: 7, checkProjectName: "软件运行缓慢", parentId: 6 }
                ]
              }
            ]
          },
          {
            id: "sb_7",
            checkProjectName: "硬件类",
            parentId: "sb_0",
            children: [
              {
                id: "sb_8",
                checkProjectName: "电脑",
                parentId: "sb_7",
                children: [
                  { id: 8, checkProjectName: "硬盘分区情况", parentId: 8 }
                ]
              },
              {
                id: "sb_9",
                checkProjectName: "出口闸道",
                parentId: "sb_7",
                children: [
                  { id: 9, checkProjectName: "出口落杆异常/断杆", parentId: 9 }
                ]
              },
              {
                id: "sb_10",
                checkProjectName: "识别一体机",
                parentId: "sb_7",
                children: [
                  { id: 10, checkProjectName: "相机无响应/卡死", parentId: 10 }
                ]
              },
              {
                id: "sb_11",
                checkProjectName: "AI机器人硬件",
                parentId: "sb_7",
                children: [
                  { id: 11, checkProjectName: "麦克风损坏", parentId: 11 },
                  { id: 12, checkProjectName: "钱箱已满", parentId: 11 },
                  { id: 13, checkProjectName: "打印机缺纸", parentId: 11 }
                ]
              }
            ]
          },
          {
            id: "sb_12",
            checkProjectName: "综合类",
            parentId: "sb_0",
            children: [
              {
                id: "sb_13",
                checkProjectName: "某一关键环境故障",
                parentId: "sb_12",
                children: [
                  { id: 14, checkProjectName: "系统异常", parentId: 13 }
                ]
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
