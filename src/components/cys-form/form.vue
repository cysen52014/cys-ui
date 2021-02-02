<template>
  <div class="cys-form" :class="inline ? 'inline' : ''">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "CysForm",
  componentName: "CysForm",
  data() {
    return { fields: [] };
  },
  props: {
    value: { type: Object },
    rules: { type: Object },
    labelWidth: { type: String, default: "" },
    inline: {
      type: Boolean
    }
  },
  provide() {
    return { form: this };
  },
  methods: {
    resetFields() {
      this.fields.forEach(field => field.resetField());
    },
    validate(cb) {
      return new Promise(resolve => {
        let valid = true,
          count = 0;
        if (this.fields.length < 1) {
          resolve(valid);
          if (typeof cb === "function") cb(valid);
          return;
        }
        this.fields.forEach(field => {
          field.validate("", error => {
            if (error) valid = false;
            if (++count === this.fields.length) {
              resolve(valid);
              if (typeof cb === "function") cb(valid);
            }
          });
        });
      });
    }
  },
  created() {
    this.$on("form-add", field => {
      if (field) this.fields.push(field);
    });
    this.$on("form-remove", field => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  }
};
</script>
<style lang="stylus" scoped>
.cys-form {
  /deep/ .cys-form-item {
    display: flex;
    line-height 36px;
    margin-bottom 10px;
    .label {
      display: inline-block;
      text-align right
      margin-right 5px
    }
    .cys-form-input {
      position relative
      flex 1
    }
  }
  &.inline {
    display flex;
    /deep/ .cys-form-item {
      display inline-flex;
    }
  }
}
</style>
