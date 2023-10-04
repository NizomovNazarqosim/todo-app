<script>

  import { ref, onMounted, computed, watch } from "vue";
export default {
  
    data(){
        return{
            id: this.$route.params.id,
            todos: [],
            subTodos: [],
            name: "",
            sorted_sub_todos:[],
            input_content: "",
            modal: false,
            edit_content: "",
            selected_todo: null,
        }
    },
    mounted: function () {
      // this.id = this.$route.params.id || null;
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
      this.subTodos = JSON.parse(localStorage.getItem("sub_todos")) || [];
    },
    computed: {
      selectedTodo(){
        if(this.id && this.todos){
            return  this.todos.filter((e, i) => e.todo_id==this.id)
        }
        return 'Not found'
      },
      sorted_sub_todos() {
        return this.subTodos.filter((e, i) => e?.todo_id == this?.id)
      },
    },
    methods:{
      addSubTodo() {
        if (this.input_content.trim() == "") {
          return;
        }
        this.subTodos.push({
          id: Math.random()*1000,
          content: this.input_content,
          createdAt: Date.now(),
          done: false,
          todo_id: this?.id,
        });
        this.input_content = "";
      },
      removeTodo(todo) {
        this.subTodos = this.subTodos.filter((t) => t !== todo);
      },
      toggleModal(e) {
        if (e) {
          this.selected_todo = e;
        }
        this.edit_content = "";
        this.modal = !this.modal;
      },
      editHandler() {
        if (this.subTodos && this.edit_content) {
          const find = this.subTodos.map((e) =>
            e == this.selected_todo ? (e.content = this.edit_content) : e
          );
        }

        this.edit_content = "";
        this.selected_todo = null;
        this.modal = !this.modal;
      },
    },
    watch: {
      subTodos: {
        handler(newVal) {
          localStorage.setItem("sub_todos", JSON.stringify(newVal));
        },
        deep: true,
      },
    },


}
</script>



<template>
    <div class='min-h-[590px]' >
      <!-- <h2 class="flex justify-center text-2xl items-center">This is related  <span class="text-3xl text-blue-600 px-1 py-1">{{ selectedTodo[0].content }}</span> todos</h2> -->
      <!--starting form part -->
      <section class="mx-auto create-todo border-t-2 w-[450px] mt-5 shadow-md p-4">
        <h3 class="text-center text-2xl text-gray-700">Create Sub Todo</h3>
        <form @submit.prevent="addSubTodo">
          <input
            class="w-full bg-gray-200 rounded border-none text-black mt-3"
            type="text"
            placeholder="enter sub-todo title"
            v-model="input_content"
          />
          <button
            class="mx-auto block border-none rounded w-60 h-8 text-[20px bg-violet-800 text-white outline-none mt-5"
            type="submit"
          >
            Add todo
          </button>
        </form>
      </section>
      <section class="mt-8 block mx-auto">
        <h3 class="text-center border-t-2 pt-2">SUB-TODO LIST</h3>

          <ul class="flex flex-wrap justify-center">
          <li
            class="flex w-[700px] align-middle justify-between border m-2 p-2"
            v-for="(subtodo, i) in sorted_sub_todos"
            :key="i"
          >
          <input type="checkbox" v-model="subtodo.done" />
          
            <h2 :class="` ${subtodo.done} w-[50%]`">{{ subtodo.content }}</h2>
            <button
              @click="toggleModal(subtodo)"
              class="bg-orange-600 text-center text-white w-[12%]"
            >
              Edit
            </button>
            <button
              class="bg-red-600 text-center text-white w-[12%]"
              @click="removeTodo(subtodo)"
            >
              Delete
            </button>
          </li>
        </ul>
      </section>

      
    <div class="modal" v-if="modal">
        <div class="modal-inner">
          <input type="text" v-model="edit_content" />
          <div class="flex justify-between">
            <button
              @click="editHandler()"
              class="modal-close w-[80px] h-[25px] border text-white bg-orange-500 mt-4">
              Submit
            </button>
            <button
              @click="toggleModal()" class="modal-close w-[80px] h-[25px] border text-white bg-red-600 mt-4">
              Cancel
            </button>
          </div>
        </div>
      </div>

    </div>  
      <!--ending form part  -->
</template>

  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-inner {
    background: #fff;
    padding: 32px;
  }
  </style>
