import { useState } from "react";
import { TodoItem } from "../Types/TodoItem";

export const useItemInputState = () => {
  const [itemInput, setItemInput] = useState("");
  return { itemInput, setItemInput };
};

export const useTodoList = () => {
  const [list, setList] = useState<TodoItem[]>([
    { checked: false, label: "fazer tarefa" },
    { checked: false, label: "estudar" },
    { checked: false, label: "tomar vergonha na cara" },
  ]);

  return { list, setList };
};
