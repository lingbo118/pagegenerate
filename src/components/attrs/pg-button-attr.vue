<template>
  <div class="pg-button-attr">
    <el-form>
      <el-form-item label="字体颜色: " label-width="60px">
        <colorPicker v-model="property.color"></colorPicker>
      </el-form-item>
      <el-form-item label="背景颜色: " label-width="60px">
        <colorPicker v-model="property.background"></colorPicker>
      </el-form-item>
      <el-form-item label="宽度: " label-width="60px">
        <el-input v-model="property.width"></el-input>
      </el-form-item>
      <el-form-item label="高度: " label-width="60px">
        <el-input v-model="property.height"></el-input>
      </el-form-item>
      <el-form-item label="字号: " label-width="60px">
        <el-input v-model="property.fontSize"></el-input>
      </el-form-item>
      <el-form-item label="文字: " label-width="60px">
        <el-input v-model="property.buttonName"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'pgButtonAttr',
  props: {
    property: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    
  },
  methods: {
    addColumn (index) {
      this.property.headers.splice(index, 0, {
        columnName: '列',
        props: 'column',
        width: 100
      })
    },
    deleteColumn (index) {
      this.property.headers.splice(index, 1)
    }
  }
}
</script>

<style lang="less">
.pg-button-attr {
  .el-form {
    margin-top: 20px;
    .el-form-item {
      display: flex;

      .el-form-item__label {
        padding: 0;
      }

      .el-form-item__content {
        margin-left: 20px !important;
      }
    }
  }
}
</style>