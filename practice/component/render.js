import Vue from 'vue'

const component = {
  props: [ 'prop' ],
  // template: `
  // <div :style="style">
  // <slot></slot>
  // </div>
  // `,
  render (createElement) {
    return createElement('div',
      {
        style: this.style
        // on: {
        //   click: () => this.$emit('click')
        // }
      },
      [
        this.$slots.header,
        this.prop
      ])
  }, // this.$slots.default是当slot没有名字时使用，否则使用$slots.name
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid purple'
      }
    }
  }
}

new Vue({
  el: '#root',
  components: {
    Comp: component
  },
  data () {
    return {
      value: 123
    }
  },
  methods: {
    handler () {
      console.log(this.value)
    }
  },
  // template: `
  // <div>
  // <comp ref="comp">
  // <span ref="span1">{{ value }}</span>
  // </comp>
  // </div>`,
  render (createElement) {
    return createElement('comp',
      {
        ref: 'comp',
        props: {
          prop: this.value
        },
        // on: {
        //   click: this.handler
        // },
        nativeOn: {
          click: this.handler
        } // nativeOn会自动绑定在组件的原生DOM节点上，不需要再做emit触发
      },
      [
        createElement('span', {
          ref: 'span1',
          slot: 'header',
          domProps: {
            innerHTML: '<span>Huangyingui</span>'
          },
          attrs: {
            id: 'hyg'
          }
        }, this.value)
      ])
  }
})
