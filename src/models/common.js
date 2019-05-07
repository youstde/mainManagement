import { companyList, getPaymentTypeList } from '@/services/common'

export default {
    namespace: 'common',

    state: {
        companyList: [],
        paymentTypeList: [],
    },

    effects: {
        *fetchCompanyList(_, { call, put }) {
            const res = yield call(companyList)

            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveCompanyList',
                    payload: {
                        companyList: data,
                    },
                })
            }
        },

        *fetchPaymentType(_, { call, put }) {
            const res = yield call(getPaymentTypeList)

            if (res.success) {
                const { data } = res

                yield put({
                    type: 'savePaymentType',
                    payload: {
                        paymentTypeList: data,
                    },
                })
            }
        },
    },

    reducers: {
        saveCompanyList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        savePaymentType(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
