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
      @clear="clear"
      @input="handleQuery"
    >
      <template slot="suffix">
        <i
          v-if="!isMouseenter"
          class="cysicon"
          :class="visible ? 'icon-angleup' : 'icon-angledown'"
        ></i>
      </template>
    </cys-input>
    <div class="cys-select-dropdown" slot="dropdown">
      <cys-scrollbar
        ref="scrollbar"
        :height="180"
        :bar="barConf"
        class="cys-select-scroll"
      >
        <slot></slot>
      </cys-scrollbar>
      <li v-if="showEmptyText" class="cys-select-scroll-empty">
        暂无查询结果
      </li>
    </div>
  </cys-base-dropdown>
</template>
<script>
import Emitter from "../../mixins/emitter.js";
import CysBaseDropdown from "../cys-base/cys-base-dropdown";
import CysInput from "../cys-input";
import CysScrollbar from "../cys-scrollbar";
export default {
  name: "CysSelect",
  componentName: "CysSelect",
  mixins: [Emitter],
  components: { CysBaseDropdown, CysInput, CysScrollbar },
  provide() {
    return { shSelect: this };
  },
  data() {
    return {
      barConf: {
        fcolor: "rgba(144,147,153,.5)",
        bcolor: "rgba(255,255,255,0)"
      },
      cash: "",
      visible: false,
      selectText: "",
      showOptionNumber: 0,
      lenOpt: 0,
      isMouseenter: false,
      selectOption: []
    };
  },
  props: {
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    multiple: Boolean,
    value: {
      required: true
    },
    filter: {
      type: [Boolean, Function],
      default: false
    }
  },
  methods: {
    resetScroll() {
      this.$nextTick(() => {
        this.$refs["scrollbar"].bgo();
      });
    },
    mouseenter() {
      this.isMouseenter = true;
    },
    mouseleave() {
      this.isMouseenter = false;
    },
    setSelectOptions(option) {
      if (this.multiple) {
        if(this.selectOption.every(r => r.value !== option.value)) {
          this.selectOption = this.selectOption.concat(option);
        }
      } else {
        this.selectOption = [option];
      }
      this.setSelectText();
    },
    setSelectText() {
      this.selectText = this.multiple
        ? this.selectOption.length > 1
          ? this.selectOption[0].optionLabel + " +" + this.selectOption.length
          : this.selectOption.length === 0
          ? ""
          : this.selectOption[0].optionLabel
        : this.selectOption[0].optionLabel;
    },
    handleOptionClick(option) {
      if (this.multiple) {
        if (!this.selectOption.includes(option)) {
          this.selectOption = this.selectOption.concat(option);
        } else {
          this.selectOption = this.selectOption.filter(r => {
            return r.value !== option.value;
          });
        }
        const val = this.selectOption.map(r => {
          return r.value;
        });
        this.$emit("input", val);
        this.$emit("change", val);
      } else {
        this.selectOption = [option];
        this.$emit("input", option.value);
        this.$emit("change", option.value);
      }

      this.setSelectText();
      this.visible = false;
    },
    clear() {
      this.selectText = "";
      this.selectOption = [];
      this.$emit("input", "");
      this.$emit("change", "");
    },
    handleQuery(value) {
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
    this.cash = this.value;
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
    showOptionNumber(val) {
      this.timer = setTimeout(() => {
        if (this.showOptionNumber > 0 && this.showOptionNumber === val) {
          this.resetScroll();
          clearTimeout(this.timer);
        }
      }, 30);
    },
    visible() {
      if (this.visible) {
        this.$emit("visible-change", this.visible);
        this.broadcast("CysOption", "query", "");
        this.resetScroll();
      }
    },
    value(val) {
      if(val === '' || (val instanceof Array && val.length < 1)) {
        this.selectText = ''
      }
    }
  }
};
</script>
<style lang="stylus">
@import '../../styles/variable';
.cys-select {
    .num {
      position absolute
    }
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
}
.cys-select-dropdown {
  position relative
  .cys-select-scroll-empty {
    text-align: center;
    color: #c0c4cc;
    line-height: 36px;
    height: 36px;
    list-style: none;
  }
}
.cys-scroll-box {
  .cys-scroll-content {
    padding 0 0!important;
  }
  list-style: none;
  padding: 0 0;
  margin: 0;
  max-height: 230px;
  box-sizing: border-box;
  li {
    line-height: 18px;
    min-height: 18px;
    padding: 6px 15px;
    font-size: 14px;
    &:hover {
      background-color: #f1f7fa;
      color: #0a72e8;
    }
    &.cys-select--option-selected {
      color: #0a72e8;
    }
  }
  .cys-scroll-empty {
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
</style>
