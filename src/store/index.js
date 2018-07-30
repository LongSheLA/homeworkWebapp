import Vue from 'vue'
import Vuex from 'vuex'
import hello_store from './modules/hello'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        hello: hello_store
    }
})