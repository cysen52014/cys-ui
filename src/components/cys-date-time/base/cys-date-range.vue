<template>
  <div class="cys-date-range">
    <div class="date-range-start">
      <div class="cys-range--input" v-if="type === 'datetimerange'">
        <div class="cys-range-prit">
          <cys-input v-model="startDate" @change="changeStartDate"></cys-input>
        </div>
        <div class="cys-range-prit">
          <cys-input
            v-model="startDateTime"
            @change="changeStartDateTime"
          ></cys-input>
        </div>
      </div>
      <div class="cys-calendar--header">
        <i
          class="cysicon icon-arrow_doubleleft cys-calendar--button cys-calendar--button-prev-year"
          @click="handlePrevYear"
        ></i>
        <i
          class="cysicon icon-arrow_left cys-calendar--button cys-calendar--button-prev-month"
          @click="handlePrevMonth"
        ></i>
        <span class="cys-calendar--header-label nocursor"
          >{{ yearStart }}年</span
        >
        <span class="cys-calendar--header-label nocursor"
          >{{ monthStart }}月</span
        >
      </div>
      <div class="cys-calendar--body">
        <cys-date-table
          :range="range"
          :rgk="'start'"
          :date-value="startTime"
          @date-click="handleStartDateClick"
        ></cys-date-table>
      </div>
    </div>
    <div class="date-range-end">
      <div class="cys-range--input" v-if="type === 'datetimerange'">
        <div class="cys-range-prit">
          <cys-input v-model="endDate" @change="changeEndDate"></cys-input>
        </div>
        <div class="cys-range-prit">
          <cys-input
            v-model="endDateTime"
            @change="changeEndDateTime"
          ></cys-input>
        </div>
      </div>
      <div class="cys-calendar--header">
        <span class="cys-calendar--header-label nocursor">{{ yearEnd }}年</span>
        <span class="cys-calendar--header-label nocursor"
          >{{ monthEnd }}月</span
        >
        <i
          class="cysicon icon-arrow_right cys-calendar--button cys-calendar--button-next-month"
          @click="handleNextMonth"
        ></i>
        <i
          class="cysicon icon-arrow_doubleright cys-calendar--button cys-calendar--button-next-year"
          @click="handleNextYear"
        ></i>
      </div>
      <div class="cys-calendar--body">
        <cys-date-table
          :range="range"
          :rgk="'end'"
          :date-value="endTime"
          @date-click="handleEndDateClick"
        ></cys-date-table>
      </div>
    </div>
  </div>
