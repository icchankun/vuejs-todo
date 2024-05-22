import { createApp, ref, onMounted } from "vue";

const app = createApp({
  setup() {
    const newTodoText = ref("");
    const todos = ref([]);

    const fetchSavedId = () => {
      const savedId = localStorage.getItem("id");
      return savedId ? JSON.parse(savedId) : 0;
    };

    const id = ref(fetchSavedId());

    const addTodo = () => {
      todos.value.push({
        id: ++id.value,
        text: newTodoText.value,
        done: false,
      });
      newTodoText.value = "";
      localStorage.setItem("todos", JSON.stringify(todos.value));
      localStorage.setItem("id", todos.value.at(-1).id);
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
