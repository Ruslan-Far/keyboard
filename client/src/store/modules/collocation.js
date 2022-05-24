let collocationsURL = 'http://192.168.43.71:8080/collocations';

export default {
    state: {
        allCollocations: [],
        allCollocationsByUserId: [],
        collocation: JSON
    },
    mutations: {
        initAllCollocations(state, allCollocations)
        {
            state.allCollocations = allCollocations;
        },
        initAllCollocationsByUserId(state, allCollocationsByUserId)
        {
            state.allCollocationsByUserId = allCollocationsByUserId;
        },
        initCollocation(state, collocation)
        {
            state.collocation = collocation;
        },


        addToAllCollocations(state, data) {
            state.allCollocations = data;
        },
        addToAllCollocationsByUserId(state, data) {
            state.allCollocationsByUserId.unshift(data);
        },
        replaceCollocation(state, data) {
            state.collocation = data;
        },


        updateAllCollocations(state, data) {
            state.allCollocations = data;
        },
        updateAllCollocationsByUserId(state, data) {
            const obj = state.allCollocationsByUserId.find(obj => obj.id === data.id);
            Object.assign(obj, data);
        },
        updateCollocation(state, data) {
            state.collocation = data;
        },


        deleteInAllCollocations(state, data) {
            state.allCollocations = data;
        },
        deleteInAllCollocationsByUserId(state, data) {
            const obj = state.allCollocationsByUserId.find(obj => obj.id === data.id);
            state.allCollocationsByUserId.splice(state.allCollocationsByUserId.indexOf(obj), 1);
        },
        deleteCollocation(state, data) {
            state.collocation = data;
        }
    },
    actions: {
        async httpGetAllCollocations(context, args) {
            if (!args) {
                const res = await fetch(collocationsURL);
                context.commit('initAllCollocations', await res.json());
            }
            else if (args[0] !== 0 && args[1] === false)
            {
                const res = await fetch(collocationsURL + '?userId=' + args[0]);
                context.commit('initAllCollocationsByUserId', await res.json());
            }
            else if (args[0] === 0 && args[1] !== false)
            {
                const res = await fetch(collocationsURL + '?expand');
                context.commit('initAllCollocations', await res.json());
            }
            else {
                const res = await fetch(collocationsURL + '?userId=' + args[0] + '&expand');
                context.commit('initAllCollocationsByUserId', await res.json());
            }
        },


        async httpGetCollocation(context, args) {
            if (args[1] === false)
            {
                const res = await fetch(collocationsURL + '/' + args[0]);
                context.commit('initCollocation', await res.json())
            }
            else {
                const res = await fetch(collocationsURL + '/' + args[0] + '?expand');
                context.commit('initCollocation', await res.json())
            }
        },


        async httpPostCollocation(context, json) {
            try {
                const res = await fetch(collocationsURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                const data = await res.json();
                if (res.status === 200 || res.status === 201) {
                    context.commit('addToAllCollocationsByUserId', data);
                } else {
                    console.error(data)
                }
            } catch (error) {
                console.error(error)
            }
        },


        async httpPutCollocation(context, json) {
            try {
                const res = await fetch(collocationsURL + '/' + JSON.parse(json).id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                const data = await res.json();
                if (res.status === 200 || res.status === 201) {
                    context.commit('updateAllCollocationsByUserId', data);
                } else {
                    console.error(data);
                }
            } catch (error) {
                console.error(error)
            }
        },


        async httpDeleteCollocation(context, id) {
            try {
                const res = await fetch(collocationsURL + '/' + id, {
                    method: 'DELETE'
                })
                const data = await res.json();
                if (res.status === 200 || res.status === 201) {
                    context.commit('deleteInAllCollocationsByUserId', data);
                } else {
                    console.error(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        getAllCollocations(state) {
            return state.allCollocations
        },
        getAllCollocationsByUserId(state) {
            return state.allCollocationsByUserId
        },
        getCollocation(state) {
            return state.collocation
        }
    }
}
