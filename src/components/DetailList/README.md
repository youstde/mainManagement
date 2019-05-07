# 详情列表 #

> 在详情中用的，一一对应式

```javascript
<DetailList
    data={[
        {
            label: '发起方',
            value: '权威的那首',
        },
        {
            label: '锌贝壳流转凭证',
            value:  (
                <Button>去下载</Button>
            ),
        },
        {
            label: '销售发票',
            value:  (
                <Button onClick={() => this.handleShowGallery()}>查看发票</Button>
            ),
        },
        {
            label: '发票总额',
            value: '213',
        },
        {
            label: '备注(原因)',
            value: <Input />,
        },
    ]}
/>

```
