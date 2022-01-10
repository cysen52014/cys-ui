"use strict";

var listeners = [];

class Ready {
  // 储存选择器和回调函数
  observer = null;
  constructor(el, fn) {
    listeners.push({
      el: el,
      fn: fn,
    });
    if (!this.observer) {
      // 监听document变化
      this.observer = new MutationObserver(check);
      this.observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
    // 检查该节点是否已经在DOM中
    check();
  }
}

function check() {
  // 检查是否匹配已储存的节点
  for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    // 检查指定节点是否有匹配
    var elements = document.getElementsByTagName(listener.el);
    for (var j = 0; j < elements.length; j++) {
      var element = elements[j];
      // 确保回调函数只会对该元素调用一次
      if (!element.ready) {
        console.log(listener, "listener=");
        element.ready = true;
        // 对该节点调用回调函数
        listener.fn(element, j);
      }
    }
  }
}


export default Ready;