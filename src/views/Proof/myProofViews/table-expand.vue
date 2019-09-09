<style scoped>
img {
  width: auto;
  height: auto;
  max-width: 100%;
}

.maxHeight {
  max-height: 100px;
}
</style>
<style>
#ContentDiv .ivu-table-expanded-cell {
  background-color: rgb(255, 255, 255);
}
</style>
<template>
  <div>

    <div style="margin:10px 0px 30px 0px;">
      <Steps :current="ProofStatusStep" :status="status">
        <Step :title="step1text"></Step>
        <Step title="审批"></Step>
        <Step title="排单"></Step>
        <Step title="打样"></Step>
        <Step title="交样"></Step>
        <Step title="完成"></Step>
      </Steps>
    </div>
    <hr color=#e8eaec size=1>

    <Row class="expand-row" style="margin:20px 0px 0px 0px;">
      <Col span="8">
      <span class="expand-key">申请员工: </span>
      <span class="expand-value">{{ row.ProofApplyUserName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">申请部门: </span>
      <span class="expand-value">{{ row.ProofApplyDeptName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">打样部门: </span>
      <span class="expand-value">{{ row.ProofDept.DeptName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">交期: </span>
      <span class="expand-value">{{row.rdate}}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">款式ID: </span>
      <span class="expand-value">{{ row.ProofStyle.ProofStyleId }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">款名: </span>
      <span class="expand-value">{{ row.ProofStyle.StyleName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">客户款名: </span>
      <span class="expand-value">{{ row.ProofStyle.ClientNo }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">克重: </span>
      <span class="expand-value">{{ row.ProofStyle.Weight }}g</span>
      </Col>
      <Col span="8">
      <span class="expand-key">支数: </span>
      <span class="expand-value">{{ row.ProofStyle.Counts }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">针型: </span>
      <span class="expand-value">{{ row.ProofStyle.Gauge }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">成份: </span>
      <span class="expand-value">{{ row.ProofStyle.Material }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
      <span class="expand-key">指定工艺员: </span>
      <span class="expand-value">{{ row.DesignatedGY }}</span>
      </Col>

      <Col span="8">
      <span class="expand-key">紧急度: </span>
      <span class="expand-value">{{ row.Urgency }}</span>
      </Col>
      <Col span="24">
      <span class="expand-key">备注: </span>
      <span class="expand-value">{{ row.Remark }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <span class="expand-key">打样资料: </span>
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <span v-if="item.FileType==2">
          <a :href="proofDataUrl+item.Url" download>{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>

      </span>
      </Col>

      <Col span="24">
      <span class="expand-key">工艺文件<span v-if="!row.AlowDownloadFile">(需申请后方可下载)</span>: </span>
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <span v-if="item.FileType==3">
          <a v-if="row.AlowDownloadFile" :href="proofDataUrl+item.Url" download>{{item.DisplayName }}</a>
          <span v-else>{{item.DisplayName }}</span>
          <Divider type="vertical" />
        </span>
      </span>
      </Col>
      <Col span="24">
      <span class="expand-key">制版文件<span v-if="!row.AlowDownloadFile">(需申请后方可下载)</span>: </span>
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <span v-if="item.FileType==4">
          <a v-if="row.AlowDownloadFile" :href="proofDataUrl+item.Url" download>{{item.DisplayName }}</a>
          <span v-else>{{item.DisplayName }}</span>
          <Divider type="vertical" />
        </span>
      </span>
      </Col>
      <Col v-if="!row.AlowDownloadFile&&row.ProofStatusText=='完成'" span="24">
      <Button type="info" size="small" @click="applyDownLoad">点击申请下载文件</Button>
      </Col>
      <Col span="24"> <span class="expand-key">样衣图片: </span> </Col>
      <Col span="24">
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <span v-if="item.FileType==0">
          <a :href="proofDataUrl+item.Url" download><img class="maxHeight" :src="proofDataUrl+item.Url"></img></a>
          <Divider type="vertical" />
        </span>
      </span>
      </Col>
    </Row>
    </br>
    <!-- <hr color=#e8eaec size=1> -->
    <Row>
      <Col span="22">
      <span class="expand-key">生产记录: </span>
      <Table size="small" :columns="columns1" :data="taskList">
        <template slot-scope="{ row, index }" slot="finshDate">
          {{row.FinshDate==null?"":JSON.stringify(row.FinshDate ).substring(1, 11)+" "+JSON.stringify(row.FinshDate ).substring(12, 20)}}
        </template>
        <template slot-scope="{ row, index }" slot="beginDate">
          {{row.BeginDate==null?"":JSON.stringify(row.BeginDate ).substring(1, 11)+" "+JSON.stringify(row.BeginDate ).substring(12, 20)}}
        </template>
      </Table>
      </Col>
    </Row>
  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  props: {
    row: Object
  },
  data: function () {
    return {
      proofDataUrl: this.$util.proofDataUrl,
      step1text: "草拟",
      status: "process",
      ProofStatusStep: 0,
      taskList: [],
      columns1: [
        {
          title: '工序',
          key: 'ProcessName'
        },
        {
          title: '姓名',
          key: 'WorkerName'
        },
        {
          title: '开始日期',
          key: 'BeginDate',
          slot: "beginDate",
        },
        {
          title: '结束日期',
          key: 'FinshDate',
          slot: "finshDate",
        },
        {
          title: '工时（分钟）',
          key: 'WorkTime',
        }

      ],
    };
  },
  methods: {
    async getProofRecord(ProofOrderId) {
      let re = await this.$util.get("/MyProof/GetProofRecord/" + ProofOrderId);
      this.taskList = re.data;
      //console.log("proofRecord", re);
    },
    applyDownLoad() {
       this.$emit("applyDownloadFile",this.row);
    }
  },
  mounted: function () {
    console.log("ProofRow", this.row);
    this.getProofRecord(this.row.ProofOrderId);
  },

  beforeMount: function () {
    var ds = JSON.stringify(this.row.RequiredDate);
    this.row.rdate = ds.substring(1, 11);
    if (this.row.ProofStatus == 10) {
      this.ProofStatusStep = 0;
      this.status = "error";
      this.step1text = "退回草拟";
    } else {
      this.ProofStatusStep = this.row.ProofStatus;
    }

  }
};
</script>