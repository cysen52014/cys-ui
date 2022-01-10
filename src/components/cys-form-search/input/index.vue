<template>
  <div class="cys-form--inline">
    <div class="cys-form-label" v-html="option.label"></div>
    <div class="cys-form-content">
      <cys-input
        v-model="option.value"
        :placeholder="option.placeholder"
        :clearable="option.clearable || false"
        :disabled="option.disabled || false"
        @input="change"
      ></cys-input>
    </div>
  </div>
</template>
<script>
export default {
  name: "CysFormInput",
  componentName: "CysFormInput",
  props: {
    current: Number,
    option: {
      type: Object,
      default: {}
    }
  },
  methods: {
    change(val) {
      const obj = {};
      obj[this.option.field] = val;
      this.$emit("change", obj, this.option.field);
    }
  }
};
</script>
