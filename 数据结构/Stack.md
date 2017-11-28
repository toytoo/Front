# Stack


## JavaScript Stack例子



根据Stack的概念，添加2个操作：

+ `push(data)`添加数据
+ `pop()`移除最新添加的数据



Stack的属性：

```
function Stack() {
    this._size = 0;
    this._storage = {};
}
```

+ `this._storage`用来存储数据
+ `this._size`反映了数据被push到当前的堆栈的次数



push和pop操作

```
    Stack.prototype.push = function(data){
        var size = this._size++;
        this._stroage[size] = data;
    }

    Stack.prototype.pop = function(){
        var size = this._size, deletedData;
        if(size){
            deletedData = this._stroage[size];
            delete this._storage[size];
            this._size--;
            return deletedData;
        }
    }
```







