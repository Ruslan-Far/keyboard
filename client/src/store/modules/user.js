let usersURL = 'http://192.168.43.71:8080/users';

export default {
    state: {
        user: null
    },


    mutations: {
        initUser(state, user) {
            state.user = user;
        },

        deleteUser(state, user) {
            state.user = user;
        }
    },


    actions: {
        async httpGetUser(context, args) {
            try {
                const res = await fetch(usersURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: args[0],
                        password: args[1]
                    })
                })
                const user = await res.json();
                if (res.status === 200 || res.status === 201) {
                    if (user.id === -1)
                        context.commit('initUser', null);
                    else
                        context.commit('initUser', user);
                } else {
                    console.error(user)
                }
            } catch (error) {
                console.error(error)
            }
        },


        async httpPostUser(context, args) {
            try {
                const res = await fetch(usersURL + '/reg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: args[0],
                        password: args[1]
                    })
                })
                const user = await res.json();
                if (res.status === 200 || res.status === 201) {
                    if (user.id === -1)
                        context.commit('initUser', null);
                    else
                        context.commit('initUser', user);
                } else {
                    console.error(user)
                }
            } catch (error) {
                console.error(error)
            }
        },
    },


    getters: {
        getUser(state) {
            return state.user
        }
    }
}
