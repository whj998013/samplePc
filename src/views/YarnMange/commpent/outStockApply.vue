<style>
#frow .ivu-poptip-rel {
  width: 100%;
}
</style>
<template>
  <div>

    <Modal id="newOutStockApply" v-model="newOutStockApplyModel" width="900px" title="用纱申请/毛纱出库" :mask-closable='false'>

      <Row>
        <Form label-position="right" :label-width="80">
          <Col span="8">
          <FormItem label="纱名">
            <Input v-model="row.ProductName" readonly></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="缸号">
            <Input v-model="row.BatchNum" readonly></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="成份">
            <Input v-model="row.Size" readonly></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="颜色">
            <Input v-model="row.Color" readonly></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="支数">
            <Input v-model="row.Count" readonly></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="查询码">
            <Input v-model="row.BarCode" readonly></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="入库人">
            <Input v-model="row.UName" readonly></Input>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="入库部门">
            <Input v-model="row.DName" readonly></Input>
          </FormItem>
          </Col>

          <Col span="8">
          <FormItem label="现有库存">
            <Input v-model="row.Num+'kg'" readonly></Input>
          </FormItem>
          </Col>
          <Divider />

          <Col span="24">
          <FormItem label="申请数量">
            <InputNumber :min="0" :max="row.Num" :step="0.1" v-model="outStockOrder.Num"></InputNumber>
            <span style="color:#2db7f5">输入您所需的出库数量，仓库管理员会根据纱筒适当调整重量，可能会大于您申请的数量。</span>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="收货单位">
            <Select v-model="outStockOrder.CusName" style="width:100">
              <Option v-for="item in CusList" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="代寄快递">
            <Switch size="large" v-model="outStockOrder.Sending">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </Switch>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="收货信息" v-if="outStockOrder.Sending">
            <Input v-model="outStockOrder.ReceivingInfo" placeholder="请输入收货方地址、电话及联系人信息" :rows="3" type="textarea"></Input>
          </FormItem>
          </Col>
        </Form>
      </Row>

      <div slot="footer">
        <Button size="large" @click="cancelApply">取消</Button>
        <Button type="primary" size="large" @click="saveApply">{{SubmitText}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
//import bus from "../bus.js";
//import newProof from "./myProofViews/newProof.vue";
export default {
  inject: ["reload"],
  components: {

  },
  data: function () {
    return {
      newOutStockApplyModel: false,
      row: {},
      outStockOrder: {
        Num: 0,
        CusName: '',
        ReceivingInfo: '',
        Sending: false,
      },
      CusList: ['打样中心', '商纺打样'],
    };
  },
  methods: {
    CusSelect(cus) {
      console.log(cus)
    },

    outStock(nso) {
      console.log("outstock", nso);
      if (nso != this.row) {
        this.outStockOrder.Num = 0;
        this.outStockOrder.CusName = '';
        this.outStockOrder.CusAddress = '';
        this.outStockOrder.ReceivingInfo='';
        this.row = nso;
      }
      this.newOutStockApplyModel = true;
    },
    cancelApply() {
      this.newOutStockApplyModel = false;
    },

   async  saveApply() {
      if (this.outStockOrder.Num > 0 && this.outStockOrder.CusName != '') {
        this.outStockOrder.BatchNum = this.row.BatchNum;
        console.log(this.outStockOrder);
        await this.$util.post('/YarnOutStock/NewYarnOutApply',this.outStockOrder);
        this.$Notice.success({
          title: '成功',
          desc: '已发出出库申请，正在等待审批，请在钉钉查看审批进程及结果。'
        });
        this.newOutStockApplyModel=false;
      } else {
        this.$Notice.warning({
          title: '输入错误',
          desc: '请输入申请出库数量、收货单位'
        });
      }
    },


    async getCusList() {
      let re = await this.$util.get("/Cus/GetCusList");
      this.CusList = re.data;
    },
  },
  mounted: function () {
    console.log("user", this.$bus.currentUser);
    this.getCusList();
    this.$bus.$off('OutStock');
    this.$bus.$on('OutStock', this.outStock);
  },
  computed: {
    SubmitText: function () {
      if (this.$bus.currentUser.UserName === this.row.UName) {
        return "出库"
      } else {
        return "提交钉钉审批"
      }
    }
  }
};
</script>