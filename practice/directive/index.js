import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
  <div>
  <div v-text="text"></div>
  <div v-show="active">{{ text }}</div>
  <div v-if="active">{{ text }}</div>
  <div v-else>else content</div>
  <div>
  <input type="text" v-model="text">
  <input type="checkbox" v-model="active">
  </div>
  <div>
  <input type="checkbox" :value="1" v-model="arr">
  <input type="checkbox" :value="1" v-model="arr">
  <input type="checkbox" :value="1" v-model="arr">
  </div>
  <div>
  <input type="radio" value="one" v-model="picked">
  <input type="radio" value="two" v-model="picked">
  </div>
  <ul>
  <li v-for="(item, index) in arr">{{ item }} : {{ index }}</li>
  </ul>
  <ul>
  <li v-for="(value, key) in obj">{{ value }} : {{ key }}</li>
  </ul>
  </div>`,
  data: {
    arr: [1, 2, 3, 4],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    active: true
  }
})
