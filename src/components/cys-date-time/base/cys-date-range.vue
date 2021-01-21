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
      endDate: "",
      showView: "",
      range: {},
      step: 0
    };
  },
  components: {
    CysDateTable,
    CysTimeTable
  },
  created() {
    const startTime =
      this.value && this.value.length > 0 ? moment(this.value[0]) : moment();
    const endTime =
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
      this.startTime = moment(this.range.start);
      this.endTime = moment(this.range.end);
    }
  },
  watch: {
    range: {
      handler(n, o) {
        this.startDate = moment(this.range.start).format("YYYY-MM-DD");
        this.startDateTime = moment(this.startDate)
          .startOf("day")
          .format("HH:mm:ss");
        this.endDate = moment(this.range.end).format("YYYY-MM-DD");
        this.endDateTime = moment(this.endDate)
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
    changeStartDate(val) {
      this.startTime = moment(val);
      this.setRange(val);
    },
    changeEndDate(val) {
      this.endTime = moment(val);
      this.setRange(val);
    },
    changeStartDateTime(val) {
      const val2 = moment(
        moment(this.range.start).format("YYYY-MM-DD") + " " + val
      );
      this.startTime = val2;
      this.setRange(val2);
    },
    changeEndDateTime(val) {
      const val2 = moment(
        moment(this.range.end).format("YYYY-MM-DD") + " " + val
      );
      this.endTime = val2;
      this.setRange(val2);
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
    setRange(val) {
      this.step++;
      if (this.step % 2 === 0) {
        this.range.end = val;
      } else {
        this.range.start = val;
      }
      if (moment(this.range.end).isBefore(this.range.start)) {
        const end = this.range.end;
        this.range.end = this.range.start;
        this.range.start = end;
      }
      let date = [];
      if (this.type === "datetimerange") {
        date = [
          moment(this.range.start).startOf("day"),
          moment(this.range.end).endOf("day")
        ];
      } else {
        date = [moment(this.range.start), moment(this.range.end)];
      }
      this.selectDate(date);
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
