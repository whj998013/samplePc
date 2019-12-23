<style scoped>
.menuid {
  height: 40px;
  border-bottom: 1px solid #dedede;
}
</style>
<style>
#newProofModel .ivu-modal {
  top: 20px;
}
</style>

<template>
  <div>
    <Row type="flex" justify="space-between" class="menuid">
      <Col span='16'>
      </Col>
      <Col>
      <Button @click="reload">&emsp;&emsp;刷新&emsp;&emsp;</Button>
      <Button @click="newProof" v-if="$Auth('Sample_MySample_NewSample')" type="primary">新的打样申请</Button>
      </Col>
    </Row>
    <Tabs value="name0">
      <TabPane label="当前打样" name="name0">
        <ProofList ref="CurrentProof" action="/MyProof/GetMyProofs" v-model="currnetProofs" @onEdit="edit"></ProofList>
      </TabPane>
      <TabPane label="已完成打样" name="name1">
        <ProofList ref="FinshProof" action="/MyProof/GetMyFinshProofs" v-model="finshProofs"></ProofList>
      </TabPane>
    </Tabs>
    <!-- 新的打样申请  -->
    <Modal id="newProofModel" v-model="newProofModel" width=80 :title="modelText" :mask-closable='false'>
      <newProof ref="proofedit" :editMode="editMode"></newProof>
      <div slot="footer">
        <Button size="large" @click="cancelProof">取消</Button>
        <Button type="primary" size="large" @click="saveNewProof">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import ProofList from "./myProofViews/ProofList.vue";
import newProof from "./myProofViews/newProof.vue";
export default {
  inject: ["reload"],
  components: {
    ProofList,
    newProof
  },
  data: function () {
    return {
      editMode: true,
      newProofModel: false,
      currnetProofs: [],
      finshProofs: [],
      proofNo: {
        ProofOrderId: "",
        ProofStyleId: ""
      }
    };
  },
  computed: {
    modelText() {
      if (this.editMode) return "打样单编辑";
      return "新的打样申请";
    }
  },
  methods: {
    edit(proofObj) {
      this.editMode = true;
      this.$refs.proofedit.BeginEdit(proofObj);
      this.newProofModel = true;
    },
    cancelProof() {
      this.newProofModel = false;
      this.$refs.proofedit.resetData();
    },
    saveNewProof() {
      this.$refs.proofedit.saveProof().then(p => {
        this.newProofModel = false;
        this.proofNo.ProofOrderId = "";
        this.proofNo.ProofStyleId = "";
        this.$refs.CurrentProof.GetData();
      });
    },
    newProof() {
      this.editMode = false;
      if (this.proofNo.ProofOrderId == "") {
        this.getProofNo().then(re => {
          this.proofNo.ProofOrderId = re.newProofOrderId;
          this.proofNo.ProofStyleId = re.newProofStyleId;
          this.$refs.proofedit.NewProof(this.proofNo);
        });
      } else this.$refs.proofedit.NewProof(this.proofNo);
      this.newProofModel = true;
    },

    getProofNo() {
      return new Promise((resolve, reject) => {
        this.$util
          .get("/NewProof/GetProofNo")
          .then(result => {
            resolve(result.data);
          })
          .catch(re => {
            reject(re);
          });
      });
    }
  },
  mounted: function () {
    this.$bus.$emit("changeMenuItem", ["打样中心", "我的打样"]);
  }
};
</script>