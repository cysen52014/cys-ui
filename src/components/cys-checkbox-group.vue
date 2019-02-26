<template>
    <div class="cys-checkbox-group">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'CysCheckboxGroup',
    componentName: 'CysCheckboxGroup',
    props: {
        value: {
            type: Array,
            default: []
        },
        disabled: Boolean
    }
}
</script>
<style lang="stylus">
.cys-checkbox-group {
    font-size: 0;
}
</style>

