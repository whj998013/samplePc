<style scoped>
</style>
<template>
  <div>
    <!-- 排单  -->
    <Modal v-model="paiDanModel" :title="modelText" @on-ok="modalOk">
      <Row>
        <Col span="4">
        <p>业务指定工艺:</p>
        </Col>
        <Col span="16">
        <p>{{CurrentRow.DesignatedGY}}</p>
        </Col>
      </Row>
      <br>
      <Row>

        <Col span="4">
        <span>选择工艺员：</span>
        </Col>
        <Col span="16">
        <workerSelect v-model="gy" :HaveNoSelect="false" :action="$sra.proof_get_gy_workers"></workerSelect>
        </Col>
      </Row>
      <br>
      <Row>
        <Col span="4">
        <span>计划日期：</span>
        </Col>
        <Col span="16">
        <DatePicker type="date" v-model="jhrq" placeholder="选择计划日期" style="width: 100%"></DatePicker>
        </Col>
      </Row>
      <br>
    </Modal>
  </div>
</template>
<script>
//import bus from "../bus.js";
import workerSelect from "../workerSelect.vue";
export default {
  data: function() {
    return {
      paiDanModel: false,
      CurrentRow: {
        DesignatedCX: "",
        DesignatedGY: ""
      }
    };
  },
  methods: {},
  mounted: function() {}
};
</script>