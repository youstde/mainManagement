import { getRuleTypeList, getTypeList } from '../services'

export default {
    namespace: 'ruleType',

    state: {
        list: [],
        total: '',

        typeList: [],
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const res = yield call(getRuleTypeList, payload)
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

        *fetchTypeList({ payload }, { call, put }) {
            const res = yield call(getTypeList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveTypeList',
                    payload: {
                        typeList: data,
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
        saveTypeList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
