import {
    getDecisionGrail,
    getCompanyList,
    getDecisionCore,
    getDecisionSupplier,
    getBillSell,
    getBillCollect,
    getDataTop,
    getAreaTop,
    getProductTop,
    getInvoiceOwner,
    getInvoiceDetail,
    getAllCompany,
} from '../services'

export default {
    namespace: 'report',

    state: {
        decisionGrail: {},
        decisionCore: {},
        supplierList: [],
        supplierTotal: null,
        companyList: [],
        allCompany: [],
        billSellList: [],
        billSellTotal: null,
        billCollectList: [],
        billCollectTotal: null,
        dataTopList: [],
        dataTopTotal: null,
        areaTopList: [],
        areaTopTotal: null,
        productTopList: [],
        productTopTotal: null,
        invoiceOwnerList: [],
        invoiceOwnerTotal: null,
        invoiceDetailList: [],
        invoiceDetailTotal: null,
    },

    effects: {
        *fetchBillCollect({ payload }, { call, put }) {
            const res = yield call(getBillCollect, payload)

            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveBillCollect',
                    payload: {
                        billCollectList: list,
                        billCollectTotal: count,
                    },
                })
            }
        },
        *fetchInvoiceDetail({ payload }, { call, put }) {
            const res = yield call(getInvoiceDetail, payload)

            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveInvoiceDetail',
                    payload: {
                        invoiceDetailList: list,
                        invoiceDetailTotal: count,
                    },
                })
            }
        },
        *fetchInvoiceOwner({ payload }, { call, put }) {
            const res = yield call(getInvoiceOwner, payload)

            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveInvoiceOwner',
                    payload: {
                        invoiceOwnerList: list,
                        invoiceOwnerTotal: count,
                    },
                })
            }
        },
        *fetchProductTop({ payload }, { call, put }) {
            const res = yield call(getProductTop, payload)

            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveProductTop',
                    payload: {
                        productTopList: list,
                        productTopTotal: count,
                    },
                })
            }
        },
        *fetchDataTop({ payload }, { call, put }) {
            const res = yield call(getDataTop, payload)

            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveDataTop',
                    payload: {
                        dataTopList: list,
                        dataTopTotal: count,
                    },
                })
            }
        },
        *fetchAreaTop({ payload }, { call, put }) {
            const res = yield call(getAreaTop, payload)

            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveAreaTop',
                    payload: {
                        areaTopList: list,
                        areaTopTotal: count,
                    },
                })
            }
        },
        *fetchDecisionGrail({ payload }, { call, put }) {
            const res = yield call(getDecisionGrail, payload)

            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveDecisionGrail',
                    payload: {
                        decisionGrail: data,
                    },
                })
            }
        },
        *fetchDecisionCore({ payload }, { call, put }) {
            const res = yield call(getDecisionCore, payload)

            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveDecisionCore',
                    payload: {
                        decisionCore: data,
                    },
                })
            }
        },
        *fetchDecisionSupplier({ payload }, { call, put }) {
            const res = yield call(getDecisionSupplier, payload)

            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveDecisionSupplier',
                    payload: {
                        supplierList: list,
                        supplierTotal: count,
                    },
                })
            }
        },
        *fetchBillSell({ payload }, { call, put }) {
            const res = yield call(getBillSell, payload)

            if (res.success) {
                const { list, count } = res.data

                yield put({
                    type: 'saveBillSell',
                    payload: {
                        billSellList: list,
                        billSellTotal: count,
                    },
                })
            }
        },
        *fetchCompanyList({ payload }, { call, put }) {
            const res = yield call(getCompanyList, payload)

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
        *fetchAllCompany({ payload }, { call, put }) {
            const res = yield call(getAllCompany, payload)

            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveAllCompany',
                    payload: {
                        allCompany: data,
                    },
                })
            }
        },
    },

    reducers: {
        saveDecisionGrail(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveDecisionCore(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveCompanyList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveDecisionSupplier(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveBillSell(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveBillCollect(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveDataTop(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveAreaTop(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveProductTop(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveInvoiceOwner(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveInvoiceDetail(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveAllCompany(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
