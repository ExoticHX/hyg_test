import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>This is {{ text }} {{ obj.a }}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: {
  //   text (newText, oldText) {
  //     console.log(`${newText} : ${oldText}`)
  //   }
  // }
})

app.$mount('#root')

let i = 0
setInterval(() => {
  i++
  // app.text += 1
  // app.obj.a = app.text
  // app.obj.a = i
  app.$set(app.obj, 'a', i)
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// console.log(app.$children)
// console.log(app.$scopedSlots)
// console.log(app.$slots)
// console.log(app.$refs)
// console.log(app.$isServer)

// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)

app.$once('test', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
setInterval(() => {
  app.$emit('test', 3, 4)
}, 1000)

// app.$forceUpdate() 强制再次渲染
