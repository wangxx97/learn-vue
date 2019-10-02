#### 创建一个Vue实例

```javascript 
<script type="text/javascript">
var vm = new Vue ({
    //选项
    el: '#id'
    data: { }
})
</script>
```


#### data的属性值

 ``` javascript
 data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}
```


#### Vue属性

1. v-bind 特性被称为指令 用于绑定元素
```html
 <span v-bind:title="message"></span>
```

2. v-if 控制切换一个元素是否显示
```html
 <p v-if="seen">现在你看到我了</p>
```

3. v-for 指令可以绑定数组的数据来渲染一个项目列表
```html
 <li v-for="todo in todos">{{todo.text}}</li>
```

4. v-on 指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法
```html
 <button v-on:click="reverseMessage">反转消息</button>
```

5. v-model 指令，表单输入和应用状态之间的双向绑定。
```html
 <input v-model="message">
```

6.  v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。
```html
 <span v-once>这个将不会改变: {{ msg }}</span>
```

*  Object.freeze()，这会阻止修改现有的属性，也意味着响应系统无法再追踪变化
`Object.freeze(obj)`

#### 生命周期钩子:createdmounted、updated 和 destroyed

>不要在选项属性或回调上使用箭头函数，
比如 created: () => console.log(this.a) 
或 vm.$watch('a', newValue => this.myMethod())。
因为箭头函数并没有 this，this 会作为变量一直向上级
词法作用域查找，直至找到为止，经常导致 
Uncaught TypeError: Cannot read property of undefined 
或 Uncaught TypeError: this.myMethod is not a function 之类的错误。

#### 文本

数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：
```html
<span>Message: {{ msg }}</span>
```

#### v-model与修饰符：

1. lazy-将用户输入的数据赋值于变量的时机由输入时延迟到数据改变时

2. number-自动转换用户输入为数值类型 

3. trim-自动过滤用户输入的首位空字符


---
#### 效果图

![avatar](/src/vue.js从入门到项目实践/img/1.png)
![avatar](/src/vue.js从入门到项目实践/img/效果图.png)
![avatar](/src/vue.js从入门到项目实践/img/4.png)


