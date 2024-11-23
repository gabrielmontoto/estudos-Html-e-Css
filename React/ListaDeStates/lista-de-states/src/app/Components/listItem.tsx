"use client";

import { useTodoList } from "../Consts/Consts";
import { TodoItem } from "../Types/TodoItem";

export function listItem(index: number, item: TodoItem) {
  const { list, setList } = useTodoList();

  function handleDeleteItem(index: number): void {
    setList(list.filter((_, key) => key !== index));
  }

  function toggleItem(index: number): void {
    const newList = [...list]; // Use o estado já desestruturado
    newList[index].checked = !newList[index].checked;
    setList(newList); // Atualize o estado com o novo array
  }

  return (
    <li key={index}>
      <input
        onClick={() => toggleItem(index)}
        type="checkbox"
        checked={item.checked}
        className="w-6 h-6 mr-3"
      />
      {item.label} -{" "}
      <button
        onClick={() => handleDeleteItem(index)}
        className="hover:underline"
      >
        [Deletar]
      </button>
    </li>
  );
}
