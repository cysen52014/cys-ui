<template>
  <table cellpadding="0" cellspacing="0" class="thead-wrapper">
    <thead v-if="!isMultiHead">
      <tr>
        <th
          v-for="(item, index) in cols"
          :style="thStyle(item, index)"
          :class="[
            {
              'cys-table--fiexd': item.fixed,
              'cys-table--left': item.fixed === 'left',
              'cys-table--right': item.fixed === 'right',
              'cys-table--shadow-left': item.shadowLeft,
              'cys-table--shadow-right': item.shadowRight
            }
          ]"
          :key="index"
        >
          <cys-checkbox
            v-if="item.prop === '_keySelection'"
            :value="table.checkedAll"
            :indeterminate="table.indeterminate"
            @change="selectAll"
          />
          <span class="td" v-else>{{ item.label }}</span>
        </th>
      </tr>
    </thead>
    <thead v-else>
      <tr v-for="(item, index) in cols" :key="index">
        <th
          v-for="(item2, index2) in item"
          :style="thStyle(item2, index2)"
          :key="index2"
          :colspan="item2.colspan"
          :rowspan="item2.rowspan"
          :class="item.fixed ? 'fiexd ' + item.fixed : ''"
        >
          <cys-checkbox
            v-if="item2.prop === '_keySelection'"
            v-model="item2.checked"
            @change="selectAll"
          />
          <span v-else>{{ item2.label }}</span>
        </th>
        <!-- <th v-else></th> -->
      </tr>
    </thead>
  </table>
