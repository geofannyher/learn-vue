<script setup>
import Button from './ui/button/Button.vue'
const classBtn = defineProps({ openClass: String })
defineEmits(['action'])
</script>
<template>
  <Button
    class="transition hover:scale-95"
    @click="$emit('action')"
    :class="classBtn.openClass"
    ><slot />
  </Button>
</template>
