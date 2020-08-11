let sra={
    login_cookielogin:'apiaction/login/CookieLogin',
    login_weblogin:'apiaction/login/Weblogin',
    login_ddlogin:'apiaction/login/ddlogin',

    setting_SyncWorker:'apiaction/Worker/SyncWorker',
    setting_UpUserDataByDd:'apiaction/RoleSetting/UpUserDataByDd',
    setting_GetUserRoleData:'apiaction/RoleSetting/GetUserRoleData',
    setting_SaveRoleData:'apiaction/RoleSetting/SaveRoleData',
    setting_SaveSampleSetting:'apiaction/SampleSetting/SaveSampleSetting',
    setting_YarnStockCorrect:'apiaction/YarnSetting/YarnStockCorrect',

    public_getmenu:'apiaction/public/GetMenuItem',
    public_getselectlist:'apiaction/Public/GetSelectList',
    public_getdeptpvlist:'apiaction/Public/GetDeptPvList',

    sample_getsetting:'apiaction/SampleSetting/GetSampleSetting',
    sample_getsamplelist:'apiaction/Sample/GetSampleList',
    sample_get_print_model:'apiaction/Print/GetSample',
    sample_CreateSample:'apiaction/sample/CreateSample',
    sample_GetEditSample:'apiaction/sample/GetEditSample',
    sample_UpLoadPic:'apiaction/Sample/UpLoadPic',
    sample_RemoveFile:'apiaction/Sample/RemoveFile',
    sample_UpLoadFile:'apiaction/Sample/UpLoadFile',
    sample_SaveSample:'apiaction/sample/SaveSample',
    sample_GetInStorageList:'apiaction/InOutStorage/GetInStorageList',
    sample_AcceptInStorageList:'apiaction/InOutStorage/AcceptInStorageList',
    sample_GetInStorageUserList:'apiaction/InOutStorage/GetInStorageUserList',
    sample_GetNotInStorageSample:'apiaction/MySample/GetNotInStorageSample',
    sample_GetInStorageSample:'apiaction/MySample/GetInStorageSample',
    sample_GetLendOutSample:'apiaction/MySample/GetLendOutSample',
    sample_DoBackLend:'apiaction/LendOut/DoBackLend',
    sample_DoInstroage:'apiaction/LendOut/DoInstroage',
    sample_GetSampleInfo:'apiaction/Sample/GetSampleInfo/',
    sample_GetAllLendList:'apiaction/LendOut/GetAllLendList',
    sample_GetLendUserList:'apiaction/LendOut/GetLendUserList/',
    sample_GetLendChart:'apiaction/LendOut/GetLendChart',
    sample_GetInUserList:'apiaction/LendOut/GetInUserList',
    sample_DoReturnLend:'apiaction/LendOut/DoReturnLend',
    sample_GetAllLendOutList:'apiaction/LendOut/GetAllLendOutList',
    sample_GetAllLendOutReturnList:'apiaction/LendOut/GetAllLendOutReturnList',


    proof_get_gy_workers:'apiaction/ProofWorker/GetWorkerList/1',
    proof_GetProofDepts:'apiaction/ProofWorker/GetProofDepts',
    proof_getmyproofs:'apiaction/MyProof/GetMyProofs',//当前打样
    proof_getmyfinshproofs:'apiaction/MyProof/GetMyFinshProofs',//已完成打样
    proof_getNewProofNo:'apiaction/NewProof/GetProofNo',//取得打样单编号
    proof_GetMyTasks:'apiaction/ProofTask/GetMyTasks',
    proof_GetMyFinshTasks:'apiaction/ProofTask/GetMyFinshTasks',
    proof_GetProofPlanList:'apiaction/ProofMange/GetProofPlanList',
    proof_GetFinshPlanList:'apiaction/ProofMange/GetFinshPlanList',
    proof_NewProofUpLoadFile:'apiaction/NewProof/UpLoadFile',//上传打样文件
    proof_RemoveFile:'apiaction/NewProof/RemoveFile',//删除打样文件
    proof_UpdateProof:'apiaction/NewProof/UpdateProof',//更新打样单
    proof_SaveProof:'apiaction/NewProof/SaveProof',//新建保存打样单
    proof_GetClients:'apiaction/ProofMange/GetClients',
    proof_ApplyDownload:'apiaction/MyProof/ApplyDownload/',
    proof_SubmitProof:'apiaction/MyProof/SubmitProof',
    proof_DeleteProof:'apiaction/MyProof/DeleteProof',
    proof_GetProofRecord:'apiaction/MyProof/GetProofRecord/',
    proof_GetTasks:'apiaction/ProofTask/GetTasks/',
    proof_FinshProof:'apiaction/ProofMange/FinshProof/',
    proof_UpLoadFile:'apiaction/ProofTask/UpLoadFile',
    proof_SubmitTask:'apiaction/ProofTask/SubmitTask/',
    proof_GetWorkerList:'apiaction/ProofWorker/GetWorkerList/',
    proof_DeleteTask:'apiaction/ProofTask/DeleteTask/',
    proof_AddTask:'apiaction/ProofTask/AddTask/',
    proof_UpdateTask:'apiaction/ProofTask/UpdateTask',
    proof_GetNextTask:'apiaction/ProofTask/GetNextTask/',
    proof_DeleteTaskFile:'apiaction/ProofTask/DeleteTaskFile/',
    proof_GetProcessList:'apiaction/ProofWorker/GetProcessList',



    yarn_GetMyYarnOutApplyList:'apiaction/YarnOutStock/GetMyYarnOutApplyList',
    yanr_GetYarnOutApplyList:'apiaction/YarnOutStock/GetYarnOutApplyList',
    yarn_GetOutList:'apiaction/YarnSeach/GetOutList/',
    yarn_GetYarnOutApplyList:'apiaction/YarnOutStock/GetYarnOutApplyList',
    yarn_GetMyYarnInStock:'apiaction/MyYarn/GetMyYarnInStock',
    yarn_GetMyYarnOutStock:'apiaction/MyYarn/GetMyYarnOutStock',
    yarn_GetLabYarnList:'apiaction/YarnSeach/GetLabYarnList',
    yarn_GetYarnList:'apiaction/YarnSeach/GetYarnList',
    yarn_NewYarnOutApply:'apiaction/YarnOutStock/NewYarnOutApply',
    yarn_GetCusList:'apiaction/Cus/GetCusList',
    yarn_AlowYarnOutStock:'apiaction/YarnOutStock/AlowYarnOutStock/',
    yarn_DeleteYarnOutStock:'apiaction/YarnOutStock/DeleteYarnOutStock/',



}
export default  sra;