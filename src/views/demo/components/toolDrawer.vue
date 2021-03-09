<template>
  <div>
    <el-drawer
      title="工具栏"
      custom-class="tool_drawer"
      :visible.sync="value"
      :modal="false"
      :destroy-on-close="true"
      :wrapperClosable="true">
      <div class="tool_drawer_body">
        <div class="tool-list">
          <el-tooltip effect="dark" content="复制元素">
            <i class="el-icon-document-copy" @click="handleCopy"></i>
          </el-tooltip>
        </div>
        <el-tabs v-model="curTab" @tab-click="handleClick">
          <el-tab-pane label="属性" name="attr">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="通用样式" name="1">
                通用样式
              </el-collapse-item>
              <el-collapse-item title="属性设置" name="2">
                <slot name="attrSetting"></slot>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="页面" name="page">页面</el-tab-pane>
        </el-tabs>
        <div class="attr-setup"></div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      curTab: 'attr',
      showTool: false,
      activeNames: ''
    }
  },
  watch: {
    value (val) {
      this.showTool = this.value
    },
    showTool (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleClick () {
      
    },
    handleCopy () {

    }
  }
}
</script>

<style lang="less">
.tool_drawer {
  top: 50px !important;
  right: 0px;
  height: calc(100% - 50px) !important;
  width: 30% !important;

  .el-drawer__header {
    padding: 10px 10px;
    margin-bottom: 0;
    font-weight: 600;
    border-bottom: 1px solid #e7e7e7;
  }

  .tool_drawer_body {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    background-color: #fff;

    .tool-list {
      width: 30px;
      height: 100%;
      border-right: 1px solid #e7e7e7;

      i {
        margin-top: 10px;
      }
    }

    .tool-setup {
      width: calc(100% - 30px);
      height: 100%;
    }
  }

  .el-tabs {
    width: 100%;

    .el-tabs__nav {
      margin-left: 10px;
    }
  }

  .el-collapse-item {
    padding-left: 10px;
  }
}
</style>