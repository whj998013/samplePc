<style scoped>
</style>
<style>
#ContentDiv .ivu-table-expanded-cell {
  background-color: rgb(255, 255, 255);
}
</style>
<template>
  <div>
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
      <Col span="23">
      <span class="expand-key">打样资料: </span>
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <span v-if="item.FileType==2">
          <a :href="proofDataUrl+item.Url">{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>
      </span>
      </Col>
      <Col span="24">
      <span class="expand-key">工艺文件: </span>
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <span v-if="item.FileType==3">
          <a :href="proofDataUrl+item.Url">{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>
      </span>
      </Col>
      <Col span="24">
      <span class="expand-key">制版文件: </span>
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <span v-if="item.FileType==4">
          <a :href="proofDataUrl+item.Url">{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>
      </span>
      </Col>
    </Row>
    <br/>
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
    <br>
    <hr color=#e8eaec size=1>
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
      console.log("proofRecord", re);
    }
  },
  mounted: function () {
    
     console.log("ProofRow", this.row);
    this.getProofRecord(this.row.ProofOrderId);

  },
  beforeMount: function () {
    var ds = JSON.stringify(this.row.RequiredDate);
    this.row.rdate = ds.substring(1, 11);
  }
};
</script>