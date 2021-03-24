<template>
  <div class="page_wrapper">
    <div class="open_components" @mouseover="showComponents=true" v-if="curTab.value === 'edit'">组件栏</div>
    <div class="board-head">
      <div class="genetate_page" @click="genetatePage">生成页面</div>
      <tabs v-model="curTab" :tabs="tabs"/>
    </div>
    <el-drawer
      custom-class="components_drawer"
      title="组件栏"
      :visible.sync="showComponents"
      size="15%"
      :sort="true"
      :wrapperClosable="true"
      direction="ltr"
      :modal="false"
      :destroy-on-close="true">
      <div class="tool_list" id="tool">
        <draggable v-model="list" @end="dragEndOne" class="labels" @start="dragStartOne">
          <transition-group>
            <div v-for="(element) in list" :key="element.key" :style="{ color: element.color }" class="label">
              <i :class="['iconfont', element.icon]"></i>
              <div>{{ element.label }}</div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </el-drawer>
    <div class="board-body">
      <div v-for="item in list2" v-drag="{item, curTab}" :key="item.key" :style="componentStyle(item)" class="component_wrapper_drag" @click="editComponent(item)">
        <div class="wrapper" :style="{ 'border-color': !item.edit ? 'rgba(255, 255, 255, 0)' : '#70c0ff' }">
          <div v-show="item.edit">
            <div class="radius radius-top"></div>
            <div class="radius radius-right"></div>
            <div class="radius radius-bottom"></div>
            <div class="radius radius-left"></div>
            <div class="radius radius-top-left"></div>
            <div class="radius radius-top-right"></div>
            <div class="radius radius-bottom-left"></div>
            <div class="radius radius-bottom-right"></div>
          </div>
          <component :is="item.componentName" :property="item.property"/>
        </div>
      </div>

      <ToolDrawer v-model="showTool">
        <!-- 组件属性配置 -->
        <component
          slot="attrSetting"
          :is="currentComponent.attrComponentName"
          v-if="currentComponent"
          :property="currentComponent.property"
          @propertiesChnaged="propertiesChnaged"/>

          <!-- 页面属性配置 -->
         <PageAttr v-model="pageAttrProperty" slot="pageAttr"/>
      </ToolDrawer>
    </div>

    <div class="open_tool" @mouseover="showTool=true" :style="{'z-index': showTool ? 2000 : 3000}" v-if="curTab.value === 'edit'">
      <i class="iconfont icon-zhankai"></i>
    </div>

    <Popup @onPopupEvent="handlePopupEvent" v-model="showPopup" :style="popupStyle"/>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import tabs from './components/tabs'
import config from './config'
import ToolDrawer from './components/toolDrawer'
import Popup from './components/popup'
import PageAttr from './components/pageAttr'
import { mapState } from "vuex"

