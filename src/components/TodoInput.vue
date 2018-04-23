<template>
  <section class="inputBox">
      <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
      <span class="addContainer" v-on:click="addTodo">
          <i class="fas fa-plus addBtn"></i>
      </span>

    <Modal v-if="showModal" @close="showModal = false">
        <!--
        you can use custom content here to overwrite
        default content
        -->
        <div slot="header">
          경고!
          <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
        </div>
        <div slot="body">
          값이 없습니다.
        </div>
    </Modal>  

  </section>
</template>

<script>
import Modal from "./common/Modal.vue";

export default {
  components: {
    Modal
  },
  data() {
    return {
      newTodoItem: "",
      showModal: false
    };
  },
  methods: {
    addTodo() {
      if (this.newTodoItem === '') {
        this.showModal = true;
      } else {
        const str = this.newTodoItem.trim()
        this.$store.commit("addTodo", str);
        this.clearInput();
      }
    },
    clearInput() {
      this.newTodoItem = "";
    }
  }
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: #fff;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0, 5px 5px 0;
}
.addBtn {
  color: #fff;
  vertical-align: middle;
}
.closeModalBtn {
  color: #42b983;
}
</style>
