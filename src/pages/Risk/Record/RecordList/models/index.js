import { getList } from '../services'

export default {
    namespace: 'ruleRecord',

    state: {
        list: [],
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const res = yield call(getList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveList',
                    payload: {
                        list: data,
                    },
                })
            }
        },
    },

    reducers: {
        saveList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
