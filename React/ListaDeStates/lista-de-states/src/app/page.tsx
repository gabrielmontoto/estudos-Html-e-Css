"use client";
import Image from "next/image";
import { useState } from "react";
import { TodoItem } from "./Types/TodoItem";

export default function Home() {
  const [itemInput, setItemInput] = useState("");

  const [list, setList] = useState<TodoItem[]>([
    { checked: false, label: "fazer tarefa" },
    { checked: false, label: "estudar" },
    { checked: false, label: "tomar vergonha na cara" },
  ]);

  function HandleAddButtonClick(): void {
    if (itemInput.trim() === "") return;
    setList([...list, { label: itemInput, checked: false }]);
    setItemInput("");
  }

  function handleDeleteItem(index: number): void {
    setList(list.filter((item, key) => key !== index));
  }

  function toggleItem(index: number): void {
    let newList = [...list];
    newList[index].checked = !newList[index].checked;

    setList(newList);
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center text-2xl">
      <h1 className="text-4xl mt-5">Lista de tarefas</h1>

      <div className="flex w-full max-w-lg my-3 p-4 rounded-md bg-gray-700 border-2 border-gray-500">
        <input
          type="text"
          placeholder="Escreva algo aqui"
          className="flex-1 border border-black p-3 text-2xl text-black rounded-md mr-3"
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
        />
        <button
          onClick={HandleAddButtonClick}
          className="bg-blue-600 p-4 hover:bg-blue-500"
        >
          {" "}
          add
        </button>
      </div>

      <ul className="w-full max-w-lg list-disc pl-5">
        {list.map((item, index) => (
          <li key={index}>
            <input
              onClick={() => toggleItem(index)}
              type="checkbox"
              checked={item.checked}
              onChange={() => {}}
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
        ))}
      </ul>
    </div>
  );
}
