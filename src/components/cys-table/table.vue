<template>
  <div>
    <div
      class="cys-table"
      :class="[
        {
          'cys-table--fit': fit,
          'cys-table--striped': striped,
          'cys-table--border': border
        }
      ]"
      :id="tableGuid"
    >
      <div class="cys-table-wrapper">
        <div class="cys-table-scwrapper">
          <div class="cys-table-header" v-show="showHeader"><Colum :options="options" /></div>
          <div class="cys-table-tbody">
            <div :class="getTodyWrapClass">
              <table cellpadding="0" cellspacing="0" class="tbody-wrapper">
                <tbody v-if="tableData.length > 0">
                  <tr v-for="(item, index) in tableData" :key="index">
                    <td v-if="item.expand" :colspan="item.colspan" class="row-expand">
                      <slot :name="item.slotName" :row="item"></slot>
                    </td>
                    <td
                      v-for="(item2, index2) in cols"
                      :key="index2"
                      :style="getStyles(item2)"
                      :class="[
                        {
                          'cys-table--fiexd': item2.fixed,
                          'cys-table--left': item2.fixed === 'left',
                          'cys-table--right': item2.fixed === 'right',
                          'cys-table--shadow-left': item2.shadowLeft,
                          'cys-table--shadow-right': item2.shadowRight
                        }
                      ]"
                      v-else
                    >
                      <slot
                        v-if="item2.slotName"
                        :name="item2.slotName"
                        :row="item"
                      ></slot>

                      <span v-else-if="item2.prop === '_keySelection'"
                        ><cys-checkbox
                          @change="setRowChecked($event, item2)"
                          v-model="item[item2.prop]"
                      /></span>
                      <span class="col-expand" v-else-if="item2.expand"
                        > 
                        <i
                          v-if="!treeProps"
                          @click="expandChange(item)"
                          :class="!item.isOpen ? 'cysicon icon-angleright' : 'cysicon icon-angledown'"
                        ></i>
                        <i
                          v-else-if="treeProps && item[treeProps.children] && item[treeProps.children].length > 0"
                          @click="expandChange(item)"
                          :class="!item.isOpen ? 'cysicon icon-angleright' : 'cysicon icon-angledown'"
                        ></i>
                        {{ (String(item[item2.prop]) !== '0' && !item[item2.prop]) ? colEmptyText : item[item2.prop] }}</span
                      >
                      <span v-else> {{ (String(item[item2.prop]) !== '0' && !item[item2.prop]) ? colEmptyText : item[item2.prop] }}</span>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td class="center">
                      <slot name="empty">
                        <span>{{ emptyText || "暂无数据" }}</span></slot
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="cys-table-tfooter"></div> -->
      <!-- <div class="cys-table-styles" v-html="thw"></div> -->
      <cys-loading v-if="options.isLoading" :plate="'white'"></cys-loading>
    </div>
    <cys-pagination
      ref="table-pagination"
      v-if="options.isPagination"
      :total="total"
      :layout="'total, sizes, prev, pager, next, jumper'"
      @current-change="currentChange"
      @size-change="sizeChange"
      :currentPage="page.current"
    ></cys-pagination>
  </div>
