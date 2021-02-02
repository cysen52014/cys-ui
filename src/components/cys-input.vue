<template>
  <div
    :class="[
      'cys-input',
      {
        'cys-input-disabled': disabled,
        'cys-input-suffix': $slots.suffix || clearable,
        'cys-input-prefix': $slots.prefix,
        'cys-input-group': $slots.prepend || $slots.append,
        'cys-input-group-prepend': $slots.prepend,
        'cys-input-group-append': $slots.append
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- 前置元素 -->
    <div class="cys-input-group--prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <!-- 前置内容 -->
    <span class="cys-input--prefix" v-if="$slots.prefix">
      <span class="cys-input--prefix-inner">
        <slot name="prefix"></slot>
      </span>
    </span>
    <input
      class="cys-input--inner"
      :type="$attrs['type']"
      :max="$attrs['max']"
      :min="$attrs['min']"
      :step="$attrs['step']"
      :readonly="$attrs['readonly']"
      :placeholder="$attrs['placeholder']"
      :disabled="disabled"
      :value="currentValue"
      :autocomplete="autoComplete"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <!-- 后置内容 -->
    <span class="cys-input--suffix" v-if="$slots.suffix || clearable">
      <span class="cys-input--suffix-inner">
        <template v-if="!showClear">
          <slot name="suffix"></slot>
        </template>
        <i
          v-else
          class="cysicon icon-icon_xiaofucengguanbishanchu cys-input--clear-icon"
          @click="handleClear"
        ></i>
      </span>
    </span>
    <!-- 后置元素 -->
    <div class="cys-input-group--append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script>
import Emitter from "../mixins/emitter.js";
export default {
  name: "CysInput",
  componentName: "CysInput",
  mixins: [Emitter],
  props: {
    value: [String, Number],
    disabled: Boolean,
    autoComplete: {
      type: String,
      default: "off"
    },
    clearable: Boolean
  },
  data() {
    return {
      currentValue:
        this.value === undefined || this.value === null ? "" : this.value,
      hovering: false,
      focused: false
    };
  },
  computed: {
    showClear() {
      return (
        this.clearable &&
        !this.disabled &&
        !this.readonly &&
        this.currentValue !== "" &&
        (this.hovering || this.focused)
      );
    }
  },
  methods: {
    //compositionstart,compositionupdate,compositionend解决中文输入法的问题
    handleComposition(event) {
      if (event.type === "compositionend") {
        this.isOnComposition = false;
        this.handleInput(event);
      } else {
        const text = event.target.value;
        this.isOnComposition = true;
      }
    },
    // 文本框输入oninput事件，进行双向绑定的赋值
    handleInput(event) {
      if (this.isOnComposition) return;
      const value = event.target.value;
      this.$emit("input", value);
      this.currentValue = value;
    },
    // 获取光标事件
    handleFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    // 光标离开事件
    handleBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
      this.dispatch("CysFormItem", "form-blur", event.target.value);
    },
    // 文本内容改变事件
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    handleClear(e) {
      this.currentValue = "";
      this.$emit("input", "");
      this.$emit("change", "");
      this.$emit("clear", e);
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
      this.dispatch("CysFormItem", "form-change", val);
    }
  }
};
</script>
<style lang="stylus">
@import '../styles/variable';

.cys-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;

    .cys-input--inner {
        background-color: $--input-background-color;
        border: $--input-boder;
        border-radius: $--input-radius;
        color: $--input-color;
        -webkit-appearance: none;
        background-image: none;
        box-sizing: border-box;
        display: inline-block;
        font-size: inherit;
        height: 30px;
        line-height: 30px;
        outline: none;
        padding: 0 10px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;

        &::placeholder {
            color: $--input-placeholder-color;
        }

        &:hover {
            border-color: $--input-hover-border-color;
        }

        &:focus {
            outline: none;
            border-color: $--input-focus-borer-color;
        }
    }

    &.cys-input-disabled {
        .cys-input--inner {
            background-color: $--input-disabled-background-color;
            border-color: $--input-disabled-border-color;
            color: $--input-disabled-color;
            cursor: not-allowed;

            &::placeholder {
                color: $--input-disabled-color;
            }
        }
    }

    &.cys-input-suffix {
        .cys-input--inner {
            padding-right: 30px;
        }

        .cys-input--suffix {
            position: absolute;
            height: 100%;
            right: 8px;
            top: 0;
            text-align: center;
            color: $--input-fix-color;
            transition: all 0.3s;
            pointer-events: none;
        }

        .cys-input--suffix-inner {
            pointer-events: all;

            i {
                height: 100%;
                width: 25px;
                text-align: center;
                transition: all 0.3s;
                line-height: 30px;
                cursor: pointer;

                &:after {
                    content: '';
                    height: 100%;
                    width: 0;
                    display: inline-block;
                    vertical-align: middle;
                }
            }

            .cys-input--clear-icon {
                transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                background-color: white;

                &:hover {
                    color: $--input-hover-clear-icon;
                }
            }
        }
    }

    &.cys-input-prefix {
        .cys-input--inner {
            padding-left: 30px;
        }

        .cys-input--prefix {
            position: absolute;
            height: 100%;
            left: 8px;
            top: 0;
            text-align: center;
            color: $--input-fix-color;
            transition: all 0.3s;
            pointer-events: none;
        }

        .cys-input--prefix-inner {
            pointer-events: all;

            i {
                height: 100%;
                width: 25px;
                text-align: center;
                transition: all 0.3s;
                line-height: 30px;
                cursor: pointer;

                &:after {
                    content: '';
                    height: 100%;
                    width: 0;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }

    &.cys-input-group {
        line-height: normal;
        display: inline-table;
        width: 100%;
        border-collapse: separate;

        &>.cys-input--inner {
            vertical-align: middle;
            display: table-cell;
        }

        .cys-input-group--prepend, .cys-input-group--append {
            background-color: $--input-group-background-color;
            color: $--input-group-color;
            border: $--input-group-border;
            vertical-align: middle;
            display: table-cell;
            position: relative;
            border-radius: 2px;
            padding: 0 20px;
            width: 1px;
            white-space: nowrap;

            &:focus {
                outline: none;
            }
        }

        .cys-input-group--prepend {
            border-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        &.cys-input-group-prepend .cys-input--inner {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        .cys-input-group--append {
            border-left: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        &.cys-input-group-append .cys-input--inner {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
}
</style>
