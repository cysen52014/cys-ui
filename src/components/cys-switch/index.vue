<template>
  <div
    class="cys-switch"
    @click="changeStatus"
    :class="isChecked ? 'is-checked' : ''"
    :style="setColor"
  >
    <span></span>
  </div>
</template>
<script>
import Emitter from "../../mixins/emitter.js";
export default {
  name: "CysSwitch",
  componentName: "CysSwitch",
  mixins: [Emitter],
  props: {
    value: {
      type: Boolean | Number,
      default: false
    },
    width: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: ""
    },
    inactiveColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isChecked: false
    };
  },
  computed: {
    setColor() {
      const wd = this.width
        ? this.width.indexOf("%") > -1
          ? this.width
          : parseInt(this.width) + "px"
        : "40px";
      if (this.isChecked) {
        return {
          width: wd,
          "background-color": this.activeColor || "#0a72e8"
        };
      } else {
        return {
          width: wd,
          "background-color": this.inactiveColor || "#dcdfe6"
        };
      }
    }
  },
  watch: {
    value: {
      handler(val, oldName) {
        this.isChecked = Boolean(val);
        this.dispatch("CysFormItem", "form-change", this.isChecked);
      },
      immediate: true //true就表示会立即执行
    }
  },
  methods: {
    changeStatus() {
      this.isChecked = !this.isChecked;
      this.$emit("change", this.isChecked);
      this.$emit("input", this.isChecked);
      this.dispatch("CysFormItem", "form-change", this.isChecked);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../styles/variable';
.cys-switch {
    width 40px
    height 20px
    background #dcdfe6
    border-radius 20px
    position relative
    cursor pointer
    span {
        width 16px
        height 16px
        border-radius 50%
        background $--color-white
        display block;
        position absolute
        top 2px
        left 2px
        transition: all .3s
    }
    &.is-checked {
        background $--color-primary
        span {
          left: 100%;
          margin-left: -17px;
        }
    }
}
</style>
