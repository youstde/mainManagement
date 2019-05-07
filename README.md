# 后台系统 #

## 路由的配置 ##

### 新增路由 ###

```javascript
{
    path: '/business',
    name: '业务管理',
    icon: 'dashboard',
    routes: [
        {
            path: '/business/receipt', // 将自动生成权限码前缀 code: 'business:receipt'
            name: '电子回单下载',
            component: './Business/Receipt',
        },
    ],
},
```



- 权限码前缀用于比较该页面下的权限码， `'business:receipt:view'` `'business:receipt:add'`等
- 权限码后缀的命名规则必须统一
- 在路由配置后，需要把权限码配置到**菜单管理中对应菜单的权限标识**
- 上述逻辑在 app.js 中

 

## 菜单的配置 ##

>  菜单将根据路由自动生成，该逻辑在 models/menu.js 中

常用的属性

- hideInMenu 是否在菜单中隐藏