</template>
<script>
import CysDateTable from "./cys-date-table";
import CysTimeTable from "./cys-time-table";
import moment from "moment";
import Vue from "vue";
export default {
  props: {
    type: {
      type: String,
      required: true,
      default: ""
    },
    value: {
      type: Array | String,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      startDate: "",
      startDateTime: "",
      endDate: "",
      endDateTime: "",
      showView: "",
      range: {},
      step: 0,
      st: false,
      et: false
    };
  },
  components: {
    CysDateTable,
    CysTimeTable
  },
  created() {
    let startTime =
      this.value && this.value.length > 0 ? moment(this.value[0]) : moment();
    let endTime =
      this.value && this.value.length > 0
        ? moment(this.value[1])
        : moment()
            .startOf("month")
            .subtract("month", -1);

    this.range = {
      start: startTime,
      end: endTime
    };

    this.startDate = moment(this.range.start).format("YYYY-MM-DD");
    this.startDateTime = moment(this.startDate)
      .startOf("day")
      .format("HH:mm:ss");
    this.endDate = moment(this.range.end).format("YYYY-MM-DD");
    this.endDateTime = moment(this.endDate)
      .endOf("day")
      .format("HH:mm:ss");
    if (this.range.start && this.range.end) {
      if (
        moment(startTime)
          .startOf("month")
          .isSame(moment(endTime).startOf("month"), "day")
      ) {
        // 判断是否在同一个月
        if (Vue.$dateRangePosition === "left") {
          this.startTime = moment(this.range.start);
          this.endTime = moment(endTime)
            .subtract(-1, "months")
            .startOf("month");
        } else if (Vue.$dateRangePosition === "right") {
          this.startTime = moment(startTime)
            .subtract(1, "months")
            .startOf("month");
          this.endTime = moment(this.range.end);
        }
      } else {
        this.startTime = moment(this.range.start);
        this.endTime = moment(this.range.end);
      }
    }
  },
  watch: {
    range: {
      handler(n, o) {
        this.startDate = moment(this.range.start).format("YYYY-MM-DD");
        this.startDateTime = this.st
          ? moment(this.range.start).format("HH:mm:ss")
          : moment(this.range.start)
              .startOf("day")
              .format("HH:mm:ss");
        this.endDate = moment(this.range.end).format("YYYY-MM-DD");
        this.endDateTime = this.et
          ? moment(this.range.end).format("HH:mm:ss")
          : moment(this.range.end)
              .endOf("day")
              .format("HH:mm:ss");
      },
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  },
  computed: {
    yearStart() {
      return this.startTime.year();
    },
    monthStart() {
      return this.startTime.month() + 1;
    },
    yearEnd() {
      return this.endTime.year();
    },
    monthEnd() {
      return this.endTime.month() + 1;
    }
  },
  methods: {
    overDay(val, type) {
      const date = val;
      if (type === 1) {
        if (!val.match(/\d\d\d\d-\d\d-\d\d/gi)) {
          return true;
        }
        const f = date.split(/\-/gi);
        const mt = f[1];
        const d = f[2];
        if (mt > 12) {
          return true;
        } else {
          const day = moment(val).daysInMonth();
          if (d > day) {
            return true;
          }
        }
      } else {
        if (!val.match(/\d\d:\d\d:\d\d/gi)) {
          return true;
        }
        const e = date.split(/\:/gi);
        const h = e[0];
        const m = e[1];
        const s = e[2];

        if (h > 23) {
          return true;
        } else {
          if (m > 59) {
            return true;
          } else {
            if (s > 59) {
              return true;
            }
          }
        }
      }
      return false;
    },
    changeStartDate(val) {
      if (this.overDay(val, 1)) {
        this.startDate = moment(this.range.start).format("YYYY-MM-DD");
        return false;
      }
      if (val) this.startTime = moment(val);
      this.setRange(val, "start");
    },
    changeEndDate(val) {
      if (this.overDay(val, 1)) {
        this.startDate = moment(this.range.end).format("YYYY-MM-DD");
        return false;
      }
      this.endTime = moment(val);
      this.setRange(val, "end");
    },
    changeStartDateTime(val) {
      this.st = true;
      if (this.overDay(val, 2)) {
        this.startDateTime = this.st
          ? moment(this.range.start).format("HH:mm:ss")
          : moment(this.range.start)
              .startOf("day")
              .format("HH:mm:ss");
        return false;
      }
      const val2 = moment(
        moment(this.range.start).format("YYYY-MM-DD") + " " + val
      );
      this.startTime = val2;
      this.setRange(val2, "start");
    },
    changeEndDateTime(val) {
      this.et = true;
      if (this.overDay(val, 2)) {
        this.endDateTime = this.et
          ? moment(this.range.end).format("HH:mm:ss")
          : moment(this.range.end)
              .endOf("day")
              .format("HH:mm:ss");
        return false;
      }

      const val2 = moment(
        moment(this.range.end).format("YYYY-MM-DD") + " " + val
      );
      this.endTime = val2;
      this.setRange(val2, "end");
    },
    handlePrevYear() {
      this.startTime = moment(this.startTime).subtract(1, "years");
    },
    handlePrevMonth() {
      this.startTime = moment(this.startTime).subtract(1, "months");
    },
    handleNextMonth() {
      this.endTime = moment(this.endTime).add(1, "months");
    },
    handleNextYear() {
      this.endTime = moment(this.endTime).add(1, "years");
    },
    setRange(val, insert) {
      if (insert === "start") {
        this.range.start = val;
      } else if (insert === "end") {
        this.range.end = val;
      } else {
        this.step++;
        if (this.step % 2 === 0) {
          this.range.end = val;
        } else {
          this.range.start = val;
          this.range.end = val;
        }
      }
      if (moment(this.range.end).isBefore(this.range.start)) {
        const end = this.range.end;
        this.range.end = this.range.start;
        this.range.start = end;
      }

      if (
        moment(this.range.start).isAfter(moment(this.endTime).startOf("month"))
      ) {
        Vue.$dateRangePosition = "right";
      } else if (
        moment(this.range.end).isBefore(moment(this.startTime).endOf("month"))
      ) {
        Vue.$dateRangePosition = "left";
      }

      this.gate = [];
      if (this.type === "datetimerange") {
        this.gate = [
          !this.st
            ? moment(this.range.start).startOf("day")
            : moment(this.range.start),
          !this.et
            ? moment(this.range.end).endOf("day")
            : moment(this.range.end)
        ];
      } else {
        this.gate = [moment(this.range.start), moment(this.range.end)];
      }
      this.selectDate(this.gate);
    },
    handleStartDateClick(val) {
      this.setRange(val);
    },
    handleEndDateClick(val) {
      this.setRange(val);
    },
    selectDate(date) {
      this.$emit("date-select", date);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../styles/variable';
.date-range-start {
    width 50%;
    float left
}
.date-range-end {
    width 50%;
    float left
}
.cys-range--input {
  display flex
  padding 10px
  border-bottom 1px solid $--date-time-boder-color;
  .cys-range-prit {
    position relative
    margin 0 5px
    .cys-time-table {
    width: 100%;
    position absolute;
    background: #fff;
    z-index 1;
    left 0
    .cys-time-table--body-select {
        height: 296px;

        &.cys-time-table--hour {
            width: 30%;
        }

        &.cys-time-table--minute {
           width: 30%;
        }

        &.cys-time-table--second {
           width: 30%
        }
    }
}
  }
}
</style>
