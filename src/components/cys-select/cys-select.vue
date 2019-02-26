<template>
    <cys-base-dropdown :class="['cys-select']"
        v-model="visible"
        :disabled="disabled">
        <cys-input v-model="selectText"
            :readonly="!filter"
            :placeholder="placeholder"
            :disabled="disabled"
            @input="handleQuery">
            <template slot="suffix">
                <i class="iconfont icon-icon_jiantou_xiazhankai"></i>
            </template>
        </cys-input>
        <div slot="dropdown">
            <ul class="cys-select--dropdown">
                <slot></slot>
                <li v-if="showEmptyText"
                    class="cys-select--dropdown-empty">暂无查询结果</li>
            </ul>
        </div>
    </cys-base-dropdown>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import CysBaseDropdown from '../cys-base/cys-base-dropdown'
import CysInput from '../cys-input';
export default {
    name: "CysSelect",
    componentName: "CysSelect",
    mixins: [Emitter],
    components: { CysBaseDropdown, CysInput },
    provide() {
        return { shSelect: this };
    },
    data() {
        return {
            visible: false,
            selectText: '',
            showOptionNumber: 0,
            selectOption: null
        }
    },
    props: {
        placeholder: String,
        disabled: Boolean,
        value: {
            required: true
        },
        filter: {
            type: [Boolean, Function],
            default: false
        }
    },
    methods: {
        handleOptionClick(option) {
            this.selectOption = option;
            this.selectText = this.selectOption.optionLabel;
            this.visible = false;
        },
        handleQuery(value) {
            if (!this.filter) {
                return;
            }
            if (this.visible === false) {
                this.visible = true;
            }
            this.broadcast('CysOption', 'query', value);
        }
    },
    created() {
        this.$on('handleOptionClick', this.handleOptionClick);
    },
    computed: {
        showEmptyText() {
            if (this.showOptionNumber < 1) {
                return true;
            }
            if (!this.$slots.default) {
                return true;
            }
        }
    },
    watch: {
        visible() {
            if (this.visible === false) {
                if (this.selectOption) {
                    this.selectText = this.selectOption.optionLabel;
                    this.$emit('input', this.selectOption.value);
                }

            } else {
                this.broadcast('CysOption', 'query', '');
            }
        }
    }
}
</script>
<style lang="stylus">
@import '../../styles/variable';

.cys-select {
    .cys-select--dropdown {
        list-style: none;
        padding: 6px 0;
        margin: 0;
        max-height: 230px;
        box-sizing: border-box;
        overflow: auto;

        .cys-select--dropdown-empty {
            list-style: none;
            padding: 0 15px;
            margin: 0;
            position: relative;
            white-space: nowrap;
            color: $--select-empty-color;
            height: 36px;
            line-height: 36px;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>
