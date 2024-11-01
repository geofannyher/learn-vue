<script setup>
import Button from './ui/button/Button.vue'
const valueProps = defineProps({
  content: { type: String, required: true },
  due: { type: String, required: true },
  time: { type: String, required: true },
  clickDelete: { type: Function, required: true },
  clickDone: { type: Function, required: true },
  clickEdit: { type: Function, required: true },
})
</script>
<template>
  <div class="border mt-2 p-2 flex items-center justify-between rounded-lg">
    <div>
      <h1 class="text-base font-semibold">{{ content }}</h1>
      <span class="text-xs"
        >Due Date Task :{{ new Date(due).toLocaleDateString() }}
        {{ new Date(due).toLocaleTimeString() }}</span
      >
    </div>
    <div class="flex gap-2">
      <Button :onClick="clickDone">
        <v-icon name="hi-solid-check-circle"
      /></Button>
      <Button :onClick="clickEdit">
        <v-icon name="hi-solid-pencil-alt"
      /></Button>
      <Button :onClick="clickDelete"> <v-icon name="hi-solid-trash" /></Button>
    </div>
  </div>
</template>
