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
    //成衣仓库
    {
        subMenuName: 'mangeMenu',
        iconType: 'ios-clipboard-outline',
        subMenuText: '成衣仓库',
        authKey: 'SampleMange',
        menuItem: [

        ]
    },

       //打样管理
       {
        subMenuName: 'mangeMenu',
        iconType: 'ios-clipboard-outline',
        subMenuText: '打样中心',
        authKey: 'Proof',
        menuItem: [   
            {
                name: '/Proof/MyProof',
                text: '我的打样',
                authKey: 'Proof_MyProof',

            },
            {
                name: '/Proof/ProofMange',
                text: '打样管理',
                authKey:'Proof_ProofMange', 

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
                text: '样衣系统配置',
                authKey:'SystemMange_SampleMange', 

            },

        ]
    },

];
export default menuObj;