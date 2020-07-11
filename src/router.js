const routers = [
    {
        path: '/login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/login/:status',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },

    {
        path: '/sample/printcode/:id',
        meta: {
            title: '打印二维码',
            requireAuth: false,
        },
        component: (resolve) => require(['./views/sungin/print/print.vue'], resolve)
    },

    {
        path: '/',
        meta: {
            title: '',
        },
        component: (resolve) => require(['./views/sungin/layout.vue'], resolve),
        children: [
            {
                path: '/',
                meta: {
                    title: '样衣管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/sample/findSample.vue'], resolve)
            },

            //样衣管理
            {
                path: '/sample/findSample/',
                meta: {
                    title: '样衣信息',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/sample/findSample.vue'], resolve)
            },
            {
                path: '/sample/mySample',
                meta: {
                    title: '我的样衣',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/sample/mySample.vue'], resolve)
            },

            {
                path: '/sample/newSample',
                meta: {
                    title: '样衣录入',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/sample/addSample.vue'], resolve)
            },
            {
                path: '/sample/editSample/:id',
                meta: {
                    title: '样衣编辑',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/sample/addSample.vue'], resolve)
            },
            {
                path: '/sample/inOutmange',
                meta: {
                    title: '入库管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/sample/inOutmange.vue'], resolve)
            },
            {
                path: '/sample/LendMange',
                meta: {
                    title: '借样管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/sample/LendMange.vue'], resolve)
            },

            //打样管理
            {
                path: '/Proof/MyProof',
                meta: {
                    title: '我的打样',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/Proof/MyProof.vue'], resolve)
            },
            {
                path: '/Proof/MyTask',
                meta: {
                    title: '我的打样',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/Proof/MyTask.vue'], resolve)
            },

            {
                path: '/Proof/ProofMange',
                meta: {
                    title: '打样管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/Proof/ProofMange.vue'], resolve)
            },

            //样纱管理
            {
                path: '/YarnMange/MyYarn',
                meta: {
                    title: '我的样纱',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/YarnMange/MyYarn.vue'], resolve)
            },
            {
                path: '/YarnMange/YarnSeach',
                meta: {
                    title: '样纱查询',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/YarnMange/YarnSeach.vue'], resolve)
            },
            {
                path: '/YarnMange/Mange',
                meta: {
                    title: '样纱管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/YarnMange/YarnMange.vue'], resolve)
            },

            //仓库管理
            {
                path: '/warehouse/GarmentInSotck',
                meta: {
                    title: '成衣入库',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/warehouse/GarmentInSotck.vue'], resolve)
            },
            {
                path: '/warehouse/GarmentOutSotck',
                meta: {
                    title: '成衣出库',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/warehouse/GarmentOutSotck.vue'], resolve)
            },
            {
                path: '/warehouse/GarmentSotck',
                meta: {
                    title: '库存管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/warehouse/GarmentSotck.vue'], resolve)
            },


            

            //系统设置
            {
                path: '/system/RoleSetting',
                meta: {
                    title: '系统设置',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/system/RoleSetting.vue'], resolve)
            },
            {
                path: '/system/SampleSetting',
                meta: {
                    title: '样衣设置',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sungin/system/SampleSetting.vue'], resolve)
            }

        ]

    },
];
export default routers;