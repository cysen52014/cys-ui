<template>
  <cys-base-dropdown
    :class="['cys-select']"
    v-model="visible"
    :disabled="disabled"
  >
    <cys-input
      v-model="selectText"
      :readonly="!filter"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      @input="handleQuery"
    >
      <template slot="suffix">
        <i
          v-if="!isMouseenter"
          class="cysicon"
          :class="
            visible
              ? 'icon-icon_jiantou_shangshouqi'
              : 'icon-icon_jiantou_xiazhankai'
          "
        ></i>
      </template>
    </cys-input>
    <div slot="dropdown">
      <ul class="cys-select--dropdown">
        <slot></slot>
        <li v-if="showEmptyText" class="cys-select--dropdown-empty">
          暂无查询结果
        </li>
      </ul>
    </div>
  </cys-base-dropdown>
</template>
<script>
import Emitter from "../../mixins/emitter.js";
import CysBaseDropdown from "../cys-base/cys-base-dropdown";
import CysInput from "../cys-input";
export default {
  name: "CysSelect",
  componentName: "CysSelect",
  mixins: [Emitter],
  components: { CysBaseDropdown, CysInput },
  provide() {
    return { shSelect: this };
  },
  data() {
    return {
      visible: false,
      selectText: "",
      showOptionNumber: 0,
      isMouseenter: false,
      selectOption: null
    };
  },
  props: {
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    value: {
      required: true
    },
    filter: {
      type: [Boolean, Function],
      default: false
    }
  },
  methods: {
    mouseenter() {
      this.isMouseenter = true;
    },
    mouseleave() {
      this.isMouseenter = false;
    },
    handleOptionClick(option) {
      this.selectOption = option;
      this.selectText = this.selectOption.optionLabel;
      this.visible = false;
    },
    handleQuery(value) {
      if (!value) {
        this.selectText = "";
        this.selectOption = null;
        this.$emit("input", "");
        this.$emit("change", "");
      }
      if (!this.filter) {
        return;
      }
      if (this.visible === false) {
        this.visible = true;
      }
      this.broadcast("CysOption", "query", value);
    }
  },
  created() {
    this.$on("handleOptionClick", this.handleOptionClick);
  },
  computed: {
    showEmptyText() {
      if (this.showOptionNumber < 1) {
        return true;
      }
      if (!this.$slots.default) {
        return true;
      }
    }
  },
  watch: {
    value() {
      this.selectText = this.value === "" ? "" : (this.selectOption ? this.selectOption.optionLabel : "");
    },
    visible() {
      if (this.visible === false) {
        if (this.selectOption) {
          this.$emit("input", this.selectOption.value);
          this.$emit("change", this.selectOption.value);
          this.selectText = this.selectOption.label;
        } else {
          this.selectText = "";
        }
      } else {
        this.$emit("visible-change", this.visible);
        this.broadcast("CysOption", "query", "");
      }
    }
  }
};
</script>
<style lang="stylus">
@import '../../styles/variable';
.cys-select {
    .enter {
      .close {
        display inline
      }
    }
    .leave {
      .close {
        display none
      }
    }
    .cys-select-wrap {
      padding 6px 0
    }
    .cys-select--dropdown {
        list-style: none;
        padding: 0 0;
        margin: 0;
        max-height: 230px;
        box-sizing: border-box;
        overflow: auto;

        .cys-select--dropdown-empty {
            list-style: none;
            padding: 0 15px;
            margin: 0;
            position: relative;
            white-space: nowrap;
            color: $--select-empty-color;
            height: 36px;
            line-height: 36px;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>
