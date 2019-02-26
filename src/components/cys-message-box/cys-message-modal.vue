<template>
    <cys-modal v-model="visiable"
        :title="title"
        :show-close="showClose"
        @close="handleClose">
        <slot>{{message}}</slot>
        <span slot="footer">
            <cys-button plain
                v-if="modalType!=='alert'"
                @click="handleCallback('cancel')">{{cancelText}}</cys-button>
            <cys-button @click="handleCallback('confirm')">{{confirmText}}</cys-button>
        </span>
    </cys-modal>
</template>
<script>
import CysModal from '../cys-modal'
import CysButton from '../cys-button'
export default {
    name: 'CysMessageModal',
    componentName: 'CysMessageModal',
    components: { CysModal, CysButton },
    data() {
        return {
            visiable: false,
            title: '',
            message: '',
            modalType: 'alert',
            cancelText: '取消',
            confirmText: '确定',
            showClose: true,
            callback() { }
        }
    },
    methods: {
        handleCallback(type) {
            this.callback(type);
            this.visiable = false;
        },
        handleClose() {
            is.callback('cancel');
        }
    }
}
</script>
