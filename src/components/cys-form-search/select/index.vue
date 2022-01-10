<template>
  <div
    class="cys-form--inline"
    v-if="
      option.cashType !== 'hide' ||
        (option.cashType === 'hide' && option.visible)
    "
  >
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
  inject: ["parent"],
  props: {
    current: Number,
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
  watch: {
    "option.options": {
      handler(val) {
        this.list = val || [];
      },
      deep: true
    }
  },
  created() {
    if (!this.option.interface) {
      this.getOptions();
    }
  },
  methods: {
    visibleChange(val) {
      if (val) {
        if (this.option.cashName) {
          if (
            this.cashValue !==
              window.__storevueappdate__state_formData[this.option.cashName] ||
            window.__storevueappdate__state_field !== this.option.field
          ) {
            this.list = [];
            this.getOptions();
          }
        } else {
          if (this.list.length < 1) {
            this.getOptions();
          }
        }
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
    clearCashYN(val) {
      if (this.cva !== val) {
        const ca = this.option.ca;
        if (ca) {
          this.parent.setCashYN(ca, val);
        }
      }
    },
    change(val) {
      const obj = {};
      if (this.option.obj2Array) {
        obj[this.option.field] = val ? val.join(",") : "";
      } else {
        obj[this.option.field] = String(val) ? val : "";
      }
      this.clearCashYN(val);
      this.$emit("change", obj, this.option.field);
      this.cva = val;
    }
  }
};
</script>
