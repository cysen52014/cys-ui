<!-- <div :class="['cys-cascader']">
    <cys-select
      v-model="value"
      :filter="filter"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
    >
    </cys-select>
  </div> -->
<script>
import Emitter from "../../mixins/emitter.js";
export default {
  name: "CysCascader",
  componentName: "CysCascader",
  mixins: [Emitter],
  props: {
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    value: Array | String | Number,
    options: {
      required: true
    },
    props: {
      type: Object,
      default: () => {
        return {
          checkStrictly: false,
          showAllLevels: true,
          label: "label",
          value: "value",
          children: "children",
          trigger: "click"
        };
      }
    },
    filter: {
      type: [Boolean, Function],
      default: false
    }
  },
  data() {
    return {
      tree: {},
      visible: false,
      isSelectAllLevels: true,
      selectText: "",
      AText: "",
      searchList: []
    };
  },
  created() {
    this.propsDef = Object.assign(
      {},
      {
        checkStrictly: false,
        showAllLevels: true,
        label: "label",
        value: "value",
        children: "children",
        trigger: "click"
      },
      this.props || {}
    );
  },
  async mounted() {
    if (this.value) {
      let val = "";
      if (this.value instanceof Array && this.propsDef.checkStrictly) {
        val = this.value.join("-");
        this.deep(this.options, val);
      } else {
        val = "" + this.value;
        const _ids = await this.getCurrent(val);
        this.deep(this.options, _ids);
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          document.body.addEventListener("click", this.hide, {
            passive: false
          });
        });
      }
      this.$emit("visible-change", val);
    }
  },
  methods: {
    hide() {
      this.visible = false;
      document.body.removeEventListener("click", this.hide, {
        passive: false
      });
    },
    setParnetSelected() {
      // 选中父层
    },
    getCurrent(ids) {
      return new Promise((resove, reject) => {
        const dep = data => {
          data.forEach(r => {
            if (String(r[this.propsDef.value]) === ids) {
              resove(r._ids);
            }
            if (
              r[this.propsDef.children] &&
              r[this.propsDef.children].length > 0
            ) {
              dep(r[this.propsDef.children]);
            }
          });
        };
        dep(this.options);
      });
    },
    deep(obj, ids) {
      obj.forEach((r, i) => {
        const f = (this.options[0].parentId === r.parentId && ids !== r._ids);
        if (String(ids).indexOf(r._ids) > -1) {
          if (this.propsDef.checkStrictly) {
            this.AText += this.selectText
              ? "/" + r[this.propsDef.label]
              : r[this.propsDef.label];
            if (this.propsDef.showAllLevels) {
              this.selectText = this.AText;
            } else {
              if (
                r[this.propsDef.children] &&
                r[this.propsDef.children].length > 0
              ) {
                this.selectText = "";
              } else {
                this.selectText = this.AText;
              }
            }
          } else if (String(r._ids) === ids) {
            r.isCurrent = true;
            if (this.propsDef.showAllLevels) {
              this.selectText = r[this.propsDef.label];
            } else {
              if (
                r[this.propsDef.children] &&
                r[this.propsDef.children].length > 0
              ) {
                this.selectText = "";
              } else {
                this.selectText = r[this.propsDef.label];
              }
            }
          } else {
            r.isCurrent = false;
          }
          r.isSelected = true;
        } else {
          r.isCurrent = false;
          r.isSelected = false;
        }
        if (r[this.propsDef.children] && r[this.propsDef.children].length > 0) {
          this.deep(r[this.propsDef.children], ids);
        }
      });
    },
    selected(evt, data) {
      evt.cancelBubble = true;
      this.selectText = "";
      this.deep(this.options, data._ids);
      if(this.propsDef.showAllLevels) {
        this.getSelectedKey(data._ids);
      } else {
        if(!(data[this.propsDef.children] && data[this.propsDef.children].length > 0)) {
          this.getSelectedKey(data._ids);
        }
      }
      this.$forceUpdate();
    },
    getSelectedKey(_ids) {
      let ids = [];
      const aids = _ids.replace(/[|]\d/ig, '').split("-");
      if (this.propsDef.checkStrictly) {
        ids = aids;
      } else {
        ids = aids[aids.length - 1];
      }

      this.$emit("change", ids);
      this.$emit("input", ids);
    },
    renderChildren(h, data, ids, lbs) {
      if (!data) return;
      const lvdeep = data._ids ? data._ids.split("-").length : "1";
      const node = data.length < 1 ? [] : h(
        "ul",
        {
          domProps: {
            className: "level" + lvdeep
          }
        },
        [
          h(
            "div",
            {
              domProps: {
                className: "sc"
              }
            },
            data.map((data, ii) => {
              const _ids = ids
                ? ids + "-" + String(data[this.propsDef.value]) + '|' + ii
                : String(data[this.propsDef.value]) + '|' + ii ;

              const _lbs = lbs
                ? lbs + "/" + String(data[this.propsDef.label])
                : String(data[this.propsDef.label]);

              let c = [];
              data._ids = _ids;
              data.index = ii;
              data._lbs = _lbs;
              let children = this.renderChildren(
                h,
                data[this.propsDef.children],
                data._ids,
                data._lbs
              );

              return h("li", [
                h(
                  "span",
                  {
                    class: [
                      {
                        "is-selected": data.isSelected,
                        "is-all":
                          this.propsDef.checkStrictly && !data.isCurrent,
                        "is-current": data.isCurrent
                      }
                    ],
                    on: {
                      click: evt => {
                        this.selected(evt, data);
                      }
                    }
                  },
                  [
                    h("i", {
                      domProps: {
                        className: "cysicon gx icon-icon_gouxuan"
                      }
                    }),
                    h("em", {
                      domProps: {
                        innerHTML: data[this.propsDef.label]
                      }
                    })
                  ]
                ),
                data.isSelected ? children : []
              ]);
            })
          )
        ]
      );
      return this.visible ? node : [];
    },
    getChildrensLabel(data, lbs) {
      const searchList = [];
      const dep = (data, _lbs) => {
        data.forEach(r => {
          const lbs = _lbs + "/" + r[this.propsDef.label];
          searchList.push({
            _ids: r._ids,
            selected: false,
            label: lbs
          });
          if (
            r[this.propsDef.children] &&
            r[this.propsDef.children].length > 0
          ) {
            dep(r[this.propsDef.children], lbs);
          }
        });
      };
      dep(data, lbs);
      return searchList.reverse();
    },
    search(val, h) {
      let ids = "";
      this.searchList = [];
      const dep = r => {
        r.forEach(data => {
          if (data[this.propsDef.label].indexOf(val) > -1) {
            ids = data._lbs;
            if (
              data[this.propsDef.children] &&
              data[this.propsDef.children].length > 0
            ) {
              if(this.propsDef.showAllLevels) {
                this.searchList = this.searchList.concat(
                  this.getChildrensLabel(data[this.propsDef.children], data._lbs)
                );
              }
            } else {
              this.searchList = this.searchList.concat({
                _ids: data._ids,
                selected: false,
                label: data._lbs
              });
            }
          }
          if (
            data[this.propsDef.children] &&
            data[this.propsDef.children].length > 0
          ) {
            dep(data[this.propsDef.children]);
          }
        });
      };
      dep(this.options);
      this.searchList = this.searchList.reverse();
      this.$forceUpdate();
    },
    renderSearchNode(h) {
      return h(
        "ul",
        {
          domProps: {
            className: "level1"
          }
        },
        [
          h(
            "div",
            {
              domProps: {
                className: this.searchList.length === 0 ? "sc a" : "sc"
              }
            },

            this.searchList.length === 0
              ? [h("li", "无匹配数据")]
              : this.searchList.map((item, index) => {
                  return h("li", [
                    h(
                      "span",
                      {
                        class: [
                          {
                            "is-selected is-current": item.selected
                          }
                        ],
                        on: {
                          click: evt => {
                            evt.cancelBubble = true;
                            this.setSearchSelected(
                              index,
                              item.label,
                              item._ids
                            );
                          }
                        }
                      },
                      [
                        h("i", {
                          domProps: {
                            className: "cysicon gx icon-icon_gouxuan"
                          }
                        }),
                        h("em", {
                          domProps: {
                            innerHTML: item.label
                          }
                        })
                      ]
                    )
                  ]);
                })
          )
        ]
      );
    },
    setSearchSelected(index, label, _ids) {
      if (this.propsDef.checkStrictly) {
        this.selectText = label;
      } else {
        const lb = label.split("/");
        this.selectText = lb[lb.length - 1];
      }

      this.deep(this.options, _ids);
      const ids = _ids.replace(/[|]\d/ig, '').split("-");
      this.$emit("change", ids);
      this.$emit("input", ids);

      this.visible = false;
      this.onInput = false;
      this.searchList = this.searchList.map((r, ii) => {
        if (index === ii) {
          r.selected = true;
        } else {
          r.selected = false;
        }
        return r;
      });
    },
    renderNode(h) {
      this.tree = this.options;
      let children = this.renderChildren(h, this.tree);
      if (this.filter && this.onInput) {
        children = this.renderSearchNode(h);
      }
      return h(
        "div",
        {
          domProps: {
            className: "cys-cascader"
          },
          on: {
            click: evt => {
              evt.cancelBubble = true;
              this.visible = !this.visible;
            }
          }
        },
        [
          h(
            "cys-input",
            {
              props: {
                value: this.selectText,
                disabled: this.disabled,
                clearable: this.clearable
              },
              attrs: {
                placeholder: this.placeholder,
                readonly: !this.filter
              },
              on: {
                change: val => {
                  if (val === "") {
                    this.deep(this.options, val);
                    this.$emit("change", val);
                    this.$emit("input", val);
                  }
                },
                input: val => {
                  if (this.filter) {
                    this.search(val, h);
                  }
                  this.selectText = val;
                  if (val) {
                    this.onInput = true;
                  } else {
                    this.onInput = false;
                  }
                }
              }
            },
            [
              h("var", {
                domProps: {
                  className: "cysicon icon-angledown"
                },
                slot: "suffix"
              })
            ]
          ),
          children
        ]
      );
    }
  },
  render(h) {
    return this.renderNode(h);
  }
};
</script>
<style lang="stylus" scoped>
@import '../../styles/variable';
.cys-cascader {
  display inline-block;
  position relative
  /deep/ .cys-select--dropdown {
      list-style: none;
      padding: 0px 0;
      height 230px;
  }
  /deep/ .cys-scroll-bar-wrap {
    position absolute
    right 0
    top 0
    height 100%
    &.radius {
      border-radius 5px
      .cys-scroll-bar {
          border-radius 5px
      }
    }
  }
  padding 0;
  var {
    font-size 18px;
    position relative
    top 5px;
  }
  ul {
    margin 0
    padding 0
    background #fff
    box-shadow 3px 2px 8px 0 rgba(0 0 0 0.1)
    position absolute
    width calc(100% - 2px)
    left 1px
    top 100%
    z-index 100
    .sc {
      height 180px
      &.a {
        height auto;
        li {
          height 36px;
          line-height 36px;
          color #c0c4cc;
          text-align center;
        }
      }
    }
  }
  li {
    ul {
      left calc(100% + 1px)
      top 0
    }
    line-height 24px
    list-style none
    margin-left 0
    padding 0 0
    em {
      font-style normal;
    }
    span {
      padding 5px 0
      &:hover {
        background-color #f5f7fa
      }
      display flex
      &.is-selected {
        color #409eff
      }
      &.is-all.is-selected, &.is-current.is-selected {
        .gx {
          visibility visible
        }
      }

      .gx {
       visibility hidden
       margin-right 5px
       font-size 14px;
       display flex
       align-items: center;
      }
      padding-left 8px
      .r {
        float right
        margin 0 5px 0 0
      }
    }
    .icon {
      position absolute
      right 10px
      top 0
    }
  }
}
</style>
