export default {
  list: [
    {
      key: 'test',
      label: '组件1', 
      componentName: 'testComponent1',
      icon: 'icon-zhuzhuangtutubiao',
      attrComponentName: '',
      property: {

      }
    }, {
      key: 'table',
      label: '表格',
      componentName: 'pgTable',
      icon: 'icon-biaoge',
      attrComponentName: 'pgTableAttr',
      property: {
        headers: [
          { columnName: '列1', prop: 'column1', width: 100 },
          { columnName: '列2', prop: 'column2', width: 100 },
          { columnName: '列3', prop: 'column3', width: 100 }
        ]
      }
    }
  ]
}