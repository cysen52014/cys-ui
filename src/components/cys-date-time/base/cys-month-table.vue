<template>
    <table class="cys-month-table">
        <tr v-for="(row,index) in rows"
            :key="index">
            <td :class="{
                'cys-month-table--select':isSelected(index * rows.length + monthIndex),
                'cys-month-table--disabled':isDisabled(index * rows.length + monthIndex),
                }"
                v-for="(cell,monthIndex) in row"
                :key="monthIndex">
                <div @click="handleMonthClick(cell)">{{cell}} </div>
            </td>
        </tr>
    </table>
</template>
<script>
import moment from 'moment'
export default {
    name: "CysMonthTable",
    componentName: "CysMonthTable",
    props: {
        dateValue: {
            type: moment,
            required: true
        },
        value: {
            type: moment
        },
        disabledDate: Function
    },
    data() {
        return {
            monthRows: [[], [], [], []],
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    },
    computed: {
        rows() {
            const months = this.months;
            let rowNumber = this.monthRows.length;
            for (let i = 0; i < months.length; i++) {
                const month = months[i];
                let index = Number.parseInt(i / rowNumber);
                this.monthRows[index].push(month);
            }
            return this.monthRows;
        }
    },
    methods: {
        isSelected(month) {
            if (this.dateValue.isSame(this.value, 'month')) {
                return month === this.value.month();
            } else {
                return false;
            }
        },
        handleMonthClick(monthText) {
            this.$emit('month-click', this.months.indexOf(monthText));
        },
        isDisabled(month) {
            if (this.disabledDate) {
                let currentDate = moment({ years: this.dateValue.year(), months: month }).endOf('month');
                return this.disabledDate(currentDate);
            } else {
                return false;
            }
        }
    }
}
</script>
<style lang="stylus">
@import '../../../styles/variable';

.cys-month-table {
    font-size: 14px;
    border-collapse: collapse;
    margin: 2px 0;

    td {
        text-align: center;
        padding: 30px 3px;
        width: 70px;
        box-sizing: border-box;

        &:hover {
            div {
                background-color: $--date-time-cell-hover-background-color;
            }
        }

        div {
            box-sizing: border-box;
            text-align: center;
            height: 32px;
            line-height: 32px;
            color: $--date-time-color;
            cursor: pointer;
            border-radius: 2px;
        }

        &.cys-month-table--select {
            div {
                background-color: $--date-time-select-background-color;
                color: $--date-time-select-color;

                &:hover {
                    background: $--date-time-select-background-color;
                }
            }
        }
    }

    .cys-month-table--disabled {
        padding: 30px 0;

        div {
            cursor: not-allowed;
            color: $--date-time-disabled-color;
            background-color: $--date-time-disabled-background-color;
            border-radius: 0;
            border: 1px solid transparent;

            &:hover {
                background-color: $--date-time-disabled-background-color;
            }
        }
    }
}
</style>

