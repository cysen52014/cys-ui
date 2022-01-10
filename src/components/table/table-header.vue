<template>
  <div class="table-header-group">
    <ul class="table-row">
      <li
        class="table-cell"
        v-for="(item, index) in table.options.thead.column"
        :key="index"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  inject: ["table"]
};
</script>
