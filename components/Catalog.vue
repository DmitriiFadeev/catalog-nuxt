<template>
  <div class="catalog">
    <div v-if="items.length > 0">
      <ul class="catalog__wrapper" :class="display">
        <li v-for="item in items" :key="item.imdbID" class="catalog__item" @click="open(item.imdbID)">
          <div class="catalog__content">
            <img :src="item.Poster" alt="">
            {{ item.Title }}
          </div>
        </li>
      </ul>
      <Pagination
        v-model="currentPage"
        :total="totalPages"
        class="pagination"
        @change="changePage"
      />
    </div>

    <div v-else>По вашему запросу ничего не найдено</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType  } from 'vue';
import {Item} from '../common/interfaces/FetchData';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Item[]>,
      default: () => []
    },

    display: {
      type: String,
      default: 'table'
    }
  },

  data () {
    return {
      currentPage: 1,
      totalPages: 2,
    }
  },

  methods: {
    open(id: string) {
      this.$emit('modal', id)
    },

    changePage (page: number) {
      this.$emit('changePage', page)
    }
  }
})
</script>

<style scoped lang="scss">

.table {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}

.list {
  display: flex;
  flex-direction: column;

  .catalog__item {
    margin-bottom: 20px;
  }
}

.pagination {
  margin: 20px 0;
}

.catalog {

  &__wrapper {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 200px;
    cursor: pointer;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    flex-grow: 1;
    padding: 20px;
    position: relative;
  }
}
</style>
