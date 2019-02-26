<template>
    <div :class="['cys-tree-node',{
        'cys-tree-node--expanded':expanded
        }]">
        <div :class="['cys-tree-node--content',{
            'cys-tree-node--content-selected':isSelected
        }]"
            :style="{ 'padding-left': paddingLeft }"
            @click="handleClickNode">
            <span :class="['iconfont','icon-icon_tree_collapse','cys-tree-node--icon',{
                'cys-tree-node--leaf':isLeaf,
                'cys-tree-node--expanded-icon':expanded,
                'cys-tree-node--visible-icon':!tree.showCollapse
            }]"
                @click.stop="handleExpandIconClick"></span>
            <cys-checkbox class="cys-tree-node--checkbox"
                :indeterminate="treeNode.indeterminate"
                v-if="showCheckbox"
                v-model="treeNode.checked"
                @change="handleCheckChange"></cys-checkbox>
            <tree-node-content :node="treeNode"></tree-node-content>
        </div>
        <cys-collapse-transition>
            <div class="cys-tree-node--children"
                v-show="expanded">
                <cys-tree-node v-for="childNode in treeNode.childNodes"
                    :treeNode="childNode"
                    :key="childNode.id"></cys-tree-node>
            </div>
        </cys-collapse-transition>
    </div>
</template>
<script>
import CysCheckbox from '../cys-checkbox'
import CysCollapseTransition from '../cys-transitions/cys-collapse-transition'
export default {
    name: "CysTreeNode",
    componentName: "CysTreeNode",
    components: {
        CysCheckbox,
        CysCollapseTransition,
        // 内部节点渲染，使用渲染函数处理
        treeNodeContent: {
            props: {
                node: { required: true }
            },
            render(createElement) {
                const tree = this.$parent.tree; 
                if (tree.$scopedSlots.default) {
                    return tree.$scopedSlots.default({ node: this.node, data: this.node.data });
                } else {
                    return createElement("span", { class: ['cys-tree-node--label'] }, this.node.data[tree.textKey]);
                }
            }
        }
    },
    data() {
        return {
            tree: null,
            showCheckbox: false,
            expanded: false
        }
    },
    props: {
        treeNode: {}
    },
    computed: {
        paddingLeft() {
            return (this.treeNode.level) * this.tree.indent + 'px'
        },
        isLeaf() {
            return this.treeNode.childNodes.length < 1;
        },
        isSelected() {
            return !this.tree.disabledSelect && this.tree.selectNodeKey === this.treeNode.data[this.tree.nodeKey];

        }
    },
    methods: {
        handleCheckChange(value) {
            this.treeNode.setChecked(value, this.treeNode);
        },
        handleExpandIconClick() {
            this.expanded = !this.expanded;
        },
        handleClickNode() {
            this.tree.selectNodeKey = this.treeNode.data[this.tree.nodeKey];
            this.tree.$emit("node-click", this.treeNode, this.treeNode.data, this);
        }
    },
    created() {
        const parent = this.$parent;
        if (parent.$options.componentName == "CysTree") {
            this.tree = parent;
        } else {
            this.tree = parent.$parent.tree;
        }
        this.showCheckbox = this.tree.showCheckbox;
        this.previousChecked = this.treeNode.checked;
        if (this.treeNode.expanded) {
            this.expanded = true;
        }
    },
    watch: {
        'node.indeterminate'() {
            this.tree.$emit('check-change', this.treeNode, this.treeNode.data, this);
        },
        'node.checked'(checked) {
            this.tree.$emit('check-change', this.treeNode, this.treeNode.data, this);
        },
        'treeNode.expanded'() {
            this.expanded = this.treeNode.expanded
            if (this.expanded) {
                this.tree.$emit("node-expand", this.treeNode, this.treeNode.data, this)
            } else {
                this.tree.$emit("node-collapse", this.treeNode, this.treeNode.data, this)
            }
        }
    }
}
</script>
<style lang="stylus">
@import '../../styles/variable';

.cys-tree-node {
    white-space: nowrap;
    outline: none;

    .cys-tree-node--content {
        display: flex;
        align-items: center;
        height: 26px;
        cursor: pointer;

        &:hover {
            background-color: $--tree-node-hover-background-color;
        }

        &.cys-tree-node--content-selected {
            background-color: $--tree-node-select-background-color;
            color: $--tree-node-select-color;

            &:hover {
                background-color: $--tree-node-select-background-color;
            }

            .cys-tree-node--icon {
                color: $--tree-node-select-color;
            }
        }

        .cys-tree-node--icon {
            padding: 4px;
            cursor: pointer;
            color: $--tree-node-icon-color;
            font-size: 14px;
            transition: transform 0.3s ease-in-out;

            &.cys-tree-node--leaf {
                visibility: hidden;
                color: transparent;
                cursor: default;
            }
        }

        .cys-tree-node--visible-icon {
            visibility: hidden;
        }

        .cys-tree-node--checkbox {
            margin: 4px 8px 2px 0;
        }

        .cys-tree-node--label {
            display: flex;
            align-items: center;
            height: 26px;
            cursor: pointer;
            font-size: 14px;
        }
    }

    .cys-tree-node--children {
        display: block;
        overflow: hidden;
        background-color: transparent;
    }

    .cys-tree-node--expanded-icon {
        transform: rotate(90deg);
    }
}
</style>
