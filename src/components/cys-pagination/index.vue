<template>
  <div
    :class="[
      'cys-pagination',
      {
        'is-background': background
      }
    ]"
  >
    <div class="cys-pagination__total" v-if="layout.indexOf('total') > -1">
      共 <span>{{ total }}</span> 条
    </div>
    <div
      class="cys-pagination__sizes"
      v-if="layout.indexOf('sizes') > -1 && isShowPageSizes"
    >
      <cys-select
        v-model="pageSizeIndex"
        @change="changePageSize"
        placeholder="请选择"
      >
        <cys-option
          v-for="item in pageSizes"
          :key="item"
          :label="item + '条/页'"
          :value="item"
        >
        </cys-option>
      </cys-select>
    </div>

    <div
      class="btn-prev"
      :class="currentPageIndex === 1 ? 'disabled' : ''"
      @click="prev"
    >
      <i class="cysicon icon-arrow_left"></i>
    </div>
    <ul class="cys-pager">
      <li
        :class="item.active ? 'active' : ''"
        v-for="(item, index) in getPageNumber"
        :key="index"
        @click="changeJumpPage(item.index)"
      >
        {{ item.text }}
      </li>
    </ul>
    <div
      class="btn-next"
      :class="currentPageIndex === pageMax ? 'disabled' : ''"
      @click="next"
    >
      <i class="cysicon icon-arrow_right"></i>
    </div>
    <div class="cys-pagination__jump" v-if="layout.indexOf('total') > -1">
      <span>前往</span>
      <cys-input
        v-model="currentPageIndex"
        placeholder="请输入内容"
        @change="changeJumpPage"
        :min="1"
        :type="'number'"
      ></cys-input>
      <span>页</span>
    </div>
  </div>
</template>

