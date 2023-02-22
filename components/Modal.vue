<template>
  <div class="modal">
    <div class="modal__overlay" @click="closeModal"></div>
    <div class="modal__content">
      <img class="modal__image" :src="post.Poster"/>
      <div class="modal__info">
        <div class="modal__name">{{ post.Title }}</div>
        <div>Actors: {{ post.Actors }}</div>
        <div>Country: {{ post.Country }}</div>
        <div>Director: {{ post.Director }}</div>
        <div>Language: {{ post.Language }}</div>
        <div>Rated: {{ post.Rated }}</div>
        <div>Year: {{ post.Year }}</div>
      </div>
      <button class="modal__close" @click="closeModal">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType  } from 'vue';
import {Post} from '../common/interfaces/FetchData';

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      default: () => {}
    }
  },

  methods: {
    closeModal() {
      this.$emit('setModal')
    },
  },
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &__content {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: row;
    padding: 1rem;
    position: relative;
    width: 80%;
    max-width: 800px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    flex: 1;
  }

  &__info {
    flex: 2;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__description {
    margin-bottom: 1rem;
    flex-grow: 1;
  }

  &__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: transparent;
    border: none;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
  }
}

</style>
