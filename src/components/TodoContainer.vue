<script setup>
import { onMounted, ref } from 'vue'
import {
  getTodos,
  addTodo,
  deleteTodo,
  markTodoAsDone,
  editTodo,
} from '@/service/todo.service'
import TodoItem from './TodoItem.vue'
import Button from './ui/button/Button.vue'
import Input from './ui/input/Input.vue'
import { useToast } from './ui/toast/use-toast'
import Toaster from './ui/toast/Toaster.vue'
import Sheet from './ui/sheet/Sheet.vue'
import SheetContent from './ui/sheet/SheetContent.vue'
import SheetHeader from './ui/sheet/SheetHeader.vue'
import SheetTitle from './ui/sheet/SheetTitle.vue'
import SheetDescription from './ui/sheet/SheetDescription.vue'

const loading = ref(false)
const post = ref([])
const inputTodo = ref('')
const selectedTodo = ref(null)
const openModal = ref(false)
const { toast } = useToast()

const loadTodos = async () => {
  loading.value = true
  try {
    post.value = await getTodos()
  } finally {
    loading.value = false
  }
}
const handleAddTodo = async () => {
  try {
    await addTodo(inputTodo.value)
    notifySuccess('Add Task', 'Success Add Task')
    inputTodo.value = ''
    await loadTodos()
  } catch (error) {
    console.error('Error adding task:', error)
  }
}

const handleDeleteTodo = async id => {
  try {
    await deleteTodo(id)
    notifySuccess('Delete Task', 'Success Delete Task')
    await loadTodos()
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

const handleDoneTodo = async id => {
  try {
    await markTodoAsDone(id)
    notifySuccess('Done Task', 'Success Done Task')
    await loadTodos()
  } catch (error) {
    console.error('Error marking task as done:', error)
  }
}

const handleSaveTodo = async () => {
  try {
    await editTodo(selectedTodo.value.id, selectedTodo.value.content)
    await loadTodos()
    openModal.value = false
  } catch (error) {
    console.error('Error saving task:', error)
  }
}

const notifySuccess = (title, description) => {
  toast({ title, description })
}

onMounted(() => {
  loadTodos()
})
</script>

<template>
  <Toaster />
  <div class="h-[600px] w-full">
    <div class="mb-5">
      <h1 class="text-center font-bold text-3xl">TODO APP</h1>
    </div>
    <div class="flex gap-2 items-center">
      <Input placeholder="Masukkan Todo" v-model="inputTodo" />
      <Button :onClick="handleAddTodo">
        Add Todo
        <v-icon name="hi-solid-plus-circle" />
      </Button>
    </div>
    <Sheet :open="openModal">
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Todo</SheetTitle>
          <SheetDescription>
            Ubah konten todo di sini, lalu klik save untuk menyimpan.
          </SheetDescription>
        </SheetHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="content" class="text-right">Content</Label>
            <Input
              id="content"
              v-model="selectedTodo.content"
              class="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <Button type="submit" @click="handleSaveTodo">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    <div class="text-center mt-10" v-if="loading">Loading...</div>
    <div
      class="text-center mt-10"
      v-else-if="Array.isArray(post) && post.length === 0"
    >
      Tidak ada todo yang tersedia
    </div>
    <TodoItem
      v-else
      v-for="({ due, content, id }, index) in post"
      :key="index"
      :content="content"
      :due="due.datetime"
      :clickEdit="() => openEditSheet({ content, id })"
      :clickDone="() => handleDoneTodo(id)"
      :clickDelete="() => handleDeleteTodo(id)"
    />
  </div>
</template>

<style>
* {
  font-family: monospace;
}
</style>
