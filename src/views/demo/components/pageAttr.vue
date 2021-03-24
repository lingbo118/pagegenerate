<template>
  <div class="page-attr">
    <el-form>
      <el-form-item label-width="60px" label="类型：">
        <el-radio v-model="property.form" :label="false">展示页</el-radio>
        <el-radio v-model="property.form" :label="true">表单页</el-radio>
      </el-form-item>
      <el-form-item label="接口url: " label-width="60px">
        <el-input v-model="property.api"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      property: {
        form: true
      }
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler (val) {
        this.property = Object.assign(this.property, val)
      }
    },
    property: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="less">
.page-attr {
  .el-form {
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