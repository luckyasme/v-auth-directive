[English](./README.md) | [简体中文](./README-zh-cn.md)

# v-auth-directive

> Flexible and extensible vue3/vue2 permission directive

- 😀Support for vue3 and vue2 (should add @vue/composition-api if vue2 < 2.7)



## Installation

```
# or pnpm or yarn
npm install v-auth-directive
```

If you are using Vue <2.7, make sure to install latest `@vue/composition-api`:

```
npm install v-auth-directive @vue/composition-api
```



## Usage

### 1.Register Directive

```js
//vue3
import { createApp } from 'vue'
import { useAuthDirective } from 'v-auth-directive'
import App from './App.vue'

const app = createApp(App)
useAuthDirective(app, {
  data: () => {
    return ['user', 'admin'] //Permission data
  }
})
app.mount('#app')
```

```js
// Vue 2
import { useAuthDirective } from 'v-auth-directive'
import Vue from 'vue'

useAuthDirective(Vue, {
  data: () => {
    return ['user', 'admin'] //Permission data
  }
})

new Vue({
  el: '#app',
})
```

### 2.How to use

Directives can set judgment modifiers. When a modifier is true, the element is allowed to be displayed.

There are two built-in judgment modifiers, one is **or**, the other is **and**. When there are no judgment modifiers, the default judgment is the same as ***or***.

①or：displays when the permission data contains one of these elements

②and：displays when the permission data contains all one element

```vue
<template>
  <div v-auth="['user']">
    or
  </div>

  <div v-auth.or="['user', 'admin']">
    or
  </div>

  <div v-auth.and="['user', 'admin']">
    and
  </div>
</template>

```

### 3.Arguments

useAuthDirective(App, AuthDirectiveOpts) provides options to modify some behaviors

**AuthDirectiveOpts**：

| name              | type           | description                                                  |
| ----------------- | -------------- | ------------------------------------------------------------ |
| data              | array\|funcion | Permission data. Supports both ordinary and asynchronous functions that need to return data for judgment purposes |
| key               | string         | Optional. When the permission data is an array of objects, you can specify a key for judging objects |
| flags             | Flags          | Optional. Add a new identifier to determine additional data  |
| directiveName     | string         | Optional. Directive name, default is auth, if you want to register other directive names, please provide this value |
| useDisplayControl | boolean        | Optional. Use the display to control. The default value is false |
| hookBeforeUpdate  | boolean        | Optional. The beforeUpdate period of the directive also controls the display. The default value is false |
| hideBeforeJudge   | boolean        | Optional. Hide the target element until judged. Default is false |

**Flags**

name: the judgment flag you wanted to add.

Refer to AuthDirectiveOpts for instructions on data and keys. If callback is specified, data is optional.

Callback supports both ordinary and asynchronous functions. The callback function needs to return a Boolean value to control whether to display, true for display, false for hide. The ***or*** and ***and*** modifiers cannot be used when callback is specified.

```typescript
type Flags = {
  [name: string]: {
    data?: Array<any> | (() => Array<any> | Promise<Array<any>>)
    key?: string
    callback?: (
      el: any,
      binding: DirectiveBinding<any>,
      vnode: VNode,
      preVnode?: VNode
    ) => boolean | Promise<boolean>
  }
}
```

```js
useAuthDirective(app, {
  data: () => {
    return ['user', 'admin']
  },
  flags: {
    status: {
      data: () => {
        return [1, 2, 3]
      },
    },
    test: {
      callback: () => {
        return true
      },
    }
  }
})
```

```html
<div v-auth:status="[1, 2, 3]">
  or
</div>

<div v-auth:status.and="[1, 2, 3]">
  and
</div>

<div v-auth:test="123">
  callback
</div>
```



## License

[MIT](http://opensource.org/licenses/MIT)

