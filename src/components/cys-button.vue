<template>
  <button
    :class="[
      'cys-button',
      {
        'cys-button--plain': plain,
        'cys-button--circle': circle,
        'cys-button--no-slot': !$slots.default
      },
      'cys-button--' + stype
    ]"
    @click="handleClick"
  >
    <i
      v-if="leftIcon"
      :class="[
        'iconfont',
        {
          [leftIcon]: leftIcon
        }
      ]"
    ></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <i
      v-if="rightIcon"
      :class="[
        'iconfont',
        {
          [rightIcon]: rightIcon
        }
      ]"
    ></i>
  </button>
</template>
<script>
export default {
  name: "CysButton",
  componentName: "CysButton",
  props: {
    type: String,
    plain: Boolean,
    circle: Boolean,
    leftIcon: String,
    rightIcon: String
  },

  computed: {
    stype() {
      return this.type || "primary";
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>
<style lang="stylus">
@import '../styles/variable';

.cys-button {
    outline: none;
    border: $--button-border;
    background-color: $--button-background-color;
    display: inline-block;
    border-radius: 2px;
    font-size: 14px;
    color: $--button-color;
    padding: 7px 20px;
    cursor: pointer;
    white-space: nowrap;
    position relative
    i {
        font-size: 14px;
    }

    &:active::before {
      width 100%
      height 100%
      content ""
      position absolute
      top 0
      left 0
      background rgba(0,0,0,0.15)
    }



    &.cys-button--plain {
        color: $--button-palin-color;
        background-color: $--button-palin-background-color;
    }

    &.cys-button--success {
        background-color: $--button-background-success-color;
        color $--button-color;
        border: $--button-background-success-color;
    }

    &.cys-button--warning {
        background-color: $--button-background-warning-color;
        color $--button-color;
        border: $--button-background-warning-color;
    }

    &.cys-button--danger {
        background-color: $--button-background-danger-color;
        color $--button-color;
        border: $--button-background-danger-color;
    }


    &.cys-button--no-slot {
        padding: 10px;
    }

    &.cys-button--circle {
        border-radius: 18px;
    }

    &.cys-button--circle:active::before {
      width 100%
      height 100%
      content ""
      position absolute
      top 0
      left 0
      background rgba(0,0,0,0.15)
      border-radius 18px;
    }
}
</style>
