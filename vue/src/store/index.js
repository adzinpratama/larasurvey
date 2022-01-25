import {createStore} from 'vuex'

const store = createStore({
  state:{
      user:{
        data:{nama:'hapra'},
        token:123
      }
  },
  getters:{},
  actions:{},
  mutations:{},
  modules:{}
})

export default store;
