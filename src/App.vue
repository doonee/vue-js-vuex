<template>
  <div id="app">
    <div>
      <TodoHeader />
    </div>
    <div>
      <TodoInput 
        v-on:addTodo="addTodo" />
    </div>
    <div>
      <TodoList 
        v-bind:propsdata="todoItems" 
        v-on:removeTodo="removeTodo" 
        v-on:toggleComplete="toggleComplete" />
    </div>
    <div>
      <TodoFooter
        v-on:clearTodo="clearTodo" />
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },
  data() {
    return {
      todoItems: []
    };
  },
  created() {
    if (localStorage.length > 0) {
      let len = localStorage.length;
      for (var i = 0; i < len; i++) {
        let key = localStorage.key(i);
        if (key !== "loglevel:webpack-dev-server") {
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  },
  methods: {
    addTodo(item) {
      var obj = {
        completed: false,
        item: item
      };
      localStorage.setItem(item, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeTodo(item, idx) {
      localStorage.removeItem(item.item);
      this.todoItems.splice(idx, 1);
    },
    toggleComplete(itm, idx) {
      this.todoItems[idx].completed = !this.todoItems[idx].completed;
      // 로컬스토리지의 데이터 갱신
      localStorage.removeItem(itm.item);
      localStorage.setItem(itm.item, JSON.stringify(itm));
    },
    clearTodo() {
      localStorage.clear();
      this.todoItems = []
    }
  }
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
