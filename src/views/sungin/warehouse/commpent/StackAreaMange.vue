<style scoped>
</style>
<template>
  <div>
    <vxe-grid border resizable height="530" :proxy-config="tableProxy" :columns="tableColumn"></vxe-grid>

  </div>
</template>
<script>
//import bus from "../bus.js";
//import newProof from "./myProofViews/newProof.vue";
export default {
  inject: ["reload"],
  components: {


  },
  data() {
    return {
      tableProxy: {
        props: {
          result: 'result',
        },
        ajax: {
           query: async () => {
            let re = await this.$util.get('/api/Location/');
            return re.data;
          }
        }
      },
      tableColumn: [
        { field: 'LocationId', title: '库位号' },
        { field: 'Name', title: '库位名' },
        { field: 'WarehouseName', title: '所属仓库' },
        { field: 'AreaName', title: '所在区域' },

      ]
    }
  },
  created() {

  },
  methods: {

  }
};
</script>