<template>
  <div class="cys-form--inline">
    <div class="cys-form-label" v-html="option.label"></div>
    <div class="cys-form-content">
      <cys-date-picker
        v-model="option.value"
        :type="option.type"
        @change="change"
        :placeholder="option.placeholder || '选择时间'"
        :disabledDate="option.disabledDate"
        :clearable="option.clearable || false"
        :disabled="option.disabled || false"
      ></cys-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  name: "CysFormDate",
  componentName: "CysFormDate",
  props: {
    option: {
      current: Number,
      type: Object,
      default: {}
    }
  },
  methods: {
    change(val) {
      const obj = {};
      if (
        this.option.type === "daterange" ||
        this.option.type === "datetimerange"
      ) {
        if (this.option.arr2Obj) {
          Object.keys(this.option.arr2Obj).forEach((key, index) => {
            obj[key] = val[index] || "";
          });
        } else {
          obj["startTime"] = val[0] || "";
          obj["endTime"] = val[1] || "";
        }
      } else {
        obj[this.option.field] = val;
      }
      this.$emit("change", obj, this.option.field);
    }
  }
};
</script>
