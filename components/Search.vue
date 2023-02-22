<template>
  <div class="search">
    <input type="text" v-model="query" placeholder="Search">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      query: ''
    }
  },
  watch: {
    query(newQuery) {
      this.$emit('search', newQuery);
    }
  }
})
</script>

<style scope lang="scss">
  .search {
    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      outline: none;
    }
  }
</style>
