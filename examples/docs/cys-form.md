<script>
  export default {
    data() {
      return {
        formData: { name: "", mail: "", select: "" },
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        // rules: {
        //   name: [{ required: true, message: "不能为空", trigger: "blur" }],
        //   mail: [
        //     { required: true, message: "不能为空", trigger: "blur" },
        //     { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        //   ],
        //   select: [{ required: true, message: "不能为空", trigger: "change" }]
        // }
      };
    },
    methods: {
        handleSubmit() {
            console.log(this.$refs.form);
            this.$refs.form.validate((valid) => {
                if (valid)  console.log('提交成功');
                else console.log('校验失败');
            })
        },
        handleReset() { this.$refs.form.resetFields() }
    }
  };
</script>

# CysFormSearch 表单

## 基础用法

:::demo 通过`plain`属性可以设置为朴素的按钮

```html
<template>
  <div>
    <cys-form
      ref="form"
      v-model="formData"
      :label-width="'80px'"
      :inline="true"
    >
      <cys-form-item :label="'名称：'" :label-width="'80px'">
        <cys-input v-model="formData.name" placeholder="请输入内容"></cys-input>
      </cys-form-item>
      <cys-form-item :label="'邮箱：'">
        <cys-input v-model="formData.mail" placeholder="请输入内容"></cys-input>
      </cys-form-item>
      <cys-form-item :label="'邮箱11：'">
        <cys-select v-model="formData.select" placeholder="请选择">
          <cys-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </cys-option>
        </cys-select>
      </cys-form-item>
    </cys-form>
    <cys-button @click="handleSubmit">提交</cys-button>
    <cys-button plain @click="handleReset">重置</cys-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData: { name: "", mail: "", select: "" },
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        rules: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          mail: [
            { required: true, message: "不能为空", trigger: "blur" },
            { type: "email", message: "邮箱格式不正确", trigger: "blur" }
          ],
          select: [{ required: true, message: "不能为空", trigger: "change" }]
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) console.log("提交成功");
          else console.log("校验失败");
        });
      },
      handleReset() {
        this.$refs.form.resetFields();
      }
    }
  };
</script>
```

:::
