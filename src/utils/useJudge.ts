import type { DirectiveBinding, VNode } from 'vue-demi'
import { Flags } from '../declare'

export async function useJudgeResult(
  flags: Flags,
  el: any,
  binding: DirectiveBinding<any>,
  vnode: VNode,
  preVnode?: VNode
) {
  const arg = binding.arg || 'default'

  let data = flags[arg].data
  if (typeof data === 'function') {
    data = await data()
  }

  if (typeof flags[arg].callback === 'function') {
    return await flags[arg].callback!(el, binding, vnode, preVnode)
  }

  const val = binding.value
  if (Array.isArray(val)) {
    const key = flags[arg].key
    if (key) {
      return binding.modifiers.and
        ? val.every((v) => (data as any[]).find((e) => e[key] === v))
        : val.some((v) => (data as any[]).find((e) => e[key] === v))
    } else {
      return binding.modifiers.and
        ? val.every((e) => (data as any[]).includes(e))
        : val.some((e) => (data as any[]).includes(e))
    }
  }

  return !!val
}
