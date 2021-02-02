<template>
  <cys-base-dropdowm
    :class="['cys-date-picker']"
    v-model="visible"
    :disabled="disabled"
  >
    <div
      class="cys-date-range-input"
      v-if="type === 'daterange' || type === 'datetimerange'"
    >
      <cys-input
        :readonly="readonly"
        :placeholder="placeholder"
        v-model="startDateText"
        :disabled="disabled"
        ><i
          v-if="showIcon"
          slot="prefix"
          class="cysicon icon-icon_riqixuanze cys-date-picker--icon"
        ></i
      ></cys-input>
      <span>至</span>
      <cys-input
        :readonly="readonly"
        :placeholder="placeholder"
        v-model="endDateText"
        :clearable="clearable"
        :disabled="disabled"
        @clear="handleClear"
      ></cys-input>
    </div>
    <div v-else>
      <cys-input
        :readonly="readonly"
        :placeholder="placeholder"
        v-model="dateText"
        :clearable="clearable"
        :disabled="disabled"
        @clear="handleClear"
      >
        <i
          v-if="showIcon"
          slot="prefix"
          class="cysicon icon-icon_riqixuanze cys-date-picker--icon"
        ></i>
      </cys-input>
    </div>
    <div slot="dropdown">
      <component
        v-if="visible"
        :is="dropdownComponent"
        :border="false"
        :value="value"
        :type="selectType"
        :disabled-date="disabledDate"
        @date-select="handleSelectDate"
      >
      </component>
      <div v-if="type === 'datetime'" class="cys-date-picker--footer">
        <span
          class="cys-date-picker--footer-btn-today"
          @click="handleCurrentDateTime"
          >此刻</span
        >
        <span
          class="cys-date-picker--footer-btn"
          @click="switchDateTimeSelect"
          >{{ seletcTypeText }}</span
        >
        <span class="cys-date-picker--footer-ok" @click="visible = false"
          >确定</span
        >
      </div>
      <div
        v-if="type === 'daterange' || type === 'datetimerange'"
        class="cys-date-picker--footer"
      >
        <span class="cys-date-picker--footer-ok" @click="visible = false"
          >确定</span
        >
      </div>
    </div>
  </cys-base-dropdowm>
</template>
<script>
import moment from "moment";
import CysInput from "../cys-input";
import CysBaseDropdowm from "../cys-base/cys-base-dropdown";
import CysCalendar from "./base/cys-calendar";
export default {
  name: "CysDatePicker",
  componentName: "CysDatePicker",
  components: { CysInput, CysBaseDropdowm, CysCalendar },
  data() {
    return {
      visible: false,
      selectDateValue:
        this.value instanceof Array
          ? this.value.length > 0
            ? [moment(this.value[0]), moment(this.value[1])]
            : []
          : this.value
          ? moment(this.value)
          : null,
      dropdownComponent: "",
      dateTimeType: "date",
      startDateText: "",
      endDateText: "",
      dateText: ""
    };
  },
  props: {
    readonly: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    disabled: Boolean,
    value: {
      type: Array | String,
      default() {
        return [];
      }
    },
    type: {
      type: String,
      default: "date"
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
    selectType() {
      if (this.type === "datetime") {
        return this.dateTimeType;
      }
      return this.type;
    },
    seletcTypeText() {
      return this.dateTimeType === "date" ? "选择时间" : "选择日期";
    }
  },
  methods: {
    selectStartDateText() {
      if (this.selectDateValue instanceof Array) {
        const selectDateValue = this.selectDateValue[0];
        this.startDateText = this.getSelectDateValue(selectDateValue);
      }
    },
    selectEndDateText() {
      if (this.selectDateValue instanceof Array) {
        const selectDateValue = this.selectDateValue[1];
        this.endDateText = this.getSelectDateValue(selectDateValue);
      }
    },
    selectDateText() {
      if (this.selectDateValue instanceof Array) return;
      const selectDateValue = this.selectDateValue;
      this.dateText = this.getSelectDateValue(selectDateValue);
    },
    getSelectDateValue(selectDateValue) {
      if (!selectDateValue) {
        return "";
      }
      if (this.format) {
        return selectDateValue.format(this.format);
      }

      let format;
      switch (this.type) {
        case "datetime" || "datetimerange":
          format = "YYYY-MM-DD HH:mm:ss";
          break;
        case "time":
          format = "HH:mm:ss";
          break;
        case "date":
          format = "YYYY-MM-DD";
          break;
        case "month":
          format = "YYYY-MM";
          break;
        case "year":
          format = "YYYY";
          break;
        case "datetimerange":
          format = "YYYY-MM-DD HH:mm:ss";
          break;
        case "daterange":
          format = "YYYY-MM-DD";
          break;
        default:
          format = "YYYY-MM-DD";
          break;
      }

      const dateText = selectDateValue.format(format);
      return dateText;
    },
    handleSelectDate(dateTime) {
      if (this.type === "datetime") {
        if (this.selectDateValue) {
          let selectDateTime = moment(this.selectDateValue);
          if (this.dateTimeType === "date") {
            dateTime = selectDateTime.set({
              year: dateTime.year(),
              month: dateTime.month(),
              date: dateTime.date()
            });
          } else {
            dateTime = selectDateTime.set({
              hour: dateTime.hour(),
              minute: dateTime.minute(),
              second: dateTime.second()
            });
          }
        }
      } else if (this.type === "daterange" || this.type === "datetimerange") {
        dateTime = dateTime;
      } else {
        this.visible = false;
      }
      this.$nextTick(() => {
        this.selectDateValue = dateTime;
        // this.$emit("input", this.selectDateText);
        if (this.type === "daterange" || this.type === "datetimerange") {
          const s = this.getSelectDateValue(this.selectDateValue[0]);
          const e = this.getSelectDateValue(this.selectDateValue[1]);
          this.$emit("change", [s, e]);
          this.$emit("input", [s, e]);
        } else {
          const s = this.getSelectDateValue(this.selectDateValue);
          this.$emit("change", s);
          this.$emit("input", s);
        }
      });
    },
    switchDateTimeSelect() {
      this.dateTimeType = this.dateTimeType === "date" ? "time" : "date";
    },
    handleCurrentDateTime() {
      this.handleSelectDate(moment());
      this.visible = false;
    },
    handleClear(e) {
      if (this.type === "daterange" || this.type === "datetimerange") {
        this.selectDateValue = [];
      } else {
        this.selectDateValue = "";
      }
      this.$emit("change", this.selectDateValue);
      this.$emit("input", this.selectDateValue);
      e.stopPropagation();
    }
  },
  watch: {
    selectDateValue: {
      handler(newName, oldName) {
        if (this.type === "daterange" || this.type === "datetimerange") {
          this.selectStartDateText();
          this.selectEndDateText();
        } else {
          this.selectDateText();
        }
      },
      immediate: true
    },
    visible(val) {
      if (!this.dropdownComponent) {
        this.dropdownComponent = "cys-calendar";
      }
    },
    value() {
      this.selectDateValue =
        this.value instanceof Array
          ? this.value.length > 0
            ? [moment(this.value[0]), moment(this.value[1])]
            : []
          : this.value
          ? moment(this.value)
          : null;
    }
  }
};
</script>
<style lang="stylus">
@import '../../styles/variable';

.cys-date-picker {
    .cys-date-picker--icon {
        color: $--date-time-icon-color;
    }

    .cys-date-range-input {
      .cys-input {
        width: 237px;
        input {
          border: none;
          text-align center;
        }
      }
      white-space nowrap;
      border: $-form-border;
      span {
        margin 0 3px;
      }
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
