<template>
    <div class="cys-radio-group">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'CysRadioGroup',
    componentName: 'CysRadioGroup',
    props: {
        value: {},
        disabled: Boolean
    }
};
</script>
<style lang="stylus">
.cys-raido-group {
    font-size: 0;
}
</style>


