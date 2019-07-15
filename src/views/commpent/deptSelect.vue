<style scoped>
</style>
<template>
  <div>
    <treeselect :default-expand-level="1" @close="deptClose" @open="dOpen" @input="deptInput" v-model="dept" :multiple="true" :options="options" :placeholder="defaultText" />
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect
  },
  props: {
    value: Array,
    defaultText: {
      type: String,
      default: '请筛选部门范围'
    },
  },
  data: function () {
    return {
      dept: [],
      haveChange: false,
      options: [],
      isOpen: false,
    };
  },
  methods: {
    dOpen() {
      this.isOpen = true;
    },
    deptInput(v) {
      this.haveChange = true;
      console.log("input", v);
      if (!this.isOpen) {
        this.doSelect();
      }
    },
    deptClose(v) {
      if (this.haveChange) {
        this.haveChange = false;
        this.isOpen = false;
        this.doSelect();
      }
    },
    doSelect() {
      this.$emit("input", this.dept);
      this.$emit("SelectChange", this.dept);
    },
    async getDeptData() {
      let re = await this.$util.get("/Public/GetDeptPvList");
      if (re.data.length > 0) {
        this.SetDeptOptions(this.options, re.data);
      }
    },

    SetDeptOptions(options, depts) {
      depts.forEach(element => {
        let newOptions = {
          id: element.DeptID,
          label: element.DeptName,
        };
        if (element.Items.length > 0) {
          newOptions.children = [];
          this.SetDeptOptions(newOptions.children, element.Items);
        };
        options.push(newOptions);
      });
    }

},
  mounted: function () {
    this.getDeptData();
  }
};
</script>