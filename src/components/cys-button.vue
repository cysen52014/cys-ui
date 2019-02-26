<template>
    <div :class="['cys-button',{
        'cys-button--plain':plain,
        'cys-button--circle':circle,
        'cys-button--no-slot':!$slots.default
    }]"
        @click="handleClick">
        <i v-if="leftIcon"
            :class="['iconfont',{
            [leftIcon]:leftIcon
        }]"></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
        <i v-if="rightIcon"
            :class="['iconfont',{
            [rightIcon]:rightIcon
        }]"></i>
    </div>
</template>
<script>
export default {
    name: 'CysButton',
    componentName: 'CysButton',
    props: {
        plain: Boolean,
        circle: Boolean,
        leftIcon: String,
        rightIcon: String
    },

    computed: {
    },

    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
};
</script>
<style lang="stylus">
@import '../styles/variable';

.cys-button {
    border: $--button-border;
    background-color: $--button-background-color;
    display: inline-block;
    border-radius: 2px;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    color: $--button-color;
    padding: 10px 19px;
    cursor: pointer;
    white-space: nowrap;

    i {
        font-size: 14px;
    }

    &.cys-button--plain {
        color: $--button-palin-color;
        background-color: $--button-palin-background-color;
    }

    &.cys-button--no-slot {
        padding: 10px;
    }

    &.cys-button--circle {
        border-radius: 18px;
    }
}
</style>


