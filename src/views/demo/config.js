export default {
  list: [
    {
      key: 'test',
      label: '按钮', 
      componentName: 'pgButton',
      icon: 'icon-anniu',
      attrComponentName: 'pgButtonAttr',
      property: {
        width: 50,
        height: 30,
        background: '#00afee',
        fontSize: 12,
        color: '#000',
        buttonName: '按钮'
      }
    }, {
      key: 'table',
      label: '表格（普通）',
      componentName: 'pgTable',
      icon: 'icon-biaoge',
      attrComponentName: 'pgTableAttr',
      property: {
        width: 300,
        height: 300,
        headers: [
          { columnName: '列1', prop: 'column1', width: 100 },
          { columnName: '列2', prop: 'column2', width: 100 },
          { columnName: '列3', prop: 'column3', width: 100 }
        ],
        api: '',
        pagination: false,
        form: false,
        field: ''
      }
    },
    {
      key: 'table-form',
      label: '表格（表单）',
      componentName: 'pgTable',
      icon: 'icon-biaoge',
      attrComponentName: 'pgTableAttr',
      property: {
        width: 300,
        height: 300,
        headers: [
          { columnName: '列1', prop: 'column1', width: 100 },
          { columnName: '列2', prop: 'column2', width: 100 },
          { columnName: '列3', prop: 'column3', width: 100 }
        ],
        api: '',
        pagination: false,
        form: true,
        field: ''
      }
    }
  ]
}