export default {
  components: {
    draggable,
    tabs,
    ToolDrawer,
    Popup,
    PageAttr
  },
  directives: {
    drag: {
      bind: function(el, binding, vnode) {
        let oDiv = el
        let index = -1
        let begin = {}
        let vm = vnode.context
        let isMove = false
        oDiv.onmousedown = (e) => {
          if (vm.curTab.value === 'preview') {
            return
          }

          // 算出鼠标相对元素的位置
          let disX = e.clientX - oDiv.offsetLeft
          let disY = e.clientY - oDiv.offsetTop

          // 当鼠标点击伸缩点时，但会点的索引
          index = vm.calculationPointIndex(oDiv, e)

          let begin = {
            x: e.clientX,
            y: e.clientY,
            top: Number(oDiv.style.top.replace('px', '')),
            left: Number(oDiv.style.left.replace('px', '')),
            height:  binding.value.item.property.height,
            width:  binding.value.item.property.width
          }

          document.onmousemove = (e) => {
            if (index > -1 && binding.value.item.edit) {
              // 拖动元素的边框来改变大小
              vm.changeItemBorder(index, binding.value.item, oDiv, e, begin)
            } else {
              // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              let left = e.clientX - disX
              let top = e.clientY - disY

              oDiv.style.left = (left <= 0 ? 0 : left) + 'px'
              oDiv.style.top = (top <= 0 ? 0 : top) + 'px'
            }
            isMove = true
          }

          document.onmouseup = (e) => {
            document.onmousemove = null
            document.onmouseup = null
            index = -1

            if (e.button == 2 && !isMove) {
              vm.showPopup = true
              vm.pointPosition = {
                left: e.clientX,
                top: e.clientY
              }
              vm.operatedItemKey = binding.value.item.key
            } else {
              isMove = false
            }
          }
        }
      },
      update: (el, binding, vnode) => {
        let left = el.style.left.replace('px', '')
        let top = el.style.top.replace('px', '')
        binding.value.item.left = left
        binding.value.item.top = top
      }
    }
  },
  data () {
    return {
      list: config.list,
      list2: [],
      text: '',
      preview: false,
      curTab: { label: '编辑', value: 'edit' },
      tabs: [
        { label: '编辑', value: 'edit' },
        { label: '预览', value: 'preview' }
      ],
      startPosition: {
        left: 0,
        top: 0
      },
      showComponents: true,
      showTool: false,
      currentComponent: null,
      disabled: false,
      showPopup: false,
      pointPosition: {
        left: 0,
        top: 0
      },
      operatedItemKey: '',
      pageAttrProperty: {}
    }
  },
  mounted () {
    document.oncontextmenu = () => {
      return false
    }
  },
  computed: {
    ...mapState({
      isCopy: state => state.isCopy
    }),
    componentStyle () {
      return (item) => {
        let style = `left: ${item.left}px; top: ${item.top}px;`

        if (this.curTab.value === 'edit') {
          style += `cursor: move;`
        } else {
          style += `cursor: pointer;`  
        }

        return style
      }
    },
    popupStyle () {
      let style = ''
      if (this.showPopup) {
        style = `top: ${this.pointPosition.top}px; left: ${this.pointPosition.left}px`
      }
      return style
    }
  },
  watch: {
    curTab (val) {
      if (val.value === 'preview') {
        this.list2.forEach(item => {
          this.$set(item, 'edit', false)
        })
      }
    },
    showComponents (val) {
      if (val) {
        this.showTool = false
      }
    },
    showTool (val) {
      if (val) {
        this.showComponents = false
      }
    },
    isCopy (val) {
      if (val) {
        this.$store.dispatch('setIsCopy', false)
        let target = this.list2.filter(item => item.edit)
        this.$set(target[0], 'edit', false)
        if (target.length > 0) {
          let item = JSON.parse(JSON.stringify(target[0]))
          this.$set(item, 'left', Number(item.left) + 50)
          this.$set(item, 'top', Number(item.top) + 50)
          this.$set(item, 'edit', true)
          this.$set(item, 'key', Math.random())
          this.list2.push(item)
        }
      }
    },
    list2: {
      deep: true,
      handler (val) {
        let list = val.filter(item => item.edit)

        if (list.length) {
          this.currentComponent = list[0]
        } else {
          this.currentComponent = null
        }
      }
    }
  },
  methods: {
    genetatePage () {
      if (this.list2.length == 0) {
        this.$message({ message: '页面元素不能为空', type: 'warning' })
        return
      }
      window.localStorage.setItem('pageInfo', JSON.stringify(this.list2));
      window.open('/page_generate')
    },
    showComponentsDraw () {
      this.showComponents = true
    },
    dragStartOne () {
      this.showComponents = false
    },
    dragEndOne (event) {
      // 判断是否拖到了操作页面范围
      let result = this.judgeEndInRange(event.originalEvent)
      if (!result) {
        return
      }

      let item = JSON.parse(JSON.stringify(this.list[event.newIndex]))
      this.$set(item, 'left', event.originalEvent.clientX)
      this.$set(item, 'top', event.originalEvent.clientY - 80)
      this.$set(item, 'key', Math.random())
      this.$set(item, 'edit', false)
      this.list2.push(item)
    },
    dragStartTwo (event) {
      this.startPosition.left = event.originalEvent.clientX
      this.startPosition.top = event.originalEvent.clientY
    },
    dragEndTwo (event) {
      let item = this.list2[event.newIndex]

      let xMove = event.originalEvent.clientX - this.startPosition.left
      let yMove = event.originalEvent.clientY - this.startPosition.top

      // 判断是否拖到了操作页面范围
      let result = this.judgeOutRange(xMove, yMove, item)
      if (result) {
        return
      }

      this.$set(item, 'left', item.left + xMove)
      this.$set(item, 'top', item.top + yMove)
    },
    judgeEndInRange (event) {
      let result = true
      let left = event.clientX
      let top = event.clientY

      if (left < 0 || top < 50) {
        result = false
      }

      return result
    },
    judgeOutRange (xMove, yMove, item) {
      let result = false
      
      if ((item.left + xMove <= 0) || (item.top + yMove < 0)) {
        result = true
      }

      return result
    },
    editComponent (item) {
      let edit = item.edit
      if (this.curTab.value === 'preview') {
        return
      }
      
      this.list2.forEach(elem => {
        elem.edit = false
      })

      item.edit = !edit
    },
    propertiesChnaged (property) {
      this.$set(this.currentComponent, 'property', JSON.parse(JSON.stringify(property)))
    },
    calculationPointIndex (oDiv, e) {
      let index = -1

      let points = [{
        left: oDiv.offsetLeft,
        top: oDiv.offsetTop + 50
      }, {
        left: oDiv.offsetLeft + oDiv.offsetWidth / 2,
        top: oDiv.offsetTop + 50
      }, {
        left: oDiv.offsetLeft + oDiv.offsetWidth,
        top: oDiv.offsetTop + 50
      }, {
        left: oDiv.offsetLeft + oDiv.offsetWidth,
        top: oDiv.offsetTop + 50 + oDiv.offsetHeight / 2
      }, {
        left: oDiv.offsetLeft + oDiv.offsetWidth,
        top: oDiv.offsetTop + 50 + oDiv.offsetHeight
      }, {
        left: oDiv.offsetLeft + oDiv.offsetWidth / 2,
        top: oDiv.offsetTop + 50 + oDiv.offsetHeight
      }, {
        left: oDiv.offsetLeft,
        top: oDiv.offsetTop + 50 + oDiv.offsetHeight
      }, {
        left: oDiv.offsetLeft,
        top: oDiv.offsetTop + 50 + oDiv.offsetHeight / 2
      }]

      points.forEach((point, i) => {
        let lengthX = Math.abs(e.clientX - point.left)
        let lengthY = Math.abs(e.clientY - point.top)
        let dis = Math.sqrt(lengthX * lengthX + lengthY * lengthY)

        if (dis <= 5) {
          index = i
        }
      })

      return index
    },
    changeItemBorder (index, item, oDiv, e, begin) {
      let changeX = e.clientX - begin.x
      let changeY = e.clientY - begin.y
      if (index === 0) {
        oDiv.style.top = this.handlerLessZero(begin.top + changeY)  + 'px'
        item.property.height = begin.height - changeY
        oDiv.style.left = this.handlerLessZero(begin.left + changeX) + 'px'
        item.property.width = begin.width - changeX
      } else if (index === 1) {
        oDiv.style.top = this.handlerLessZero(begin.top + changeY) + 'px'
        item.property.height = begin.height - changeY
      } else if (index === 2) {
        oDiv.style.top = this.handlerLessZero(begin.top + changeY) + 'px'
        item.property.height = begin.height - changeY
        item.property.width = begin.width + changeX
      } else if (index === 3) {
        item.property.width = begin.width + changeX
      } else if (index === 4) {
        item.property.height = begin.height + changeY
        item.property.width = begin.width + changeX
      } else if (index === 5) {
        item.property.height = begin.height + changeY
      } else if (index === 6) {
        oDiv.style.left = this.handlerLessZero(begin.left + changeX) + 'px'
        item.property.width = begin.width - changeX
        item.property.height = begin.height + changeY
      } else if (index === 7) {
        oDiv.style.left = this.handlerLessZero(begin.left + changeX) + 'px'
        item.property.width = begin.width - changeX
      }
    },
    handlerLessZero (value) {
      return value <= 0 ? 0 : value
    },
    handlePopupEvent (eventName) {
      this[eventName]()
    },
    handleCopy () {
      let target = this.list2.filter(item => item.key === this.operatedItemKey)
      if (target.length > 0) {
        this.$set(target[0], 'edit', false)
        let item = JSON.parse(JSON.stringify(target[0]))
        this.$set(item, 'left', Number(item.left) + 50)
        this.$set(item, 'top', Number(item.top) + 50)
        this.$set(item, 'edit', true)
        this.$set(item, 'key', Math.random())
        this.list2.push(item)
      }
      this.showPopup = false
      this.operatedItemKey = ''
    },
    handleDelete () {
      let index = this.list2.findIndex(item => item.key === this.operatedItemKey)
      if (index > -1) {
        this.list2.splice(index, 1)
      }
      this.showPopup = false
      this.operatedItemKey = ''
    }
  }
}
</script>

