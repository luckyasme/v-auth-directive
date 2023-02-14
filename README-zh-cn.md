[English](./README.md) | [简体中文](./README-zh-cn.md)

# v-auth-directive

> 灵活可拓展的vue3/vue2权限校验指令

- 😀支持vue3和vue2（若vue2小于2.7需引用@vue/composition-api）
- 😁其它点还没想好怎么吹...




## 安装

```
# or pnpm or yarn
npm install v-auth-directive
```

如果你使用Vue2，并且Vue2的版本小于2.7，可能还需要安装`@vue/composition-api`:

```
npm install v-auth-directive @vue/composition-api
```



## 用法

### 1.注册指令

可以新建一个文件

```js
//vue3
import { createApp } from 'vue'
import { useAuthDirective } from 'v-auth-directive'
import App from './App.vue'

const app = createApp(App)
useAuthDirective(app, {
  data: () => {
    return ['user', 'admin'] //当前用户的权限数据
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
    return ['user', 'admin'] //当前用户的权限数据
  }
})

new Vue({
  el: '#app',
})
```

### 2.使用

指令可以设置判断修饰符，当一个修饰符的判断成立时，则代表该元素允许显示。

内置两种判断修饰符，一个是***or***，另外一个是***and***。当没有任何判断修饰符时，默认判断与***or***一样。

①or：当权限数据包含其中一个元素时显示

②and：当权限数据包含所有一个元素时显示

```vue
<template>
  <div v-auth="['user']">
    默认or判断
  </div>

  <div v-auth.or="['user', 'admin']">
    or判断
  </div>

  <div v-auth.and="['user', 'admin']">
    and判断
  </div>
</template>

```

### 3.其它选项

useAuthDirective(App, AuthDirectiveOpts)支持提供选项来修改一些行为

**AuthDirectiveOpts**可提供如下参数：

| 参数名            | 类型           | 说明                                                         |
| ----------------- | -------------- | ------------------------------------------------------------ |
| data              | array\|funcion | 权限数据，支持普通函数和异步函数，该函数需要返回用于判断的数据 |
| key               | string         | 可空。当权限数据为对象数组时，可以指定用于判断对象key        |
| flags             | Flags          | 可空。添加新的标识判断另外的数据                             |
| directiveName     | string         | 可空。指令注册名称，默认为auth，如果要注册其它指令名称，请提供该值 |
| useDisplayControl | boolean        | 可空。使用style的display控制显示，默认为false                |
| hookBeforeUpdate  | boolean        | 可空。在指令的beforeUpdate时期也进行控制显示的判断，默认为false |
| hideBeforeJudge   | boolean        | 可空。在判断之前先将目标元素隐藏，默认为false                |

**Flags**类型说明（不想列表格了，看得懂ts的就看吧...）

name为你要添加新的判断标识

data和key的说明参考AuthDirectiveOpts，若指定callback，则data可空。

callback支持普通函数和异步函数，该函数需要返回一个布尔值控制是否显示，true为显示，false为隐藏。当指定了callback后or和and修饰符将无法使用。

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

注册新的判断标识

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
  默认or判断
</div>

<div v-auth:status.and="[1, 2, 3]">
  and判断
</div>

<div v-auth:test="123">
  使用callback，传递数据可以随便传
</div>
```



## 使用协议

[MIT](http://opensource.org/licenses/MIT)
