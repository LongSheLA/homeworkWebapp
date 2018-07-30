
export default {
    state:{
        show:false
    },
    getters:{
        not_show(state){
            return !state.show
        }
    },
    mutations:{
        // 通过$store.commit('switch_show')去提交一个动作
       switch_show(state){
           state.show = state.show ? false :true
       }
    },
    // 通过$store.dispatch('switch_show')去分发action
    actions:{
        // context = $store
        switch_show(context){
            context.commit('switch_show')
        }
       }
}