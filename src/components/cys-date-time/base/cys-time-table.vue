<template>
    <div class="cys-time-table">
        <div :class="['cys-time-table--body-select','cys-time-table--hour',{
                'cys-time-table--hour-hover':isHourHover
            }]"
            @mouseover="isHourHover=true"
            @mouseout="isHourHover=false">
            <ul ref="hourBox">
                <li v-for="(hour,key) in 24"
                    :class="{'cys-time-table--select':hour===selectHour}"
                    @click="handleHourClick(key)"
                    :key="key">{{('0' + key).slice(-2)}}</li>
            </ul>
        </div>
        <div :class="['cys-time-table--body-select','cys-time-table--minute',{
                'cys-time-table--minute-hover':isMinuteHover
            }]"
            @mouseover="isMinuteHover=true"
            @mouseout="isMinuteHover=false">
            <ul ref="minuteBox">
                <li v-for="(minute,key) in 60"
                    :class="{'cys-time-table--select':minute===selectMinute}"
                    @click="handleMinuteClick(key)"
                    :key="key">{{('0' + key).slice(-2)}}</li>
            </ul>
        </div>
        <div :class="['cys-time-table--body-select','cys-time-table--second',{
                'cys-time-table--second-hover':isSecondHover
            }]"
            @mouseover="isSecondHover=true"
            @mouseout="isSecondHover=false">
            <ul ref="secondBox">
                <li v-for="(second,key) in 60"
                    :class="{'cys-time-table--select':second===selectSecond}"
                    @click="handleSecondClick(key)"
                    :key="key">{{('0' + key).slice(-2)}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: "CysTimeTable",
    componentName: "CysTimeTable",
    data() {
        return {
            isHourHover: false,
            isMinuteHover: false,
            isSecondHover: false,
            dateValue: this.value ? this.value : moment()
        }
    },
    props: {
        value: {
            type: moment
        }
    },
    computed: {
        dateTime: {
            get() {
                return this.dateValue;
            },
            set(date) {
                this.dateValue = moment(date);
                this.scrollToTop();
            }
        },
        selectHour() {
            return this.dateTime.hour() + 1;
        },
        selectMinute() {
            return this.dateTime.minute() + 1;
        },
        selectSecond() {
            return this.dateTime.second() + 1;
        }
    },
    methods: {
        handleHourClick(key) {
            this.dateTime = this.dateTime.hour(key);
            this.selectTime();
        },
        handleMinuteClick(key) {
            this.dateTime = this.dateTime.minute(key);
            this.selectTime();
        },
        handleSecondClick(key) {
            this.dateTime = this.dateTime.second(key);
            this.selectTime();
        },
        scrollToTop() {
            this.$nextTick(() => {
                this.$refs.hourBox.scrollTop = (this.selectHour - 1) * 28
                this.$refs.minuteBox.scrollTop = (this.selectMinute - 1) * 28
                this.$refs.secondBox.scrollTop = (this.selectSecond - 1) * 28
            });
        },
        selectTime() {
            this.$emit("input", this.dateTime);
            this.$emit("time-click", this.dateTime);
        }
    },
    mounted() {
        this.scrollToTop();
    }
}
</script>
<style lang="stylus">
@import '../../../styles/variable';

.cys-time-table {
    box-sizing: border-box;
    position: relative;
    color: $--date-time-color;
    width: 282px;

    .cys-time-table--body-select {
        float: left;
        font-size: 14px;
        border-right: 1px solid $--date-time-boder-color;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        height: 280px;

        ul {
            list-style: none;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            width: 100%;
            max-height: 280px;
            overflow: hidden;

            li {
                list-style: none;
                box-sizing: content-box;
                margin: 0;
                width: 70px;
                padding: 0 0 0 40px;
                height: 28px;
                line-height: 28px;
                cursor: pointer;
                user-select: none;
                transition: background 0.3s ease;

                &:hover {
                    background-color: $--date-time-cell-hover-background-color;
                }

                &.cys-time-table--select {
                    background-color: $--date-time-select-background-color;
                    color: $--date-time-select-color;
                }
            }

            &::-webkit-scrollbar {
                height: 6px;
                width: 6px;
                margin-right: 5px;
                background-color: #f5f5f5;
                transition: all 0.3s ease-in-out;
                border-radius: 0px;
            }

            &::-webkit-scrollbar-track {
                border-radius: 0px;
            }

            &::-webkit-scrollbar-thumb {
                -webkit-border-radius: 0px;
                border-radius: 0px;
                background: rgba(0, 0, 0, 0.5);
            }
        }

        &.cys-time-table--hour {
            width: 93px;
        }

        &.cys-time-table--minute {
            width: 94px;
        }

        &.cys-time-table--second {
            width: 93px;
            border-right: none;
        }

        &.cys-time-table--hour-hover, &.cys-time-table--minute-hover, &.cys-time-table--second-hover {
            ul {
                overflow-y: auto;
            }
        }
    }
}
</style>


