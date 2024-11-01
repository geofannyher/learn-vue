<script setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  warn,
  watch,
  watchEffect,
} from 'vue'
import ItemsSample from './ItemsSample.vue'

const handleClick = () => {
  numberNih.value++
  console.log(numberNih?.value)
}

let numberNih = ref(0)
const numberNih2 = reactive({
  nilai: 0,
})
const check = { id: ref(0) }

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    ;[firstName.value, lastName.value] = newValue
  },
})

const count = ref(2)
let sibal = ref(0)

const alwaysSmall = computed(previous => {
  if (count.value <= 3) {
    return count.value
  }
  return previous
})
console.log(fullName.value, alwaysSmall.value)
const cehckNum = computed(() =>
  numberNih?.value > 5 ? 'Lebih dari 5' : 'Belum lebih dari 5',
)
const ganti = () => {
  count.value = 10
}
console.log(alwaysSmall.value)

const handleSibal = () => {
  sibal.value = 10
}
const dataMhs = ref([
  { message: 'Foo', name: 'yoo', age: 24, detail: [{ address: 'Jember' }] },
  { message: 'Bar', name: 'yoos', age: 24, detail: [{ address: 'Jember' }] },
])
let vshownih = true

const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10',
})
// `items` is a ref with array value
const cariAge = computed(() => {
  return dataMhs.value.filter(item => item.age > 20)
})

// function warn() {
// now we have access to the native event
// }
const question = ref('')
const data = ref('')
watchEffect(async () => {
  console.log('trigged')
  if (myObject.author == 'hella') {
    console.log(true)
  }
  if (question.value.length > 9) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${question.value}`,
    )
    data.value = await response.json()
  }
})
console.log(data.value)
</script>
<template lang="html">
  <div>
    <button :class="ubah">Ini header</button>
    <span class="$attrs.class">{{ numberNih }}</span>
    <!-- <slot >Ini header</slot> -->
    <span>{{ cehckNum }}</span>
    <br />
    <span>count , {{ count }}, Hai</span>
    <br />
    <span>{{ alwaysSmall }}, Hai</span>
    <!-- <span>{{ objectReactive.count }}</span> -->
    <button
      :style="{
        'font-size': 100,
      }"
      @click="ganti"
    >
      Ini header
    </button>

    <button @click="() => (myObject.author = 'hella')">Tampilkan</button>

    <span v-if="sibal > 1">Sibal</span>
    <span v-if="sibal < 1">ya</span>
    <h1 ref v-show="vshownih">Hello!</h1>
  </div>
  <div v-if="vshownih">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </div>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
  <div v-for="({ name, age, message, detail }, index) in dataMhs" :key="index">
    <div v-if="age > 20">
      <h1>{{ name }}</h1>
      <h1>{{ age }}</h1>
      <h1>{{ message }}</h1>
      <div v-for="item in detail">
        <div>Detail Info</div>
        <h1>Alaman Lengkap : {{ item?.address }}</h1>
      </div>
    </div>
  </div>
  <div v-for="(items, key, index) in myObject" :key="index">
    <span>{{ key }} - {{ items }}</span>
    <button @click.right="() => console.log('halo')">Click Here</button>
  </div>
  <span v-for="n in 10">{{ n }}</span>
  <ItemsSample
    v-for="({ name }, index) in cariAge"
    :key="index"
    :title="name"
    @remove="dataMhs.shift()"
  />
  <!-- <form @submit.prevent=""></form> -->
  <!-- <input @dblclick="() => console.log('hahaha')" /> -->
  <button @click.stop.prevent>Coba event</button>

  <form @submit.prevent="event => console.log(event.target)">
    <div>
      <label for="name">Name</label>
      <!-- <input :value="text" @input="event => (text = event.target.value)" /> -->
      <input type="text" v-model="text" />
    </div>
    <button>Submit</button>
    <input type="checkbox" value="yoo" v-model="checkNameModel" />
    <label for="checkNameModel">Jack</label>
    <div>Checked names: {{ checkNameModel }}</div>

    <div>Picked: {{ picked }}</div>

    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>

    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
  </form>
</template>

<style scoped></style>
