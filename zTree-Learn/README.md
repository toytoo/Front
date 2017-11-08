# zTree

参考[官网](http://www.treejs.cn/)



## 基本功能

### treeNode节点数据

#### 标准JSON数据

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

效果如下：

![1](https://github.com/windzencoder/Front/blob/master/zTree-Learn/screenshot/1.png)

#### 简 JSON数据

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


```
    <script LANGUAGE="JavaScript">
        var zTreeObj;
        var setting = {
            data:{
                simpleData:{
                    enable: true
                }
            }
        };
        var zNodes = [
            {id:1, pId: 0, name:"后台页面"},
            {id:2, pId: 0, name:"测试页面", open:true},
            {id:21, pId: 2, name:"文件上传", open:true},
            {id:3, pId: 0, name:"系统管理", open:true},
            {id:31, pId: 3, name:"用户管理", open:true},
            {id:32, pId: 3, name:"角色管理", open:true},
            {id:33, pId: 3, name:"菜单管理", open:true},
            {id:4, pId: 0, name:"个人设置"}
        ];
        $(document).ready(function () {
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        });
    </script>
```


效果如下：

![3](https://github.com/windzencoder/Front/blob/master/zTree-Learn/screenshot/3.png)

----

`setting.view.showLine`设置是否显示节点之间的连线，默认为ture

```
		var setting = {
			view: {
				showLine: false
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};
```

----

`setting.view.showIcon`设置zTree 是否显示节点的图标，默认为ture

```
		var setting = {
			view: {
				showIcon: showIconForTree
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};
```

----

treeNode.icon，节点自定义图标的 URL 路径
treeNode节点的iconClose，定义父节点自定义折叠时图标的 URL 路径
treeNode节点的iconOpen，定义父节点自定义展开时图标的 URL 路径
treeNode.iconSkin，节点自定义图标的 className

----

### 超链接

url 属性用于设置 页面跳转的路径
target 属性用于设置 页面跳转的窗口目标
click 属性用于设置简单的 onClick 事件

```
		var zNodes =[
			{ id:1, pId:0, name:"zTree Home", url:"http://www.treejs.cn/", target:"_blank"},
			{ id:2, pId:0, name:"zTree in Google", url:"http://code.google.com/p/jquerytree/", target:"_blank"},
			{ id:3, pId:0, name:"zTree in Iteye", url:"http://ztreeapi.iteye.com/", target:"_blank"},
			{ id:4, pId:0, name:"Nothing...", url:"", target:"_blank", click:"alert('我是不会跳转的...');"}
		];
```

## 编辑功能

### 基本 增 / 删 / 改 节点

+ setting.edit.enable设置 zTree 是否处于编辑状态，默认为false，true / false 分别表示 可以 / 不可以 编辑
+ setting.edit.showRemoveBtn 是否显示删除按钮，默认为true
+ setting.edit.showRenameBtn 是否显示编辑名称按钮
+ setting.edit.removeTitle 删除按钮的 Title 辅助信息(鼠标移动到 删除按钮 上时，浏览器自动弹出的辅助信息内容)
+ setting.edit.renameTitle 编辑名称按钮的 Title 辅助信息

事件

+setting.callback.beforeEditName 用于捕获节点编辑按钮的 click 事件，并且根据返回值确定是否允许进入名称编辑状态,如果返回 false，节点将无法进入 zTree 默认的编辑名称状态
setting.callback.beforeRemove 用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作，如果返回 false，zTree 将不删除节点，也无法触发 onRemove 事件回调函数


## 复/单选框功能

### 复选框

使用 checkbox，必须设置 setting.check 中的各个属性

+ treeNode.checked - 节点的 checkBox / radio 的 勾选状态。true 表示节点的输入框被勾选，false 表示节点的输入框未勾选
+ treeNode.chkDisabled 设置节点的 checkbox / radio 是否禁用
+ treeNode.nocheck 设置节点是否隐藏 checkbox / radio

+ setting.check.enable - 设置 zTree 的节点上是否显示 checkbox / radio，默认为false

+ setting.check.chkboxType 勾选 checkbox 对于父子节点的关联关系。

  + Y 属性定义 checkbox 被勾选后的情况； 
  + N 属性定义 checkbox 取消勾选后的情况； 
  + "p" 表示操作会影响父级节点； 
  + "s" 表示操作会影响子级节点。

+ setting.check.nocheckInherit 可以设置子节点自动继承父节点的 nocheck 属性












