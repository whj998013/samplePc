<style scoped>
</style>
<template>
  <div>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
          border
          show-overflow
          ref="xTable"
          class="my_table_insert"
          max-height="400"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :edit-render="{name: 'input',autoselect: true, defaultValue: '默认的名字'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input',autoselect: true}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable :edit-render="{name: 'input',autoselect: true, defaultValue: 18}"></vxe-table-column>
        </vxe-table>

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
      tableData: [],
      sexList: []
    };
  },
  methods: {
    async insertEvent(row) {
      let record = {
        sex: '1'
      }
      let { row: newRow } = await this.$refs.xTable.insertAt(record, row);
      await this.$refs.xTable.setActiveCell(newRow, 'name');
      console.log(this.tableData);

    },
  },
  mounted: function () {

  }
};
</script>