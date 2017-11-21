# mustache

参考[janl/mustache.js](https://github.com/janl/mustache.js)

## 文档

### 模板

#### Include Templates

将模板包含在静态HTML文件中，如下的例子：

```
<body onload="loadUser()">

<div id="target">Loading...</div>

<script id="template" type="x-tmpl-mustache">
Hello {{ name }}!
</script>

<script>

    function loadUser() {
        var template = $('#template').html();
        Mustache.parse(template);   // 可选, 在将来使用是可快一点
        var rendered = Mustache.render(template, {name: "Luke"});
        $('#target').html(rendered);
    }

</script>

</body>
```

#### Load External Templates

如果你的模板在一个单独的文件中，可以异步加载它，然后渲染它

```
function loadUser() {
  $.get('template.mst', function(template) {
    var rendered = Mustache.render(template, {name: "Luke"});
    $('#target').html(rendered);
  });
}
```

### Variables

可参考：

+ [Mustache.js 使用简介](http://gzool.com/js/2014/09/09/js-mustachejs-usage/)

分类如下：

- `{{name}}` 变量
- `{{#name}}...{{/name}}` 区块
- `{{^name}}...{{/name}}` 反向区块
- `{{!name}}` 注释
- `{{>name}}` 局部模板



用两对大括号(大括号顺时针转 90 度后就是 Mustache 的 logo)括起来的标记(`{{name}}`)叫做 Mustache 标签，大括号中的内容(`name`)叫做该标签的键(`key`)。

View如下：

```
{
  "name": "Chris",
  "company": "<b>GitHub</b>"
}
```

Template为：

```
* {{name}}
* {{age}}
* {{company}}
* {{{company}}}
* {{&company}}
{{=<% %>=}}
* {{company}}
<%={{ }}=%>
```

其输出为：

```
* Chris
*
* &lt;b&gt;GitHub&lt;/b&gt;
* <b>GitHub</b>
* <b>GitHub</b>
* {{company}}
```

JavaScript的点符号可用于访问视图中的对象属性的键

view如下：

```
{
  "name": {
    "first": "Michael",
    "last": "Jackson"
  },
  "age": "RIP"
}
```

模板如下：

```
* {{name.first}} {{name.last}}
* {{age}}
```

输出结果为：

```
* Michael Jackson
* RIP
```



### Sections

section根据上下文中的键，一次或者多次的渲染文本块

section以`#`开始，`/`结束，如`{{#person}}{{/person}}`

#### False 值 or 空 Lists

如果`person`键不存在，或者其值为`null`, `undefined`, `false`, `0`, 或者 `NaN`，或者是一个空的字符串，或者空的list，对应的块则不会渲染

view如下：

```
{
  "person": false
}
```

模板如下：

```
Shown.
{{#person}}
Never shown!
{{/person}}
```

输出结果为：

```
Shown.
```



#### 非空Lists

如果`person`键存在，并且不是`null`, `undefined`, 或者 `false`，不是空的list，block块会渲染一次或者多次

当value是一个list时，该list中的每个item都会被渲染一次。该block上下文被设置为每个迭代的list中的当前item。这样我们可以遍历集合

view如下：

```
{
  "stooges": [
    { "name": "Moe" },
    { "name": "Larry" },
    { "name": "Curly" }
  ]
}
```

模板如下：

```
{{#stooges}}
<b>{{name}}</b>
{{/stooges}}
```

输出为：

```
<b>Moe</b>
<b>Larry</b>
<b>Curly</b>
```

当遍历一个字符串集合时，`.`可以用来指向当前list中的item

View如下：

```
{
  "musketeers": ["Athos", "Aramis", "Porthos", "D'Artagnan"]
}
```

模板如下：

```
{{#musketeers}}
* {{.}}
{{/musketeers}}
```

输出为：

```
* Athos
* Aramis
* Porthos
* D'Artagnan
```

如果section变量的value是一个方法，它将在每次迭代的list中的当前项上下文中被调用

View如下：

```
{
  "beatles": [
    { "firstName": "John", "lastName": "Lennon" },
    { "firstName": "Paul", "lastName": "McCartney" },
    { "firstName": "George", "lastName": "Harrison" },
    { "firstName": "Ringo", "lastName": "Starr" }
  ],
  "name": function () {
    return this.firstName + " " + this.lastName;
  }
}
```

模板如下：

```
{{#beatles}}
* {{name}}
{{/beatles}}
```

输出如下：

```
* John Lennon
* Paul McCartney
* George Harrison
* Ringo Starr
```



### Functions

如果区块的键是函数，则会调用该函数。函数的第一个参数是区块的内容块（未渲染）。第二个参数是一个特殊的渲染函数，它的 `view` 参数是当前的 `view`，调用的 `context` 对象即为当前的 `view` 对象。

view如下：

```
{
  "name": "Tater",
  "bold": function () {
    return function (text, render) {
      return "<b>" + render(text) + "</b>";
    }
  }
}
```

模板如下：

```
{{#bold}}Hi {{name}}.{{/bold}}
```

输出结果为：

```
<b>Hi Tater.</b>
```



### 反向区块Inverted Sections

反向区块以`^`开头，以`#`结尾，反向区块只会在section的value为`null`, `undefined`, `false`, *falsy* 或者一个空的list时，才渲染

view如下：

```
{
  "repos": []
}
```

模板如下：

```
{{#repos}}<b>{{name}}</b>{{/repos}}
{{^repos}}No repos :({{/repos}}
```

输出为：

```
No repos :(
```



### 注释

注释以!开头，会被忽略掉

如下的模板：

```
<h1>Today{{! ignore me }}.</h1>
```

会被渲染为：

```
<h1>Today.</h1>
```



### 局部模板

以`>`开头，局部模板在运行期渲染（而不是编译期），所以局部模板可以递归使用，但要避免产生无限循环。将局部模板传给 `Mustache.render` 方法的第三个参数即可。



```
var template = '' +
    '{{#names}}' +
    '{{> user}}' +
    '{{/names}}'

var userTemplate = '<strong>{{name}}</strong>'

var view = {
    names: [
        {
            name: 'Don Quixote'
        }
    ]
}

// <strong>Don Quixote</strong>
Mustache.render(template, view, {
    user: userTemplate
})
```



### 预解析和缓存模板



默认情况下，当 Mustache.js 首次解析了某个模板后，它会把完整的标记树（token tree，这个涉及到 Mustache.js 的实现）缓存起来。之后如果又遇到相同的模板，就会绕过解析步骤直接使用缓存模板，这样渲染就快得多了。可以预先使用 `Mustache.parse` 方法。

```
Mustache.parse(template);

// Then, sometime later.
Mustache.render(template, view);
```















































