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
      :wrapperClosable="true"
      direction="ltr"
      :modal="false"
      :destroy-on-close="true">
      <div class="tool_list" id="tool">
        <draggable v-model="list" @end="dragEndOne" class="labels" @start="dragStartOne">
          <transition-group>
            <div v-for="(element) in list" :key="element.key" :style="{ color: element.color }" class="label">
              <i :class="['iconfont', element.icon]"></i>
              <span>{{element.label}}</span>
            </div>
          </transition-group>
        </draggable>
      </div>
    </el-drawer>
    <div class="board-body">
      <draggable
        class="dragArea"
        v-model="list2"
        @end="dragEndTwo"
        @start="dragStartTwo"
        v-if="curTab.value === 'edit'">
        <transition-group>
          <div v-for="item in list2" :key="item.key" :style="componentStyle(item)" class="component_wrapper" @click="editComponent(item)">
            <div class="wrapper" :style="{ 'border-color': !item.edit ? 'rgba(255, 255, 255, 0)' : '#70c0ff' }">
              <i class="iconfont icon-quxiao icon" v-if="item.edit" @click="removeComponent(item.key)"></i>
              <component :is="item.componentName" :attr="item.property"/>
            </div>
          </div>
        </transition-group>
      </draggable>

      <div class="previewArea" v-else>
        <div v-for="item in list2" :key="item.key" :style="componentStyle(item)" class="component_wrapper">
          <component :is="item.componentName" :id="item.index" :attr="item.property"/>
        </div>
      </div>

      <ToolDrawer v-model="showTool">
        <component :is="currentComponent.attrComponentName"  v-if="currentComponent" :propertiesConfig="currentComponent.property" @propertiesChnaged="propertiesChnaged" slot="attrSetting"/>
      </ToolDrawer>
    </div>

    <div class="open_tool" @mouseover="showTool=true" :style="{'z-index': showTool ? 2000 : 3000}" v-if="curTab.value === 'edit'">
      <i class="iconfont icon-zhankai"></i>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import tabs from './components/tabs'
import config from './config'
import ToolDrawer from './components/toolDrawer'

export default {
  components: {
    draggable,
    tabs,
    ToolDrawer
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
      currentComponent: null
    }
  },
  computed: {
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
    }
  },
  methods: {
    genetatePage () {
      if (this.list2.length == 0) {
        this.$message({ message: '页面元素不能为空', type: 'warning' })
        return
      }
      window.localStorage.setItem('pageInfo', JSON.stringify(this.list2));
      this.$router.push('/page_generate')
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
    removeComponent (key) {
      let index = this.list2.findIndex(item => item.key === key)

      if (index > -1) {
        this.list2.splice(index, 1)
      }
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
      if (this.curTab.value === 'preview') {
        return
      }
      
      this.list2.forEach(elem => {
        elem.edit = false
      })

      item.edit = true
      this.currentComponent = item
    },
    propertiesChnaged () {
      
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

          span {
            margin-top: 10px;
            width: auto !important;
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
    height: calc(100% - 50px);
    width: 100%;
    background-color: rgb(240, 242, 245);

    .dragArea {
      width: 100%;
      height: 100%;
      position: relative;

      .component_wrapper {
        position: absolute;
        z-index: 100;

        .wrapper {
          position: relative;
          border-style: dashed;
          border-width: 1px;
          background: rgba(255, 255, 255, 0);

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