</template>
<script>
import Emitter from "../../mixins/emitter.js";
export default {
  name: "CysTableColum",
  componentName: "CysTableColum",
  mixins: [Emitter],
  inject: ["table"],
  props: {
    options: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      fixed: {
        Lcols: [], // 左边固定列
        LD: [0], // 左边边固定列数据
        Rcols: [], // 右边边固定列
        RD: [0] // 右边边固定列数据
      },
      isMultiHead: false
    };
  },
  computed: {
    thStyle() {
      return function(item, index) {
        if (item.style) {
          return item.style;
        } else {
          return "";
        }
      };
    },
    cols() {
      let cols = (this.options.thead.column && this.options.thead.column) || [];
      let tKey = [];

      if (JSON.stringify(cols).indexOf("cols") > 0) {
        // 多表头
        this.isMultiHead = true;
        let mut = [];

        cols = this.setColIndex(cols, true);

        cols = this.setColSelection(cols, true);

        cols = cols.map((col, index) => {
          col.forEach((col2, index2) => {
            if (col2.prop) {
              mut.push(col2);
            }
          });
          return col;
        });
        this.setColFixed(cols, true);
        tKey = mut;
      } else {
        // 单表头

        this.isMultiHead = false;

        cols = this.setColIndex(cols);

        cols = this.setColSelection(cols);

        cols = this.setColFixed(cols);

        tKey = cols;
      }

      this.dispatchByMethod("CysTable", "tdStyle", tKey);

      return cols;
    }
  },
  created() {
    this.$on("getFixedDate", this.getFixedDate);
  },
  methods: {
    selectAll(val) {
      this.table.callSelectAll(val);
    },
    setColIndex(cols, m) {
      if (this.options.isIndex) {
        if (m) {
          let fcol = {
            label: this.options.indexLabel || "序号",
            prop: "_keyIndex",
            style: {
              width: this.options.indexWidth || "80px"
            },
            rowspan: cols.length,
            colspan: 1
          };
          if (JSON.stringify(cols[0]).indexOf("_keyIndex") < 0) {
            cols[0].unshift(fcol);
          }
        } else {
          cols = [
            {
              label: this.options.indexLabel || "序号",
              prop: "_keyIndex",
              fixed: this.options.indexFixed || "",
              style: {
                width: this.options.indexWidth || "80px"
              }
            }
          ].concat(cols);
        }
      }
      return cols;
    },
    setColSelection(cols, m) {
      if (this.options.isSelection) {
        if (m) {
          let fcol = {
            label: "",
            prop: "_keySelection",
            fixed: this.options.selectionFixed || "",
            checked: false,
            style: {
              width: this.options.selectionWidth || "60px"
            },
            rowspan: cols.length,
            colspan: 1
          };
          if (JSON.stringify(cols[0]).indexOf("_keyIndex") < 0) {
            cols[0].unshift(fcol);
          }
        } else {
          cols = [
            {
              label: "",
              prop: "_keySelection",
              fixed: this.options.selectionFixed || "",
              checked: false,
              style: {
                width: this.options.selectionWidth || "60px"
              }
            }
          ].concat(cols);
        }
      }
      return cols;
    },
    setColFixed(cols, m) {
      if (JSON.stringify(cols).indexOf("fixed") > 0) {
        const mid = [];
        this.fixed.Rcols = [];
        this.fixed.Lcols = [];
        this.fixed.RD = [];
        this.fixed.LD = [];

        if (m) {
          const cee = cols => {
            cols.forEach((col, index) => {
              if (col instanceof Array) {
                cee(col);
              } else {
                if (col.fixed === "right") {
                  this.fixed.Rcols.push(col);
                } else if (col.fixed === "left") {
                  this.fixed.Lcols.push(col);
                }
              }
            });
          };
          cee(cols);
        } else {
          cols.forEach((col, index) => {
            if (col.fixed === "right") {
              cols.slice(index, 1);
              this.fixed.Rcols.push(col);
            } else if (col.fixed === "left") {
              cols.slice(index, 1);
              this.fixed.Lcols.push(col);
            } else {
              mid.push(col);
            }
          });
          if (this.fixed.Lcols[this.fixed.Lcols.length - 1]) {
            this.fixed.Lcols[this.fixed.Lcols.length - 1].shadowLeft = true;
          }
          if (this.fixed.Rcols[0]) {
            this.fixed.Rcols[0].shadowRight = true;
          }
          cols = []
            .concat(this.fixed.Lcols)
            .concat(mid)
            .concat(this.fixed.Rcols);
        }
      }
      return cols;
    },
    tbWd(table, data) { // 固定列
      const tbody = table.querySelector(".tbody-wrapper");
      const thead = table.querySelector(".thead-wrapper");
      const cl = thead.rows[0].cells;
      const cw = [];
      const cr = [];
      const RC = [...this.fixed.RD].reverse();
      this.fixed.LD.forEach(r => {
        const th = cl[r.index];
        const wd = parseInt(th.offsetWidth);
        const br = parseInt(
          document.defaultView.getComputedStyle(th, null).borderRight
        );
        const bl = parseInt(
          document.defaultView.getComputedStyle(th, null).borderLeft
        );
        const ll = wd + br + bl;
        th.style.left = r.index === 0 ? 0 : eval(cw.join("+")) + "px";
        data.forEach((row, ii) => {
          const td = tbody.rows[ii].cells[r.index];
          const twd = parseInt(td.offsetWidth);
          const tbr = parseInt(
            document.defaultView.getComputedStyle(td, null).borderRight
          );
          const tbl = parseInt(
            document.defaultView.getComputedStyle(td, null).borderLeft
          );
          const l = twd + tbr + tbl + "px";
          td.style.left = r.index === 0 ? 0 : eval(cw.join("+")) + "px";
        });
        cw.push(ll);
      });
      RC.forEach(r => {
        const th = cl[r.index];
        const wd = parseInt(th.offsetWidth);
        const br = parseInt(
          document.defaultView.getComputedStyle(th, null).borderRight
        );
        const bl = parseInt(
          document.defaultView.getComputedStyle(th, null).borderLeft
        );
        const ll = wd + br + bl;
        th.style.right =
          r.index === Object.keys(data[0]).length - 1
            ? 0
            : eval(cr.join("+")) + "px";
        data.forEach((row, ii) => {
          const td = tbody.rows[ii].cells[r.index];
          const twd = parseInt(td.offsetWidth);
          const tbr = parseInt(
            document.defaultView.getComputedStyle(td, null).borderRight
          );
          const tbl = parseInt(
            document.defaultView.getComputedStyle(td, null).borderLeft
          );
          const l = twd + tbr + tbl + "px";
          td.style.right =
            r.index === Object.keys(data[0]).length - 1
              ? 0
              : eval(cr.join("+")) + "px";
        });
        cr.push(ll);
      });
    },
    getFixedDate(conf) {
      const table = conf.table;
      if (!table) return;
      this.fixed.RD = [];
      this.fixed.LD = [];

      this.cols.map((col, index) => {
        if (col.fixed === "left") {
          this.fixed.LD.push({
            index: index,
            wd: 0
          });
        } else if (col.fixed === "right") {
          this.fixed.RD.push({
            index: index,
            wd: 0
          });
        }
        if (index === this.cols.length - 1) {
          this.tbWd(table, conf.data);
        }
      });
    }
  }
};
</script>
