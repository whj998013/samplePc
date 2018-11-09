<style scoped>
</style>
<template>

  <Dropdown style="padding:5px 10px 0 10px" @on-click="select">
    <a href="javascript:void(0)">
      {{name}}:{{selectItem}}
      <Icon type="ios-arrow-down"></Icon>
    </a>
    <DropdownMenu slot="list">
      <DropdownItem name='全部'>全部</DropdownItem>
      <DropdownItem v-for="item in items" :key="item.key" :name='item.key'>{{item.name}}</DropdownItem>
    </DropdownMenu>
  </Dropdown>

</template>
<script>
//import bus from "../bus.js";
export default {
  props: ["items", "name"],
  data: function() {
    return {
      selectItem: "全部"
    };
  },
  methods: {
    select(item) {
      this.selectItem = item;
      if (item == "全部") {
        this.$emit("select", "");
        this.$emit("input", "");
      } else {
        this.$emit("select", item);
        this.$emit("input", item);
      }
    }
  }
};
</script>