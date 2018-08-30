import Vue from 'vue'

const component = {
  props: {
    active: {
      type: Boolean,
      required: true, // 代表这个参数必要要传入，不然会报相关warning
      validator (value) {
        return typeof value === 'boolean'
      }
      // default: false // 一般不与required同时出现，如果default是一个对象，必须采用default方法加return一个对象，如下面data里面
    },
    propOne: String
    // onChange: Function 推荐使用下面的emit触发事件
  }, // 通过props来增加组件的一些行为，补全差异性
  // 或者用下面这个写法,但下面的方法不太严谨
  // props: ['active', 'propOne'],
  template: `<div>
  <p>This is a component!</p>
  <input type="text" v-model.number="text5"/>
  <p>{{ text1 }}</p>
  <p>{{ text2 }}</p>
  <p>{{ text3 }}</p>
  <p>{{ text4 }}</p>
  <p v-show="active">You can see me if you have actived me!</p>
  <span @click="handlerchange">{{ propOne }}</span>
  </div>`,
  // mounted () {
  //   this.propOne = 'inner join'
  // }, // 不建议通过组件内部来修改props里面的内容,会报warning
  data () {
    // return data1
    return {
      text1: '对面的姑娘好漂亮！',
      text2: '咿呀咿呀呦！',
      text3: '教官：喊口令，跟上步伐！',
      text4: '左脚，右脚，左脚左脚右脚！',
      text5: 0
    } // 不能直接写为data: {},必须为一个data () {}方法，并用return返回数据
  },
  methods: {
    handlerchange () {
      // this.onChange()
      this.$emit('change') // 提交change事件触发
    }
  }
}

// Vue.component('CompOne', component)  // 全局使用组件

new Vue({
  components: {
    CompOne: component // 局部地方使用
  },
  el: '#root',
  data: {
    prop1: 'text1'
  },
  methods: {
    handlerchange () {
      this.prop1 += 1
    }
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  template: `<div>
  <comp-one ref="comp1" :active="false" :prop-one="prop1" @change="handlerchange"></comp-one>
  <comp-one :active="true" propOne="tex2" :on-change="handlerchange"></comp-one>
  </div>` // 这里的propOne在实例模板中不推荐这么写，而是推荐上面的
})
