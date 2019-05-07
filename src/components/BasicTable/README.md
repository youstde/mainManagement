```javascript
columns: [
    {
        type: 'date', // 自动将日期转换
        format: 'YYYY-MM-DD hh:mm:ss', // 默认
    },
    {
        type: 'amount', // 自动加千分符，（暂无，可先加上）
    },
    {
        type: 'oprate', // 增加操作列
        title: '操作', // 默认
        dataIndex: 'toolcol', // 默认
        buttons: [
            {
                text: '按钮',
                onClick: () => {} // 传递record
                // ... // 其他跟antd Button的参数一致
            },
            {
                text: () => (<div>asd</div>), // 传递record
                onClick: () => {}
            },

        ]
     }
]

dataSource: [] // 默认增加了key，且key为index。增加了rowKey属性后失效
```


