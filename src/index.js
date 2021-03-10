import CysCheckbox from "./components/cys-checkbox.vue";
import CysCheckboxGroup from "./components/cys-checkbox-group.vue";
import CysRadio from "./components/cys-radio.vue";
import CysRadioGroup from "./components/cys-radio-group.vue";
import CysInput from "./components/cys-input.vue";
import CysTextarea from "./components/cys-textarea/cys-textarea.vue";
import CysButton from "./components/cys-button.vue";
import CysCollapseTransition from "./components/cys-transitions/cys-collapse-transition.vue";
import CysRow from "./components/cys-row.vue";
import CysCol from "./components/cys-col.vue";
import CysTree from "./components/cys-tree/cys-tree.vue";
import CysTreeNode from "./components/cys-tree/cys-tree-node.vue";
import CysBaseDropdown from "./components/cys-base/cys-base-dropdown.vue";
import CysCalendar from "./components/cys-date-time/base/cys-calendar.vue";
import CysDatePicker from "./components/cys-date-time/cys-date-picker.vue";
import CysSelect from "./components/cys-select/cys-select.vue";
import CysOption from "./components/cys-select/cys-option.vue";
import CysModal from "./components/cys-modal";
import CysMessageModal from "./components/cys-message-box/cys-message-modal";
import CysMessageBox from "./components/cys-message-box/cys-message-box";
import CysCircle from "./components/cys-circle";
import CysAvatar from "./components/cys-avatar";
import CysTable from "./components/cys-table/table";
import CysPagination from "./components/cys-pagination/index.vue";
import CysLoading from "./components/cys-loading.vue";
import CysFormSearch from "./components/cys-form-search";
import CysForm from "./components/cys-form/form.vue";
import CysFormItem from "./components/cys-form/formItem.vue";
import CysCascader from "./components/cys-cascader/index.vue";
import CysMessage from "./components/cys-message/message";



const components = [
  CysCheckbox,
  CysCheckboxGroup,
  CysRadio,
  CysRadioGroup,
  CysInput,
  CysTextarea,
  CysButton,
  CysCollapseTransition,
  CysRow,
  CysCol,
  CysTree,
  CysTreeNode,
  CysCalendar,
  CysBaseDropdown,
  CysDatePicker,
  CysSelect,
  CysOption,
  CysModal,
  CysMessageModal,
  CysCircle,
  CysAvatar,
  CysTable,
  CysPagination,
  CysLoading,
  CysFormSearch,
  CysForm,
  CysFormItem,
  CysCascader
];

const install = function(Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  })
  Vue.prototype.$dateRangePosition = "";
  Vue.prototype.$shAlert = CysMessageBox.alert;
  Vue.prototype.$shConfirm = CysMessageBox.confirm;
  Vue.prototype.$cysMessage = CysMessage;
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


export default {
  install
  // ...如果还有的话继续添加
}
