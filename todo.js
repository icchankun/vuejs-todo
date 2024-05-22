import { createApp, ref, onMounted, onBeforeUnmount } from "vue";

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

    const setTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos.value));
    };
    const addTodo = () => {
      todos.value.push({
        id: ++id.value,
        text: newTodoText.value,
        done: false,
      });
      newTodoText.value = "";
      setTodos();
      localStorage.setItem("id", todos.value.at(-1).id);
    };
    const deleteTodo = (selectedTodo) => {
      todos.value = todos.value.filter((todo) => todo !== selectedTodo);
      setTodos();
    };
    onMounted(() => {
      window.addEventListener("beforeunload", setTodos);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("beforeunload", setTodos);
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
