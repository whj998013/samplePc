<style scoped>
</style>
<template>
  <div>
   
      <FormItem prop="taglist">
        <Tag :color="item.color" v-for="(item, index)  in tagList" :key="index" closable @on-close="removeTag(index)">{{item.name}}</Tag>
      </FormItem>
    
    <FormItem>
      <Button type="primary" @click="modal1 = true">添加标签</Button>
    </FormItem>

    <Modal ref='model' v-model="modal1" title="常用标签" @on-ok="ok">
      <p slot="header" style="color:#f60;text-align:center">
        <span>选择标签</span>
      </p>

      <Row>
        <Col span='4'>
        <h3>标签名：</h3>
        </Col>
        <Col span='20'>
        <Input v-model="tagName" placeholder="标签名" />
        </Col>
      </Row>
      <br>
      <Row>
        <Col span='4'>
        <h3>标签颜色：</h3>
        </Col>
        <Col span='20'>
        <ColorPicker v-model="color" recommend />
        </Col>
      </Row>
      <br><br><hr /><br>

      <Row>
        <Col span='4'>
        <h3>常用标签：</h3>
        </Col>
        <Col span='20'>
        <div v-for="(item, index)  in selectTagList" :key="index" class="ivu-tag ivu-tag-checked" :style="'border: 0px solid rgb(47, 79, 79); color: rgb(255, 255, 255); background:'+item.color+';'" @click="addTagToList(item.name,item.color)">
          <span class="ivu-tag-text ivu-tag-color-white" style="color: rgb(255, 255, 255);">{{item.name}}</span>
        </div>
        </Col>
      </Row>

    </Modal>

  </div>

</template>
<script>
export default {
  props:['value','selectTagList'],
 
  data() {
    return {
      tagName: "",
      color: "#19be6b",
      modal1: false,
      // selectTagList: [
      //   {
      //     name: "男装",
      //     color: "#7B68EE"
      //   },
      //   {
      //     name: "女装",
      //     color: "#2F4F4F"
      //   },
      //   {
      //     name: "秋季",
      //     color: "#C71585"
      //   },
      //   {
      //     name: "冬季",
      //     color: "#FFA2D3"
      //   },
      //   {
      //     name: "韩风",
      //     color: "#00FF00"
      //   }
      // ],
      tagList: [],
    
    };
  },

  computed:{
    tagliststr(){
      return "";
    }
  },
  methods: {
    addTagToList(name, color) {
      if (!this.tagList.find(p => p.name == name)) {
        this.tagList.push({ name: name, color: color });
        this.$emit("input", this.tagList);
      }
    },
    ok() {
      if (this.tagName != "") {
        this.addTagToList(this.tagName, this.color);
      }
      this.tagName = "";
    },
    cancel() {},
    removeTag(index) {
      this.tagList.splice(index, 1);
    }
  },
  mounted() {
    if(this.value!=null){
       this.tagList = this.value;

    } 
  }
};
</script>