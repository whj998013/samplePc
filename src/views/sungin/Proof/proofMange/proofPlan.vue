<style scoped>
</style>
<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
<template>
  <div>
    <Modal v-model="paiDanModel" :title="modelText"  width="700px" :mask-closable=false class-name="vertical-center-modal">

      <row>
        <Col span="22">
        <p>款号:{{proof.ProofStyle.ProofStyleNo}} | 业务指定工艺员：{{proof.DesignatedGY}}</p>
        </Col>
        <Col span="2">
        <Button type="primary" icon="ios-add" @click="addNewTask"></Button>
        </Col>
      </row>
      <row style="padding:10px 0px">
        <Col span="24">
        <Table border :columns="columns" :data="taskList" height="250px">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="error" size="small" style="margin-right: 5px" @click="DeleteTask(row,index)">删除</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="EditTask(row,index)">编辑</Button>
          </template>
        </Table>
        </Col>
      </row>
      <div slot="footer">
        <Button size="large" @click="paiDanModel = false">取消</Button>
        <Button type="primary" size="large" @click="SaveProofTask">保存</Button>
      </div>
    </Modal>

    <Modal v-model="taskEditView" title="工序编辑" width="650px" class-name="vertical-center-modal">
      <Form :label-width="65" label-position="right">
        <row>
          <Col span="14">
          <FormItem label="工序">
            <Select v-model="currentTask.ProcessId" @on-change="processChange">
              <Option v-for="item in processList" :value="item.Id" :key="item.Id">{{ item.ProcessName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="14">
          <FormItem label="姓名">
            <workerSelect v-model="currentTask.WorkerName" ref="wSelect" :HaveNoSelect="false" :action=$sra.proof_GetWorkerList+'1'></workerSelect>
          </FormItem>
          </Col>
          <Col span="14">
          <FormItem label="计划日期">
            <DatePicker v-model="currentTask.NeedFinshDate" type="date" placeholder="选择计划完成日期"></DatePicker>
          </FormItem>
          </Col>
          <Col span="18">
          <FormItem label="任务开始方式">
            <RadioGroup v-model="taskRG" @on-change="radioChange">
              <Radio label="选择任务开始时间"></Radio>
              <Radio label="上级任务结束时开始"></Radio>
            </RadioGroup>
            <!-- 日期选择  -->
            <DatePicker v-if="currentTask.IsBeginDate" v-model="currentTask.BeginDate" type="date" placeholder="选择任务开始日期"></DatePicker>

            <!-- 任务选择 -->
            <Select v-model="currentTask.UpTaskNo" v-if="!currentTask.IsBeginDate" style="width:200px">
              <Option v-for="(item,i) in taskList" :key="i" :value="item.TaskNo" :label="item.WorkerName +'|' +item.ProcessName" v-if="item.TaskNo!=currentTask.TaskNo">
                <span>{{item.WorkerName}}</span>
                <span style="float:right;color:#ccc">{{item.ProcessName}}</span>
              </Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="20">
          <Alert v-if="currentTask.error" type="error">请输入姓名和计划日期！</Alert>
          </Col>
        </row>
      </Form>
      <div slot="footer">
        <Button size="large" @click="taskEditView = false">取消</Button>
        <Button type="primary" size="large" @click="doTaskEditOk">确定</Button>
      </div>

    </Modal>
  </div>
</template>
<script>
//import bus from "../bus.js";
import workerSelect from "../../commpent/workerSelect.vue";
export default {
  components: {
    workerSelect
  },
  data: function () {
    return {
      taskRG: "选择任务开始时间",
      currentTask: {
        Id: 0,
        UpId: 0,
        TaskNo: "",
        UpTaskNo: "无",
        ProcessId: 1,
        ProcessName: "工艺",
        WorkerName: "",
        NeedFinshDate: "",
        error: false,
        BeginDate: "",
        IsBeginDate: true,
      },

      processList: [{ ProcessName: "", Id: "" }],
      proof: {
        ProofStyle: {
          ProofStyleNo: ""
        },
        ProofTasks: []
      },
      ProofOrderId: "",
      taskEditView: false,
      paiDanModel: false,
      modelText: "打样排单",
      taskList: [],
      columns: [
        {
          title: "工序",
          key: "ProcessName",
          width: 75
        },
        {
          title: "姓名",
          key: "WorkerName",
          width: 75
        },
        {
          title: "计划日期",
          key: "NeedFinshDate",

        },
        {
          title: "开始日期",
          key: "BeginDate",

        },
        {
          title: "完成日期",
          key: "FinshDate",

        },
        {
          title: "操作",
          slot: "action",
          width: 140
        }
      ]
    };
  },
  computed: {
  },
  methods: {
  
    radioChange(v) {
      if (v == "选择任务开始时间") {
        this.currentTask.IsBeginDate = true;
      } else {
        this.currentTask.IsBeginDate = false;
      }
    },
    //打开任务编辑
    EditTask(row) {
      //console.log(row);
     // debugger;
      this.currentTask.ProofOrderId = this.ProofOrderId;
      this.currentTask.ProcessId = row.ProcessId;
      this.currentTask.Id = row.Id;
      this.currentTask.WorkerName = row.WorkerName;
      this.currentTask.NeedFinshDate = row.NeedFinshDate;
      this.currentTask.ProcessName = row.ProcessName;
      this.currentTask.status = row.status;
      this.currentTask.TaskNo = row.TaskNo;
      this.currentTask.UpTaskNo = row.UpTaskNo;
      this.currentTask.BeginDate=row.BeginDate;
      this.taskEditView = true;
      this.currentTask.IsBeginDate=row.UpTaskNo==null||row.UpTaskNo=="";
      this.taskRG=row.UpTaskNo==null||row.UpTaskNo==""?"选择任务开始时间":"上级任务结束时开始";
    },

    //确认任务修改
    doTaskEditOk() {

      if (
        this.currentTask.WorkerName == "" ||
        this.currentTask.NeedFinshDate == "" ||
        this.currentTask.WorkerName == undefined
      ) {
        this.currentTask.error = true;
      } else {
        this.currentTask.error = false;
        if (this.currentTask.status == "new") {
          //新增模式
          this.taskList.push({
            Id: 0,
            ProofOrderId: this.currentTask.ProofOrderId,
            WorkerName: this.currentTask.WorkerName,
            ProcessId: this.currentTask.ProcessId,
            ProcessName: this.currentTask.ProcessName,
            NeedFinshDate: this.$util.getGmtDate(this.currentTask.NeedFinshDate),
            BeginDate: this.currentTask.IsBeginDate ? this.$util.getGmtDate(this.currentTask.BeginDate) : "",
            status: "add",
            TaskNo: this.currentTask.TaskNo,
            UpTaskNo: this.currentTask.IsBeginDate ? "" : this.currentTask.UpTaskNo,
          });
        } else {
          //编辑模式
          let cf = this.taskList.find(p => {
            return p.TaskNo == this.currentTask.TaskNo;
          });
          cf.WorkerName = this.currentTask.WorkerName;
          cf.ProcessId = this.currentTask.ProcessId;
          cf.ProcessName = this.currentTask.ProcessName;
          cf.UpTaskNo = this.currentTask.IsBeginDate ? "" : this.currentTask.UpTaskNo;
          cf.BeginDate = this.currentTask.IsBeginDate ? this.$util.getGmtDate(this.currentTask.BeginDate) : "";
          cf.NeedFinshDate = this.$util.getGmtDate(this.currentTask.NeedFinshDate);
          if (cf.status != "add") cf.status = "edit";
        }
        this.taskEditView = false;
      }

    },
    //取得工序表
    processChange(val) {
      this.$refs.wSelect.GetWorker(this.$sra.proof_GetWorkerList + val);
      let pcs = this.processList.find(function (p) {
        return p.Id == val;
      });
      this.currentTask.ProcessName = pcs.ProcessName;
      this.currentTask.WorkerName = "";
    },
    //保存修改后任务表
    SaveProofTask() {
      //保存信息到服务器
      let pList = [];
      this.proof.ProofTasks.forEach(p => {
        if (p.status == "deleted") {
        //  console.log("delete" + p.Id);
          pList.push(this.$util.get(this.$sra.proof_DeleteTask + p.Id));
        }
      });
      this.taskList.forEach(p => {
        if (p.status == "add") {
         // console.log("add", p);
          pList.push(this.$util.post(this.$sra.proof_AddTask, p));
        } else if (p.status == "edit") {
         // console.log("edit", p);
          pList.push(this.$util.post(this.$sra.proof_UpdateTask, p));
        }
      });
      Promise.all(pList).then(re => {
       // console.log("任务全部完成");
        this.paiDanModel = false;
      }).catch(error => {
        console.log("错误:", error);
        this.paiDanModel = false;
      });

    },
    //删除任务
    DeleteTask(row, index) {
      this.proof.ProofTasks.forEach(p => {
        if (p.Id == row.Id) p.status = "deleted";
      });
      this.taskList.splice(index, 1);
    },
    //增加新任务
    addNewTask() {
      this.taskEditView = true;
      this.currentTask.ProofOrderId = this.ProofOrderId;
      this.currentTask.Id = 0;
      this.currentTask.process = 1;
      this.currentTask.WorkerName = "";
      this.currentTask.NeedFinshDate = "";
      this.currentTask.status = "new";
      this.currentTask.TaskNo = this.$util.getID(1);
      this.currentTask.UpTaskNo = "";
    },
    //显示打样单信息
    Show(ProofOrderId) {
      this.GetTasks(ProofOrderId);
      this.paiDanModel = true;
    },
   //取得打样单任务
    async GetTasks(ProofOrderId) {
      this.ProofOrderId = ProofOrderId;
      let re = await this.$util.get(this.$sra.proof_GetTasks + this.ProofOrderId);
      //debugger;
      this.proof = re.data;
      this.taskList = [];
      this.proof.ProofTasks.map(o => {
        this.taskList.push({
          Id: o.Id,
          ProofOrderId: ProofOrderId,
          WorkerName: o.UserName,
          ProcessId: o.Process.Id,
          ProcessName: o.Process.ProcessName,
          BeginDate: o.BeginDate != null ? JSON.stringify(o.BeginDate).substring(1, 11) : "",
          FinshDate: o.FinshDate != null ? JSON.stringify(o.FinshDate).substring(1, 11) : "",
          NeedFinshDate: o.NeedFinshDate != null ? JSON.stringify(o.NeedFinshDate).substring(1, 11) : "",
          status: "normal",
          TaskNo: o.TaskNo,
          UpTaskNo: o.UpTaskNo,
        });
      });
      console.log("tlist", this.taskList);
    },


    // modalOk() {
    //   let _this = this;
    //   let proofPlanObj = {
    //     gy: _this.gy,
    //     jhrq: _this.jhrq,
    //     proofId: _this.CurrentRow.ProofOrderId
    //   };
    //   this.$util.post("/ProofMange/PoofPlan", proofPlanObj).then(re => {
    //     this.GetData();
    //     this.$Notice.success({
    //       title: "成功",
    //       desc: "已排单成功，请通知相关接收打样任务。"
    //     });
    //   });
    // }


  },
  mounted: function () {
    this.$util.get(this.$sra.proof_GetProcessList).then(re => {
      this.processList = re.data;
     // console.log("proc", this.processList);
    });
  }
};
</script>