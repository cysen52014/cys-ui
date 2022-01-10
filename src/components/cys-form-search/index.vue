<template>
  <div class="cys-form-search">
    <div
      :class="
        direction === 'vertical'
          ? 'cys-form-search-wrap'
          : 'cys-form-search-wrap vertical'
      "
    >
      <div class="cys-form-search-el">
        <div
          class="cys-form-search-item"
          :key="index"
          v-for="(form, index) in copyData"
        >
          <component
            @change="change"
            :is="getComponent(form.type)"
            :option="form"
            :current="index * 1"
          ></component>
        </div>
      </div>
      <div class="cys-form-search-btn" :style="bW">
        <cys-button
          :key="index"
          v-for="(btn, index) in btns"
          @click="btnClick(btn)"
          >{{ btn.label }}</cys-button
        >
        <cys-button v-if="props.showRest" @click="resetFields">重置</cys-button>
      </div>
    </div>
  </div>
</template>
<script>
import Emitter from "../../mixins/emitter.js";
import Input from "./input";
import Select from "./select";
import Date from "./date";
import Cascader from "./cascader";
const components = {
  Input: Input,
  Select: Select,
  Date: Date,
  Cascader: Cascader
};
export default {
  name: "CysFormSearch",
  componentName: "CysFormSearch",
  components: components,
  mixins: [Emitter],
  provide() {
    return { parent: this };
  },
  props: {
    btns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    props: {
      type: Object,
      default: () => {
        return {};
      }
    },
    data: {
      type: Array,
      default: () => {}
    },
    direction: {
      type: String,
      default: "inline"
    },
    pointer: {
      type: String,
      default: ""
    },
    parent: {
      type: String,
      default: ""
    }
  },
  computed: {
    bW() {
      let wd = 0;
      this.btns.forEach(el => {
        wd += parseInt(el.width || 6) + 10;
      });
      return `{width:${wd}px`;
    }
  },
  watch: {
    data: {
      handler(val) {
        this.setCopyData(1);
      },
      deep: true,
      immediate: true
    },
    copyData: {
      handler(val) {
        
      },
      deep: true
    }
  },
  data() {
    return {
      copyData: [],
      formData: {}
    };
  },
  methods: {
    setCopyData(type, keepDefault) {
      const arr = [];
      const ca = []
      this.data.forEach((d, i) => {
        if(d.cashName) {
          ca.push({
            d: d.cashName,
            c: d.field,
            i: i,
            a: d.value instanceof Array ? [] : "",
            f: d.cashFilter,
            t: d.cashType
          });
        }
        if (type === 2) {
          if (!keepDefault) {
            let v = "";
            if (d.value !== "" && d.value instanceof Array) {
              v = [];
            } else {
              v = "";
            }
            arr[i] = Object.assign({}, d, { value: v });
          } else {
            arr[i] = Object.assign({}, d, { value: v });
          }
        } else {
          arr[i] = Object.assign({}, d);
        }
      });
      this.copyData = arr.map((r, ii) => {
        const ce = ca.filter(s => s.d === r.field)
        if(ce && ce[0]) {
          r.ca = ce[0];
        }
        return r;
      });
    },
    getComponent(type) {
      if (
        type.indexOf("date") > -1 ||
        type.indexOf("month") > -1 ||
        type.indexOf("year") > -1 ||
        type.indexOf("time") > -1
      ) {
        return "Date";
      } else {
        return type.substr(0, 1).toUpperCase() + type.substr(1);
      }
    },
    change(val, field) {
      this.formData = Object.assign({}, this.formData, val);
      window.__storevueappdate__state_formData = this.formData;
      window.__storevueappdate__state_field = field
      this.$emit("change", this.formData);
    },
    setCashYN(ca, val) { // 关联条件设置
      if(ca.t === "hide") { // 关联条件类型
        if(ca.f(val)) {
          const vw = Object.assign({}, this.data[ca.i], { visible: true });
          this.$set(this.copyData, ca.i, vw);
        } else {
          this.copyData = this.copyData.filter((r, i) => i !== ca.i);
          delete this.formData[ca.c]
        }
      } else if(ca.t === "disabled") {
        this.copyData[ca.i].value = ca.a;
        if(ca.f(val)) {
          this.$set(this.copyData[ca.i], 'disabled', true);
        } else {
          this.$set(this.copyData[ca.i], 'disabled', false);
        }
      }
    },
    resetFields() {
      const all = this.props.keepDefault;
      this.setCopyData(2, all);
      this.formData = {};
      window.__storevueappdate__state_formData = this.formData;
      let parent = null;
      if (this.parent) {
        parent = this.dispatchComponentByName(this.parent);
      } else {
        parent = this.$parent;
      }
      const table = parent.$refs[this.pointer || "cys-ref-table"];
      if (table) {
        table.currentChange(1);
      }
    },
    btnClick(btn) {
      if (btn.action && typeof btn.action === "function") {
        btn.action(this.formData);
      }
      let parent = null;
      if (this.parent) {
        parent = this.dispatchComponentByName(this.parent);
      } else {
        parent = this.$parent;
      }
      const table = parent.$refs[this.pointer || "cys-ref-table"];
      if (table) {
        table.currentChange(1);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.cys-form-search {
    .cys-form-search-wrap {
      display flex
      .cys-form-search-el {
        flex 1
        .cys-form-search-item {
            display inline-block;
            margin-right 10px;
            margin-bottom 10px;
            .cys-form--inline {
                display flex;
                align-items center;
                /deep/ .cys-form-label {
                    margin-right 10px;
                }
                /deep/ .cys-form-content {
                  flex 1
                }
            }
        }
        &.vertical {
          .cys-form-search-item {
            display block;
            margin-right 0px;
          }
        }
      }
      .cys-form-search-btn {
        .cys-button {
          margin-left 10px
        }
      }
    }
}
</style>
