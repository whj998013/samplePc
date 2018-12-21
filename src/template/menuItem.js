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
    //菜单2
    {
        subMenuName: 'mangeMenu',
        iconType: 'ios-clipboard-outline',
        subMenuText: '成衣仓库',
        authKey: 'SampleMange',
        menuItem: [

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