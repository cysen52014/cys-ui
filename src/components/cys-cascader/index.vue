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
      tree: {
        1: {
          data: []
        }
      },
      visible: false,
      isSelectAllLevels: true,
      selectText: "",
      AText: "",
      searchList: []
    };
  },
  watch: {
    value(val) {
      if (val === "") {
        this.selectText = val;
      }
    },
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          document.body.addEventListener("mousedown", this.hide, {
            passive: false
          });
        });
      }
      this.$emit("visible-change", val);
    },
    searchList: {
      handler(val) {
        this.resetScroll();
      },
      deep: true
    },
    tree: {
      handler(val) {
        this.resetScroll();
      },
      deep: true
    },
    options: {
      handler(val) {
        this.setPropsDef();
        if (val.length > 0) {
          this.setDefVal(val);
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getOffset (el) {
      // 获取某元素以浏览器左上角为原点的坐标
      let t = 0 // 获取该元素对应父容器的上边距
      let l = 0 // 对应父容器的上边距
      // 判断是否有父容器，如果存在则累加其边距
      while (el && el.tagName !== 'BODY') {
        t += el.offsetTop
        l += el.offsetLeft
        el = el.offsetParent
      }
      return {
        l: l,
        t: t
      }
    },
    setPropsDef() {
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
    async setDefVal(val) {
      if (this.value) {
        let val = "";
        if (this.value instanceof Array && this.propsDef.checkStrictly) {
          val = "" + this.value[this.value.length - 1];
          const _ids = await this.getCurrent(val);
          this.setChecked(this.options, _ids);
        } else {
          val = "" + this.value;
          const _ids = await this.getCurrent(String(val));
          this.setChecked(this.options, _ids);
        }
      } else {
        this.tree =
          this.tree[1].data.length < 1
            ? {
                1: {
                  data: this.options
                }
              }
            : this.tree;
      }
    },
    resetScroll() {
      this.$nextTick(() => {
        Object.keys(this.$refs).forEach(key => {
          if (this.$refs[key] && this.$refs[key].bgo) {
            this.$refs[key].bgo();
          }
        });
      });
    },
    hide() {
      this.visible = false;
      document.body.removeEventListener("mousedown", this.hide, {
        passive: false
      });
    },
    clearNodes(deep) {
      for (const key in this.tree) {
        if (key > deep) {
          delete this.tree[key];
        }
      }
    },
    getCurrent(id) {
      return new Promise((resove, reject) => {
        const dep = (data, level, ids, lbs) => {
          data.forEach((r, ii) => {
            let _ids = ids
              ? ids + "-" + String(r[this.propsDef.value]) + "|" + ii
              : String(r[this.propsDef.value]) + "|" + ii;

            let _lbs = lbs
              ? lbs + "/" + String(r[this.propsDef.label])
              : String(r[this.propsDef.label]);

            r._ids = _ids;
            r._lbs = _lbs;
            r.selected = false;

            if (String(r[this.propsDef.value]) === id) {
              resove(r._ids);
            }
            if (
              r[this.propsDef.children] &&
              r[this.propsDef.children].length > 0
            ) {
              dep(r[this.propsDef.children], level + 1, _ids, _lbs);
            }
          });
        };
        dep(this.options, 1);
      });
    },
    getLiLabel(data, val, lbs, ids) {
      const searchLiList = [];
      const dep = (data, lbs, ids) => {
        data.forEach((r, ii) => {
          let _ids = ids
            ? ids + "-" + String(r[this.propsDef.value]) + "|" + ii
            : String(r[this.propsDef.value]);

          let _lbs = lbs
            ? lbs + "/" + String(r[this.propsDef.label])
            : String(r[this.propsDef.label]);

          r._ids = _ids;
          r._lbs = _lbs;
          r.selected = false;

          if (r[this.propsDef.label].indexOf(val) > -1) {
            searchLiList.push(r);
          }
          if (
            r[this.propsDef.children] &&
            r[this.propsDef.children].length > 0
          ) {
            dep(r[this.propsDef.children], _lbs, _ids);
          }
        });
      };
      dep(data, lbs, ids);
      return searchLiList;
    },
    setChecked(obj, ids) {
      obj.forEach((r, i) => {
        const f = this.options[0].parentId === r.parentId && ids !== r._ids;
        if (String(ids).indexOf(r._ids) > -1) {
          if (this.propsDef.checkStrictly) {
            if (this.propsDef.showAllLevels) {
              this.selectText = r._lbs;
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
          }
          if (this.filter && this.onInput) {
            if (String(ids) === r._ids) {
              r.isSelected = true;
              this.setTreeData(r);
            } else {
              r.isSelected = false;
            }
          } else {
            r.isSelected = true;
            this.setTreeData(r);
          }
        } else {
          r.isCurrent = false;
          r.isSelected = false;
        }
        if (r[this.propsDef.children] && r[this.propsDef.children].length > 0) {
          this.setChecked(r[this.propsDef.children], ids);
        }
      });
    },
    setTreeData(data) {
      const level = data._ids.split("-").length + 1;
      if (this.tree[1].data.length < 1 && this.options.length > 0) {
        this.tree = {
          1: {
            data: this.options
          }
        };
      }
      this.$set(this.tree, level, {
        ids: data._ids,
        lbs: data._lbs,
        data: data[this.propsDef.children] || []
      });
    },
    getSelectedIds(_ids) {
      let ids = [];
      const aids = _ids.replace(/[|]\d/gi, "").split("-");
      if (this.propsDef.checkStrictly) {
        ids = aids;
      } else {
        ids = aids[aids.length - 1];
      }

      this.$emit("change", ids);
      this.$emit("input", ids);
    },
    selected(evt, data) {
      evt.cancelBubble = true;
      const key = data._ids ? data._ids.split("-").length : "1";
      this.clearNodes(key);
      this.ids = data._ids;

      if (this.propsDef.showAllLevels) {
        this.getSelectedIds(data._ids);
      } else {
        if (
          !(
            data[this.propsDef.children] &&
            data[this.propsDef.children].length > 0
          )
        ) {
          this.getSelectedIds(data._ids);
        }
      }
      this.setChecked(this.options, data._ids); // 设置选中
    },
    search(val) {
      // 搜索
      this.searchList = [];
      this.clearNodes(1);
      const dep = r => {
        r.forEach((data, ii) => {
          let lbs = data._lbs ? data._lbs : data[this.propsDef.label];
          let ids = data._ids ? data._ids : data[this.propsDef.value];
          if (
            data[this.propsDef.children] &&
            data[this.propsDef.children].length > 0
          ) {
            data._ids = ids;
            data._lbs = lbs;
            data.selected = false;
            if (data[this.propsDef.label].indexOf(val) > -1) {
              this.searchList = this.searchList.concat(data);
            }
            this.searchList = this.searchList.concat(
              this.getLiLabel(data[this.propsDef.children], val, lbs, ids)
            );
          }
        });
      };
      dep(this.options);
    },
    renderScNode(data, ids, lbs) {
      // 搜索下拉列表
      if (!data) return;
      const node = data.map((data, ii) => {
        return this.H("li", [
          this.H(
            "span",
            {
              class: [
                {
                  "is-selected": data.isSelected,
                  "is-all": this.propsDef.checkStrictly && !data.isCurrent,
                  "is-current": data.isCurrent
                }
              ],
              on: {
                mousedown: evt => {
                  this.selected(evt, data);
                  this.setNodeUlfx();
                }
              }
            },
            [
              this.H("i", {
                domProps: {
                  className: "cysicon gx icon-icon_gouxuan"
                }
              }),
              this.H("em", {
                domProps: {
                  innerHTML: data._lbs
                }
              })
            ]
          )
        ]);
      });
      return node;
    },
    renderLiNode(data, ids, lbs) {
      if (!data) return;
      const node = data.map((data, ii) => {
        const _ids = ids
          ? ids + "-" + String(data[this.propsDef.value]) + "|" + ii
          : String(data[this.propsDef.value]) + "|" + ii;

        const _lbs = lbs
          ? lbs + "/" + String(data[this.propsDef.label])
          : String(data[this.propsDef.label]);

        data._ids = _ids;
        data.index = ii;
        data._lbs = _lbs;

        return this.H("li", [
          this.H(
            "span",
            {
              class: [
                {
                  "is-selected": data.isSelected,
                  "is-all": this.propsDef.checkStrictly && !data.isCurrent,
                  "is-current": data.isCurrent
                }
              ],
              on: {
                mousedown: evt => {
                  this.selected(evt, data);
                  this.setNodeUlfx();
                }
              }
            },
            [
              this.H("i", {
                domProps: {
                  className: "cysicon gx icon-icon_gouxuan"
                }
              }),
              this.H("em", {
                domProps: {
                  innerHTML: data[this.propsDef.label]
                }
              })
            ]
          )
        ]);
      });
      return node;
    },
    createNodeUl() {
      const levels = [];
      const tree = Object.assign({}, this.tree);
      for (const key in tree) {
        const level = tree[key].data;
        const ids = tree[key].ids || null;
        const lbs = tree[key].lbs || null;
        let LI = "";
        if (this.filter && this.onInput) {
          LI = this.renderScNode(this.searchList);
        } else {
          LI = this.renderLiNode(level, ids, lbs);
        }
        if (level.length > 0) {
          levels.push(
            this.H(
              "ul",
              {
                domProps: {
                  className: "level" + key
                }
              },
              [
                this.H(
                  "cys-scrollbar",
                  {
                    ref: "scrollbar" + key,
                    domProps: {
                      className: "sc"
                    },
                    props: {
                      height: 180,
                      bar: {
                        fcolor: "rgba(144,147,153,.5)",
                        bcolor: "rgba(255,255,255,0)"
                      }
                    }
                  },
                  LI
                )
              ]
            )
          );
        }
      }
      return this.H(
        "div",
        {
          ref: "ulwrap",
          domProps: {
            className: "ulwrap",
            style: "width:" + 100 * levels.length + "%"
          }
        },
        levels
      );
    },
    setNodeUlfx() {
      this.$nextTick(() => {
        const ur = this.$refs['ulwrap']
        if(ur && this.getOffset(ur).l + ur.offsetWidth > document.documentElement.clientWidth) {
          ur.style.right = 0;
          ur.style.left = 'auto';
        }
      })
    },
    renderNode() {
      const Nodes = this.visible ? this.createNodeUl() : [];
      return this.H(
        "div",
        {
          domProps: {
            className: "cys-cascader"
          },
          on: {
            mousedown: evt => {
              evt.cancelBubble = true;
              this.visible = !this.visible;
              this.setNodeUlfx();
            }
          }
        },
        [
          this.H(
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
                    this.setChecked(this.options, val);
                    this.$emit("change", val);
                    this.$emit("input", val);
                    this.dispatch("CysFormItem", "form-change", val);
                  }
                },
                input: val => {
                  if (this.filter) {
                    this.search(val);
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
              this.H("var", {
                domProps: {
                  className: "cysicon icon-angledown"
                },
                slot: "suffix"
              })
            ]
          ),
          Nodes
        ]
      );
    }
  },
  render(h) {
    this.H = h;
    return this.renderNode();
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
  padding 0;
  var {
    font-size 18px;
    position relative
    top 5px;
  }
  .ulwrap {
    position absolute
    left 0
    top 100%
    z-index 99999
    display flex
    box-shadow 3px 3px 10px 0 rgba(0 0 0 0.1)
  }
  ul {
    margin 0
    padding 0
    background #fff
    border-right 1px solid #e4e7ed
    position relative
    overflow hidden
    &:last-child{
      border none
    }
    flex 1
    .sc {
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
    line-height 18px
    list-style none
    margin-left 0
    padding 0 0
    font-size: 14px;
    em {
      font-style normal;
    }
    span {
      &:hover {
        background-color #f5f7fa
        color #409eff
      }
      &.is-selected {
        color #409eff
      }
      padding 6px 0
      display flex
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
