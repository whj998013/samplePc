<template>
  <div>
    <div class="demo-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload ref="upload" :with-credentials=true :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" :action="action" style="display: inline-block;width:100px;" :default-file-list="defaultList">
      <div style="width: 100px;height:100px;line-height: 100px;">
        <Icon type="ios-camera" size="60"></Icon>
      </div>
    </Upload>
    <Modal title="图片查看" v-model="visible">
      <img :src="dataUrl+'/pic/' + imgName " v-if="visible" style="width: 100%;">
    </Modal>
  </div>
</template>
<script>
export default {
  props: ["action", "removeAction", "value"],

  data() {
    return {
      dataUrl:this.$util.dataUrl,
      imgName: "",
      visible: false,
      uploadList: [],
      defaultList: [],
      //  [
      //   // {
      //   //     name: "bc7521e033abdd1e92222d733590f104",
      //   //     url:
      //   //       "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
      //   //   }
      // ]
    };
  },
  computed: {
    picList() {
      return Array.from(this.uploadList, p => {
        return { name: p.name, url: p.url };
      });
    }
  }, 
  
  methods: {
    setPicList(val) {
      console.log('val',val);
      val.map(item => {
        item.status = "finished";
        item.percentage = 100;
        item.uid = Date.now() + this.$refs.upload.tempIndex++;
        this.uploadList.push(item);
      });
    },
    removePicAtServer(filename) {
      this.$util.post(this.removeAction, { filename }).then(re => {
          this.$emit("RemoveFinsh", "");
      });
    },

    ///显示大图
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    //删除图片
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.removePicAtServer(file.name);
      this.$emit("input", this.picList);
    },
    //上传成功
    handleSuccess(res, file) {
      file.url = this.dataUrl+"/pic/minpic/" + res.name;
      file.name = res.name;
        this.$emit("input", this.picList);
    },
    //格式错误
    handleFormatError(file) {
      this.$Notice.warning({
        title: "格式错误",
        desc: " 请使用JPG或PNG格式图片上传."
      });
    },
    //文件超大
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "图片大小超出限制",
        desc: "文件：  " + file.name + " 太大了,请将它压缩至4M重新上传."
      });
    },
    //上传臆确认文件是否超过5个
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "已上传5张图片"
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
