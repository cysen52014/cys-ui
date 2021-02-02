<template>
  <div class="cys-form--inline">
    <div class="cys-form-label" v-html="option.label"></div>
    <div class="cys-form-content">
      <cys-select
        v-model="option.value"
        :placeholder="option.placeholder || ''"
        :clearable="option.clearable || false"
        :disabled="option.disabled || false"
        :filter="option.filter || false"
        @change="change"
        @visible-change="visibleChange"
      >
        <cys-option
          v-for="(item, index) in getList"
          :key="index"
          :label="option.optionLabel ? item[option.optionLabel] : item.label"
          :value="option.optionValue ? item[option.optionValue] : item.value"
        >
        </cys-option>
      </cys-select>
    </div>
  </div>
</template>
<script>
export default {
  name: "CysFormSelect",
  componentName: "CysFormSelect",
  props: {
    option: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      list: [],
      cashValue: ""
    };
  },
  computed: {
    getList() {
      return this.list;
    }
  },
  created() {
    if (!this.option.cashName) {
      this.getOptions();
    }
  },
  methods: {
    visibleChange(val) {
      if (
        val &&
        this.option.cashName &&
        this.cashValue !==
          window.__storevueappdate__state_formData[this.option.cashName]
      ) {
        this.list = [];
        this.getOptions();
      }
    },
    getOptions() {
      if (this.option.interface) {
        const method = this.option.interface;
        const cKey = this.option.cKey || "errorCode";
        const cVal = this.option.cVal || "0";
        const dKey = this.option.dKey || "data";

        let params = this.option.params ? this.option.params : {};
        if (this.option.cashName) {
          const obj = {};
          obj[this.option.cashName] =
            window.__storevueappdate__state_formData[this.option.cashName];
          this.cashValue = obj[this.option.cashName];
          params = Object.assign({}, params, obj);
        } else {
          params = Object.assign({}, params);
        }
        method(params).then(respone => {
          if (respone[cKey] * 1 === cVal * 1) {
            this.option.options = respone[dKey];
            this.list = this.option.options;
          }
        });
      } else {
        this.list = this.option.options;
      }
    },
    change(val) {
      const obj = {};
      if (this.option.obj2Array) {
        obj[this.option.field] = val ? val.join(",") : "";
      } else {
        obj[this.option.field] = val ? val : "";
      }
      this.$emit("change", obj);
    }
  }
};
</script>
