<template>
  <div class="cys-form-item">
    <label
      :for="labelFor"
      v-if="label"
      :class="['label', { 'label-required': isRequired }]"
      :style="bW"
      >{{ label }}</label
    >
    <div class="cys-form-input">
      <slot></slot>
      <div v-if="isShowMes" class="message">{{ message }}</div>
    </div>
  </div>
</template>
<script>
import AsyncValidator from "async-validator";
import Emitter from "../../mixins/emitter.js";
export default {
  name: "CysFormItem",
  componentName: "CysFormItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    label: { type: String, default: "" },
    prop: { type: String },
    rules: { type: Array }
  },
  data() {
    return {
      isRequired: false,
      isShowMes: false,
      message: "",
      labelFor: "input" + new Date().valueOf()
    };
  },
  mounted() {
    if (this.prop) {
      this.dispatch("CysForm", "form-add", this);
      // 设置初始值
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  // 组件销毁前，将实例从 Form 的缓存中移除
  beforeDestroy() {
    this.dispatch("CysForm", "form-remove", this);
  },
  computed: {
    fieldValue() {
      const ap = String(this.prop).split(".");
      if (ap.length > 0) {
        let ab = this.form.value;
        ap.forEach(a => {
          ab = ab[a];
        });
        return ab;
      } else {
        return this.form.value[this.prop];
      }
    },
    bW() {
      const wd =
        parseInt(this.labelWidth ? this.labelWidth : this.form.labelWidth) ||
        "";
      return `width: ${wd}px;`;
    }
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.forEach(rule => {
          if (rule.required !== undefined) this.isRequired = rule.required;
        });
      }
      this.$on("form-blur", this.onFieldBlur);
      this.$on("form-change", this.onFieldChange);
    },
    getRules() {
      if (this.rules) {
        return this.rules || [];
      } else {
        let formRules = this.form.rules;
        formRules = formRules ? formRules[this.prop] : [];
        return formRules;
      }
    },
    // 过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    /**
     * 校验表单数据
     * @param trigger 触发校验类型
     * @param callback 回调函数
     */
    validate(trigger, cb) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) return true;
      // 使用 async-validator
      const Rul = rules.map(r => {
        if (!r.validator && r.required) {
          r.validator = (rule, value, callback) => {
            if (typeof value !== "number") {
              if (!value || (typeof value === "object" && value.length === 0)) {
                callback(new Error(r.message));
              } else {
                callback();
              }
            } else {
              callback();
            }
          };
        }
        return r;
      });
      const validator = new AsyncValidator({ [this.prop]: rules });
      let model = { [this.prop]: this.fieldValue };
      validator.validate(model, { firstFields: true }, errors => {
        this.isShowMes = errors ? true : false;
        this.message = errors ? errors[0].message : "";
        if (cb) cb(this.message);
      });
    },
    resetField() {
      this.message = "";
      this.form.value[this.prop] = this.initialValue;
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    }
  }
};
</script>
<style lang="stylus" scoped>
.label-required:before {
  content: "*";
  color: red;
}
.message {
  font-size: 12px;
  color: red;
  display block;
  line-height 20px;
}
</style>
