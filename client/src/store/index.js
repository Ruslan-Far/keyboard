import Vue from 'vue'
import Vuex from 'vuex'
import word from './modules/word'
import collocation from './modules/collocation'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        word,
        collocation,
        user
    }
})
