import Vue from 'vue';
import CysMessageModal from './cys-message-modal.vue'
let MessageBox = function (options) {
  // 将CysModal使用Vue.extend获取新的子类构造函数
  let Modal = Vue.extend(CysMessageModal)
  // 合并默认参数
  let magreOptions = Object.assign({
    el: document.createElement('div'),
    data: options
  })

  // 通过构造函数初始化消息框，还未挂载在窗体上
  let modalInstance = new Modal(magreOptions);
  //  追加到窗体中
  document.body.appendChild(modalInstance.$el)
  modalInstance.visiable = true;
}

MessageBox.alert = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  if (title === undefined) {
    title = '';
  }
  let magreOptions = Object.assign({
    title: title,
    modalType: 'alert',
    message: message,
  }, options)
  return MessageBox(magreOptions);
};

MessageBox.confirm = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  if (title === undefined) {
    title = '';
  }
  let magreOptions = Object.assign({
    title: title,
    modalType: 'confirm',
    message: message,
  }, options)
  return MessageBox(magreOptions);
};

export default MessageBox
