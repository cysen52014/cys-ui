import Vue from "vue";
import CysMessage from "./cys-message.vue";
const Message = function(options) {
  // 将CysModal使用Vue.extend获取新的子类构造函数
  const Modal = Vue.extend(CysMessage);
  // 合并默认参数
  const magreOptions = Object.assign({
    el: document.createElement("div"),
    data: options
  });

  // 通过构造函数初始化消息框，还未挂载在窗体上
  const modalInstance = new Modal(magreOptions);
  //  追加到窗体中
  document.body.appendChild(modalInstance.$el);
  modalInstance.visiable = true;
  modalInstance.timer = setTimeout(() => {
    modalInstance.fadeOut = true;
    clearTimeout(modalInstance.timer);
    modalInstance.timer2 = setTimeout(() => {
      clearTimeout(modalInstance.timer2);
      modalInstance.visiable = false;
    }, 600);
  }, 3000);
};

Message.default = message => {
  const magreOptions = {
    type: "default",
    message: message || ""
  };
  return Message(magreOptions);
};

Message.success = message => {
  const magreOptions = {
    type: "success",
    message: message || ""
  };
  return Message(magreOptions);
};

Message.warning = message => {
  const magreOptions = {
    type: "warning",
    message: message || ""
  };
  return Message(magreOptions);
};

Message.error = message => {
  const magreOptions = {
    type: "error",
    message: message || ""
  };
  return Message(magreOptions);
};

export default Message;
