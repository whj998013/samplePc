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

        ]
    },
    //菜单2
    {
        subMenuName: 'mangeMenu',
        iconType: 'ios-clipboard-outline',
        subMenuText: '样衣管理',
        authKey: 'SampleMange',
        menuItem: [{
                name: '/samplemange/inOutmange',
                text: '入库管理',
                authKey: 'SampleMange_inOutMange',

            },
            {
                name: '/samplemange/LendMange',
                text: '借用管理',
                authKey: 'SampleMange_LendMange',
            },

        ]
    },

    //菜单2
    {
        subMenuName: 'setting',
        iconType: 'md-construct',
        subMenuText: '系统设置',
        authKey: 'SampleMange_SystemMange',
        menuItem: [{
                name: '/system/RoleSetting',
                text: '角色权限配置',
                authKey: 'SampleMange_SystemMange_RoleUserMange',

            },
            {
                name: '/system/SampleSetting',
                text: '样衣系统配置',
              
                authKey:'SampleMange_SystemMange_SampleMange', 

            },

        ]
    },

];
export default menuObj;