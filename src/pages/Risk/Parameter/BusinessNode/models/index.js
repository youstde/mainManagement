import { getBusinessNodeList, getNodeList } from '../services'

export default {
    namespace: 'businessNode',

    state: {
        list: [],
        total: '',

        nodeList: [],
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const res = yield call(getBusinessNodeList, payload)
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

        *fetchNodeList({ payload }, { call, put }) {
            const res = yield call(getNodeList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveNodeList',
                    payload: {
                        nodeList: data,
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
        saveNodeList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
