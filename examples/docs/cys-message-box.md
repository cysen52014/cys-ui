<script>
  import  MessageBox  from '../../src/components/cys-message-box/cys-message-box.js';
  export default {
    data() {
      return {
        ModalVisible: false
      };
    },
    methods:{
      messageAlert(){
        this.$shAlert("提示内容","标题",{
          callback(){
            alert("回调函数")
          }
        })
      },
      messageConfirm(){
         this.$shConfirm("是否确认操作","提示信息",{
          callback(type){
            if(type==="confirm"){
              alert("确定操作")
            }else{
              alert("取消操作")
            }
          }
        })
      },
      messagebox(){
          MessageBox.alert("提示内容","标题",{
            callback(){
              alert("回调函数")
            }
          })
      }
    }
  };
</script>

# 消息窗口

## 消息提示

:::demo 通过`this.$shAlert(message,title,options)`或者`this.$shAlert(message,options)`方法全局调用

```html
<template>
  <cys-button type="text" @click="messageAlert">消息提示</cys-button>
</template>

<script>
  export default {
    data() {
      return {
        ModalVisible: false
      };
    },
    methods:{
      messageAlert(){
        this.$shAlert("提示内容","标题",{
          callback:()=>{
            alert("回调函数")
          }
        })
      }
    }
  };
</script>
```

:::

## 确认消息

:::demo 通过`this.$shConfirm(message,title,options)`或者`this.$shConfirm(message,options)`方法全局调用

```html
<template>
  <cys-button type="text" @click="messageConfirm">确认消息</cys-button>
</template>

<script>
  export default {
    data() {
      return {
        ModalVisible: false
      };
    },
    methods:{
      messageConfirm(){
        this.$shConfirm("是否确认操作","提示信息",{
          callback:type=>{
            if(type==="confirm"){
              alert("确定操作")
            }else{
              alert("取消操作")
            }
          }
        })
      }
    }
  };
</script>
```

:::

## 单独引用

:::demo 引入文件通过`MessageBox.alert`和`MessageBox.confirm`单独调用

```html
<template>
  <cys-button type="text" @click="messagebox">单独引用</cys-button>
</template>

<script>
import  MessageBox  from 'cys-message-box.js';
MessageBox.alert("提示内容","标题",{
  callback(){
    alert("回调函数")
  }
})
</script>
```

:::

### Options

| 参数        | 说明                              | 类型                                               | 可选值 | 默认值 |
| ----------- | --------------------------------- | -------------------------------------------------- | ------ | ------ |
| title       | MessageBox 标题                   | string                                             | —      | —      |
| message     | MessageBox 消息正文内容           | string / VNode                                     | —      | —      |
| callback    | MessageBox 关闭后的回调           | function(action)，action 的值为'confirm'或'cancel' | —      | —      |
| showClose   | MessageBox 是否显示右上角关闭按钮 | boolean                                            | —      | true   |
| cancelText  | 取消按钮的文本内容                | string                                             | —      | 取消   |
| confirmText | 确定按钮的文本内容                | string                                             | —      | 确定   |
