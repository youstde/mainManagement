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
                icon: 'gift',
                routes: [
                    {
                        path: '/goods/spulist',
                        name: 'spu列表',
                        component: './Goods/SpuList',
                    },
                    {
                        path: '/goods/spuedit',
                        name: '编辑SPU',
                        hideInMenu: true,
                        component: './Goods/SpuList/edit',
                    },
                    {
                        path: '/goods/addItem',
                        name: '新增商品SPU',
                        hideInMenu: true,
                        component: './Goods/SpuList/addItem',
                    },
                    {
                        path: '/goods/skulist',
                        name: 'sku列表',
                        component: './Goods/SkuList',
                    },
                    {
                        path: '/goods/skuedit',
                        name: '编辑SKU',
                        hideInMenu: true,
                        component: './Goods/SkuList/edit',
                    },
                    {
                        path: '/goods/storegoodslist',
                        name: '门店商品列表',
                        component: './Goods/StoreGoodsList',
                    },
                ],
            },
            {
                path: '/property',
                name: '属性管理',
                icon: 'gateway',
                routes: [
                    {
                        path: '/property/classmanagement/29C5FB2722EE750E35',
                        name: '品类管理',
                        component: './Property/Classmanagement',
                    },
                    {
                        path: '/property/sizemanagement/ABBF4E7B52C66C5D36',
                        name: '规格管理',
                        component: './Property/Classmanagement',
                    },
                    {
                        path: '/property/outpackagemanagement/103204C3AD09E23037',
                        name: '外包装管理',
                        component: './Property/Classmanagement',
                    },
                    {
                        path: '/property/innerpackagemanagement/399D02C81F277D4438',
                        name: '内包装管理',
                        component: './Property/Classmanagement',
                    },
                    {
                        path: '/property/brandmanagement/6C27926E0F06E0C439',
                        name: '品牌管理',
                        component: './Property/Classmanagement',
                    },
                    {
                        path: '/property/storagemanagement/D8F218B612A79C753A',
                        name: '存储情况管理',
                        component: './Property/Classmanagement',
                    },
                    {
                        path: '/property/processmanagement/B28CD084BC37E1D13B',
                        name: '加工情况管理',
                        component: './Property/Classmanagement',
                    },
                    {
                        path: '/property/cultivarmanagement/161EE93CEC677F6E3C',
                        name: '品种管理',
                        component: './Property/Classmanagement',
                    },
                ],
            },
            {
                path: '/purchase',
                name: '采购管理',
                icon: 'dollar',
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
                    {
                        path: '/purchase/purchasebill',
                        name: '采购单管理',
                        routes: [
                            {
                                path: '/purchase/purchasebill/list',
                                name: '采购单列表',
                                component: './Purchase/PurchaseBill',
                            },
                        ],
                    },
                    {
                        path: '/purchase/dispatchbill',
                        name: '发货单管理',
                        routes: [
                            {
                                path: '/purchase/dispatchbill/list',
                                name: '发货单列表',
                                component: './Purchase/Dispatchbill',
                            },
                        ],
                    },
                ],
            },
            {
                path: '/logistics',
                name: '干线物流管理',
                icon: 'twitter',
                routes: [
                    {
                        path: '/logistics/companymanagement',
                        name: '干线物流公司管理',
                        routes: [
                            {
                                path: '/logistics/companymanagement/list',
                                name: '干线物流公司列表',
                                component: './Logistics/CompanyManagement',
                            },
                        ],
                    },
                    {
                        path: '/logistics/dispatchmanagement',
                        name: '发货管理',
                        routes: [
                            {
                                path: '/logistics/dispatchmanagement/list',
                                name: '发货单列表',
                                component: './Logistics/Dispatchmanagement',
                            },
                        ],
                    },
                    {
                        path: '/logistics/logisticsbillmanagement',
                        name: '物流单管理',
                        routes: [
                            {
                                path: '/logistics/logisticsbillmanagement/list',
                                name: '物流单列表',
                                component: './Logistics/LogisticsBillManagement',
                            },
                        ],
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
