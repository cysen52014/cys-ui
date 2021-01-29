<template>
  <div
    :class="[
      'cys-textarea',
      {
        'cys-textarea-disabled': disabled
      }
    ]"
  >
    <textarea
      class="cys-textarea--inner"
      v-bind="$attrs"
      :disabled="disabled"
      :tabindex="tabindex"
      :style="textareaStyles"
      :rows="rows"
      ref="textarea"
      :value="currentValue"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >
    </textarea>
  </div>
</template>
<script>
import calcTextareaHeight from "./calcTextareaHeight.js";
export default {
  name: "CysTextarea",
  componentName: "CysTextarea",
  props: {
    value: [String, Number],
    disabled: Boolean,
    tabindex: String,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      currentValue:
        this.value === undefined || this.value === null ? "" : this.value,
      textareaStyles: {}
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
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
      this.$nextTick(() => {
        this.resizeTextarea();
      });
      this.currentValue = event.target.value;
      this.$emit("input", this.currentValue);
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
    },
    // 文本改变触发事件
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    // 文本域高度自适应内容配置
    resizeTextarea() {
      const autosize = this.autosize;
      if (!autosize) {
        return false;
      }
      const minRows = autosize.minRows || this.rows;
      const maxRows = autosize.maxRows;
      this.textareaStyles = calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      );
    }
  },
  mounted() {
    this.resizeTextarea();
  }
};
</script>
<style lang="stylus">
@import '../../styles/variable';

.cys-textarea {
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
    font-size: 14px;

    .cys-textarea--inner {
        background-color: $--input-background-color;
        border: $--input-boder;
        border-radius: $--input-radius;
        color: $--input-color;
        display: block;
        resize: vertical;
        padding: 5px 10px;
        line-height: 1.5;
        box-sizing: border-box;
        width: 100%;
        font-size: inherit;
        background-image: none;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

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

    &.cys-textarea-disabled {
        .cys-textarea--inner {
            background-color: $--input-disabled-background-color;
            border-color: $--input-disabled-border-color;
            color: $--input-disabled-color;
            cursor: not-allowed;

            &::placeholder {
                color: $--input-placeholder-color;
            }
        }
    }
}
</style>
