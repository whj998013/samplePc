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
      <span class="expand-key">客户: </span>
      <span class="expand-value">{{ row.ProofStyle.ClentName }}</span>
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
      <span class="expand-key">针型: </span>
      <span class="expand-value">{{ row.ProofStyle.Gauge }}</span>
      </Col>
    </Row>
    <Row>
      <Divider />
      <Col span="23" v-show="!row.YarnSelfProvide">
      <span class="expand-key">原料信息: </span>
      <Table border :columns="yarn.columns" :data="row.YarnApplys"></Table>

      </Col>
      <div v-show="row.YarnSelfProvide">
        <Col span="8">
        <span class="expand-key">支数: </span>
        <span class="expand-value">{{ row.ProofStyle.Counts }}</span>
        </Col>
        <Col span="8">
        <span class="expand-key">成份: </span>
        <span class="expand-value">{{ row.ProofStyle.Material }}</span>
        </Col>

      </div>

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
          <a :href="proofDataUrl+item.Url" download>{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>
      </span>
      </Col>
      <Col span="24">
      <span class="expand-key">工艺文件: </span>
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <span v-if="item.FileType==3">
          <a :href="proofDataUrl+item.Url" download>{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>
      </span>
      </Col>
      <Col span="24">
      <span class="expand-key">制版文件: </span>
      <span class="expand-value" v-for="item in row.ProofStyle.ProofFiles">
        <span v-if="item.FileType==4">
          <a :href="proofDataUrl+item.Url" download>{{item.DisplayName }}</a>
          <Divider type="vertical" />
        </span>
      </span>

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

    <br />
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
       yarn: {
        columns: [
          {
            title: "单号",
            key: "NO",
            minWidth: 110
          },
          {
            title: "出库单号",
            key: "OrderNum",
            minWidth: 130
          },
          {
            title: "纱名",
            key: "ProductName",
            minWidth: 130
          },
          {
            title: "颜色",
            key: "Color",
            minWidth: 100
          },
          {
            title: "出库数(KG)",
            key: "Num",
            minWidth: 120
          },
          {
            title: "支数",
            key: "Count",
            minWidth: 80
          }, {
            title: "成份",
            key: "Size",
            minWidth: 200
          },
        ],
      }
    };
  },
  methods: {
    async getProofRecord(ProofOrderId) {
      let re = await this.$util.get(this.$sra.proof_GetProofRecord + ProofOrderId);
      this.taskList = re.data;
    }
  },
  mounted: function () {

    //  console.log("ProofRow", this.row);
    this.getProofRecord(this.row.ProofOrderId);

  },
  beforeMount: function () {
    var ds = JSON.stringify(this.row.RequiredDate);
    this.row.rdate = ds.substring(1, 11);
  }
};
</script>