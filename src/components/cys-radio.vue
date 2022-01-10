<template>
    <label :class="['cys-radio',{ 
        'cys-radio-disabled':isDisabled,
        'cys-radio-checked':isChecked
        }]">
        <span :class="['cys-radio--input']">
            <span class="cys-radio--inner"></span>
            <input type="radio"
                :value="label"
                :disabled="isDisabled"
                v-model="model"
                class="cys-radio--original" />
        </span>
        <span class="cys-radio--label"
            v-if="$slots.default">
            <slot></slot>
        </span>
    </label>
</template>
<script>
import Emitter from '../mixins/emitter.js';
export default {
    name: 'CysRadio',
    componentName: 'CysRadio',
    mixins: [Emitter],
    props: {
        value: {},
        label: {
            required: true
        },
        disabled: Boolean
    },
    data() {
        return {
            _radioGroup: null
        }
    },
    computed: {
        model: {
            get() { 
                return this._radioGroup.value;
            },
            set(val) {  
                this.dispatch('CysRadioGroup', 'input', [val]);
                this.dispatch('CysRadioGroup', 'change', [val]);
            }
        },
        isGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'CysRadioGroup') {
                    parent = parent.$parent;
                } else {
                    this._radioGroup = parent;
                    return true;
                }
            }
            return false;
        },
        isChecked() {
            return this.model === this.label
        },
        isDisabled() {
            if (this.isGroup) {
                return this._radioGroup.disabled || this.disabled;
            }
            return this.disabled;
        }
    },
    created() {
        if (!this.isGroup) {
            throw "单选框必须嵌套在分组内使用，单独使用无意义";
        }
    }
}
</script>
<style lang="stylus">
@import '../styles/variable';

.cys-radio {
    color: $--radio-color;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;

    & + .cys-radio {
        margin-left: 25px;
    }

    .cys-radio--input {
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 1;
        position: relative;
        vertical-align: middle;

        .cys-radio--inner {
            display: inline-block;
            position: relative;
            border: $--radio-boder;
            border-radius: 100%;
            box-sizing: border-box;
            width: 18px;
            height: 18px;
            background-color: $--radio-backgroud-color;
            z-index: 1;
            transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);

            &::after {
                width: 8px;
                height: 8px;
                border-radius: 100%;
                background-color: $--radio-dot-color;
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale(0);
                // transition: transform 0.15s ease-in;
            }

            &:hover {
                border-color: $--radio-hover-border-color;
            }
        }

        .cys-radio--original {
            display: none;
        }
    }

    .cys-radio--label {
        display: inline-block;
        padding-left: 10px;
        line-height: 20px;
        font-size: 14px;
    }

    &.cys-radio-checked {
        .cys-radio--inner {
            background-color: $--radio-checked-background-color;
            border-color: $--radio-checked-border-color;

            &::after {
                transform: translate(-50%, -50%) scale(1);
            }
        }
    }

    &.cys-radio-disabled {
        .cys-radio--inner {
            background-color: $--radio-disabled-background-color;
            border-color: $--radio-disabled-border-color;
            cursor: not-allowed;

            &:hover {
                border-color: $--radio-disabled-hover-border-color;
            }
        }

        .cys-radio--label {
            color: $--radio-disabled-label-color;
            cursor: not-allowed;
        }

        &.cys-radio-checked .cys-radio--inner {
            background-color: $--checkbox-checked-disabled-background-color;
            border-color: $--checkbox-checked-disabled-border-color;

            &::after {
                background-color: $--checkbox-checked-disabled-dot;
            }
        }
    }
}
</style>

