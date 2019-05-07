# 搜索表单用法 #

参数：

data: [
    // 都有的
    {
        label: String, // 
        type: String, // input
        key: String, // 返回的数据的key
    }
]

```javascript
<SearchForm
    data={[
        {
            label: '名称',
            type: 'input',
            key: 'name',
        },
        {
            label: '状态',
            type: 'select',
            options: [
                { key: 1, value: '所有' },
                { key: 2, value: '已经' },
                { key: 3, value: '没有' },
            ],
            key: 'status',
        },
        {
            label: '时间',
            type: 'datepicker',
            key: 'date',
            dateFormat: 'YYYY-MM-DD',
        },
        {
            label: '范围时间',
            type: 'rangepicker',
            key: 'rangedate',
            dateFormat: 'YYYY-MM-DD',
        },
    ]}
    onSearch={this.handleSearchForm}
    onDownload={this.handleDownload}
/>
```
