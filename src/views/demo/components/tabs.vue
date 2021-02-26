<template>
  <div class="tabs_wrapper">
    <div :class="['tab', item.value === value.value ? 'active' : '']" v-for="item in tabs" :key="item.value" @click="changeTab(item)">
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: ''
    }
  },
  methods: {
    changeTab (item) {
      if (item.value === this.value.value) {
        return
      }

      this.$emit('input', item)
    }
  }
}
</script>

<style lang="less">
.tabs_wrapper {
  display: flex;
  background: #3F6EF0;
  border-radius: 15px;
  z-index: 3000;
  .tab {
    padding: 0 15px;
    height: 30px;
    font-size: 14px;
    color: #333;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    cursor: pointer;
  }

  .active {
    background-color: #6693F1;
    color: #FFF;
    font-weight: 600;
  }
}
</style>