<template>
  <div class="table-row-group">
    <ul class="table-row">
      <li class="table-cell">John</li>
      <li class="table-cell">19</li>
    </ul>
  </div>
</template>
<script>
export default {
  inject: ["table"],
  data() {
    return {
      data: [],
      pager: {
        page: 1,
        size: 10
      },
      parameter: {}
    };
  },
  computed: {
    getData() {
      if (this.data) {
      }
    }
  },
  created() {
    console.log(this.getTableData(), "====");
  },
  methods: {
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
          timeOut: 10000,
          interface: () => {}, // 调用表格数据接口方法
          parmas: {}, // 参数
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
            typeof this.table.options[key] === "undefined" ||
            JSON.stringify(this.table.options[key]) === "{}"
          ) {
            this.table.options[key] = opt[key];
          } else {
            this.table.options[key] =
              typeof this.table.options[key] === "object"
                ? Object.assign({}, opt[key], this.table.options[key])
                : this.table.options[key];
          }
        });
      }
      return this.table.options;
    },
    api() {
      let cef = {};
      const def = {
        pager: { page: "pageNum", size: "pageSize" },
        res: { code: 0, data: { list: [], total: 0 }, msg: "" }
      };
      if (this.$uiConfig.table) {
        cef = {
          pager: this.$uiConfig.table.pager || def.pager,
          res: this.$uiConfig.table.res || def.res
        };
      } else {
        cef = def;
      }
      return cef;
    },
    setParameter(parmas) {
      const args = parmas ? parmas : {};
      window.__storevueappdate__state_formData
        ? window.__storevueappdate__state_formData
        : {};
      this.parameter = Object.assign(
        {},
        args,
        window.__storevueappdate__state_formData
      );
    },
    getParameter() {
      return this.parameter;
    },
    setTimeOut(failed, time) {
      const timer = setTimeout(() => {
        if (this.timeOut) {
          failed && failed("timeout");
          this.isLoading = false;
        }
        clearTimeout(time);
      }, time);
    },
    async getTableData() {
      const opts = this.getOptions();
      const method = opts.method.interface;
      const success = opts.method.success;
      const failed = opts.method.failed;
      const params = opts.method.params || {};
      const ap = this.api();
      console.log(ap, "this.rsp.c==");
      if (opts.isPagination) {
        const a = Object.assign({}, res.pager, params);
        this.parameter = this.setParameter(a);
      } else {
        const a = Object.assign({}, params);
        this.parameter = this.setParameter(a);
      }

      if (opts.isLoading) this.isLoading = true;
      const respone = await method(this.parameter);
    }
  }
};
</script>
