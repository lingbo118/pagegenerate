<template>
  <div class="pg-table-attr">
    <el-table :data="property.headers" class="table" border>
      <el-table-column label="列名" prop="columnName" min-width="100">
        <template slot-scope="scoped">
          <el-input v-model="scoped.row.columnName"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="属性名" prop="props" min-width="100">
        <template slot-scope="scoped">
          <el-input v-model="scoped.row.prop"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="列宽" prop="width" min-width="100">
        <template slot-scope="scoped">
          <el-input v-model="scoped.row.width"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scoped">
          <i class="el-icon-circle-plus-outline add" @click="addColumn(scoped.$index)"></i>
          <i class="el-icon-remove-outline delete" style="margin-left: 20px;" @click="deleteColumn(scoped.$index)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-form>
      <el-form-item label="斑马纹: " label-width="60px">
        <el-switch v-model="property.stripe" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="接口url: " label-width="60px">
        <el-input v-model="property.api"></el-input>
      </el-form-item>
      <el-form-item label="表宽: " label-width="60px">
        <el-input v-model="property.width"></el-input>
      </el-form-item>
      <el-form-item label="表高: " label-width="60px">
        <el-input v-model="property.height"></el-input>
      </el-form-item>
      <el-form-item label="分页: " label-width="60px">
        <el-switch v-model="property.pagination" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'pgTableAttr',
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
.pg-table-attr {
  width: 350px;

  .el-table {
    width: 100%;
  }

  .add {
    font-size: 16px;
    color: cornflowerblue;
  }

  .delete {
    font-size: 16px;
    margin-left: 10px;
  }

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