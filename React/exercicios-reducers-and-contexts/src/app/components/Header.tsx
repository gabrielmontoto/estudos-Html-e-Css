import { useContext, useState } from "react";
import { PostContext } from "../contexts/PostContext";

export const Header = () => {
  const postCtx = useContext(PostContext);

  const [tittleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  const handleAddButton = () => {
    if (tittleInput && bodyInput) {
      postCtx?.addPost(tittleInput, bodyInput);
      setTitleInput("");
      setBodyInput("");
    }
  };

  return (
    <header>
      <h1 className="text-3xl">titulo</h1>

      <div className="max-w-xs my-4 flex flex-col gap-3 border border-dotted border-gray-400 p-3 ">
        <input
          type="text"
          placeholder="Digite o titulo"
          id=""
          className="border-gray-300 p-2 text-black text-xl"
          value={tittleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <textarea
          placeholder="Digite o texto"
          id=""
          className="h-24 border-gray-300 p-2 text-black text-xl"
          value={bodyInput}
          onChange={(e) => setBodyInput(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-400 p-3 text-white rounded-md"
          onClick={handleAddButton}
        >
          Adicionar
        </button>
      </div>
    </header>
  );
};
