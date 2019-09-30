####创建一个Vue实例
`Var vm = new Vue({
    //选项
    el: '#id'
    data: { }
})`
#####data的属性值
 `data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}`

------
####Vue属性
1. v-bind 特性被称为指令 用于绑定元素
> `<span v-bind:title="message"></span>`
2. v-if 控制切换一个元素是否显示
> `<p v-if="seen">现在你看到我了</p>`
3. v-for 指令可以绑定数组的数据来渲染一个项目列表
> `<li v-for="todo in todos">
            {{todo.text}}
        </li>`
4. v-on 指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法
> `<button v-on:click="reverseMessage">反转消息</button>`
5.v-model 指令，表单输入和应用状态之间的双向绑定。
> `<input v-model="message">`

------

 Object.freeze()，这会阻止修改现有的属性，也意味着响应系统无法再追踪变化
`Object.freeze(obj)`

### 生命周期钩子:createdmounted、updated 和 destroyed
>不要在选项属性或回调上使用箭头函数，
比如 created: () => console.log(this.a) 
或 vm.$watch('a', newValue => this.myMethod())。
因为箭头函数并没有 this，this 会作为变量一直向上级
词法作用域查找，直至找到为止，经常导致 
Uncaught TypeError: Cannot read property of undefined 
或 Uncaught TypeError: this.myMethod is not a function 之类的错误。

