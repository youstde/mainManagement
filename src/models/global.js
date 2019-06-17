import { getAllAuthorities } from '@/services/common'

export default {
    namespace: 'global',

    state: {
        fetching: 0,
        authorities: [],
        collapsed: false,
        notices: [],
    },

    effects: {
        *fetchAuthorities(_, { call, put }) {
            const res = yield call(getAllAuthorities)
            if (res && res.errcode === 0) {
                yield put({
                    type: 'saveAuthorities',
                    payload: res.data,
                })
            }
        },
    },

    reducers: {
        saveAuthorities(state, { payload }) {
            return {
                ...state,
                authorities: payload,
            }
        },
        fetchingStart(state) {
            return {
                ...state,
                fetching: state.fetching + 1,
            }
        },
        fetchingEnd(state) {
            let count = state.fetching - 1
            if (count < 0) {
                count = 0
            }

            return {
                ...state,
                fetching: count,
            }
        },
    },

    subscriptions: {
        setup({ history }) {
            // Subscribe history(url) change, trigger `load` action if pathname is `/`
            return history.listen(({ pathname, search }) => {
                if (typeof window.ga !== 'undefined') {
                    window.ga('send', 'pageview', pathname + search)
                }
            })
        },
    },
}
