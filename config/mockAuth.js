// 对应页面路径（前面省去了域名）：
// [
//     '/goods/addSpu/list', // 商品spu列表页面
//     '/goods/addSpu/update', // 填写spu信息页面
//     '/goods/addSku/list',  // 商品sku页面列表页面
// ]

// 用户所有权限
{
    success: true,
    data: [
        ':goods:addSpu:list:view',  // 有添加商品spu这个页面的权限，view是一个操作的标识，表示可以访问该页面
        ':goods:addSpu:update:view', // 填写spu信息页面的方位权限
        ':goods:addSku:list:view' // 商品sku页面列表页面的访问权限
    ]
}


// 用户权限是对应页面的路径和操作符拼接而成，只要我拿到用户权限，就可以反推出这个页面对应的路径，从而动态生成左边菜单