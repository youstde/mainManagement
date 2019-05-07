import { getReceiptList } from '../services/receipt'

export default {
    namespace: 'receipt',

    state: {
        receiptList: [],
        total: '',
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const res = yield call(getReceiptList, payload)

            if (res.success) {
                const { receiptInfos, totalNum } = res.data

                yield put({
                    type: 'saveReceiptList',
                    payload: {
                        total: totalNum,
                        receiptList: receiptInfos,
                    },
                })
            }
        },
    },

    reducers: {
        saveReceiptList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveDownloadList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        clear() {
            return {
                receiptList: [],
                total: '',
            }
        },
    },
}
