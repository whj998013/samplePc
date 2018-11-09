 <style scoped>
</style>
<template>
  <div>
    <Table stripe :columns="colView" :data="dataView"></Table>
    <br>
    <Button v-if="IsEdit" @click="setColorSize">设置颜色尺码</Button>

    <Modal v-model="selctModel" title="设置颜色尺码" @on-ok="ok">
      <Row>
        <Col>请选择尺码：
        <Select v-model="size" multiple>
          <Option v-for="item in sizelist" :value="item" :key="item">{{ item }}</Option>
        </Select>
        </Col>
      </Row>
      <br> <br>
      <Row>
        <Col>请输入颜色(以空格分隔)：
        <Input v-model="color" placeholder="请输入颜色(以空格分隔)" clearable />
        </Col>
      </Row>
      <br> <br>
      <Row>
        <Col>
        <h2>注意:在已有现货信息时重新设置可能导致信息丢失</h2>
        </Col>
      </Row>

    </Modal>
  </div>
</template>
<script>
//import bus from "../bus.js";
export default {
  props: {
    value: {
      type: Array,
      default: function() {return []}
    },
    IsEdit: {
      type: Boolean,
      default: false
    },
    sizelist: {
      type: Array,
      default: function() {return []}
    }
  },
  data: function() {
    return {
      selctModel: false,
      size: [],
      color: "",
      haveUpdata: false,
      colView: [],
      dataView: [],
      returnData: []
    };
  },
  methods: {
    ok() {
      let items = this.color.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*$)/g, "").split(" ");
      this.setTableCol(items);
      let dt = this.size.map(item => {
        let re = this.returnData.find(n => n.size == item);
        if (re == undefined) {
          re = { size: item };
        }
        return re;
      });
      this.returnData = dt;
      this.dataView = JSON.parse(JSON.stringify(dt));
      this.$emit("input", this.getData());
    },
    setColorSize() {
      this.size = this.returnData.map(p => {
        return p.size;
      });
      this.color = "";
      this.colView.map(p => {
        if (p.key != "size") this.color += p.key + " ";
      });
      this.selctModel = true;
    },
    //返回数据表给外部
    getData() {
      let re = [];
      this.returnData.map(p => {
        this.colView.forEach(c => {
          if (c.key != "size" && p[c.key] != undefined) {
            re.push({
              color: c.key,
              size: p.size,
              num: p[c.key]
            });
          }
        });
      });
      return re;
    },
    setTableCol(items) {
      this.colView = [];
      items = [...new Set(items)];

      this.colView.push({ title: "尺码", key: "size" });
      items.map(p => {
        if (this.IsEdit) {
          this.colView.push({
            title: p,
            key: p,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row[p] ? params.row[p] : 0,
                  min: 0,
                  step: 10
                },                
                on: {
                  input: event => {
                    this.returnData[params.index][p] = event;
                    this.$emit("input", this.getData());
                  }
                }
              });
            }
          });
        } else {
          this.colView.push({
            title: p,
            key: p
          });
        }
      });
    },
    setTableData() {
      //转换数据
      this.value.map(p => {
        let ishave = false;
        this.dataView.map(d => {
          if (d.size == p.size) {
            ishave = true;
            d[p.color] = p.num;
          }
        });
        if (!ishave) {
          let obj = {};
          obj.size = p.size;
          obj[p.color] = p.num;
          this.dataView.push(obj);
        }
      });
      this.returnData = JSON.parse(JSON.stringify(this.dataView));
    }
  },
  mounted: function() {

    let colList = this.value.map(p => {
      return p.color;
    });
       
    this.setTableCol(colList);
    this.setTableData();
  }
};
</script>