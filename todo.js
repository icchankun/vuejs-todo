import { createApp, ref } from "vue";

const app = createApp({
  setup() {
    const newTodoText = ref("");

    const fetchSavedId = () => {
      const savedId = localStorage.getItem("id");
      return savedId ? JSON.parse(savedId) : 0;
    };
    const fetchSavedTodos = () => {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    };

    const id = ref(fetchSavedId());
    const todos = ref(fetchSavedTodos());

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

    return {
      newTodoText,
      todos,
      addTodo,
      deleteTodo,
    };
  },
});

export { app };
