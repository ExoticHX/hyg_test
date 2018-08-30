import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  template: `
  <div>
  <input type="text" @input="handlerInput" :value="value1"/>
  </div>
  `,
  methods: {
    handlerInput (e) {
      this.$emit('change', e.target.value)
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
  template: `
  <div>
  <comp :value="value" @input="value = arguments[0]"></comp>
  <comp v-model="value"></comp>
  </div>`
})
