import { createApp, ref, onMounted } from "vue";

const app = createApp({
  setup() {
    let id = 0;

    const newTodoText = ref("");
    const todos = ref([]);

    const addTodo = () => {
      todos.value.push({ id: id++, text: newTodoText.value, done: false });
      newTodoText.value = "";
      localStorage.setItem("todos", JSON.stringify(todos.value));
    };

    const deleteTodo = (selectedTodo) => {
      todos.value = todos.value.filter((todo) => todo !== selectedTodo);
      localStorage.setItem("todos", JSON.stringify(todos.value));
    };

    onMounted(() => {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        todos.value = JSON.parse(savedTodos);
      }
    });

    return {
      newTodoText,
      todos,
      addTodo,
      deleteTodo,
    };
  },
});

export { app };
