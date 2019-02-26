<template>
    <cys-base-dropdowm :class="['cys-date-picker']"
        v-model="visible"
        :disabled="disabled">
        <cys-input :readonly="readonly"
            :placeholder="placeholder"
            :value="selectDateText"
            :clearable="clearable"
            :disabled="disabled"
            @clear="handleClear">
            <i v-if="showIcon"
                slot="prefix"
                class="iconfont icon-icon_riqixuanze cys-date-picker--icon"></i>
        </cys-input>
        <div slot="dropdown">
            <component :is="dropdownComponent"
                :border="false"
                :value="selectDateText"
                :type="selectType"
                :disabled-date="disabledDate"
                @date-select="handleSelectDate">
            </component>
            <div v-if="type==='datetime'"
                class="cys-date-picker--footer">
                <span class="cys-date-picker--footer-btn-today"
                    @click="handleCurrentDateTime">此刻</span>
                <span class="cys-date-picker--footer-btn"
                    @click="switchDateTimeSelect">{{seletcTypeText}}</span>
                <span class="cys-date-picker--footer-ok"
                    @click="visible=false">确定</span>
            </div>
        </div>
    </cys-base-dropdowm>
</template>
<script>
import moment from 'moment'
import CysInput from '../cys-input'
import CysBaseDropdowm from '../cys-base/cys-base-dropdown'
import CysCalendar from './base/cys-calendar';
export default {
    name: "CysDatePicker",
    componentName: "CysDatePicker",
    components: { CysInput, CysBaseDropdowm, CysCalendar },
    data() {
        return {
            visible: false,
            selectDateValue: this.value ? moment(this.value) : null,
            dropdownComponent: "",
            dateTimeType: 'date'
        }
    },
    props: {
        readonly: {
            type: Boolean,
            default: true
        },
        placeholder: String,
        disabled: Boolean,
        value: String,
        type: {
            type: String,
            default: 'date'
        },
        format: {
            type: String,
            default: null
        },
        disabledDate: Function,
        showIcon: {
            type: Boolean,
            default: true
        },
        clearable: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        selectDateText() {
            if (!this.selectDateValue) {
                return '';
            }
            if (this.format) {
                return this.selectDateValue.format(this.format);
            }
            let format;
            switch (this.type) {
                case 'datetime':
                    format = "YYYY-MM-DD HH:mm:ss";
                    break;
                case 'time':
                    format = "HH:mm:ss";
                    break;
                case 'date':
                    format = "YYYY-MM-DD";
                    break;
                case 'month':
                    format = "YYYY-MM";
                    break;
                case 'year':
                    format = "YYYY";
                    break;
                default:
                    format = "YYYY-MM-DD";
                    break;
            }
            return this.selectDateValue.format(format);
        },
        selectType() {
            if (this.type === "datetime") {
                return this.dateTimeType;
            }
            return this.type;
        },
        seletcTypeText() {
            return this.dateTimeType === "date" ? '选择时间' : '选择日期';
        }
    },
    methods: {
        handleSelectDate(dateTime) {
            if (this.type === "datetime") {
                if (this.selectDateValue) {
                    let selectDateTime = moment(this.selectDateValue);
                    if (this.dateTimeType === "date") {
                        dateTime = selectDateTime.set({ year: dateTime.year(), month: dateTime.month(), date: dateTime.date() });
                    } else {
                        dateTime = selectDateTime.set({ hour: dateTime.hour(), minute: dateTime.minute(), second: dateTime.second() })
                    }
                }
            } else {
                this.visible = false;
            }
            this.$nextTick(() => {
                this.selectDateValue = dateTime;
                this.$emit('input', this.selectDateText);
            })
        },
        switchDateTimeSelect() {
            this.dateTimeType = this.dateTimeType === "date" ? "time" : "date";
        },
        handleCurrentDateTime() {
            this.handleSelectDate(moment());
            this.visible = false;
        },
        handleClear(e) {
            e.stopPropagation();
            this.selectDateValue = null;
        }
    },
    watch: {
        visible() {
            if (!this.dropdownComponent) {
                this.dropdownComponent = 'cys-calendar';
            }
        },
        value() {
            this.selectDateValue = this.value ? moment(this.value) : null;
        }
    }
}
</script>
<style lang="stylus">
@import '../../styles/variable';

.cys-date-picker {
    .cys-date-picker--icon {
        color: $--date-time-icon-color;
    }

    &.cys-base-dropdown .cys-base-dropdown--content {
        width: auto;
    }

    .cys-date-picker--footer {
        border-top: 1px solid $--date-time-boder-color;
        line-height: 40px;
        padding: 0 12px;
        position: relative;
        height: auto;
        text-align: right;
        font-size: 14px;
        cursor: pointer;

        .cys-date-picker--footer-btn {
            display: inline-block;
            margin-right: 8px;
            cursor: pointer;
            color: $--date-time-footer-button-color;
        }

        .cys-date-picker--footer-btn-today {
            float: left;
            color: $--date-time-footer-button-color;
        }

        .cys-date-picker--footer-ok {
            display: inline-block;
            font-weight: 400;
            text-align: center;
            touch-action: manipulation;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            white-space: nowrap;
            padding: 0 15px;
            height: 32px;
            user-select: none;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            position: relative;
            color: $--date-time-footer-button-confirm-background-color;
            background-color: $--date-time-footer-button-confirm-color;
            border-color: $--date-time-footer-button-confirm-color;
            padding: 0 7px;
            border-radius: 2px;
            height: 24px;
            line-height: 22px;
        }
    }

    &.cys-base-dropdown--disabled {
        .cys-date-picker--icon {
            color: $--date-time-disabled-color;
        }
    }
}
</style>

