function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    // 事件派发，找到指定的所有父级节点直到顶级，并且触发指定的事件
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName || parent.$options.name;;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName || parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    dispatchByMethod(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName || parent.$options.name;;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName || parent.$options.name;
        }
      }
      if (parent) {
        parent[eventName](params);
      }
    },
    //事件广播，找到指定的所有子级节点直到末级，并且触发指定的事件
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
    dispatchComponentByName(componentName) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName || parent.$options.name;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName || parent.$options.name;
        }
      }
      return parent;
    }
  }
};
