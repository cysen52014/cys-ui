<template>
    <div :class="['cys-base-dropdown',{
        'cys-base-dropdown--disabled':disabled
    }]"
        v-clickoutside="handleClickOutSide">
        <div :class="['cys-base-dropdown--selection']"
            @click="handleSelectionClick">
            <slot></slot>
        </div>
        <transition name="cys-base-dropdown">
            <div class="cys-base-dropdown--content"
                v-show="value">
                <slot name="dropdown"></slot>
            </div>
        </transition>
    </div>
</template>
<script>
import clickoutside from '../../directives/clickoutside.js'
export default {
    name: 'CysSelectDropdowm',
    componentName: 'CysSelectDropdowm',
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
    methods: {
        handleClickOutSide() {
            this.$emit('input', false);
        },
        handleSelectionClick() {
            if (this.disabled) {
                return;
            }
            this.$emit('input', !this.value);
        }
    }
}    
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

