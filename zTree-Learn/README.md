# zTree

参考[官网](http://www.treejs.cn/)

## treeNode节点数据

### 标准JSON数据

+ name - 节点名称
+ isParent - 节点是否为父节点，boolean值
+ open - 记录treeNode节点的展开/折叠状态，true表示展开状态，false表示折叠状态
+ children - 节点的子节点数据集合


数据类型如下：

```
    <script LANGUAGE="JavaScript">
        var zTreeObj;
        // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
        var setting = {};
        // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
        var zNodes = [
            {
                name: "后台页面", isParent: false
            },
            {
                name: "测试页面", open: true, children:
                    [
                        {name: "文件上传"}
                    ]
            },
            {
                name: "系统管理", open: true, children:
                    [
                        {name: "用户管理"},{name: "角色管理"},{name: "菜单管理"}
                    ]
            },
            {
                name: "个人设置", isParent: false
            }
        ];
        $(document).ready(function () {
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        });
    </script>
```

### 简 JSON数据

简单模式的 JSON 数据需要使用 id / pId 表示节点的父子包含关系

setting配置:

+ data.simpleData.enable - 采用简单数据模式，不需要用户再把数据库中取出的 List 强行转换为复杂的 JSON 嵌套格式
+ data.simpleData.idKey - 节点数据中保存唯一标识的属性名称，默认为`id`
+ data.simpleData.pIdKey - 节点数据中保存其父节点唯一标识的属性名称，默认为`pId`
+ data.simpleData.rootPId - 用于修正根节点父节点数据，即 pIdKey 指定的属性值，默认为`null`

```
var setting = {
	data: {
		simpleData: {
			enable: true,
			idKey: "id",
			pIdKey: "pId",
			rootPId: 0
		}
	}
};
var treeNodes = [
    {"id":1, "pId":0, "name":"test1"},
    {"id":11, "pId":1, "name":"test11"},
    {"id":12, "pId":1, "name":"test12"},
    {"id":111, "pId":11, "name":"test111"}
];
```

treeNode节点数据:

+ 


```
	<SCRIPT type="text/javascript">
		<!--
		var setting = {
			data: {
				simpleData: {
					enable: true
				}
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"父节点1 - 展开", open:true},
			{ id:11, pId:1, name:"父节点11 - 折叠"},
			{ id:111, pId:11, name:"叶子节点111"},
			{ id:112, pId:11, name:"叶子节点112"},
			{ id:113, pId:11, name:"叶子节点113"},
			{ id:114, pId:11, name:"叶子节点114"},
			{ id:12, pId:1, name:"父节点12 - 折叠"},
			{ id:121, pId:12, name:"叶子节点121"},
			{ id:122, pId:12, name:"叶子节点122"},
			{ id:123, pId:12, name:"叶子节点123"},
			{ id:124, pId:12, name:"叶子节点124"},
			{ id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
			{ id:2, pId:0, name:"父节点2 - 折叠"},
			{ id:21, pId:2, name:"父节点21 - 展开", open:true},
			{ id:211, pId:21, name:"叶子节点211"},
			{ id:212, pId:21, name:"叶子节点212"},
			{ id:213, pId:21, name:"叶子节点213"},
			{ id:214, pId:21, name:"叶子节点214"},
			{ id:22, pId:2, name:"父节点22 - 折叠"},
			{ id:221, pId:22, name:"叶子节点221"},
			{ id:222, pId:22, name:"叶子节点222"},
			{ id:223, pId:22, name:"叶子节点223"},
			{ id:224, pId:22, name:"叶子节点224"},
			{ id:23, pId:2, name:"父节点23 - 折叠"},
			{ id:231, pId:23, name:"叶子节点231"},
			{ id:232, pId:23, name:"叶子节点232"},
			{ id:233, pId:23, name:"叶子节点233"},
			{ id:234, pId:23, name:"叶子节点234"},
			{ id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
		];

		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		});
		//-->
	</SCRIPT>
```







