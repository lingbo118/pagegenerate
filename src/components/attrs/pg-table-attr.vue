<template>
  <div class="pg-table-attr">
    <el-table :data="properties.headers" class="table" border>
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
  </div>
</template>

<script>
export default {
  name: 'pgTableAttr',
  props: {
    propertiesConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      properties: {
        headers: []
      }
    }
  },
  computed: {
    
  },
  watch: {
    propertiesConfig: {
      deep: true,
      immediate: true,
      handler (val) {
        this.properties = JSON.parse(JSON.stringify(val))
      }
    },
    properties: {
      deep: true,
      handler (val) {
        this.$emit('propertiesChnaged', val)
      }
    }
  },
  methods: {
    addColumn (index) {
      this.properties.headers.splice(index, 0, {
        columnName: '列',
        props: 'column',
        width: 100
      })
    },
    deleteColumn (index) {
      this.properties.headers.splice(index, 1)
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
}
</style>