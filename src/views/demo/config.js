export default {
  list: [
    {
      key: 'test',
      label: '按钮', 
      componentName: 'pgButton',
      icon: 'icon-anniu',
      attrComponentName: 'pgButtonAttr',
      property: {
        width: '',
        height: '',
        background: '#00afee',
        fontSize: '',
        color: '#000',
        buttonName: ''
      }
    }, {
      key: 'table',
      label: '表格',
      componentName: 'pgTable',
      icon: 'icon-biaoge',
      attrComponentName: 'pgTableAttr',
      property: {
        tableWidth: 300,
        tableHeight: 300,
        headers: [
          { columnName: '列1', prop: 'column1', width: 100 },
          { columnName: '列2', prop: 'column2', width: 100 },
          { columnName: '列3', prop: 'column3', width: 100 }
        ],
        api: '',
        pagination: false
      }
    }
  ]
}