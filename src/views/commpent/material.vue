<style>
#material .ivu-select-dropdown {
  max-height: 150px;
}
</style>
 <template>
  <div>
    <Form ref="material" :model="materialsList" :label-width="70" label-position="right">
      <Row v-for="(item, index) in materialsList.items" :key="index" type="flex">
        <Col span="3">
        <FormItem label='纱线ID'>
          <AutoComplete id="yarnId" type="text" v-model="item.yarnId " placeholder="请输入原料名" :data="yarnIdList">
          </AutoComplete>
        </FormItem>
        </Col>
        <Col span="5">
        <FormItem label='成份' :prop="'items.' + index + '.materials'" :rules="{required: true, message: '请输入成份', trigger: 'change'}">
          <AutoComplete id="material" clearable :filter-method="filterMethod" type="text" v-model="item.materials " placeholder="请输入原料名" :data="cnList" @on-change="dataChange(index)" @on-select="onSelect">
          </AutoComplete>
        </FormItem>
        </Col>
        <Col span="5">
        <FormItem label='英文' :prop="'items.' + index + '.enName'" :rules="{required: true, message: '请输入英文成份名', trigger: 'change'}">
          <Input type="text" v-model="item.enName " placeholder="请输入原料名">
          </Input>
        </FormItem>
        </Col>
        <Col span="5">
        <FormItem label='支数' :prop="'items.' + index + '.counts'" :rules="{required: true, message: '请输入纱线支数', trigger: 'change'}">
          <Input v-model="item.counts" placeholder="输入纱线支数">
          </Input>
        </FormItem>
        </Col>

        <Col span="6">
        <FormItem label='占比'>
          <InputNumber :max="100" :step=5 v-model="item.percent " :formatter="value=> `${value}%`" :parser="value => value.replace('%', '')" @on-change="sentDate"></InputNumber>
          <Button @click="handleRemove(index)" type="warning">
            <Icon type="md-close" /></Button>
        </FormItem>
        </Col>

      </Row>
      <FormItem>
        <Row>
          <Col :xs="12" :sm="8" :md="6" :lg="4">
          <Button type="dashed" long @click="handleAdd" icon="md-add">增加成份</Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>

</template>
<script>
export default {
  props: ["value", "materials"],
  data() {
    return {
      yarnIdList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      tempVal: "",
      index: 1,
      materialsList: {
        items: [
          {
            yarnId: 1,
            materials: "",
            enName: "",
            counts: "",
            percent: 50,
            index: 0
          }
        ]
      }
    };
  },
  computed: {
    cnList: function () {
      return this.materials.map(p => p.CnName);
    },
    enList: function () {
      return this.materials.map(p => p.EnName);
    }
  },
  mounted() {
    if (!this.value) this.materialsList.items = this.value;
  },
  methods: {
    validate(fuc) {
      this.sentDate();
      this.$refs.material.validate(valid => {
        fuc(valid);
      });
    },
    filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    handleAdd() {
      let p = 100;
      this.materialsList.items.forEach(item => {
        p = p - item.percent;
      });
      if (p < 0) p = 0;

      this.materialsList.items.push({
        yarnId: 1,
        enName: "",
        materials: "",

        counts: "",
        percent: p,
        index: this.index++
      });
      this.dataChange();
    },
    handleRemove(index) {
      this.materialsList.items.splice(index, 1);
      this.dataChange();
    },
    dataChange(v) {
    
      if (v!=undefined) {
        let re = this.materials.find(v => v.CnName == this.tempVal);
        
        if (re) {
          this.materialsList.items[v].enName = re.EnName;
        } else if (this.materialsList.items[v].enName) this.materialsList.items[v].enName = "";
        this.sentDate();
      }
    },
    sentDate() {
      this.$emit("input", this.materialsList.items);
    },
    onSelect(v) {
      this.tempVal = v;
    }
  }
};
</script>
