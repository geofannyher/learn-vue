import './assets/main.css'

import App from './App.vue'
import { createApp } from 'vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  HiSolidTrash,
  HiSolidPlusCircle,
  GiAncientSword,
  HiSolidCheckCircle,
  HiSolidPencilAlt,
} from 'oh-vue-icons/icons'

addIcons(
  HiSolidTrash,
  HiSolidPlusCircle,
  GiAncientSword,
  HiSolidCheckCircle,
  HiSolidPencilAlt,
)
const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.mount('#app')
