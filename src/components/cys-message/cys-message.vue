<template>
  <div
    v-if="visiable"
    :class="[
      'cys-alert',
      {
        default: !type || type === 'default',
        success: type === 'success',
        warning: type === 'warning',
        error: type === 'error',
        fadeIn: !fadeOut && visiable,
        fadeOut: fadeOut
      }
    ]"
  >
    <i class="cysicon"></i>
    <div :class="['cys-alert-message']">
      {{ message }}
    </div>
    <i @click="handleClose" class="cysicon close icon-guanbi"></i>
  </div>
</template>
<script>
export default {
  name: "CysMessage",
  componentName: "CysMessage",
  data() {
    return {
      visiable: false,
      fadeOut: false,
      type: "",
      message: ""
    };
  },
  methods: {
    handleClose() {
      this.fadeOut = true;
      setTimeout(() => {
        this.visiable = false;
      }, 600)
    }
  }
};
</script>
<style lang="stylus" scoped>
.cys-alert {
    width 350px;
    padding 10px 15px
    border-radius 5px
    position fixed
    left 50%
    top 0
    z-index 2078;
    &.default {
      color #909399;
      background-color #edf2fc
    }
    &.success {
      color #67c23a
      background-color #f0f9eb
    }
    &.warning {
      color #e6a23c
      background-color #fdf6ec
    }
    &.error {
      color #f56c6c
      background-color #fef0f0
    }
    .cys-alert-message {
        display inline-block
    }
}

.close {
  position absolute
  right 10px
  top 10px
  margin-top 2px
  cursor pointer
}

.fadeIn {
    animation-name: fadeIn;
    animation-duration: 0.5s;
    animation-fill-mode: both;
}

.fadeOut {
    animation-name: fadeOut;
    animation-duration: 0.5s;
    animation-fill-mode: both;
}

@keyframes fadeIn
{
    from {
        opacity: 0;
        transform: translate(0,-300px);
    }
    to {
        opacity:1;
        transform: translate(0, 20px);
    }
}

@keyframes fadeOut
{
    from {
        opacity: 1;
        transform: translate(0, 20px);
    }
    to {
        opacity: 0;
        transform: translate(0, -300px);
    }
}
</style>
