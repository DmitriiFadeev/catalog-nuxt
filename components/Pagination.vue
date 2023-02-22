<template>
  <div class="paginator">
    <button
      class="paginator__item"
      :class="selectedPage === 1 ? 'paginator__item--disabled' : ''"
      @click="prevPage()"
      :disabled="disabled ? 'disabled' : null"
    >
      <svg style="transform: rotate(180deg)" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-4.37114e-07 0L6 5L0 10L-4.37114e-07 0Z" fill="#7E7A98"/>
      </svg>

    </button>
    <div v-for="(page, index) in pagerList" :key="index">
      <button
        v-if="page !== 'prev' && page !== 'next'" class="paginator__item"
        :class="selectedPage === page ? 'paginator__item--active' : ''"
        :disabled="disabled ? 'disabled' : null"
        @click="setPage(page)"
      >
        {{page}}
      </button>

      <button
        v-if="page === 'next'" class="paginator__item nav-link"
        @click="nextPage(true)"
        :disabled="disabled ? 'disabled' : null"
      >
       <span class="nav-link__arrow">
          <svg style="transform: rotate(180deg)" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-4.37114e-07 0L6 5L0 10L-4.37114e-07 0Z" fill="#7E7A98"/>
          </svg>
       </span>
        <span class="nav-link__dots">
         ...
       </span>
      </button>

      <button
        v-if="page === 'prev'"
        class="paginator__item nav-link"
        :disabled="disabled ? 'disabled' : null"
        @click="prevPage(true)"
      >
       <span class="nav-link__arrow">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-4.37114e-07 0L6 5L0 10L-4.37114e-07 0Z" fill="#7E7A98"/>
        </svg>
       </span>
        <span class="nav-link__dots">
         ...
       </span>
      </button>

    </div>
    <button
      class="paginator__item"
      :class="selectedPage === total ? 'paginator__item--disabled' : ''" @click="nextPage()"
      :disabled="disabled ? 'disabled' : null"
    >
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-4.37114e-07 0L6 5L0 10L-4.37114e-07 0Z" fill="#7E7A98"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AtomsPaginator',
  props: {
    total: {
      type: Number,
      default: 0,
    },

    value: {
      type: Number,
      default: 1,
    },

    disabled: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      selectedPage: this.value,
    }
  },

  watch: {
    selectedPage() {
      this.$emit('change', this.selectedPage)
    },
    value() {
      this.selectedPage = this.value
    },
  },

  computed: {

    pagerList() {
      let pages = []
      for (let i = 1; i <= this.total; i++) {

        let page = i

        if (i > (this.selectedPage + 2) && i < this.total) {
          page = (i === (this.total - 1)) ? "next" : null
        }

        if (i < (this.selectedPage - 2) && i >= 2) {
          page = (i === 2) ? "prev" : null
        }
        pages.push(page)
      }

      pages = pages.filter(page => page !== null)

      return pages
    }

  },

  methods: {
    setPage(page) {
      this.selectedPage = page
    },

    prevPage(isMiddlePage = false) {

      if(isMiddlePage) {
        this.selectedPage = Math.floor(this.selectedPage / 2)
      } else {
        this.selectedPage = this.selectedPage > 1 ? (this.selectedPage - 1) : this.selectedPage
      }

    },

    nextPage(isMiddlePage = false) {
      if(isMiddlePage) {
        this.selectedPage = Math.floor(((this.total - this.selectedPage) / 2) + this.selectedPage)
      } else {
        this.selectedPage = this.selectedPage < this.total ? (this.selectedPage + 1) : this.selectedPage
      }
    },

  }

}
</script>

<style lang="scss" scoped>
.nav-link {

  &__arrow {
    display: none;
  }

  &:hover {

    .nav-link {
      &__arrow {
        display: block;
      }
      &__dots {
        display: none;
      }
    }
  }
}

.paginator {

  display: flex;

  &__item {
    width: 32px;
    height: 32px;
    margin-right: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    border-radius: 2px;
    font-size: 16px;
    line-height: 18px;
    background-color: transparent;
    color: black;
    cursor: pointer;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;

    .icon {
      width: 6px;
    }

    &--active {
      transition: 1s;
      border: 1px solid blue;
    }

    &--disabled {
      transition: 1s;
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }
  }
}
</style>
