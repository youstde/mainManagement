import { getRuleGroupList } from '../services'

export default {
    namespace: 'ruleGroup',

    state: {
        list: [],
        total: '',
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const res = yield call(getRuleGroupList, payload)
            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveList',
                    payload: {
                        total: count,
                        list,
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
