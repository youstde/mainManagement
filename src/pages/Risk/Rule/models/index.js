import { getRuleList, getTypeList } from '../services'

export default {
    namespace: 'rule',

    state: {
        list: [],
        total: '',

        typeOneList: [],
        typeTwoList: [],
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const res = yield call(getRuleList, payload)
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

        *fetchTypeOneList({ payload }, { call, put }) {
            const res = yield call(getTypeList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveTypeOneList',
                    payload: {
                        typeOneList: data,
                    },
                })
            }
        },
        *fetchTypeTwoList({ payload }, { call, put }) {
            const res = yield call(getTypeList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveTypeTwoList',
                    payload: {
                        typeTwoList: data || [],
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
        saveTypeOneList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveTypeTwoList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
