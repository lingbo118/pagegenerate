<template>
  <div class="popup_wrapper" v-show="visible" :style="popupStyle">
    <div class="popup_wrapper-item" v-for="item in eventItem" :key="item.label" @click="handleEvent(item.event)">
      <i :class="['iconfont', item.icon]"></i>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    popupStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      eventItem: [
        { event: 'handleCopy', label: '复制', icon: 'icon-fuzhi' },
        { event: 'handleDelete', label: '删除', icon: 'icon-yijianqingkong' }
      ],
      visible: false
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleEvent (eventName) {
      this.$emit('onPopupEvent', eventName)
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.visible = false
      }
    })
  }
}
</script>

<style lang="less">
.popup_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  z-index: 101;

  .popup_wrapper-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 0;
    cursor: pointer;
    background-color: #f0f2f5;

    .iconfont {
      margin-left: 5px;
      margin-right: 20px;
    }
  }

  .popup_wrapper-item:hover {
    background-color: #fff;
  }
}
</style>