<template>
  <div class="pg-table">
    <el-table :data="tableData" :style="tableStyle" border>
      <el-table-column
       v-for="(column, index) in tableHeader"
       :key="index"
       :label="column.columnName"
       :prop="column.prop"
       :min-width="column.width || 100"
       :resizable="false">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'pgTable',
  props: {
    attr: {
      type: Object,
      Boolean: {}
    }
  },
  data () {
    return {
      dataList: [],
      headers: [],
      width: 300,
      defaultHeaders: [
        { label: '列1', props: 'column1' },
        { label: '列2', props: 'column2' },
        { label: '列3', props: 'column3' },
      ],
      defaultDatas: [
        { column1: '数据11', column2: '数据12', column3: '数据13' },
        { column1: '数据21', column2: '数据22', column3: '数据23' },
        { column1: '数据31', column2: '数据32', column3: '数据33' },
      ]
    }
  },
  computed: {
    tableStyle () {
      return ''
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
    attr: {
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
      let attr = JSON.parse(JSON.stringify(obj))
      this.headers = attr.headers
      // this.width = attr.width
    }
  }
}
</script>

<style lang="less">
.pg-table {
  .el-table {
    // min-width: 300px;
    width: 700px;
    height: 400px;
  }
  .el-table__body-wrapper {
    height: calc(100% - 48px);
    overflow-y: scroll;
  }
  .el-table__header-wrapper {
    width: 100%;

    .gutter {
      width: 10px;
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