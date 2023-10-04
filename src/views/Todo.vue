  <script>
  import { ref, onMounted, computed, watch } from "vue";

  export default {
    name: "Todo",
    data() {
      return {
        name: "",
        input_content: "",
        input_category: null,
        todos: [],
        modal: false,
        edit_content: "",
        selected_todo: null,
      };
    },
    computed: {
      todos_asc() {
        return this.todos.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      },
    },
    methods: {
      addTodo() {
        if (this.input_content.trim() == "" || this.input_category == null) {
          return;
        }
        this.todos.push({
          id: Math.random()*1000,
          content: this.input_content,
          category: this.input_category,
          createdAt: Date.now(),
        });
        this.input_content = "";
        this.input_category = null;
      },
      removeTodo(todo) {
        this.todos = this.todos.filter((t) => t !== todo);
      },
      toggleModal(e) {
        if (e) {
          this.selected_todo = e;
        }
        this.edit_content = "";
        this.modal = !this.modal;
      },
      editHandler() {
        if (this.selected_todo && this.edit_content) {
          const find = this.todos.map((e) =>
            e == this.selected_todo ? (e.content = this.edit_content) : e
          );
        }

        this.edit_content = "";
        this.selected_todo = null;
        this.modal = !this.modal;
      },
    },
    watch: {
      todos: {
        handler(newVal) {
          localStorage.setItem("todos", JSON.stringify(newVal));
        },
        deep: true,
      },
    },
    mounted: function () {
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    },
  };
  </script>

  <template>
    <div class=" min-h-[590px]">
      <!-- create todo -->
      <section class="mx-auto create-todo border-t-2 w-[450px] mt-5 shadow-md p-4">
        <h3 class="text-center text-2xl text-gray-700">Create Todo</h3>
        <form @submit.prevent="addTodo">
          <input
            class="w-full bg-gray-200 rounded border-none text-black"
            type="text"
            placeholder="enter todo title"
            v-model="input_content"
          />

          <h3 class="text-center mt-3">Choose a category</h3>
          <div class="options flex justify-around">
            <label class="flex justify-start p-2 items-center">
              <input
                type="radio"
                name="category"
                value="business"
                v-model="input_category"
              />
              <p class="ml-4">Business</p>
            </label>
            <label class="flex justify-start p-2 items-center">
              <input
                type="radio"
                name="category"
                value="personal"
                v-model="input_category"
              />
              <p class="ml-4">Personal</p>
            </label>
          </div>
        
          <button
            class="mx-auto block border-none rounded w-60 h-8 text-[20px bg-violet-800 text-white outline-none"
            type="submit"
          >
            Add todo
          </button>
        </form>
      </section>
      <section class="mt-8 block mx-auto">
        <h3 class="text-center border-t-2 pt-2">TODO LIST</h3>

          <ul class="flex flex-wrap justify-center">
          <li
            class="flex w-[700px] align-middle justify-between border m-2 p-2"
            v-for="(todo, i) in todos_asc"
            :key="i"
          >
          
            <h2 :class="` ${todo.done} w-[50%]`">{{ todo.content }}</h2>
            <button
              @click="toggleModal(todo)"
              class="bg-orange-600 text-center text-white w-[12%]"
            >
              Edit
            </button>
            <button
              class="bg-red-600 text-center text-white w-[12%]"
              @click="removeTodo(todo)"
            >
              Delete
            </button>
            <router-link class='bg-blue-700 text-center text-white w-[12%]' :to="{name: 'subTodo', params: {id : todo.id}}">
            sub-todos
           </router-link>
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