<style lang="less">
.page_wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .open_components {
    height: 30px;
    padding: 0 10px;
    position: fixed;
    top: 10px;
    left: 0;
    z-index: 3000;
    cursor: pointer;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: darkcyan;
    color: #fff;
    line-height: 30px;
  }

  .open_tool {
    position: absolute;
    top: 45%;
    right: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    height: 8%;
    z-index: 3000;
  }

  .components_drawer {
    top: 50px;
    width: 220px !important;

    .el-drawer__header {
      font-weight: 600;
      font-size: 18px;
    }

    .tool_list {
      width: 100%;
      display: flex;
      position: relative;
      align-items: center;
      flex-direction: column;
      background-color: #fff;

      .tool_title {
        width: 100%;
        font-weight: 600;
        font-size: 18px;
        padding-bottom: 20px;
        padding-top: 20px;
        border-bottom: 1px solid #f7f7f7;
      }

      .labels {
        display: flex;
        width: 100%;
        margin-top: 20px;

        span {
          width: calc(100% - 40px);
          display: flex;
          flex-wrap: wrap;
          padding: 0 20px;
          justify-content: space-between;
        }

        .label {
          width: 80px;
          padding: 10px 0;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          cursor: move;
          background-color: #f5f8fb;

          > div {
            margin-top: 10px;
            width: 100% !important;
          }
        }
        
        .label:nth-child(odd) {
          margin-right: 10px;
        }
      }
    }
  }

  .board-head {
    position: relative;
    height: 50px;
    width: 100%;
    background-color: rgb(0, 21, 41);
    display: flex;
    justify-content: center;
    align-items: center;

    .genetate_page {
      position: absolute;
      right: 20px;
      top: 10px;
      padding: 5px 10px;
      background-color: coral;
      color: #fff;
      font-size: 14px;
      border-radius: 6px;
      cursor: pointer;
      z-index: 3000;
    }
  }

  .board-body {
    position: relative;
    height: calc(100% - 50px);
    width: 100%;
    background-color: rgb(240, 242, 245);

    .dragArea {
      width: 100%;
      height: 100%;
      position: relative;

      >span:nth-child(1) {
        width: 100%;
        height: 100%;
        display: flex;
      }
    }

    .component_wrapper_drag {
      position: absolute;
      z-index: 100;

      .wrapper {
        position: relative;
        border-style: dashed;
        border-width: 1px;
        background: rgba(255, 255, 255, 0);
        
        .radius {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 3px;
          border: 1px solid #70c0ff;
          z-index: 101;
          background: #fff;
        }
        
        .radius-top {
          left: calc(50% - 3px);
          top: -3px;
          cursor: n-resize;
        }

        .radius-right {
          top: calc(50% - 3px);
          right: -3px;
          cursor: e-resize;
        }

        .radius-bottom {
          left: calc(50% - 3px);
          bottom: -3px;
          cursor: s-resize;
        }

        .radius-left {
          top: calc(50% - 3px);
          left: -3px;
          cursor: w-resize;
        }

        .radius-top-left {
          top: -3px;
          left: -3px;
          cursor: nw-resize;
        }

        .radius-top-right {
          top: -3px;
          right: -3px;
          cursor: ne-resize;
        }

        .radius-bottom-left {
          bottom: -3px;
          left: -3px;
          cursor: sw-resize;
        }

        .radius-bottom-right {
          bottom: -3px;
          right: -3px;
          cursor: se-resize;
        }

        i {
          position: absolute;
          top: -15px;
          right: -15px;
          color: rgb(240, 128, 130);
          z-index: 101;
          cursor: pointer;
        }
      }
    }

    .previewArea {
      width: 100%;
      height: 100%;
      position: relative;

      .component_wrapper {
        position: absolute;
        z-index: 100;
      }
    }
  }
}
</style>