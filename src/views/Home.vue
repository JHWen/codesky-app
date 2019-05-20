<template>
  <div id="home">
    <el-container direction="vertical">
      <base-header></base-header>

      <router-view/>

    </el-container>
  </div>
</template>

<script>
  import BaseHeader from '@/views/BaseHeader'

  export default {
    name: "Index",
    computed: {},
    components: {
      BaseHeader
    },
    methods: {}
  }
</script>

<style scoped>
  #home {
    width: 100%;
  }


</style>
