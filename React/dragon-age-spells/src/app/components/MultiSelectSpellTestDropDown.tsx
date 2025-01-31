import { useState } from "react";
import { Spells, SpellTest } from "../types/Spells";

type MultiSelectSpellTestDropDownProps = {
  spell: Spells;
  setSpell: (arg0: Spells) => void;
};

const MultiSelectSpellTestDropDown: React.FC<
  MultiSelectSpellTestDropDownProps
> = ({ spell, setSpell }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (spellTest: SpellTest) => {
    if (spell.test.includes(spellTest)) {
      setSpell({
        ...spell,
        test: spell.test.filter((item) => item !== spellTest),
      }); // Remove se já estiver selecionado
    } else {
      setSpell({ ...spell, test: [...spell.test, spellTest] }); // Adiciona ao array
    }
  };

  return (
    <>
      <p>Teste para resistir</p>
      <div className="relative p-4 w-64 text-black">
        <button
          onClick={toggleDropdown}
          className="w-full text-left p-2 border rounded-lg bg-white shadow-md"
        >
          {spell.test.length > 0
            ? spell.test.join(", ")
            : "Selecione os testes"}
          <span className="float-right">▼</span>
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-md">
            {Object.values(SpellTest).map((spellTest, index) => (
              <li
                key={index}
                onClick={() => handleSelect(spellTest)}
                className={`p-2 cursor-pointer ${
                  spell.test.includes(spellTest)
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={spell.test.includes(spellTest)}
                  readOnly
                  className="mr-2"
                />
                {spellTest}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MultiSelectSpellTestDropDown;
