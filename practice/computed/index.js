import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
  <p>Name: {{ name }}</p>
  <p>Name: {{ getName() }}</p>
  <p>Number: {{ Number }}</p>
  <p>fullName: {{ fullName }}</p>
  <p><input type="text" v-model="Number"/></p>
  <p><input type="text" v-model="firstName"/></p>
  <p><input type="text" v-model="lastName"/></p>
  <p><input type="text" v-model="name"/></p>
  <p>obj.a:<input type="text" v-model="obj.a"/></p>
  </div>`,
  data: {
    firstName: 'Yingui',
    lastName: 'Huang',
    Number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  computed: {
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + ' ' + this.lastName
      },
      immediate: true,
      deep: true
    },
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true
      // deep: true
    }
  },
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
