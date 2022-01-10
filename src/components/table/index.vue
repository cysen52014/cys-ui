<template>
  <div
    class="cyi-table"
    :class="[
      {
        'table--striped': striped,
        'table--border': border
      }
    ]"
  >
    <TableHeader />
    <TableBody />
  </div>
</template>
<script>
import TableHeader from "./table-header";
import TableBody from "./table-body";
export default {
  name: "CyiTable",
  componentName: "CyiTable",
  provide() {
    return { table: this };
  },
  components: {
    TableHeader,
    TableBody
  },
  props: {
    striped: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {}
    },
    options: {
      type: Object,
      default: {
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
          failed: () => {}, // 接口失败回调
          success: () => {} // 接口成功回调
        },
        isPagination: false
      }
    }
  }
};
</script>
<style lang="stylus">
@import "../../styles/variable";
.cyi-table {
  /*此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。*/
  display: table;
  border-collapse: collapse;
  // border-collapse: separate;
  color: $--table-color;
  background: $--table-background-color;
  &.table--border {
    border: 1px solid $--table-border-color;
    .table-row {
      border-top: 1px solid $--table-border-color;
    }
  }
  .table-header-group {
    /*此元素会作为一个或多个行的分组来显示（类似 <thead>）。*/
    display: table-header-group;
    background: #eee;
    font-weight: bold;
    color: $--table-thead-th;
  }
  .table-row-group {
    /*此元素会作为一个或多个行的分组来显示（类似 <tbody>）。*/
    display: table-row-group;
  }
  .table-row {
    /*此元素会作为一个表格行显示（类似 <tr>）。*/
    display: table-row;
  }
  .table-cell {
    /*此元素会作为一个表格单元格显示（类似 <td> 和 <th>）*/
    display: table-cell;
    padding: $--table-cell-padding;
    border-left: 1px solid $--table-border-color;
    &:nth-child(1) {
      border-left: none;
    }
  }
  ul {
    list-style: none;
  }
  &.table--striped {
    .table-row:nth-child(odd) {
      background-color: $--table-row-odd;
    }
    .table-row:nth-child(even) {
      background-color: $--table-row-even;
    }
  }
}
</style>
