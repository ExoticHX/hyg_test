import Vue from 'vue'

const childComponent = {
  template: `
  <div>I'm child Component: {{ data.value }}</div>
  `,
  inject: ['grandpa', 'data'],
  mounted () {
    console.log(this.grandpa, this.data)
  }
}
const component = {
  components: {
    childComp: childComponent
  },
  template: `
  <div :style="style">
   <div class="header">
    <slot name="header"></slot>
   </div>
   <div class="body">
    <slot name="body"></slot>
   </div>
   <div class="footer">
    <slot value="123"></slot>
   </div>
   <childComp></childComp>
  </div>
  `, // slot插槽可以让调用该组件的vue实例放置内置内容，不然无法显示
  // 带name属性的为 具名插槽，scoped slot为作用域插槽
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
  provide () {
    const data = {}

    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      grandpa: this,
      data
    }
  }, // provide 需要vue实例和组件之间或者组件和组件之间有父子级别的关系，才能够生效
  data () {
    return {
      value: 123
    }
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.span1, this.$refs.span2, this.$refs.span3)
  },
  template: `
  <div>
  <comp ref="comp">
  <span slot="header" ref="span1">I'm Huangyingui</span>
  <span slot="body" ref="span2">I'm Huangyingui2</span>
  <span slot-scope="props" ref="span3">{{ props.value }} {{ value }}</span>
  </comp>
  <input type="text" v-model="value" />
  </div>`
})
