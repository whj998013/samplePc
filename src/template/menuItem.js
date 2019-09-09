let menuObj = [
    //菜单1
    {
        subMenuName: 'stockMenu',
        iconType: 'md-shirt',
        subMenuText: '样衣库',
        authKey: 'Sample',
        //子菜单
        menuItem: [{
            name: '/Sample/findSample/',
            text: '找样衣',
            authKey: 'Sample_FindSample',
        },
        {
            name: '/Sample/mySample/',
            text: '我的样衣',
            authKey: 'Sample_MySample',
        },
        {
            name: '/sample/inOutmange',
            text: '入库管理',
            authKey: 'Sample_InOutMange',
        },
        {
            name: '/sample/LendMange',
            text: '借用管理',
            authKey: 'Sample_LendMange',
        },

        ]
    },
    //样纱管理
    {
        subMenuName: 'YarnMenu',
        iconType: 'ios-cube-outline',
        subMenuText: '样纱管理',
        authKey: 'YarnMange',
        menuItem: [

            {
                name: '/YarnMange/YarnSeach',
                text: '样纱查询',
                authKey: 'Yarn_YarnSeach',
            },
            {
                name: '/YarnMange/MyYarn',
                text: '我的样纱',
                authKey: 'Yarn_MyYarn',
            },
        ]
    },

    //打样管理
    {
        subMenuName: 'ProofMenu',
        iconType: 'ios-cut-outline',
        subMenuText: '打样中心',
        authKey: 'Proof',
        menuItem: [
            {
                name: '/Proof/MyProof',
                text: '我的打样',
                authKey: 'Proof_MyProof',

            },
            {
                name: '/Proof/MyTask',
                text: '我的任务',
                authKey: 'Proof_MyTask',

            },
            {
                name: '/Proof/ProofMange',
                text: '打样管理',
                authKey: 'Proof_ProofMange',

            },
        ]
    },

    //菜单2
    {
        subMenuName: 'setting',
        iconType: 'md-construct',
        subMenuText: '系统设置',
        authKey: 'SystemMange',
        menuItem: [{
            name: '/system/RoleSetting',
            text: '角色权限配置',
            authKey: 'SystemMange_RoleUserMange',

        },
        {
            name: '/system/SampleSetting',
            text: '系统配置',
            authKey: 'SystemMange_SampleMange',

        },
        ]
    },

];
export default menuObj;