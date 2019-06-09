<style scoped>
</style>
<template>
  <div>
    <Row>
      <Col span="8"> L1 <Input v-model="L1"></Input>
      </Col>
      <Col span="8"> A1 <Input v-model="A1 "></Input>
      </Col>
      <Col span="8"> B1 <Input v-model="B1"></Input>
      </Col>
      <Col span="8"> L2 <Input v-model="L2"></Input>
      </Col>
      <Col span="8"> A2 <Input v-model="A2 "></Input>
      </Col>
      <Col span="8"> B2 <Input v-model="B2"></Input>
      </Col>
      <Col span="8"> Relut 97<Input v-model="Relut97"></Input>
      </Col>
      <Col span="8"> Relut 2000<Input v-model="Relut2K"></Input>
      </Col>
    </Row>
    <Button type="primary" icon="ios-add" @click="js">计算色差</Button>
    <Button type="primary" icon="ios-add" @click="lr">生成RGB</Button>
    <Tag :color="tc">default</Tag>
  </div>
</template>
<script>
//import bus from "../bus.js";
import color from "../../../libs/ColorHelp.js";
//import LabToRGB from "../../../libs/LabToRGB.js";

export default {
  data: function () {
    return {
      L1: 0,
      A1: 0,
      B1: 0,
      L2: 0,
      A2: 0,
      B2: 0,
      Relut97: 0,
      Relut2K: 0,
      tc:'#4E72B8'
    };
  },
  methods: {
    js: function () {
      this.Relut97 = color.Delta_Eab(this.L1, this.A1, this.B1, this.L2, this.A2, this.B2);
      this.Relut2K = color.Delta_E00(this.L1, this.A1, this.B1, this.L2, this.A2, this.B2);
    },
    lr: function () {
     
     

    }

  },
  mounted: function () {
    this.$bus.$emit('changeMenuItem', ['样衣管理', '找样衣']);
  }
};
</script>