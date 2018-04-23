import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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

export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch()
  },
  mutations: {
    addTodo(state, item) {
      const obj = {
        completed: false,
        item: item
      };
      localStorage.setItem(item, JSON.stringify(obj));
      state.todoItems.push(obj)
    },
    removeTodo(state, payload) {
      localStorage.removeItem(payload.item.item);
      state.todoItems.splice(payload.idx, 1)
    },
    toggleComplete(state, payload) {
      state.todoItems[payload.idx].completed = !state.todoItems[payload.idx].completed
      // 로컬스토리지의 데이터 갱신
      localStorage.removeItem(payload.itm.item)
      localStorage.setItem(payload.itm.item, JSON.stringify(payload.itm))
    },
    clearTodo(state) {
      localStorage.clear()
      state.todoItems = []
    }
  }
})
