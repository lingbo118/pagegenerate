<template>
  <div class="test_component_wrapper">
    <el-scrollbar>
      <span>测试组件2</span>
      <span v-for="index in 7" :key="index">hello world{{ index }}</span>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'testComponent2'
}
</script>

<style lang="less">
.test_component_wrapper {
  width: 120px;
  height: 150px;
  background-color: chocolate;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-scrollbar {
    height: 100%;
    overflow-x: hidden;
  }
}
</style>