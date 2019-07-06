<style scoped>
</style>
<template>
  <div>
     <treeselect :default-expand-level="1" @close="deptSelect" @input="deptInput" v-model="dept" :multiple="true" :options="options" placeholder="选择显示范围,不选择仅显示个人" />
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect
  },
  data: function () {
    return {
        dept: [],
      haveChange: false,
      options: [],
    };
  },
  methods: {
  deptInput(value) {
      if (value.length > 0) {
        this.haveChange = true;
      } else {
        this.reload();
      }
    },
    deptSelect(value) {
      if (this.haveChange) {
        this.haveChange = false;
        this.reload();
      }
    },
  },
  mounted: function () {


  }
};
</script>