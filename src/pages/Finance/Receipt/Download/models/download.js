import { getList } from '../services/download'

export default {
    namespace: 'download',

    state: {
        list: [],
        total: '',
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const res = yield call(getList, payload)

            if (res.success) {
                const { list, totalNum } = res.data

                yield put({
                    type: 'saveList',
                    payload: {
                        total: totalNum,
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
        clear() {
            return {
                list: [],
                total: '',
            }
        },
    },
}
