<template>
  <table :class="['cys-date-table']">
    <tr>
      <th v-for="week in weeks" :key="week">{{ week }}</th>
    </tr>
    <tr class="cys-date-table--row" v-for="(row, index) in rows" :key="index">
      <td
        :class="[
          'cys-date-table--' + cell.type,
          {
            'cys-date-table--disabled': cell.disabled
          },
          {
            'cys-date-table--between': cell.between
          }
        ]"
        v-for="(cell, index2) in row"
        :key="index2"
        @click="handleDateClick(cell)"
      >
        <div>{{ cell.text }}</div>
      </td>
    </tr>
  </table>
</template>
<script>
import moment from "moment";
export default {
  name: "CysDateTable",
  componentName: "CysDateTable",
  props: {
    dateValue: {
      type: moment,
      required: true
    },
    range: Object,
    rgk: String,
    value: {
      type: moment
    },
    disabledDate: Function,
    betweenDate: Function
  },
  data() {
    return {
      weeks: ["日", "一", "二", "三", "四", "五", "六"]
    };
  },
  computed: {
    rows() {
      let date = moment().set({
        year: this.dateValue.year(),
        month: this.dateValue.month(),
        date: 1
      });
      const rows = [[], [], [], [], [], []];
      let defaultDate = moment(date.format());
      let firstDay = date.day() === 0 ? 7 : date.day();
      date.subtract(firstDay + 1, "days");
      const dateNow = moment();
      for (let i = 0; i < 6; i++) {
        const row = rows[i];
        for (let j = 0; j < 7; j++) {
          // 获取单元格的值
          let cell = row[j];
          // 单元格不可用设置初始化配置
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: "normal",
              disabled: false,
              between: false
            };
          }
          cell.type = "normal";
          // 天数每次加1
          date.add(1, "days");
          // 判断是否今天
          if (dateNow.isSame(date, "day")) {
            cell.type = "today";
          }
          // 判断是否上个月
          if (date.isBefore(defaultDate, "month")) {
            cell.type = "prev-month";
            cell.unClick = true;
          }
          // 判断是否下个月
          if (date.isAfter(defaultDate, "month")) {
            cell.type = "next-month";
            cell.unClick = true;
          }
          // 判断是否当前选中时间
          if (
            !this.range &&
            cell.type != "prev-month" &&
            cell.type != "next-month" &&
            date.isSame(this.value, "day")
          ) {
            cell.type = "select";
          }
          if (
            this.range &&
            date.isAfter(this.range.start) &&
            date.isBefore(moment(this.range.end).endOf("day")) &&
            !date.isBefore(defaultDate, "month") &&
            !date.isAfter(defaultDate, "month")
          ) {
            if (date.isSame(this.range.start, "day")) {
              cell.type = "select";
              cell.between = true;
            } else if (date.isSame(this.range.end, "day")) {
              cell.type = "select";
              cell.between = true;
            } else {
              cell.between = true;
            }
          }
          // 判断该日期是否禁用
          if (this.disabledDate) {
            cell.disabled = this.disabledDate(moment(date));
          }
          // 设置时间
          cell.text = date.date();
          // 完整时间存储
          cell.dateValue = date.format();
          // 添加到状态管理
          this.$set(row, j, cell);
        }
      }
      return rows;
    }
  },
  methods: {
    handleDateClick(cell) {
      if (cell.disabled || cell.unClick) {
        return;
      }
      this.$emit("date-click", moment(cell.dateValue));
    }
  }
};
</script>
<style lang="stylus">
@import '../../../styles/variable';
.cys-date-table {
    user-select: none;
    border-collapse: collapse;
    font-size: 14px;
    th {
        text-align: center;
        padding: 5px;
        color: $--date-time-week-color;
        font-weight: 400;
        line-height: 30px;
        font-weight: 400;
        font-style: normal;
    }
    td {
        width: 40px;
        height: 40px;
        padding: 5px;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
        position: relative;
        &.cys-date-table--prev-month, &.cys-date-table--next-month {
            color: $--date-time-prev-next-cell;
            cursor: not-allowed;
            &:hover {
                div {
                background: none;
                }
            }
            div {
               cursor: not-allowed;
            }
        }
        &.cys-date-table--prev-month.cys-date-table--between, &.cys-date-table--next-month.cys-date-table--between {
          background: none;
        }
        &.cys-date-table--today {
            color: $--date-time-today-color;
            font-weight: bold;
        }
        &:hover {
            div {
                background-color: $--date-time-cell-hover-background-color;
            }
        }
        &.cys-date-table--select {
            div {
                background-color: $--date-time-select-background-color;
                color: $--date-time-select-color;
                &:hover {
                    background: $--date-time-select-background-color;
                }
            }
        }
        div {
            height: 30px;
            width: 30px;
            line-height: 30px;
            box-sizing: border-box;
            border-radius: 2px;
            text-align: center;
        }
    }
    .cys-date-table--between {
        background-color: #f2f6fc;
    }
    .cys-date-table--disabled {
        padding-left: 0;
        padding-right: 0;
        cursor: not-allowed;
        div {
            cursor: not-allowed;
            color: $--date-time-disabled-color;
            background-color: $--date-time-disabled-background-color;
            border-radius: 0;
            width: auto;
            border: 1px solid transparent;
        }
        &:hover {
            div {
                background-color: $--date-time-disabled-background-color;
            }
        }
        &.cys-date-table--today {
            padding: 0;
            div::before {
                content: ' ';
                position: absolute;
                top: 5px;
                left: 5px;
                width: 29px;
                height: 27px;
                border: $--date-time-today-dsiabled-border;
                border-radius: 2px;
            }
        }
    }
}
</style>