</template>
<script>
import Scroll from "../../utils/scroll";
import Colum from "./table-colum";
import Emitter from "../../mixins/emitter.js";
export default {
  name: "CysTable",
  componentName: "CysTable",
  components: {
    Colum
  },
  provide() {
    return { table: this };
  },
  mixins: [Emitter],
  props: {
    fit: {
      type: Boolean,
      default: true
    },
    treeProps: {
      type: Object
    },
    striped: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: "auto"
    },
    minWidth: {
      type: String,
      default: "auto"
    },
    rowKey: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => {}
    },
    colEmptyText: {
      type: String,
      default: ""
    },
    emptyText: {
      type: String,
      default: ""
    },
    options: { type: Object, default: {} }
  },
  watch: {
    data: {
      handler(val, oldval) {
        if (val && val.length > 0) {
          this.getNaturalData();
        }
      }
    },
    tableData: {
      handler(val, oldval) {
        if (val && val.length > 0) {
          this.$nextTick(() => {
            const tWrapper = document.querySelector("#" + this.guid);
            if (tWrapper) {
              this.broadcast("CysTableColum", "setColumFixd", {
                table: tWrapper,
                data: val
              });
              this.Scroll = new Scroll({
                wrapper: tWrapper,
                height: this.height,
                minWidth: this.minWidth
              });
            }
          });
        }
      },
      deep: true
    }
  },
  computed: {
    isTheadShow() {
      return typeof this.options.thead.show === "undefined"
        ? true
        : this.options.thead.show;
    },
    getTodyWrapClass() {
      let cs = "cys-table-body-wrapper";
      if (this.height) {
        cs += " overy";
      }
      if (this.width) {
        cs += " horizontal";
      }
      return cs;
    },
    dynamicSlotName() {
      const name = this.options.thead.column.map(r =>
        r.slotName ? r.slotName : ""
      );
      return "bb";
    },
    tableGuid() {
      const guid = this.cguid();
      this.guid = `table-${guid}`;
      return this.guid;
    }
  },
  data() {
    return {
      isSort: "",
      sortKey: "",
      parameter: {},
      page: {
        current: 1,
        size: 10
      },
      tableData: [],
      total: 0,
      cols: [],
      fixed: {},
      thw: [],
      guid: 0,
      rowKeys: [],
      checkedAll: false,
      indeterminate: false,
      timeOut: false
    };
  },
  created() {
    if (this.data) {
      this.getNaturalData();
    } else {
      if (!this.options.apiAwait) {
        this.getTableData();
      }
    }
  },
  methods: {
    getStyles(item2) {
      return item2.style ? item2.style : "";
    },
    setRowChecked(val) {
      this.isSelectionCheckedAll();
    },
    callSelectAll(val) {
      this.tableData = this.tableData.map(row => {
        row._keySelection = val;
        return row;
      });
      this.checkedAll = val;
      this.isSelectionCheckedAll();
    },
    isSelectionCheckedAll() {
      if (this.tableData.every(r => r._keySelection === true)) {
        this.checkedAll = true;
        this.indeterminate = false;
      } else if (this.tableData.every(r => r._keySelection === false)) {
        this.checkedAll = false;
        this.indeterminate = false;
      } else {
        this.checkedAll = false;
        this.indeterminate = true;
      }
      this.selectedRows();
      this.$forceUpdate();
    },
    selectedRows() {
      const rows = this.tableData.filter(row => row._keySelection === true);
      this.$emit("selection-change", rows);
    },
    setFixed(fixed) {
      this.fixed = fixed;
    },
    expandKeys(item) {
      let isOpen = false;
      if (this.rowKeys.every(v => v !== item[this.rowKey])) {
        this.rowKeys.push(item[this.rowKey]);
        const index = this.getRowIndex(item);
        this.tableData.splice(index + 1, 0, {
          expand: true,
          slotName: "expand",
          row: item,
          colspan: this.cols.length
        });
        isOpen = true;
      } else {
        this.rowKeys = this.rowKeys.filter(v => v !== item[this.rowKey]);
        const index = this.getRowIndex(item);
        this.tableData.splice(index + 1, 1);
        isOpen = false;
      }
      return isOpen;
    },
    toggleRowExpansion(item, isOpen) {
      if (isOpen) {
        if (this.rowKeys.every(v => v !== item[this.rowKey])) {
          this.rowKeys.push(item[this.rowKey]);
          const index = this.getRowIndex(item);
          const expRow = {
            expand: true,
            slotName: "expend",
            row: item,
            colspan: this.cols.length
          }
          this.tableData.splice(index + 1, 0, expRow);
          this.$emit("expand-rows", expRow);
        }
      } else {
        this.rowKeys = this.rowKeys.filter(v => v !== item[this.rowKey]);
        const index = this.getRowIndex(item);
        this.tableData.splice(index + 1, 1);
      }
      this.$emit("expand-change", isOpen);
      this.$forceUpdate();
    },
    getRowIndex(item) {
      let index = 0;
      this.tableData.forEach((row, ii) => {
        if (row[this.rowKey] === item[this.rowKey]) {
          index = ii;
        }
      });
      return index;
    },
    expandChange(item) {
      const isOpen = this.expandKeys(item);
      item.isOpen = isOpen;
      this.$emit("expand-change", isOpen);
      this.$forceUpdate();
    },
    tdStyle(cols) {
      this.cols = cols;
      // const arr = [];
      // cols.forEach((item, index) => {
      //   if (item.style && item.style.width) {
      //     const w = parseInt(item.style.width);
      //     arr.push(
      //       `#${this.guid} tr td:nth-child(${index + 1}){ width:${w}px; }`
      //     );
      //   }
      // });
      // this.thw = arr.length > 0 ? `<style>${arr.join("")}</style>` : "";
    },
    cguid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    getOptions() {
      const opt = {
        thead: {
          column: [],
          show: true
        },
        tbody: {
          total: 0,
          data: []
        },
        method: {
          interface: () => {}, // 调用表格数据接口方法
          parmas: {}, // 参数
          cVal: 0, // 接口返回参数值 默认0
          cKey: "errorCode", // 接口返回参数key 默认errorCode
          dKey: "data", // 接口返回参数key 默认errorCode
          tKey: "total",
          lKey: "list",
          pageNumKey: "pageNum",
          pageSizeKey: "pageSize",
          failed: () => {}, // 接口失败回调
          success: () => {} // 接口成功回调
        },
        isPagination: false
      };
      if (JSON.stringify(this.options) === "{}") {
        this.options = opt;
      } else {
        Object.keys(opt).forEach(key => {
          if (
            typeof this.options[key] === "undefined" ||
            JSON.stringify(this.options[key]) === "{}"
          ) {
            this.options[key] = opt[key];
          } else {
            this.options[key] =
              typeof this.options[key] === "object"
                ? Object.assign({}, opt[key], this.options[key])
                : this.options[key];
          }
        });
      }
      return this.options;
    },
    setTimeOut(opts, failed, time) {
      const timer = setTimeout(() => {
        if (!this.timeOut) {
          failed && failed("timeout");
          opts.isLoading = false;
        }
        clearTimeout(time);
      }, time);
    },
    setKeyIndex() {
      if (this.options.isIndex) {
        this.tableData = this.tableData.map((r, index) => {
          r._keyIndex = (this.page.current - 1) * this.page.size + index + 1;
          return r;
        });
      }
    },
    setKeySelection() {
      if (this.options.isSelection) {
        this.tableData.map((r, index) => {
          r._keySelection = false;
          return r;
        });
      }
    },
    asce(item) {
      if (!this.sortData) {
        this.sortData = [...this.tableData];
      }
      if (item.sort === "asce") {
        this.tableData = this.tableData.sort((x, y) => {
          return x[item.sortKey] > y[item.sortKey] ? 1 : -1;
        });
        this.$emit("sort-change", item.sortKey, "asce");
      } else {
        this.tableData = [...this.sortData];
        this.$emit("sort-change", item.sortKey, "cancel");
      }
    },
    desc(item) {
      if (!this.sortData) {
        this.sortData = [...this.tableData];
      }
      if (item.sort === "desc") {
        this.tableData = this.tableData.sort((x, y) => {
          return x[item.sortKey] < y[item.sortKey] ? 1 : -1;
        });
        this.$emit("sort-change", item.sortKey, "desc");
      } else {
        this.tableData = [...this.sortData];
        this.$emit("sort-change", item.sortKey, "cancel");
      }
    },
    getNaturalData() {
      const opts = this.getOptions();
      const tKey = opts.method.tKey;
      const lKey = opts.method.lKey;
      if (opts.isLoading) opts.isLoading = true;
      if (opts.isPagination) {
        this.total = this.data[tKey] * 1;
        this.tableData = this.data[lKey];
      } else {
        this.total = 0;
        this.tableData = this.data;
      }

      if (this.isSort && this.isSort === "asce") {
        this.asce();
      } else if (this.isSort && this.isSort === "desc") {
        this.desc();
      }
      if (opts.isLoading) opts.isLoading = false;
      this.setKeyIndex();
      this.setKeySelection();
      this.$forceUpdate();
    },
    async getTableData() {
      const opts = this.getOptions();
      const method = opts.method.interface;
      const cKey = opts.method.cKey;
      const cVal = opts.method.cVal;
      const tKey = opts.method.tKey;
      const lKey = opts.method.lKey;
      const success = opts.method.success;
      const failed = opts.method.failed;
      const dKey = opts.method.dKey;
      this.setTimeOut(opts, failed, opts.method.timeOut || 10000);
      if (opts.isLoading) opts.isLoading = true;
      this.setParameter();
      const parameter = this.getParameter();
      const respone = await method(parameter);
      this.timeOut = false;
      if (respone && respone[cKey] * 1 === cVal * 1) {
        const data = respone[dKey];
        if (opts.isPagination) {
          this.total = data[tKey] * 1;
          this.tableData = data[lKey];
        } else {
          this.total = 0;
          this.tableData = data;
        }

        if (this.isSort && this.isSort === "asce") {
          this.asce();
        } else if (this.isSort && this.isSort === "desc") {
          this.desc();
        }

        if (opts.isLoading) opts.isLoading = false;

        this.setKeyIndex();
        this.setKeySelection();

        this.$forceUpdate();
        success && success(respone);
      } else {
        if (opts.isLoading) opts.isLoading = false;
        failed && failed(respone);
      }
    },
    resetCurrentPage(val) {
      this.$refs["table-pagination"].resetCurrentPage(val);
    },
    currentChange(val) {
      this.page.current = val;
      this.getTableData();
    },
    sizeChange(val) {
      if(val * 1 !== this.page.size) {
        this.page.current = 1;
        this.page.size = val;
        this.getTableData();
      }
    },
    setParameter(parmas) {
      const opts = this.getOptions();
      const args = parmas ? parmas : {};
      window.__storevueappdate__state_formData
        ? window.__storevueappdate__state_formData
        : {};
      if (opts.isPagination) {
        let pageNumKey = opts.method.pageNumKey;
        let pageSizeKey = opts.method.pageSizeKey;
        let paper = {};
        if(this.$uiConfig.pager) {
          pageNumKey = this.$uiConfig.pager.page;
          pageSizeKey = this.$uiConfig.pager.size;
          if(this.$uiConfig.pager.key) {
            paper[this.$uiConfig.pager.key] = {};
            paper[this.$uiConfig.pager.key][pageNumKey] = this.page.current;
            paper[this.$uiConfig.pager.key][pageSizeKey] = this.page.size;
          } else{
            paper[pageNumKey] = this.page.current;
            paper[pageSizeKey] = this.page.size;
          }
        } else {
          paper[pageNumKey] = this.page.current;
          paper[pageSizeKey] = this.page.size;
        }
        const opc = opts.method.parmas ? opts.method.parmas : {};
        this.parameter = Object.assign(
          {},
          paper,
          opc,
          args,
          window.__storevueappdate__state_formData
        );
      } else {
        this.parameter = Object.assign(
          {},
          opts.method.parmas,
          args,
          window.__storevueappdate__state_formData
        );
      }
    },
    getParameter() {
      return this.parameter;
    }
  }
};
</script>
<style lang="stylus">
@import '../../styles/variable';
.cys-table {
  display : flex;
  position: relative;
  padding: 0 0 0 0;
  flex-direction: column;
  .cys-table-wrapper {
    overflow: hidden;
    overflow-x: auto;
  }

  .center {
    text-align center;
  }

  .td {
    padding 0;
    display inline-block
  }

  .cys-table-scwrapper{
    width: 100%;
    min-width: 1000px;
    background $--table-background-color
  }


  table {
    table-layout: fixed;
    width 100%;
    tr {
      width 100%;
      th,td {
        width: auto;
        text-align: left;
        padding: 15px 10px;
        word-break: break-all
        &.pd0 {
          padding 0;
        }
      }
    }
  }
  .cys-table-header {
    th {
      font-weight: normal;
      color: $--table-thead-th;
      background-color: $--table-th-background;
    }
  }

  &.scroll .cys-table-bar-box{
     bottom: 17px;
  }

  .cys-table-bar-box {
    &.hzt {
      width: 100%;
      height: $--table-bar-box-width;
      bottom: $--table-bar-button-size;
      left: 0;
      top auto;
      display: none;
      .cys-table-bar-box-drop {
        height: 100%;
      }
    }
    background: $--table-bar-box-background;
    position absolute;
    right 0;
    bottom 1px;
    width: $--table-bar-box-width;
    height 100%;
    .cys-table-bar-box-drop {
      position absolute;
      top 0;
      width 100%;
      background: $--table-bar-box-drop-background;
    }
  }

  .cys-table-tbody {
    tr{
      td {
        border-bottom: 1px solid $--table-border-color;
        color: $--table-tbody-td;
      }
      &:last-child{
        td {
          border-bottom: 0;
        }
        table {
          td {
            border-bottom: 1px solid $--table-border-color;
          }
        }
      }
    }
  }

  &.cys-table--striped {
    .cys-table-tbody {
      tr {
        &:nth-child(odd)
        {
          background: $--table-tbody-td-odd;
          td {background: $--table-tbody-td-odd}
        }
        &:nth-child(even)
        {
          background: $--table-tbody-td-even;
          td {background: $--table-tbody-td-even}
        }
      }
    }
  }

  &.cys-table--border{
    .cys-table-wrapper {
      border 1px solid $--table-border-color;
    }
    .cys-table-scwrapper {
      .cys-table-header {
        th {
          border-bottom: 1px solid $--table-border-color;
          font-weight: normal;
        }
      }
      tr {
        td {
          border-left: 1px solid $--table-border-color;
          &:first-child {
            border-left none
          }
        }
        th {
          border-left: 1px solid $--table-border-color;
        }
        &:first-child {
          th:nth-child(1) {
            border-left none
          }
        }
      }
    }
  }

  .cys-table--fiexd {
    position sticky
    top 0
    background $--table-background-color
  }

  .cys-table-header {
    position relative;
    z-index 10
  }

  .cys-table--right {
    right 0
  }

  .cys-table--left {
    left: 0
  }

  &.scroll {
    .cys-table--shadow-right{
      box-shadow: -4px 0 6px rgba(125,125,125,.12)
    }

    .cys-table--shadow-left{
      box-shadow: 4px 0 6px rgba(125,125,125,.12)
    }
  }

  .v-sort {
    width 20px;
    display inline-block
    position relative
    height 10px
    &.asce {
      .u {
         border-bottom-color: #409eff;
      }
    }
    &.desc {
      .d {
         border-top-color: #409eff;
      }
    }

    .u {
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-bottom-color: #c0c4cc;
      position: absolute;
      left: 7px;
      top: -8px;
    }
    .d {
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top-color: #c0c4cc;
      position: absolute;
      left: 7px;
      bottom: -7px;
    }
  }

}
</style>
