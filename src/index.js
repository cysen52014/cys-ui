import CysCheckbox from './components/cys-checkbox.vue'
import CysCheckboxGroup from './components/cys-checkbox-group.vue'
import CysRadio from './components/cys-radio.vue'
import CysRadioGroup from './components/cys-radio-group.vue'
import CysInput from './components/cys-input.vue'
import CysTextarea from './components/cys-textarea/cys-textarea.vue'
import CysButton from './components/cys-button.vue'
import CysCollapseTransition from './components/cys-transitions/cys-collapse-transition.vue'
import CysRow from './components/cys-row.vue'
import CysCol from './components/cys-col.vue'
import CysTree from './components/cys-tree/cys-tree.vue'
import CysTreeNode from './components/cys-tree/cys-tree-node.vue'
import CysBaseDropdown from './components/cys-base/cys-base-dropdown.vue'
import CysCalendar from './components/cys-date-time/base/cys-calendar.vue'
import CysDatePicker from './components/cys-date-time/cys-date-picker.vue'
import CysSelect from './components/cys-select/cys-select.vue'
import CysOption from './components/cys-select/cys-option.vue'
import CysModal from './components/cys-modal'
import CysMessageModal from './components/cys-message-box/cys-message-modal'
import CysMessageBox from './components/cys-message-box/cys-message-box'
import CysCircle from './components/cys-circle';
import CysAvatar from './components/cys-avatar';




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
    CysAvatar
]

export default function (Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$shAlert = CysMessageBox.alert;
    Vue.prototype.$shConfirm = CysMessageBox.confirm;

};
