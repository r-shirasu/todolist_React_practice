export const Config = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3004/todoList";
  } else if (process.env.NODE_ENV === "production") {
    return "http://localhost:3004/todoList";
  }
};
