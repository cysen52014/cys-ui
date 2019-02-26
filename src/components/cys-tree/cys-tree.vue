<template>
    <div :class="['cys-tree']">
        <cys-tree-node v-if="!isEmpty"
            v-for="childNode in treeNodes"
            :textKey="textKey"
            :treeNode="childNode"
            :key="childNode.id">
        </cys-tree-node>
        <div v-if="isEmpty"
            class="cys-tree-empty-block">
            <span class="cys-tree--empty-text">{{emptyText}}</span>
        </div>
    </div>
</template>
<script>
import CysTreeNode from './cys-tree-node'
import Emitter from '../../mixins/emitter.js';
export default {
    name: "CysTree",
    componentName: "CysTree",
    mixins: [Emitter],
    components: {
        CysTreeNode
    },
    props: {
        data: {
            type: Array,
            required: true
        },
        childrenKey: {
            type: String,
            default: 'children'
        },
        textKey: {
            type: String,
            default: 'label'
        },
        indent: {
            type: Number,
            default: 18
        },
        showCheckbox: {
            type: Boolean,
            default: false
        },
        defaultExpandAll: Boolean,
        autoExpandParent: {
            type: Boolean,
            default: true
        },
        showCollapse: {
            type: Boolean,
            default: true
        },
        filterNode: Function,
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        nodeKey: {
            type: [Number, String],
            default: 'id'
        },
        defaultCheckedKeys: {
            type: Array
        },
        checkParentStrictly: {
            type: Boolean,
            default: false
        },
        checkChildrenStrictly: {
            type: Boolean,
            default: false
        },
        defaultSelectKey: [Number, String],
        disabledSelect: {
            tyoe: Boolean,
            default: true
        }
    },
    data() {
        return {
            treeNodes: [],
            nodeIdSeed: 0,
            selectNodeKey: this.defaultSelectKey
        }
    },
    methods: {
        // 初始化将传进来的node节点进行包装重新构建
        reworkTreeNodes(treeNodes) {
            let nodeList = [];
            for (let i = 0; i < this.data.length; i++) {
                const item = this.data[i];
                let node = this.initTreeNode(item, null);
                if (this.filterNode && this.filterNode(node, node.data) === false) {
                    continue;
                }
                nodeList.push(node);
            }
            return nodeList;
        },
        // 初始化包装节点
        initTreeNode(node, parent) {
            let that = this;
            // 1.基本参数进行包装配置
            let newNode = {
                id: this.nodeIdSeed++,
                checked: false,
                indeterminate: false,
                expanded: false || this.defaultExpandAll,
                data: node,
                parent: parent,
                visible: true,
                level: 0,
                childNodes: [],
                setChecked(value, treeNode) {
                    that.setNodeChecked(value, treeNode);
                    that.setParentNodeIndeterminate(value, treeNode);
                }
            }
            // 2.将原有的属性覆盖节点的属性
            for (let name in node) {
                if (newNode.hasOwnProperty(name)) {
                    newNode[name] = node[name];
                }
            }
            // 3.如果包含父节点就设置级别比父节点大一级
            if (parent) {
                newNode.level = parent.level + 1;
            }
            // 4.获取当前的子节点，包含子节点递归加载包装节点
            let childNodes = node[this.childrenKey]
            if (Array.isArray(childNodes)) {
                for (let i = 0; i < childNodes.length; i++) {
                    const currentNode = childNodes[i];
                    let node = this.initTreeNode(currentNode, newNode)
                    if (this.filterNode && this.filterNode(node, node.data) === false) {
                        continue;
                    }
                    newNode.childNodes.push(node);
                }
            }
            // 5.返回包装后的树节点
            return newNode;
        },
        setNodeChecked(value, treeNode) {
            if (this.checkChildrenStrictly) return;
            treeNode.checked = value;
            treeNode.indeterminate = false;
            for (let i = 0; i < treeNode.childNodes.length; i++) {
                const currentNode = treeNode.childNodes[i];
                this.setNodeChecked(value, currentNode);
            }
        },
        setParentNodeIndeterminate(value, treeNode) {
            let parent = treeNode.parent;
            while (parent) {
                if (this.autoExpandParent) {
                    parent.expanded = true;
                }
                if (!this.checkParentStrictly) {
                    let childNodes = parent.childNodes;
                    let checkedNumber = 0, indeterminateNumber = 0;
                    for (let i = 0; i < childNodes.length; i++) {
                        const childNode = childNodes[i];
                        if (childNode.checked === true) {
                            checkedNumber++;
                        }
                        if (childNode.indeterminate) {
                            indeterminateNumber++;
                        }
                    }
                    parent.checked = checkedNumber === childNodes.length;
                    if (parent.checked) {
                        parent.indeterminate = false;
                    } else {
                        parent.indeterminate = checkedNumber > 0 || indeterminateNumber > 0;
                    }
                    this.$emit("parent-node-check", parent, parent.data, treeNode);
                }
                parent = parent.parent;
            }
        },
        getCheckedNodes(leafOnly, isReworkNode = false) {
            const checkedNodes = [];
            const traverse = function (childNodes) {
                childNodes.forEach((childNode) => {
                    let isLeaf = childNode.childNodes.length < 1;
                    if (childNode.checked && (!leafOnly || (leafOnly && isLeaf))) {
                        if (isReworkNode) {
                            checkedNodes.push(childNode);
                        } else {
                            checkedNodes.push(childNode.data);
                        }
                    }
                    if (isLeaf) return;
                    traverse(childNode.childNodes);
                });
            };
            traverse(this.treeNodes);
            return checkedNodes;
        },
        getNodes() {
            const treeNodes = this.treeNodes;
            return treeNodes;
        },
        setCheckedKeys(keys, leafOnly = false) {
            if (!Array.isArray(keys)) {
                return
            }
            let nodeKey = this.nodeKey;
            const traverse = function (childNodes) {
                childNodes.forEach((childNode) => {
                    let key = childNode.data[nodeKey];
                    let isLeaf = childNode.childNodes.length < 1;
                    if (keys.includes(key) && (!leafOnly || (leafOnly && isLeaf))) {
                        childNode.setChecked(true, childNode);
                    }
                    if (isLeaf) return;
                    traverse(childNode.childNodes);
                });
            };
            traverse(this.treeNodes);
        },
        setSelectKey(key) {
            this.selectNodeKey = key;
        }
    },
    computed: {
        isEmpty() {
            return this.treeNodes.length < 1;
        }
    },
    created() {
        this.treeNodes = this.reworkTreeNodes(this.data); 
        this.$nextTick(() => {
            this.setCheckedKeys(this.defaultCheckedKeys);
        })
    },
    watch: {
        data() {
            this.treeNodes = this.reworkTreeNodes(this.data);
            this.$nextTick(() => {
                this.setCheckedKeys(this.defaultCheckedKeys);
            })
        }
    }
}
</script>
<style lang="stylus">
@import '../../styles/variable';

.cys-tree {
    position: relative;
    cursor: default;
    background: $--tree-background-color;
    color: $--tree-color;

    .cys-tree-empty-block {
        position: relative;
        min-height: 60px;
        text-align: center;
        width: 100%;
        height: 100%;

        .cys-tree--empty-text {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: $--tree-empty-color;
        }
    }
}
</style>

