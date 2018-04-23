<template>
  <section>
      <ul>
          <li v-for="(item, index) in this.$store.state.todoItems" v-bind:key="item.item" class="shadow">
            <i class="checkBtn fas fa-check" 
                v-bind:class="{checkBtnCompleted: item.completed}" 
                v-on:click="toggleComplete(item, index)"></i>
            <span v-bind:class="{textCompleted: item.completed}">{{ item.item }}</span>
            <span class="removeBtn" v-on:click="removeTodo(item, index)">
                <i class="fas fa-trash-alt"></i>
            </span>
          </li>
      </ul>
  </section>
</template>

<script>
export default {
  methods: {
    removeTodo(item, idx) {
      const obj = {
        item,
        idx
      }
      this.$store.commit("removeTodo", {item, idx});
    },
    toggleComplete(itm, idx) {
      this.$store.commit("toggleComplete", {itm, idx});
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  padding-top: 0px;
  text-align: left;
}
li {
  display: flex;
  max-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: #fff;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
.textCompleted {
  color: #b3adad;
  text-decoration: line-through;
}
</style>
