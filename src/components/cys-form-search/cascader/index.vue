<template>
  <div class="cys-form--inline">
    <div class="cys-form-label" v-html="option.label"></div>
    <div class="cys-form-content">
      <cys-cascader
        v-model="option.value"
        :options="getList"
        @change="change"
        @visible-change="visibleChange"
        :clearable="option.clearable"
        :filter="option.filter"
        :props="option.props"
        :placeholder="option.placeholder"
      ></cys-cascader>
    </div>
  </div>
</template>
<script>
export default {
  name: "CysFormCascader",
  componentName: "CysFormCascader",
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
            window.__storevueappdate__state_formData[this.option.cashName]
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
    async getOptions() {
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
        const respone = await method(params);
        if (respone[cKey] * 1 === cVal * 1) {
          this.option.options = respone[dKey];
          this.list = this.option.options;
        }
      } else {
        this.list = this.option.options;
      }
    },
    change(val) {
      const obj = {};
      obj[this.option.field] = val;
      if (val instanceof Array) {
        obj[this.option.field] = val.join(",");
      } else {
        obj[this.option.field] = val;
      }
      this.$emit("change", obj);
    }
  }
};
</script>
