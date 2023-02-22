<template>
  <div class="container">

    <div class="head">
      <div>
        <Search @search="search" />
        <SearchFront @searchFront="searchFront" />
      </div>
      <Display @display="changeDisplay"/>
    </div>

    <Catalog
      :items="items"
      :display="display"
      @modal="openModal"
      @changePage="changePage"
    />

    <Modal
      v-if="getPost && modalOpen && getLoad"
      :post="getPost"
      @setModal="setModal"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from "vuex";
import Search from '../components/Search.vue';
import SearchFront from '../components/SearchFront.vue';
import Catalog from '../components/Catalog.vue';

import {Item} from '../common/interfaces/FetchData';

export default Vue.extend({
  components: {
    Search,
    SearchFront,
    Catalog
  },

  data(): { items: Item[]; query: string, modalOpen: boolean, display: string, copyItems: Item[] } {
    return {
      items: [],
      query: '',
      modalOpen: false,
      display: 'table',
      copyItems: []
    };
  },

  async fetch({store}) {
    await store.dispatch('setData', {search: this.query, page: 1})
  },

  computed: {
    ...mapGetters(['getData', 'getPost', 'getLoad']),
  },

  watch: {
    getData () {
      this.items = this.getData
      this.copyItems = this.getData
    }
  },

  mounted() {
    this.items = this.getData
    this.copyItems = this.getData
  },

  methods: {
    ...mapActions(['setData', 'setPost', 'setLoad']),
    search(query: string): void {
      this.query = query;
      this.setData({search: this.query ? this.query : undefined, page: 1})
    },

    searchFront(query: string): void {
      this.query = query;
      this.items = this.copyItems

      if (this.query) {
        this.items = this.items.filter((item: Item) => {
          for (let itemKey in item) {
            if (item[itemKey].includes(query)) {
              return item
            }
          }
        })
      }
    },

    openModal(id: string) {
      this.setLoad(false)
      this.setPost(id)
      this.setModal()
    },

    setModal() {
      this.modalOpen = !this.modalOpen
    },

    changeDisplay(value: string) {
      this.display = value
    },

    changePage(page: number) {
      this.setData({search: this.query ? this.query : undefined, page: page})
    }
  }
});
</script>

<style scoped lang="scss">
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
</style>
