import Vue from 'vue';
import Vuex from 'vuex';

import demo from './demo';
import tools from '@/utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    token: '',
  },
  mutations: {
    setUserInfo(state, user) {
      state.user = user;
      if (user.token) {
        state.token = user.token;
        window.localStorage && window.localStorage.setItem('t', user.token);
      }

      console.log(user, JSON.stringify(user));

      const cache = tools.encode(JSON.stringify(user));
      window.localStorage && window.localStorage.setItem('u', cache);

    },

    set(state, obj) {
      Object.assign(state, obj);
    },

    setToken(state, token) {
      state.token = token;
    },

    layout(state) {
      state.user = {},
      state.token = '';
      window.localStorage && window.localStorage.clear();
    }

  },
  actions: {
  },

  getters: {
    token: state => {
      if (state.token) {
        return state.token;
      }
      const cache = window.localStorage && window.localStorage.getItem('t');
      if (cache) {
        store.commit('set', {token: cache});
        return cache;
      }
      return '';
    },

    user: state => {
      console.log(123, state);
      if (state.user) {
        return state.user;
      }
      const cache = window.localStorage && window.localStorage.getItem('u');
      if (cache) {
        // store.set({token: cache});
        const user = JSON.parse(tools.decode(cache));
        console.log('user', user)
        store.commit('set', user);
        return user;
      }
      return null;
    },
  },

  modules: {
    demo
  }
})

export default store;
