import {FetchData, FetchParams, Item, Post, Store} from "~/common/interfaces/FetchData";
import { Commit, ActionTree} from "vuex";

const API_KEY = 'a1102df3';

export const state = () => ({
  data: [],
  post: null,
  load: false,
})

export const getters = {
  getData(state: Store) {
    return state.data
  },
  getPost(state: Store) {
    return state.post
  },
  getLoad(state: Store) {
    return state.load
  },
}

export const mutations = {
  setData(state: Store, value: Item[]) {
    state.data = value
  },
  setPost(state: Store, value: Post) {
    state.post = value
  },
  setLoad(state: Store, value: boolean) {
    state.load = value
  }
}

export const actions: ActionTree<Store, Store> = {
  async setData({commit}: { commit: Commit}, params: FetchParams) {
    try {
      const data = await this.$axios.$get(`https://www.omdbapi.com/?` + `s=${params.search}` + `&page=${params.page}` + `&apikey=${API_KEY}`) as FetchData
      commit('setData', data.Search ? data.Search : [])
    } catch (error) {
      console.log('error', error)
    }
  },

  async setPost ({commit}: { commit: Commit }, id: number) {
    try {
      const data = await this.$axios.$get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`) as Post
      commit('setPost', data)
      commit('setLoad', true)
    } catch (error) {
      console.log('error', error)
    }
  },

  setLoad ({commit}: { commit: Commit }, value: boolean) {
    commit('setLoad', value)
  }
}
