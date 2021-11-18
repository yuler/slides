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

当我们添加从 reactive 对象里面调用 Get 方法（GET property）的时候，如下：

```js
console.log('Updated quantity to = ' + product.quantity)
```

问题是 `track` 会手机依赖，即使它并不在 `effect` 函数里面调用，这并不是我们想要的效果。

**解决:activeEffect**

```js
let activeEffect = null // The active effect running
...
function effect(eff) {
    activeEffect = eff  // Set this as the activeEffect
    activeEffect()      // Run it
    activeEffect = null // Unset it
}

let product = reactive({ price: 5, quantity: 2 })
let total = 0

effect(() => {
    total = product.price * product.quantity
})

effect(() => {
    salePrice = product.price * 0.9
})

console.log(
    `Before updated total (should be 10) = ${total} salePrice (should be 4.5) = ${salePrice}`
)

product.quantity = 3

console.log(
    `After updated total (should be 15) = ${total} salePrice (should be 4.5) = ${salePrice}`
)

product.price = 10

console.log(
    `After updated total (should be 30) = ${total} salePrice (should be 9) = ${salePrice}`
)
```

注意，我们并不需要手动调用 `effect`，他会在我们的新的 `effect` 函数中被自动调用。

我们还需要做一个更改，那就是在 `track` 函数中，收集依赖的时候，使用新的 `activeEffect`。

好了，我们现在来测试下程序

## The Need for Ref

想象一下，如果我们计算总价需要使用的 `salePrice` 而不是 `price`

```js
effect(() => {
  total = salePrice * product.quantity
})
```

如果我们创建一个真实的商店，我们可能会根据 `salePrice` 来计算总价 (`total`)。然而，这段代码不能响应式的工作，这是因为 `salePrice` 不是响应式的，所以 `total` 不会被重新计算，我们需要添加如下代码：

```js
effect(() => {
  salePrice = product.price * 0.9
})
```

当 `product.price` 更新的时候，它将自动更新 `salePrice`。所以我们需要一种方式将 `salePrice` 包装成一个响应式对象。

和 Vue3 的 [ref API](https://v3.vuejs.org/api/refs-api.html#ref) 一样。根据 Vue 的文档，一个 `ref` 对象有一个 `.value` 属性。

所以在我们的 `effect` 里面需要通过 `.value` 属性来获取 `ref` 对象的值。

```js
effect(() => {
  salePrice.value = product.price * 0.9
})

effect(() => {
  total = salePrice.value * product.quantity
})
```

我们需要定义 `ref` 方法

## 1. **Defining Ref with Reactive**

```js
function ref(intialValue) {
  return reactive({value: initialValue})
}
```

然后, 在 Vue3 中正对基础数据类型（primitives）不是这样定义的，我们可以通过另一种方式。

## 2. Defining Ref with Object Accessors

```js
function ref(raw) {
  const r = {
    get value() {
      track(r, 'value')
      return raw
    },
    set value(newVal) {
      raw = newVal
      trigger(r, 'value')
    },
  }
  return r
}
```

---

# Computed Values & Vue 3 Source

我们再创建 Reactivity 的例子的时候，为什么没有通过 `computed` 来计算我们的值，而是通过 `effect` ?

回顾下我们的例子

```js
let product = reactive({price: 5, quantity: 2})
let salePrice = ref(0)
let total = 0
effect(() => {
  salePrice.value = product.price * 0.9
})
effect(() => {
  total = salePrice.value * product.quantity
})
```

其实我们应该把 `salePrice` 和 `price` 都通过 `computed` 来计算出来，这样更清晰。[Vue 3 computed API](https://v3.vuejs.org/api/computed-watch-api.html#computed)，应该这样：

```js
let product = reactive({price: 5, quantity: 2})

let salePrice = computed(() => {
  return product.price * 0.9
})
let total = computed(() => {
  return salePrice.value * product.quantity
})
```

我们来创建一个 `computed` 函数

```js
function computed(getter) {
  let result = ref() // Create a new reactive reference

  effect(() => (result.value = getter())) // Set this value equal to the return value of the getter

  return result // return the reactive reference
}
```

## Vue Reactivity without a Caveat

值得一提的是，我们可以做一些在 Vue2 反应对象无法做到的事，具体来说，我们可以给反应对象添加新的属性，如下：

```js
...
let product = reactive({ price: 5, quantity: 2 })
...

product.name = 'Shoes'
effect(() => {
    console.log(`Product name is now ${product.name}`)
})
product.name = 'Socks'
```

这在 Vue2 中是无法实现的，因为在 Vue2 中是通过 `Object.defineProperty` 来为单个属性添加 `getters` 和 `setters` 的。现在有了 `Proxy` API， 我们可以给响应式对象添加新的属性。

## Testing our code against Vue 3 Source

[Code-Pop/vue-3-reactivity](https://github.com/Code-Pop/vue-3-reactivity/blob/b9721e40794a172f7162a3834eeb60e8900d20b6/08-vue-reactivity.js)

## Vue 3 Reactivity Files

如果你看一下 Vue3 的源码，在 `/packages/reactivity/src` 下你会发些一下文件，

<!-- TODO: 列出文件 -->

- **effect.ts -** 定义了`effect`函数，以封装可能包含反应性引用和对象的代码。包含`track`，它被`get`请求所调用，`trigger`被`set`请求所调用。
- **baseHandlers.ts -** 包含`Proxy`处理程序，如`get`和`set`，它们调用`track`和`trigger`（来自 effect.ts）。
- **reactive.ts -** 包含 reactive 语法的功能，使用`get`和`set`创建 ES6 代理（来自 basehandlers.ts）。
- **ref.ts -** 定义了我们如何使用对象访问器（像我们一样）创建反应式的**Ref**erences。也包含了`toRefs`，它将反应式对象转换为一系列的反应式引用，访问原始代理。
- **computed.ts -** 使用`effect`和对象访问器定义了`computed`函数（与我们做的有点不同）。
