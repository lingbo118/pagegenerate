<template>
  <div class="page_generate">
    <div v-for="item in list" :key="item.key" class="component_wrapper" :style="componentStyle(item)">
      <div class="wrapper">
        <component :is="item.componentName" :id="item.index"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  computed: {
    componentStyle () {
      return (item) => {
        return `left: ${item.left}px; top: ${item.top}px;`
      }
    }
  },
  mounted () {
    this.list= JSON.parse(window.localStorage.getItem('pageInfo'))
    console.log(this.list)
  }
}
</script>

<style lang="less">
.page_generate {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgb(240, 242, 245);

  .component_wrapper {
    position: absolute;
  }
}
</style>