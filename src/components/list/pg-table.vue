<template>
  <div class="pg-table">
    <el-table :data="tableData" :style="tableStyle" border :stripe="stripe">
      <el-table-column
       v-for="(column, index) in tableHeader"
       :key="index"
       :label="column.columnName"
       :prop="column.prop"
       :min-width="column.width || 100"
       :resizable="false">
       <template slot-scope="scope">
         <el-input v-model="scope.row[column.prop]" v-if="isForm"></el-input>
         <span v-else>{{ scope.row[column.prop] }}</span>
       </template>
      </el-table-column>
    </el-table>

    <el-pagination background
      v-if="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalPage"
      :small="true"
      layout="total, prev, pager, next, jumper"
      style="margin-top: 10px"/>
  </div>
</template>

<script>
export default {
  name: 'pgTable',
  props: {
    property: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dataList: [],
      headers: [],
      width: 300,
      height: 300,
      defaultHeaders: [
        { label: '列1', props: 'column1' },
        { label: '列2', props: 'column2' },
        { label: '列3', props: 'column3' },
      ],
      defaultDatas: [
        { column1: '数据11', column2: '数据12', column3: '数据13' },
        { column1: '数据21', column2: '数据22', column3: '数据23' },
        { column1: '数据31', column2: '数据32', column3: '数据33' },
      ],
      totalPage: 0,
      pageSize: 10,
      currentPage: 0,
      api: '',
      pagination: '',
      stripe: false,
      isForm: false
    }
  },
  computed: {
    tableStyle () {
      let style = ''
      if (this.width) {
        style += `width: ${this.width}px;`
      }

      if (this.height) {
        style += `height: ${this.height}px;`
      }
      return style
    },
    tableHeader () {
      let headers = []
      if (this.headers.length > 0) {
        headers = this.headers
      } else {
        headers = this.defaultHeaders
      }

      return headers
    },
    tableData () {
      let data = []
      if (this.dataList.length > 0) {
        data = this.dataList
      } else {
        data = this.defaultDatas
      }

      return data
    }
  },
  watch: {
    property: {
      deep: true,
      immediate: true,
      handler (val) {
        if (val && Object.keys(val).length > 0) {
          this.parseAttr(val)
        }
      }
    }
  },
  methods: {
    parseAttr (obj) {
      let property = JSON.parse(JSON.stringify(obj))
      this.headers = property.headers
      this.api = property.api
      this.pagination = property.pagination
      this.stripe = property.stripe
      this.width = property.width
      this.height = property.height
      this.isForm = property.form
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    handleSizeChange () {

    }
  }
}
</script>

<style lang="less">
.pg-table {
  .el-table {
    width: 300px;
    height: 300px;
  }
  .el-table__body-wrapper {
    height: calc(100% - 48px);
    overflow-y: scroll;
  }
  .el-table__header-wrapper {
    width: 100%;

    .gutter {
      width: 10px !important;
      display: block !important;
    }
  }
  .el-table__body-wrapper::-webkit-scrollbar {
    /*滚动条整体样式*/ /*高宽分别对应横竖滚动条的尺寸*/
    width: 10px;
    height: 10px;
  }
  .el-table__body-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background: #f0f2f5;
    box-shadow: inset 0px 0px 0px 3px #f0f2f5;
  }
  .el-table__fixed-right-patch {
    background: #171c31;
  }
  .el-table__fixed-right::before,
  .el-table__fixed::before {
    height: 0;
  }
  .el-table__body-wrapper::-webkit-scrollbar-corner {
    background: #fff;
  }
}
</style>