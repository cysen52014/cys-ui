<template>
    <table class="cys-year-table">
        <tr v-for="(row,rowIndex) in rows"
            :key="rowIndex">
            <td :class="{
                'cys-year-tabble--select':isSelect(cell),
                'cys-year-tabble--first-year':rowIndex===0&&cellIndex===0,
                'cys-year-tabble--last-year':rowIndex===2&&cellIndex===3,
                'cys-year-tabble--disabled':isDisabled(cell)
                }"
                v-for="(cell,cellIndex) in row"
                :key="cellIndex">
                <div @click="handleYearSelect(cell)"> {{cell}} </div>
            </td>
        </tr>
    </table>
</template>
<script>
import moment from 'moment'
export default {
    name: "CysYearTable",
    componentName: "CysYearTable",
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
    computed: {
        rows() {
            let yearRows = [[], [], [], []];
            let year = this.dateValue.year();
            let startYear = year - year % 10 - 1;
            let rowNumber = yearRows.length;
            for (let i = 0; i < 12; i++) {
                let index = Number.parseInt(i / rowNumber);
                yearRows[index].push(startYear);
                startYear++;
            }
            return yearRows;
        }
    },
    methods: {
        handleYearSelect(year) {
            if (this.isDisabled(year)) {
                return;
            }
            this.$emit('year-click', year);
        },
        isSelect(year) {
            if (this.value) {
                return year === this.value.year();
            } else {
                return false;
            }

        },
        isDisabled(year) {
            if (this.disabledDate) {
                let currentDate = moment({ years: year }).endOf('year');
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

.cys-year-table {
    font-size: 14px;
    border-collapse: collapse;
    margin: 2px 0;

    td {
        text-align: center;
        padding: 30px 3px;
        width: 70px;
        box-sizing: border-box;

        div {
            box-sizing: border-box;
            text-align: center;
            height: 32px;
            line-height: 32px;
            color: $--date-time-color;
            cursor: pointer;
            border-radius: 2px;

            &:hover {
                background: $--date-time-cell-hover-background-color;
            }
        }

        &.cys-year-tabble--select {
            div {
                background-color: $--date-time-select-background-color;
                color: $--date-time-select-color;

                &:hover {
                    background: $--date-time-select-background-color;
                }
            }
        }

        &.cys-year-tabble--first-year, &.cys-year-tabble--last-year {
            div {
                color: $--date-time-prev-next-cell;
            }
        }

        &.cys-year-tabble--disabled {
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
}
</style>

