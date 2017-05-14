export default {
    namespaced: true,

    state: {

        user: {
            id: false,
        },

    },

    getters: {
        user(state)
        {
            return state.user;
        }
    },

    mutations: {
        login(state, payload)
        {
            state.user = payload.user;
        }
    },

    actions: {

    }
}