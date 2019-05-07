export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', temp: true, redirect: '/user/login' },
            { path: '/user/login', temp: true, name: '登陆', component: './User/Login' },
            { path: '/user/register', temp: true, name: '注册', component: './User/Register' },
            {
                path: '/user/register-result',
                name: '注册详情',
                temp: true,
                component: './User/RegisterResult',
            },
        ],
    },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            // {
            //     path: '',
            //     redirect: '',
            //     name: '', // 对应到菜单显示名
            //     icon: '',
            //     component: '',
            //     hideInMenu: true, // 该路由是否在菜单隐藏
            //     routes: []
            // }

            // 首页
            { path: '/', redirect: '/home' },
            {
                path: '/home',
                name: '主页',
                icon: 'home',
                hideInMenu: true,
                component: './Home',
            },
            {
                path: '/home/detail',
                name: '商品编号规则',
                hideInMenu: true,
                temp: true,
                component: './Home/detail'
            },
            // 企业管理
            {
                path: '/company',
                name: '企业管理',
                icon: 'bank',
                routes: [
                    {
                        path: '/company/core',
                        name: '核心企业管理',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                    {
                        path: '/company/provider',
                        name: '供应商管理',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                    {
                        path: '/company/information',
                        name: '企业基本信息管理',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                    {
                        path: '/company/ledger',
                        name: '企业台账',
                        component: './Company/Ledger',
                    },
                    {
                        path: '/company/cash-record',
                        name: '现金流水记录',
                        hideInMenu: true,
                        component: './Company/CashRecord/index',
                    },
                    {
                        path: '/company/cash-detail',
                        name: '现金流水详情',
                        hideInMenu: true,
                        component: './Company/CashRecord/detail',
                    },
                ],
            },
            {
                path: '/beforeloan',
                name: '贷前授信',
                icon: 'audit',
                routes: [
                    {
                        path: '/beforeloan/credit',
                        name: '企业授信审批',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                    {
                        path: '/beforeloan/limit',
                        name: '额度生效审批',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                ],
            },
            {
                path: '/inloan',
                name: '贷中运营',
                icon: 'interation',
                routes: [
                    {
                        path: '/inloan/purchase',
                        name: '采购单管理及审批',
                        component: './Inloan/Purchase',
                    },
                    {
                        path: '/inloan/financing',
                        name: '融资审批',
                        component: './Inloan/Financing',
                    },
                    {
                        path: '/inloan/withdraw',
                        name: '提现审批',
                        component: './Inloan/withdraw',
                    },
                    {
                        path: '/inloan/profit',
                        name: '分润转出审批',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                ],
            },
            {
                path: '/afterloan',
                name: '贷后管理',
                icon: 'gateway',
                routes: [
                    {
                        path: '/afterloan/repayment',
                        name: '还款记录管理',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                ],
            },
            {
                path: '/finance',
                name: '财务管理',
                icon: 'dollar',
                routes: [
                    {
                        path: '/finance/deposit',
                        name: '保证金管理',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                    {
                        path: '/finance/invoice',
                        name: '发票管理',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                    {
                        path: '/finance/reconcile',
                        name: '对账管理',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                    {
                        path: '/finance/receipt',
                        name: '电子回单管理',
                        component: './Finance/Receipt',
                    },
                    {
                        path: '/finance/receipt/download',
                        name: '下载管理',
                        hideInMenu: true,
                        component: './Finance/Receipt/Download',
                    },
                ],
            },
            {
                path: '/risk-manage',
                name: '风控管理',
                icon: 'thunderbolt',
                routes: [
                    {
                        path: '/risk-manage/parameter',
                        name: '风控参数配置',
                        temp: true,
                        routes: [
                            {
                                path: '/risk-manage/parameter/rule-type',
                                name: '规则分类',
                                temp: true,
                                component: './Risk/Parameter/RuleType',
                            },
                            {
                                path: '/risk-manage/parameter/business-node',
                                name: '业务节点',
                                temp: true,
                                component: './Risk/Parameter/BusinessNode',
                            },
                            {
                                path: '/risk-manage/parameter/rule-group',
                                name: '规则组',
                                temp: true,
                                component: './Risk/Parameter/RuleGroup',
                            },
                            {
                                path: '/risk-manage/parameter/rule-code',
                                name: '规则code',
                                temp: true,
                                component: './Risk/Parameter/RuleCode',
                            },
                        ],
                    },
                    {
                        path: '/risk-manage/rule',
                        name: '风控规则配置',
                        temp: true,
                        component: './Risk/Rule',
                    },
                    {
                        path: '/risk-manage/rule/add-rule',
                        name: '新增规则',
                        temp: true,
                        hideInMenu: true,
                        component: './Risk/Rule/AddRule',
                    },
                    {
                        path: '/risk-manage/record',
                        name: '风控记录管理',
                        temp: true,
                        component: './Risk/Record',
                    },
                    {
                        path: '/risk-manage/record/record-list',
                        name: '操作记录',
                        temp: true,
                        hideInMenu: true,
                        component: './Risk/Record/RecordList',
                    },
                    {
                        path: '/risk-manage/report',
                        name: '企业报表',
                        temp: true,
                        routes: [
                            {
                                path: '/risk-manage/report/decision-grail',
                                name: '决策大盘',
                                temp: true,
                                component: './Risk/Report/DecisionGrail',
                            },
                            {
                                path: '/risk-manage/report/decision-core',
                                name: '核心企业决策报表',
                                temp: true,
                                component: './Risk/Report/DecisionCore',
                            },
                            {
                                path: '/risk-manage/report/decision-supplier',
                                name: '供应商决策报表',
                                temp: true,
                                component: './Risk/Report/DecisionSupplier',
                            },
                            {
                                path: '/risk-manage/report/decision-invoice',
                                name: '发票数据表',
                                temp: true,
                                routes: [
                                    {
                                        path: '/risk-manage/report/decision-invoice/bill-sell',
                                        name: '开票销售监控表格',
                                        temp: true,
                                        component: './Risk/Report/BillSell',
                                    },
                                    {
                                        path: '/risk-manage/report/decision-invoice/bill-collect',
                                        name: '开票汇总',
                                        temp: true,
                                        component: './Risk/Report/BillCollect',
                                    },
                                    {
                                        path: '/risk-manage/report/decision-invoice/data-top',
                                        name: '下游客户的开票数据top5',
                                        temp: true,
                                        component: './Risk/Report/DataTop',
                                    },
                                    {
                                        path: '/risk-manage/report/decision-invoice/area-top',
                                        name: '下游客户地区top5',
                                        temp: true,
                                        component: './Risk/Report/AreaTop',
                                    },
                                    {
                                        path: '/risk-manage/report/decision-invoice/product-top',
                                        name: '开票商品top5',
                                        temp: true,
                                        component: './Risk/Report/ProductTop',
                                    },
                                    {
                                        path: '/risk-manage/report/decision-invoice/invoice-owner',
                                        name: '发票主信息',
                                        temp: true,
                                        component: './Risk/Report/InvoiceOwner',
                                    },
                                    {
                                        path: '/risk-manage/report/decision-invoice/invoice-detail',
                                        name: '发票详情',
                                        temp: true,
                                        component: './Risk/Report/InvoiceDetail',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: '/system',
                name: '系统管理',
                icon: 'robot',
                routes: [
                    {
                        path: '/system/config',
                        name: '系统配置',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                    {
                        path: '/system/tool',
                        name: '系统工具',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                    {
                        path: '/system/monitor',
                        name: '系统监控',
                        temp: true,
                        component: './WaitBuild.js',
                    },
                ],
            },
            {
                component: '404',
            },
        ],
    }
]
