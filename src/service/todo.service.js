const API_URL = import.meta.env.VITE_TODOIST_URL
const API_KEY = import.meta.env.VITE_TODOIST_KEY

const fetchTodoistData = async (url, options) => {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error('Network response was not ok')
  return await response.json()
}

const getTodos = async () => {
  const url = `${API_URL}/rest/v2/tasks`
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }
  return await fetchTodoistData(url, options)
}

const addTodo = async content => {
  const url = `${API_URL}/rest/v2/tasks`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      content,
      due_string: 'tomorrow at 12:00',
      due_lang: 'en',
      priority: 4,
    }),
  }
  return await fetchTodoistData(url, options)
}

const deleteTodo = async id => {
  const url = `${API_URL}/rest/v2/tasks/${id}`
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  }
  return await fetchTodoistData(url, options)
}

const markTodoAsDone = async id => {
  const url = `${API_URL}/rest/v2/tasks/${id}/close`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  }
  return await fetchTodoistData(url, options)
}

const editTodo = async (id, content) => {
  const url = `${API_URL}/rest/v2/tasks/${id}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ content }),
  }
  return await fetchTodoistData(url, options)
}

export { getTodos, addTodo, deleteTodo, markTodoAsDone, editTodo }
