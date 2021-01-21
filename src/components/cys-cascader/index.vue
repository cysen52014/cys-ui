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
  computed: {
    getTreeUli() {
      if (!this.props) {
        this.props = {
          label: "label",
          value: "value",
          children: "children"
        };
      }
      const calee = tree => {
        const c = tree.map(level => {
          let ch = [];
          if (
            level[this.props.children] &&
            level[this.props.children].length > 0
          ) {
            ch = calee(level[this.props.children]);
          }
          const ul =
            ch.length > 0
              ? `<ul>${ch.join(
                  ""
                )}</ul><i class="cysicon icon icon-arrow_right"></i>`
              : "";
          return `<li class="cascader-level-li"><span>${
            level[this.props.label]
          }</span>${ul}</li>`;
        });
        return c;
      };
      this.treeUli = calee(this.options).join("");
      return this.treeUli;
    }
  },
  data() {
    return {
      treeUli: ""
    };
  },
  methods: {
    cascaderTree(h) {
      const calee = (tree, ids) => {
        const c = tree.map((level, index) => {
          let ch = [];
          level._ids = ids
            ? ids.concat([level[this.props.value]])
            : [level[this.props.value]];
          if (
            level[this.props.children] &&
            level[this.props.children].length > 0
          ) {
            ch = [
              h("span", {
                domProps: {
                  innerHTML: level[this.props.label]
                }
              }),
              [
                h("ul", calee(level[this.props.children], level._ids)),
                h("i", {
                  domProps: {
                    className: "icon cysicon icon-arrow_right"
                  }
                })
              ]
            ];
          }
          return h(
            "cys-option",
            {
              props: {
                label: level[this.props.label],
                value: level[this.props.value]
              }
            },
            ch
          );
        });
        return c;
      };
      const tree = calee(this.options);
      return tree;
    },
    renderNode(h) {
      return h(
        "div",
        {
          domProps: {
            className: "cys-cascader"
          }
        },
        [
          h(
            "cys-select",
            {
              props: {
                value: this.value,
                filter: this.filter,
                placeholder: this.placeholder,
                disabled: this.disabled,
                clearable: this.clearable
              }
            },
            this.cascaderTree(h)
          )
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
  /deep/ .cys-select--dropdown {
      list-style: none;
      padding: 0px 0;
      height 230px;
  }
  padding 0;
  li {
    position relative
    line-height 36px
    list-style none
    padding-left 20px
    margin-left 0
    .icon {
      position absolute
      right 10px
      top 0
    }
    ul {
      background #fff
      box-shadow 0 0 2px #808080
      position absolute
      width 100%
      left 100%
      top 0
      display none
    }

  }
}
</style>
