<template>
  <div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reloadAll: this.reload
    };
  },
  data: function() {
    return {
      isLoading: false,
      isRouterAlive: true
    };
    
  },
  mounted() {},
  methods: {
    reloadAll() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>