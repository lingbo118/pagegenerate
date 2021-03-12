<template>
  <div class="pg-button" :style="buttonStyle">
    {{ property.buttonName ? property.buttonName : '按钮' }}
  </div>
</template>

<script>
export default {
  name: 'pgButton',
  props: {
    property: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  computed: {
    buttonStyle () {
      debugger
      let obj = {
        width: this.property.width ? (this.property.width + 'px') : '',
        height: this.property.height ? (this.property.height + 'px') : '',
        background: this.property.background ? this.property.background : '',
        'font-size': this.property.fontSize ? (this.property.fontSize + 'px') : '',
        'line-height': this.property.fontSize ? (this.property.fontSize + 'px') : '',
        color: this.property.color ? this.property.color : ''
      }

      let style = ''
      Object.keys(obj).forEach(key => {
        if (obj[key]) {
          style += key + ': ' + obj[key] + ';'
        }
      })

      return style
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
.pg-button {
  padding: 0;
  width: 50px;
  height: 30px;
  background-color: cadetblue;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 12px;
  color: #fff;
  border-radius: 10px;
}
</style>