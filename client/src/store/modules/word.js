let wordsURL = 'http://192.168.43.71:8080/words';

export default {
    state: {
        allWords: [],
        allWordsByUserId: [],
        word: JSON
    },
    mutations: {
        initAllWords(state, allWords) {
            state.allWords = allWords;
        },
        initAllWordsByUserId(state, allWordsByUserId) {
            state.allWordsByUserId = allWordsByUserId;
        },
        initWord(state, word) {
            state.word = word;
        },


        addToAllWords(state, data) {
            state.allWords = data;
        },
        addToAllWordsByUserId(state, data) {
            state.allWordsByUserId.unshift(data);
        },
        replaceWord(state, data) {
            state.word = data;
        },


        updateAllWords(state, data) {
            state.allWords = data;
        },
        updateAllWordsByUserId(state, data) {
            const obj = state.allWordsByUserId.find(obj => obj.id === data.id);
            Object.assign(obj, data);
        },
        updateWord(state, data) {
            state.word = data;
        },


        deleteInAllWords(state, data) {
            state.allWords = data;
        },
        deleteInAllWordsByUserId(state, data) {
            const obj = state.allWordsByUserId.find(obj => obj.id === data.id);
            state.allWordsByUserId.splice(state.allWordsByUserId.indexOf(obj), 1);
        },
        deleteWord(state, data) {
            state.word = data;
        }
    },
    actions: {
        async httpGetAllWords(context, args) {
            if (!args) {
                const res = await fetch(wordsURL);
                context.commit('initAllWords', await res.json());
            }
            else if (args[0] !== 0 && args[1] === false)
            {
                const res = await fetch(wordsURL + '?userId=' + args[0]);
                context.commit('initAllWordsByUserId', await res.json());
            }
            else if (args[0] === 0 && args[1] !== false)
            {
                const res = await fetch(wordsURL + '?expand');
                context.commit('initAllWords', await res.json());
            }
            else {
                const res = await fetch(wordsURL + '?userId=' + args[0] + '&expand');
                context.commit('initAllWordsByUserId', await res.json());
            }
        },


        async httpGetWord(context, args) {
            if (args[1] === false)
            {
                const res = await fetch(wordsURL + '/' + args[0]);
                context.commit('initWord', await res.json())
            }
            else {
                const res = await fetch(wordsURL + '/' + args[0] + '?expand');
                context.commit('initWord', await res.json())
            }
        },


        async httpPostWord(context, args) {
            try {
                const res = await fetch(wordsURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: parseInt(args[0]),
                        word: args[1],
                        count: parseInt(args[2])
                    })
                })
                const data = await res.json();
                if (res.status === 200 || res.status === 201) {
                    context.commit('addToAllWordsByUserId', data);
                } else {
                    console.error(data)
                }
            } catch (error) {
                console.error(error)
            }
        },


        async httpPutWord(context, args) {
            try {
                const res = await fetch(wordsURL + '/' + args[0], {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: args[1],
                        word: args[2],
                        count: parseInt(args[3])
                    })
                })
                const data = await res.json();
                if (res.status === 200 || res.status === 201) {
                    context.commit('updateAllWordsByUserId', data);
                } else {
                    console.error(data)
                }
            } catch (error) {
                console.error(error)
            }
        },


        async httpDeleteWord(context, id) {
            try {
                const res = await fetch(wordsURL + '/' + id, {
                    method: 'DELETE'
                })
                const data = await res.json();
                if (res.status === 200 || res.status === 201) {
                    context.commit('deleteInAllWordsByUserId', data);
                } else {
                    console.error(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        getAllWords(state) {
            return state.allWords
        },
        getAllWordsByUserId(state) {
            return state.allWordsByUserId
        },
        getWord(state) {
            return state.word
        }
    }
}
