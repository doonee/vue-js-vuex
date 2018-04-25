const addTodo = (state, item) => {
  const obj = {
    completed: false,
    item: item
  };
  localStorage.setItem(item, JSON.stringify(obj));
  state.todoItems.push(obj)
}

const removeTodo = (state, payload) => {
  localStorage.removeItem(payload.item.item);
  state.todoItems.splice(payload.idx, 1)
}

const toggleComplete = (state, payload) => {
  state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed
  // 로컬스토리지의 데이터 갱신
  localStorage.removeItem(payload.item)
  localStorage.setItem(payload.item, JSON.stringify(payload.item))
}

const clearTodo = (state) => {
  localStorage.clear()
  state.todoItems = []
}

export { addTodo, removeTodo, toggleComplete, clearTodo }