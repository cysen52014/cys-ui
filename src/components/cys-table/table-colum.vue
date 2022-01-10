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
          <span class="td" @click="item.sort ? changSort(item) : ''" v-else
            >{{ item.label }}
            <div
              v-if="item.sort"
              class="v-sort"
              :class="[
                {
                  asce: item.sort === 'asce',
                  desc: item.sort === 'desc'
                }
              ]"
            >
              <i class="u" @click.stop="asce(item)"></i
              ><i class="d" @click.stop="desc(item)"></i>
            </div>
          </span>
        </th>
      </tr>
    </thead>
    <thead v-else>
      <tr v-for="(item, index) in cols" :key="index">
        <th
          v-for="(item2, index2) in item"
          :style="thStyle(item2, index2)"
          :class="[
            {
              'cys-table--fiexd': item2.fixed,
              'cys-table--left': item2.fixed === 'left',
              'cys-table--right': item2.fixed === 'right',
              'cys-table--shadow-left': item2.shadowLeft,
              'cys-table--shadow-right': item2.shadowRight
            }
          ]"
          :key="index2"
          :colspan="item2.colspan"
          :rowspan="item2.rowspan"
        >
          <cys-checkbox
            v-if="item2.prop === '_keySelection'"
            :value="table.checkedAll"
            :indeterminate="table.indeterminate"
            @change="selectAll"
          />
          <span @click="item.sort ? changSort(item2) : ''" v-else
            >{{ item2.label }}
            <div
              class="v-sort"
              :class="[
                {
                  asce: item2.sort === 'asce',
                  desc: item2.sort === 'desc'
                }
              ]"
              v-if="item2.sort"
            >
              <i class="u" @click.stop="asce(item2)"></i
              ><i class="d" @click.stop="desc(item2)"></i></div
          ></span>
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
        this.setShadow(cols, true);
        tKey = mut;
      } else {
        // 单表头

        this.isMultiHead = false;

        cols = this.setColIndex(cols);

        cols = this.setColSelection(cols);

        cols = this.setShadow(cols);

        tKey = cols;
      }

      this.dispatchByMethod("CysTable", "tdStyle", tKey);

      return cols;
    }
  },
  created() {
    this.$on("setColumFixd", this.setColumFixd);
  },
  methods: {
    changSort(item) {
      const a = ["asce", "desc", "true"];
      let ii = 0;
      a.forEach((r, i) => {
        if(String(item.sort) === r) {
          ii = i + 1;
          if(ii > 2) {
            ii = 0;
          }
        }
      })
      item.sort = a[ii];
      item.sortKey = item.prop;
      this.bS(item.sortKey);
      const fn = a[ii] === "true" ? "asce" : a[ii];
      this.table[fn](item);
    },
    bS(feild) {
      let cols = (this.options.thead.column && this.options.thead.column) || [];
      if (JSON.stringify(cols).indexOf("cols") > 0) {
        this.options.thead.column = cols.map((col, index) => {
          col.forEach((col2, index2) => {
            if (col2.sort && col2.prop !== feild) {
              col2.sort = true;
            }
          });
          return col;
        });
      } else {
        this.options.thead.column = this.options.thead.column.map(r => {
          if (r.sort && r.prop !== feild) {
            r.sort = true;
          }
          return r;
        });
      }
    },
    asce(item) {
      item.sort = item.sort === "asce" ? true : "asce";
      item.sortKey = item.prop;
      this.bS(item.sortKey);
      this.table.asce(item);
    },
    desc(item) {
      item.sort = item.sort === "desc" ? true : "desc";
      item.sortKey = item.prop;
      this.bS(item.sortKey);
      this.table.desc(item);
    },
    selectAll(val) {
      this.table.callSelectAll(val);
    },
    setColIndex(cols, m) {
      if (this.options.isIndex) {
        if (m) {
          let fcol = {
            label: this.options.indexLabel || "序号",
            prop: "_keyIndex",
            fixed: this.options.indexFixed ? "left" : "",
            style: {
              width: this.options.indexWidth || "60px"
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
              fixed: this.options.indexFixed ? "left" : "",
              style: {
                width: this.options.indexWidth || "60px"
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
          const fcol = {
            label: "",
            prop: "_keySelection",
            fixed: this.options.selectionFixed ? "left" : "",
            checked: false,
            style: {
              width: this.options.selectionWidth || "60px"
            },
            rowspan: cols.length,
            colspan: 1
          };
          if (JSON.stringify(cols[0]).indexOf("_keySelection") < 0) {
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
    setShadow(cols, m) {
      let CC = [];
      let rtOne = false;
      let ii = 0;
      if (m) {
        CC = cols[0];
      } else {
        CC = cols;
      }
      const a = JSON.stringify(CC).match(/fixed['":]+?left/gi);
      CC.map((col, index) => {
        col.shadowLeft = false;
        col.shadowRight = false;
        if (col.fixed === "left") {
          ii++;
          if (ii === a.length) {
            col.shadowLeft = true;
          }
        } else if (col.fixed === "right") {
          if (!rtOne) {
            rtOne = true;
            col.shadowRight = true;
          }
        }
        return col;
      });
      return CC;
    },
    tbWd(table, data) {
      // 固定列
      const tbody = table.querySelector(".tbody-wrapper");
      const thead = table.querySelector(".thead-wrapper");
      const cl = thead.rows[0].cells;
      const cw = [];
      const cr = [];
      const RC = [...this.fixed.RD].reverse();
      this.fixed.LD.forEach((r, ii) => {
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
          if (row.expand) return;
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
    setColumFixd(conf) {
      const table = conf.table;
      if (!table) return;
      this.fixed.RD = [];
      this.fixed.LD = [];

      let CC = [];

      if (this.isMultiHead) {
        CC = this.cols[0];
      } else {
        CC = this.cols;
      }

      CC.map((col, index) => {
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
