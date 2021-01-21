<template>
  <transition name="modal-fade">
    <div class="cys-modal"
      v-show="value">
      <div class="cys-modal-box"
        :style="style">
        <div class="cys-modal-header">
          <div class="cys-modal-title">{{title}}</div>
          <i class="cys-modal-close cysicon icon-icon_close"
            v-show="showClose"
            @click="close"></i>
        </div>
        <div class="cys-modal-body">
          <slot></slot>
        </div>
        <div class="cys-modal-footer"
          v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CysModal",
  componentName: "CysModal",
  props: {
    title: String,
    value: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: null
    }
  },
  computed: {
    style() {
      let style = {};
      if (this.width) {
        style.width = this.width;
      }
      return style;
    }
  },
  methods: {
    close() {
      this.$emit("input", false);
      this.$emit("close", false);
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variable';

.cys-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background-color: $--modal-mask-background-color;
  z-index: 2000;
  overflow: auto;

  &:after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }

  .cys-modal-box {
    background-color: $--modal-box-background-color;
    box-shadow: $--modal-box-shadow;
    border-radius: 2px;
    color: $--modal-color;
    display: inline-block;
    min-width: 200px;
    text-align: left;
    vertical-align: middle;
    opacity: 1;
    z-index: 2001;
    padding: 30px;
  }

  .cys-modal-header {
    position: relative;
    height: 36px;
    overflow: hidden;
    border-bottom: $--modal-header-border;
    margin-bottom: 20px;
  }

  .cys-modal-title {
    color: $--modal-color;
    font-size: 16px;
    font-weight: bold;
  }

  .cys-modal-close {
    position: absolute;
    right: 0;
    top: -2px;
    font-size: 20px !important;
    cursor: pointer;
    color: $--modal-header-close-color;
  }

  .cys-modal-body {
    padding: 0;
    min-width: 350px;
    font-size: 14px;
  }

  .cys-modal-footer {
    font-size: 0;
    overflow: hidden;
    text-align: right;
    height: 50px;
    line-height: 50px;
    padding-top: 20px;

    .cys-button {
      margin-left: 20px;
    }
  }
}

.modal-fade-enter-active {
  animation: modal-fade-in 0.3s;
}

.modal-fade-leave-active {
  animation: modal-fade-out 0.3s;
}

@keyframes modal-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes modal-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>