import { DirectiveBinding, VNode } from 'vue-demi'

export type Flags = {
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

export type AuthDirectiveOpts = {
  data: Array<any> | (() => Array<any> | Promise<Array<any>>)
  key?: string
  flags?: Flags
  directiveName?: string
  useDisplayControl?: boolean
  hookBeforeUpdate?: boolean
  hideBeforeJudge?: boolean
}
