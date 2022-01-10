<template>
  <div
    ref="ct"
    :class="[
      'cys-base-dropdown',
      {
        'cys-base-dropdown--disabled': disabled,
        'is-up': isUp
      }
    ]"
    v-clickoutside="handleClickOutSide"
  >
    <div
      :class="['cys-base-dropdown--selection']"
      @click="handleSelectionClick"
    >
      <slot></slot>
    </div>
    <transition name="cys-base-dropdown">
      <div class="cys-base-dropdown--content" ref="cm" v-show="value">
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
import clickoutside from "../../directives/clickoutside.js";
export default {
  name: "CysSelectDropdowm",
  componentName: "CysSelectDropdowm",
  components: {},
  directives: {
    clickoutside
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: Boolean
  },
  watch: {
    value: {
      handler(val, oldval) {
        if (val) {
          this.getDirection();
        }
      }
    }
  },
  data() {
    return {
      isUp: false
    };
  },
  methods: {
    getElementDistance(elem) {
      var offset = "offsetTop";
      var elemDis = elem[offset]; //获得elem元素距相对定位的父元素的top left
      var elem = elem.offsetParent; //获取相对定位的父元素
      //elem!=null 只要还有相对定位的父元素
      while (elem && elem !== document.documentElement) {
        elemDis += elem[offset];
        elem = elem.offsetParent;
      }
      return elemDis;
    },
    getDirection() {
      this.$nextTick(() => {
        let el = this.$parent.$el;
        const ct = this.$refs["ct"];
        const cm = this.$refs["cm"];
        let o = true;
        while (o && el && el.nodeType === 1) {
          if (
            window.getComputedStyle(el, null).getPropertyValue("overflow") !==
              "hidden" ||
            window.getComputedStyle(el, null).getPropertyValue("overflow-y") !==
              "hidden"
          ) {
            el = el.parentNode;
          } else {
            el = el;
            o = false;
          }
        }

        if (o) {
          el = document.body;
        }

        const at = this.getElementDistance(ct);
        const bt = this.getElementDistance(el);
        if (at - bt > el.clientHeight - ct.offsetHeight - cm.offsetHeight - 10) {
          cm.style.bottom = ct.parentNode.clientHeight + 2 + "px";
          this.isUp = true;
        }

        // window.getComputedStyle(my_div, null);
      });
    },
    handleClickOutSide() {
      this.$emit("input", false);
    },
    handleSelectionClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("input", !this.value);
    }
  }
};
</script>
<style lang="stylus">
.cys-base-dropdown {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    color: #444444;

    .cys-base-dropdown--selection {
        cursor: pointer;
        position: relative;
    }

    .cys-base-dropdown--content {
        background-color: #ffffff;
        width: calc(100% - 2px);
        box-sizing: border-box;
        border-radius: 2px;
        position: absolute;
        left 1px;
        z-index: 900;
        box-shadow 0px 2px 8px 0 rgba(0 0 0 0.1)
    }

    &.is-up {
        .cys-base-dropdown-enter-active, .cys-base-dropdown-leave-active {
            opacity: 1;
            transform: scaleY(1);
            transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
            transform-origin: center bottom;
        }
    }

    .cys-base-dropdown-enter-active, .cys-base-dropdown-leave-active {
        opacity: 1;
        transform: scaleY(1);
        transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
        transform-origin: center top;
    }

    .cys-base-dropdown-enter, .cys-base-dropdown-leave-active {
        opacity: 0;
        transform: scaleY(0);
    }

    &.cys-base-dropdown--disabled {
        .cys-base-dropdown--selection {
            cursor: not-allowed;
        }
    }
}
</style>
