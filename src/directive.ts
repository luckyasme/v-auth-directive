import setElVisible from './utils/useEl'
import type { App, DirectiveBinding, VNode } from 'vue-demi'
import { AuthDirectiveOpts } from './declare'
import { useJudgeResult } from './utils/useJudge'

async function exec(
  opts: AuthDirectiveOpts,
  el: any,
  binding: DirectiveBinding<any>,
  vnode: VNode,
  preVnode?: VNode
) {
  const {
    flags = {},
    useDisplayControl = false,
    hideBeforeJudge = false,
  } = opts || {}

  if (hideBeforeJudge) {
    setElVisible(el, false, useDisplayControl)
  }

  setElVisible(
    el,
    await useJudgeResult(flags, el, binding, vnode, preVnode),
    useDisplayControl
  )
}

export function useAuthDirective(app: App<Element>, opts?: AuthDirectiveOpts) {
  const {
    directiveName = 'auth',
    data = [],
    key,
    flags = {},
    hookBeforeUpdate = false,
  } = opts || {}

  if (!flags.default) {
    flags.default = {
      key,
      data,
    }
  }

  app.directive(directiveName, {
    async created(el, binding, vnode) {
      exec(opts!, el, binding, vnode)
    },
    async beforeUpdate(el, binding, vnode, preVnode) {
      if (hookBeforeUpdate) {
        exec(opts!, el, binding, vnode, preVnode)
      }
    },
  })
}
