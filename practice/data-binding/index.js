import Vue from 'vue'

new Vue({
  el: '#root',
  // :class="{ active : !isActived}" || :class="[ !isActived ? 'actived' : 'no actived']" || :class="[{ active : !isActiced }]"
  template: `<div
  :id="aaa"
  v-on:click="handleClick"
  :class="[{ active : !isActived }]"
  :style="styles">
  {{ isActived ? 'actived' : 'no actived' }},</br>
  {{ arr }},</br>
  {{ html }},
  <p v-html="html"></p>
  <p>{{ getJoinedArr(arr) }}</p>
  </div>`,
  data: {
    isActived: false,
    arr: [1, 2, 3],
    html: '<span>huangyingui</span>',
    aaa: 'main',
    styles: {
      color: 'purple',
      appearance: 'none'
    }
  },
  methods: {
    handleClick () {
      alert('click fine') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})
