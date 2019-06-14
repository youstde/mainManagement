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
                component: './Home/detail',
            },
            // 企业管理
            {
                path: '/storemanagement',
                name: '门店管理',
                icon: 'bank',
                routes: [
                    {
                        path: '/storemanagement/list',
                        name: '门店管理列表',
                        component: './Storemanagement/Index',
                    },
                    {
                        path: '/storemanagement/order',
                        name: '门店订单监控',
                        component: './Storemanagement/Order',
                    },
                ],
            },
            {
                path: '/goods',
                name: '商品',
                icon: 'audit',
                routes: [
                    {
                        path: '/goods/spulist',
                        name: 'spu列表',
                        component: './Goods/SpuList',
                    },
                    {
                        path: '/goods/skulist',
                        name: 'sku列表',
                        component: './Goods/SkuList',
                    },
                    {
                        path: '/goods/storegoodslist',
                        name: '门店商品列表',
                        component: './Goods/StoreGoodsList',
                    },
                ],
            },
            {
                path: '/purchase',
                name: '采购管理',
                icon: 'interation',
                routes: [
                    {
                        path: '/purchase/providerlist',
                        name: '供应商管理',
                        temp: true,
                        component: './Purchase/ProviderList',
                    },
                    {
                        path: '/purchase/ordermanagement',
                        name: '门店订货订单管理',
                        temp: true,
                        component: './Purchase/OrderManagement',
                    },
                    {
                        path: '/purchase/createorder',
                        name: '通过勾选生成采购单',
                        hideInMenu: true,
                        temp: true,
                        component: './Purchase/OrderManagement/createOrder.js',
                    },
                    {
                        path: '/purchase/manualcreateorder',
                        name: '手动生成采购单',
                        hideInMenu: true,
                        temp: true,
                        component: './Purchase/OrderManagement/manualCreateOrder.js',
                    },
                    {
                        path: '/purchase/test',
                        name: '测试',
                        hideInMenu: true,
                        temp: true,
                        component: './Purchase/OrderManagement/test.js',
                    },
                ],
            },
            {
                path: '/property',
                name: '属性管理',
                icon: 'gateway',
                routes: [
                    {
                        path: '/property/classmanagement',
                        name: '品类管理',
                        component: './Property/Classmanagement',
                    },
                    {
                        path: '/property/sizemanagement',
                        name: '规格管理',
                        component: './Property/Sizemanagement',
                    },
                    {
                        path: '/property/outpackagemanagement',
                        name: '外包装管理',
                        component: './Property/OutPackagemanagement',
                    },
                    {
                        path: '/property/innerpackagemanagement',
                        name: '内包装管理',
                        component: './Property/InnerPackagemanagement',
                    },
                    {
                        path: '/property/brandmanagement',
                        name: '品牌管理',
                        component: './Property/Brandmanagement',
                    },
                    {
                        path: '/property/storagemanagement',
                        name: '存储情况管理',
                        component: './Property/Storagemanagement',
                    },
                    {
                        path: '/property/processmanagement',
                        name: '加工情况管理',
                        component: './Property/Processmanagement',
                    },
                    {
                        path: '/property/cultivarmanagement',
                        name: '品种管理',
                        component: './Property/Cultivarmanagement',
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
                path: '/authority',
                name: '权限',
                icon: 'thunderbolt',
                routes: [
                    {
                        path: '/authority/management',
                        name: '权限管理',
                        routes: [
                            {
                                path: '/authority/management/role',
                                name: '角色管理',
                                component: './Authority/ManagementRole',
                            },
                            {
                                path: '/authority/management/roleauthority',
                                name: '角色权限管理',
                                hideInMenu: true,
                                component: './Authority/ManagementRole/roleAuthority.js',
                            },
                        ],
                    },
                    {
                        path: '/authority/personnelmanagement',
                        name: '成员管理',
                        routes: [
                            {
                                path: '/authority/personnelmanagement/list',
                                name: '成员管理列表',
                                component: './Authority/PersonnelList',
                            },
                            // {
                            //     path: '/authority/management/roleauthority',
                            //     name: '添加成员',
                            //     component: './Authority/ManagementRole/roleAuthority.js',
                            // },
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
    },
]
