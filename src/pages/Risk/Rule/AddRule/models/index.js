import {
    getStrategyList,
    getRuleGroupList,
    getTypeList,
    getNodeList,
    getRiskList,
    getParamList,
} from '../services'

export default {
    namespace: 'addRule',

    state: {
        strategyList: [],
        ruleGroupList: [],
        typeOneList: [],
        typeTwoList: [],
        nodeOneList: [],
        nodeTwoList: [],
        riskOneList: [],
        riskTwoList: [],
        paramList: [],
    },

    effects: {
        *fetchStrategyList({ payload }, { call, put }) {
            const res = yield call(getStrategyList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveStrategyList',
                    payload: {
                        strategyList: data || [],
                    },
                })
            }
        },

        *fetchRuleGroupList({ payload }, { call, put }) {
            const res = yield call(getRuleGroupList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveRuleGroupList',
                    payload: {
                        ruleGroupList: data || [],
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
        *fetchNodeOneList({ payload }, { call, put }) {
            const res = yield call(getNodeList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveNodeOneList',
                    payload: {
                        nodeOneList: data,
                    },
                })
            }
        },
        *fetchNodeTwoList({ payload }, { call, put }) {
            const res = yield call(getNodeList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveNodeTwoList',
                    payload: {
                        nodeTwoList: data || [],
                    },
                })
            }
        },
        *fetchRiskOneList({ payload }, { call, put }) {
            const res = yield call(getRiskList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveRiskOneList',
                    payload: {
                        riskOneList: data,
                    },
                })
            }
        },
        *fetchRiskTwoList({ payload }, { call, put }) {
            const res = yield call(getRiskList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveRiskTwoList',
                    payload: {
                        riskTwoList: data || [],
                    },
                })
            }
        },

        *fetchParamList({ payload }, { call, put }) {
            const res = yield call(getParamList, payload)
            if (res.success) {
                const { data } = res

                yield put({
                    type: 'saveParamList',
                    payload: {
                        paramList: data || [],
                    },
                })
            }
        },
    },

    reducers: {
        saveStrategyList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveRuleGroupList(state, { payload }) {
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
        saveNodeOneList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveNodeTwoList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveRiskOneList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveRiskTwoList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        saveParamList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
