# Building Reactivity from Scratch

[Vue Mastery](https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity)

[GitHub Repo](https://github.com/Code-Pop/vue-3-reactivity)

---

## Vue 3 reactivity

我们先看下这个例子：

```html
<div id="app">
  <div>Price: ${{ product.price }}</div>
  <div>Total: ${{ product.price * product.quantity }}</div>
  <div>Taxes: ${{ totalPriceWithTax }}</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      product: {
        price: 5.0,
        quantity: 2,
      },
    },
    computed: {
      totalPriceWithTax() {
        return this.product.price * this.product.quantity * 1.03
      },
    },
  })
</script>
```

```js
let product = {price: 5, quantity: 2}
let total = product.price * product.quantity // 10 right?
product.price = 20
console.log(`total is ${total}`)
```

**不幸的是，JavaScript 是程序性的，而不是反应性的**。如以上的例子，当我们改变 `price` 或者 `quantity` 的时候，我们需要重新运行计算 `total`。

首先，我们需要告诉我们的程序，“存储运行的代码(effect)，我们可能需要在另一个时间运行”。如上例子，在 `price` 或者 `quantity` 发生改变的时候，重新运行存储的代码。

我们可以通过一个 effect 函数来记录，那么我们就可以再次运行 effect。

```js
let product = { price: 5, quantity: 2 }
let total = 0

let effect = () => {
    total = product.price * product.quantity
})

track() // Remember this in case we want to run it later
effect() // Also go ahead and run it
```

为了定义 `track`，我们需要一个地方来存储 `effects`（我们可能有很多 effect）。我们将创建一个 `dep` 变量（我们称之依赖）。因为通常在观察者模式下，依赖有订阅者（在我们的例子中是 effects），当一个对象改变状态时，它将得到通知。我们可以像 Vue 2 那样，把依赖变成一个有订阅数组的类。然而这里只需要存储 effects，我们可以简单的创建一个 `Set` 集合。

```js
const dep = new Set()
```

那么我们的 `track` 方法可以简单的收集依赖

```js
function track() {
  dep.add(effect)
}
```

让我们来编写一个 `trigger` 方法，它会触发所有的我们记录的依赖

```js
function trigger() {
  dep.forEach(effect => effect())
}
```

然后在我们代码中，我们只需要这样

```js
product.price = 20
console.log(total) // => 10
trigger()
console.log(total) // => 40
```

完整的代码

```js
let product = {price: 5, quantity: 2}
let total = 0
let dep = new Set()

function track() {
  dep.add(effect)
}

function trigger() {
  dep.forEach(effect => effect())
}

let effect = () => {
  total = product.price * product.quantity
}

track()
effect()

product.price = 20
console.log(total) // => 10

trigger()
console.log(total) // => 40
```

## 问题：多个属性

我们可以更具需要继续收集依赖，但是我们的反应对象可能有不同的属性，而且这些属性都需要有自己的 `dep`（一组 effects）。来看一下我们的对象

```js
let product = {price: 5, quantity: 2}
```

**解决方式: depsMap** Map 类型

我们通过创建 depsMap，它的键是属性名，值是一个 `Set` 对象（effects）。

```js
const depsMap = new Map()
function track(key) {
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(effect)
}

function trigger(key) {
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

let product = {price: 5, quantity: 2}
let total = 0

let effect = () => {
  total = product.price * product.quantity
}

track('quantity')
effect()
console.log(total) // --> 10

product.quantity = 3
trigger('quantity')
console.log(total) // --> 40
```

## 问题：多个 reactive 对象

**解决方式: targetMap** WeakMap 类型

```js
const targetMap = new WeakMap() // targetMap stores the effects that each object should re-run when it's updated

function track(target, key) {
  // We need to make sure this effect is being tracked.
  let depsMap = targetMap.get(target) // Get the current depsMap for this target

  if (!depsMap) {
    // There is no map.
    targetMap.set(target, (depsMap = new Map())) // Create one
  }

  let dep = depsMap.get(key) // Get the current dependencies (effects) that need to be run when this is set
  if (!dep) {
    // There is no dependencies (effects)
    depsMap.set(key, (dep = new Set())) // Create a new Set
  }

  dep.add(effect) // Add effect to dependency map
}

function trigger(target, key) {
  const depsMap = targetMap.get(target) // Does this object have any properties that have dependencies (effects)
  if (!depsMap) {
    return
  }

  let dep = depsMap.get(key) // If there are dependencies (effects) associated with this
  if (dep) {
    dep.forEach(effect => {
      // run them all
      effect()
    })
  }
}

let product = {price: 5, quantity: 2}
let total = 0
let effect = () => {
  total = product.price * product.quantity
}

track(product, 'quantity')
effect()
console.log(total) // --> 10

product.quantity = 3
trigger(product, 'quantity')
console.log(total) // --> 15
```

---

# Proxy and Reflect

上面我们通过 `track` 来收集 依赖（`effects`），然后通过 `trigger` 来触发这些 （`effects`）。现在我们需要通过 `Proxy` 和 `Reflect` 来自动收集和触发依赖。

**解决：拦截 Get 和 Set**

- `Get`: 我们需要 `track` 当前的 `effect`
- `Set`: 我们需要 `trigger` 当前属性的任何依赖 `effects`
-

```js
function reactive(object) {
  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (result && oldValue != value) {
        trigger(target, key)
      }
      return result
    },
  }
  return new Proxy(target, handler)
}
```

然后我们只需要这样：

```js
let product = reactive({price: 5, quantity: 2})
let total = 0

let effect = () => {
  total = product.price * product.quantity
}
effect()

console.log('before updated quantity total = ' + total)
product.quantity = 3
console.log('after updated quantity total = ' + total)
```

---

# activeEffect & ref

**问题：**

```js
console.log('Updated quantity to = ' + product.quantity)
```

**解决:activeEffect**
