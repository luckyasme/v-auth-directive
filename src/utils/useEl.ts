export default (() => {
  const commentKey = `__v_auth_comment_el__`
  const originalDisplayKey = `__v_auth_original_display__`

  return (el: HTMLElement, show: boolean, useDisplayControl?: boolean) => {
    if (useDisplayControl) {
      if (show) {
        el.style.display = el[originalDisplayKey]
      } else {
        el[originalDisplayKey] = el.style.display
        el.style.display = 'none'
      }

      return
    }

    if (show) {
      if (el[commentKey] && el[commentKey].parentNode) {
        el[commentKey].parentNode.replaceChild(el, el[commentKey])
      }
    } else {
      if (!el[commentKey]) {
        const commentEl = document.createComment('')
        Object.defineProperty(commentEl, 'setAttribut', {
          value: () => undefined,
        })
        el[commentKey] = commentEl
      }

      if (el.parentNode) {
        el.parentNode.replaceChild(el[commentKey], el)
      }
    }
  }
})()
