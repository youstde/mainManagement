import { getCompanyTotal, getCashList, getCashDetail } from '../services'

export default {
    namespace: 'company',

    state: {
        totalMsg: {},
        cashList: [],
        cashTotal: '',

        cashDetail: {},
    },

    effects: {
        *fetchCompanyTotal({ payload }, { call, put }) {
            const res = yield call(getCompanyTotal, payload)

            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveCompanyTotal',
                    payload: {
                        totalMsg: data === null ? {} : data,
                    },
                })
            }
        },

        *fetchCashList({ payload }, { call, put }) {
            const res = yield call(getCashList, payload)

            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveCashList',
                    payload: {
                        cashTotal: count,
                        cashList: list,
                    },
                })
            }
        },

        *fetchCashDetail({ payload }, { call, put }) {
            const res = yield call(getCashDetail, payload)

            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveCashDetail',
                    payload: {
                        cashDetail: data,
                    },
                })
            }
        },
    },

    reducers: {
        saveCompanyTotal(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveCashList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveCashDetail(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
