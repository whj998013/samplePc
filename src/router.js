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
        component: (resolve) => require(['./views/print/print.vue'], resolve)
    },

    {
        path: '/',
        meta: {
            title: '',
        },
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
            {
                path: '/',
                meta: {
                    title: '样衣管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sample/findSample.vue'], resolve)
            },

            {
                path: '/sample/findSample/',
                meta: {
                    title: '样衣信息',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sample/findSample.vue'], resolve)
            },
            {
                path: '/sample/mySample',
                meta: {
                    title: '我的样衣',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sample/mySample.vue'], resolve)
            },
            
            {
                path: '/sample/newSample',
                meta: {
                    title: '样衣录入',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sample/addSample.vue'], resolve)
            },

            {
                path: '/sample/editSample/:id',
                meta: {
                    title: '样衣编辑',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sample/addSample.vue'], resolve)
            },

          
            {
                path: '/sample/inOutmange',
                meta: {
                    title: '入库管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sample/inOutmange.vue'], resolve)
            },
            {
                path: '/sample/LendMange',
                meta: {
                    title: '借样管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/sample/LendMange.vue'], resolve)
            },
            {
                path: '/Proof/MyProof',
                meta: {
                    title: '我的打样',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/Proof/MyProof.vue'], resolve)
            },
            {
                path: '/Proof/newProof',
                meta: {
                    title: '打样申请',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/Proof/newProof.vue'], resolve)
            },
            {
                path: '/Proof/ProofMange',
                meta: {
                    title: '打样管理',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/Proof/ProofMange.vue'], resolve)
            },
            

            {
                path: '/system/RoleSetting',
                meta: {
                    title: '系统设置',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/system/RoleSetting.vue'], resolve)
            },
            {
                path: '/system/SampleSetting',
                meta: {
                    title: '样衣设置',
                    requireAuth: true,
                },
                component: (resolve) => require(['./views/system/SampleSetting.vue'], resolve)
            }
           
        ]

    },
   ];
export default routers;