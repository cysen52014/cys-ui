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
export default {
  name: "CysCascader",
  componentName: "CysCascader",
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
  computed: {},
  data() {
    return {
      tree: {},
      visible: false
    };
  },
  methods: {
    setParnetSelected() {
      // 选中父层
    },
    selected(evt, data) {
      evt.cancelBubble = true;
      data.isSelected = !data.isSelected;
      this.visible = true;
      this.$forceUpdate();
    },
    renderChildren(h, data, ids, out) {
      const _ids = ids
        ? ids + "-" + String(data[this.props.value])
        : String(data[this.props.value]);
      const lvdeep = _ids.split("-").length;

      let c = [];
      data._ids = _ids;
      if (!this.visible) {
        return [];
      } else {
        if (data.children) {
          if (out) {
            c = h(
              "li",
              [
                h(
                  "span",
                  {
                    domProps: {
                      className: data.isSelected ? "is-selected" : ""
                    },
                    on: {
                      click: evt => {
                        this.selected(evt, data);
                      }
                    }
                  },
                  [
                    data[this.props.label],
                    h("i", {
                      domProps: {
                        className: "cysicon r icon-angleright"
                      }
                    })
                  ]
                )
              ].concat(
                h(
                  "ul",
                  {
                    domProps: {
                      className: "level" + lvdeep
                    }
                  },
                  data.children.map(level => {
                    level._ids = _ids + "-" + level[this.props.value];
                    if (level.children) {
                      return this.renderChildren(h, level, _ids, true);
                    } else {
                      return h("li", [
                        h(
                          "span",
                          {
                            domProps: {
                              className: level.isSelected ? "is-selected" : ""
                            },
                            on: {
                              click: evt => {
                                this.selected(evt, level);
                              }
                            }
                          },
                          level[this.props.label]
                        )
                      ]);
                    }
                  })
                )
              )
            );
          } else {
            c = h(
              "ul",
              {
                domProps: {
                  className: "level" + lvdeep
                }
              },
              [
                h("li", [
                  h(
                    "span",
                    {
                      domProps: {
                        className: data.isSelected ? "is-selected" : ""
                      },
                      on: {
                        click: evt => {
                          this.selected(evt, data);
                        }
                      }
                    },
                    [
                      data[this.props.label],
                      h("i", {
                        domProps: {
                          className: "cysicon r icon-angleright"
                        }
                      })
                    ]
                  ),
                  h(
                    "ul",
                    {
                      domProps: {
                        className: "level" + (lvdeep + 1)
                      }
                    },
                    data.children.map(level => {
                      level._ids = _ids + "-" + level[this.props.value];
                      if (level.children) {
                        return this.renderChildren(h, level, _ids, true);
                      } else {
                        return h("li", [
                          h(
                            "span",
                            {
                              domProps: {
                                className: level.isSelected ? "is-selected" : ""
                              },
                              on: {
                                click: evt => {
                                  this.selected(evt, level);
                                }
                              }
                            },
                            level[this.props.label]
                          )
                        ]);
                      }
                    })
                  )
                ])
              ]
            );
          }
          return c;
        } else {
          return h(
            "ul",
            {
              domProps: {
                className: "level" + lvdeep
              }
            },
            [
              h("li", [
                h(
                  "span",
                  {
                    domProps: {
                      className: data.isSelected ? "is-selected" : ""
                    },
                    on: {
                      click: evt => {
                        this.selected(evt, data);
                      }
                    }
                  },
                  data[this.props.label]
                )
              ])
            ]
          );
        }
      }
    },
    renderNode(h) {
      this.tree = this.options[0];
      const children = this.renderChildren(h, this.tree);
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
                value: this.value,
                disabled: this.disabled,
                clearable: this.clearable
              },
              attrs: {
                placeholder: this.placeholder,
                readonly: this.filter ? "" : "readonly"
              }
            },
            [
              h("i", {
                domProps: {
                  className: "cysicon icon-icon_jiantou_xiazhankai"
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
  padding 0;
  ul {
    background #fff
    box-shadow 0 0 2px #808080
    position absolute
    width calc(100% - 2px)
    left 1px
    top 100%
    z-index 10
  }
  li {
    ul {
      left 100%
      top 0
    }
    line-height 36px
    list-style none
    margin-left 0
    padding-top 0
    padding-left 0
    span {
      display block;
      &:hover {
        background-color #f5f7fa
      }
      &.is-selected {
        color #409eff
      }
      padding-left 15px
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