<script>
// import CysSelect from "../cys-select/cys-select";
// import CysInput from "../cys-input";
export default {
  name: "cysPagination",
  componentName: "cysPagination",
  props: {
    background: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      default: "prev, pager, next"
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageCount: {
      type: Number,
      default: 9
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50];
      }
    }
  },
  computed: {
    isShowPageSizes() {
      const psize = this.pageSizes ? this.pageSizes : [];
      return psize.length > 0;
    },
    getPageNumber() {
      const cIndex = Math.ceil(this.pageCount / 2);
      const max = Math.ceil(this.total / this.pageSize);
      const li = [];
      if (this.pageCount < max) {
        this.pageMax = max;
        if (this.currentPageIndex < cIndex) {
          for (let index = 0; index < this.pageCount - 1; index++) {
            const ii = index + 1;
            if (ii === this.pageCount - 1) {
              li.push({
                index: ii,
                text: "...",
                active: false
              });
            } else if (ii === this.currentPageIndex) {
              li.push({
                index: ii,
                text: ii,
                active: true
              });
            } else {
              li.push({
                index: ii,
                text: ii,
                active: false
              });
            }
          }
          li.push({
            index: max,
            text: max,
            active: false
          });
        } else if (this.currentPageIndex > max - cIndex) {
          const start = max - cIndex - 1;
          const end = max;
          li.push({
            index: 1,
            text: 1,
            active: false
          });
          li.push({
            index: start - 1,
            text: "...",
            active: false
          });
          for (let index = start; index <= end; index++) {
            if (index === this.currentPageIndex) {
              li.push({
                index: index,
                text: index,
                active: true
              });
            } else {
              li.push({
                index: index,
                text: index,
                active: false
              });
            }
          }
        } else {
          const start = this.currentPageIndex - cIndex + 3;
          const end = this.currentPageIndex * 1 + (cIndex - 2);
          li.push({
            index: 1,
            text: 1,
            active: false
          });
          li.push({
            index: start - 1,
            text: "...",
            active: false
          });
          for (let index = start; index < end; index++) {
            if (index === this.currentPageIndex) {
              li.push({
                index: index,
                text: index,
                active: true
              });
            } else {
              li.push({
                index: index,
                text: index,
                active: false
              });
            }
          }

          li.push({
            index: end,
            text: "...",
            active: false
          });
          li.push({
            index: max,
            text: max,
            active: false
          });
        }
      } else {
        this.pageMax = max;
        for (let index = 0; index < max; index++) {
          const ii = index + 1;
          if (ii === this.currentPageIndex) {
            li.push({
              index: ii,
              text: ii,
              active: true
            });
          } else {
            li.push({
              index: ii,
              text: ii,
              active: false
            });
          }
        }
      }
      console.log("li", li);
      return li;
    }
  },
  watch: {
    currentPage: {
      handler(newName, oldName) {
        if (newName) {
          this.currentPageIndex = newName;
        }
      },
      immediate: true,
      deep: true
    },
    pageSize: {
      handler(newName, oldName) {
        if (newName) {
          this.pageSizeIndex = newName;
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      currentPageIndex: 1,
      pageSizeIndex: 10,
      pageMax: 1
    };
  },
  methods: {
    changeJumpPage(val) {
      this.currentPageIndex = val * 1;
      console.log("this.currentPageIndex", this.currentPageIndex);
      this.$emit("current-change", this.currentPageIndex);
    },
    changeCurrentPage(index) {
      if (isNaN(Number(index))) return;
      const max = Math.ceil(this.total / this.pageSize);
      this.currentPageIndex = index * 1;
      if (this.currentPageIndex > max) {
        this.currentPageIndex = max;
      } else if (this.currentPageIndex <= 1) {
        this.currentPageIndex = 1;
      }
      this.$emit("current-change", this.currentPageIndex);
    },
    changePageSize(size) {
      this.$emit("size-change", size);
    },
    next() {
      const max = Math.ceil(this.total / this.pageSize);
      this.currentPageIndex++;
      if (this.currentPageIndex > max) {
        this.currentPageIndex = max;
      }
      this.$emit("current-change", this.currentPageIndex);
    },
    prev() {
      this.currentPageIndex--;
      if (this.currentPageIndex <= 1) {
        this.currentPageIndex = 1;
      }
      this.$emit("current-change", this.currentPageIndex);
    }
  }
};
</script>
<style lang="stylus">
@import '../../styles/variable';
.cys-pagination {
    font-size 13px;
    margin-top 15px;
    &.is-background {
      ul.cys-select--dropdown {
        li {
          background none;
        }
      }
        li {
            background-color: $--pagination-background;
            color $--pagination-background-text-color;
            &.active {
               background-color: $--pagination-background;
               color $--pagination-active-background-text-color;
            }
        }
        .btn-prev, .btn-next {
            background-color: $--pagination-background;
        }
    }
    .btn-prev, .btn-next {
        background none;
        border none;
        display inline-block;
        margin-right 2px;
        font-size 24px;
        vertical-align top;
        height 28px;
        line-height 22px;
        cursor pointer;
        padding 0 6px;
        color $--pagination-text-color
        &.disabled {
            color $--pagination-text-disabled-color;
            cursor: not-allowed;
        }
        margin-top 2px;
    }
    ul.cys-pager {
        margin-top 2px;
        display inline-block;
        padding 0;
        vertical-align top;
        li{
            list-style none
            display inline-block;
            margin 0 5px 5px;
            padding 0 8px;
            vertical-align top;
            height 28px;
            line-height 28px;
            cursor pointer;
            &.active {
                color $--pagination-text-active-color;
            }
        }
    }
    .cys-pagination__sizes {
        width: 100px;
        display inline-block;
        margin-left 5px;
        margin-right 5px;
        .cys-input {
            .cys-input--inner {
                height 30px;
                line-height 30px;
                color $--pagination-text-color
            }
            &.cys-input-suffix .cys-input--suffix-inner i {
               line-height 30px;
            }
        }
    }
    .cys-pagination__total {
        margin-top 5px;
        display inline-block;
        margin-left 5px;
        color $--pagination-color
    }
    .cys-pagination__jump {
        display inline-block;
        margin-left 5px;
        color $--pagination-color
        .cys-input {
            width 60px;
            display inline-block;
            input {
                height 26px;
                line-height 26px;
                text-align center;
                color $--pagination-text-color
            }
        }
    }
}
</style>
