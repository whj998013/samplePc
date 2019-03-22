<style scoped>
</style>
<template>
  <div>
    <Table border :columns="columns" :data="value">
      <template slot-scope="{ row }" slot="ProofOrderId">
        <strong>{{ row.ProofOrderId }}</strong>
      </template>
      <template slot-scope="{ row }" slot="ProofStyleNo">
        {{ row.ProofStyle.ProofStyleNo }}
      </template>
      <template slot-scope="{ row }" slot="ClentName">
        {{ row.ProofStyle.ClentName }}
      </template>
      <template slot-scope="{ row }" slot="ProofTypeText">
        {{ row.ProofStyle.ProofTypeText }}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">提交打样</Button>
        <Button type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>
  </div>
</template>
<script>
//import bus from "../bus.js";
import expandRow from './table-expand.vue';
export default {
  props: {
    value: {
      type: Array
    }
  },
  data: function() {
    return {
      columns: [
        {
          type: "expand",
          width: 40,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "状态",
          key: "ProofStatusText",
          width: 70
        },
        {
          title: "单号",
          slot: "ProofOrderId"
        },
        {
          title: "款号",
          slot: "ProofStyleNo"
        },
        {
          title: "打样类型",
          slot: "ProofTypeText"
        },
        {
          title: "数量",
          key: "ProofNum"
        },
        {
          title: "客户",
          slot: "ClentName"
        },
        {
          title: "操作",
          slot: "action",
          width: 160,
          align: "center"
        }
      ]
    };
  },
  methods: {
    show(index) {
      console.log(index);
    },
    remove(index) {
      console.log(index);
    }
  },
  mounted: function() {}
};
</script>