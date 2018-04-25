const storage = {
  fetch() {
    const arr = []
    if (localStorage.length > 0) {
      const len = localStorage.length;
      for (let i = 0; i < len; i++) {
        let key = localStorage.key(i);
        if (key !== "loglevel:webpack-dev-server") {
          arr.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
      return arr
    }
  } 
}

const state = {
  todoItems: storage.fetch()
}

const getters = {
  storedTodoItems (state) {
    return state.todoItems
  }
}

const mutations = {
  addTodo (state, item) {
    const obj = {
      completed: false,
      item: item
    };
    localStorage.setItem(item, JSON.stringify(obj));
    state.todoItems.push(obj)
  },  
  removeTodo (state, payload) {
    localStorage.removeItem(payload.item.item);
    state.todoItems.splice(payload.idx, 1)
  },  
  toggleComplete (state, payload) {
    state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed
    // 로컬스토리지의 데이터 갱신
    localStorage.removeItem(payload.item)
    localStorage.setItem(payload.item, JSON.stringify(payload.item))
  },  
  clearTodo (state) {
    localStorage.clear()
    state.todoItems = []
  }
}

export default {
  state,
  getters,
  mutations
}