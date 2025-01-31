import { useState } from "react";
import {
  Graduation,
  MagicGraduation,
  SchoolType,
  Spells,
  SpellsNames,
} from "../types/Spells";

type PrerequisiteSelectorProps = {
  spell: Spells;
  setSpell: (arg0: Spells) => void;
};

const PrerequisiteSelector: React.FC<PrerequisiteSelectorProps> = ({
  spell,
  setSpell,
}) => {
  //   const [spellName, setSpellName] = useState<string>(""); // Estado para o nome do feitiço
  const [selectedGraduations, setSelectedGraduations] = useState<
    MagicGraduation[]
  >([]); // Estado para as graduações mágicas
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controle do dropdown para graduações

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleGraduationSelect = (graduation: MagicGraduation) => {
    const exists = selectedGraduations.find(
      (g) =>
        g.school === graduation.school && g.graduation === graduation.graduation
    );

    if (exists) {
      setSelectedGraduations(
        selectedGraduations.filter((g) => g !== exists) // Remove se já existir
      );
    } else {
      setSelectedGraduations([...selectedGraduations, graduation]); // Adiciona
    }
  };

  // Filtra opções para remover valores "vazio" ou "Empty"
  const filteredOptions = Object.values(SchoolType)
    .filter((school) => school !== SchoolType.Empty)
    .flatMap((school) =>
      Object.values(Graduation)
        .filter((graduation) => graduation !== Graduation.Empty)
        .map((graduation) => ({ school, graduation }))
    );

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Adicionar Pré-requisitos</h2>

      {/* Input para SpellName */}
      <div className="mb-4">
        <label className="block mb-2">Nome do Feitiço</label>
        <input
          type="text"
          value={spell.prerequisite[0] as SpellsNames} //TODO: redo this
          onChange={(e) =>
            setSpell({
              ...spell,
              prerequisite: [
                e.target.value as SpellsNames,
                ...selectedGraduations,
              ],
            })
          }
          placeholder="Digite o nome do feitiço"
          className="p-2 border rounded w-full text-black"
        />
      </div>

      {/* Multi-select para MagicGraduation */}
      <div className="mb-4 relative  text-black">
        <button
          onClick={toggleDropdown}
          className="w-full text-left p-2 border rounded-lg bg-white shadow-md"
        >
          {selectedGraduations.length > 0
            ? selectedGraduations
                .map((g) => `${g.school} - ${g.graduation}`)
                .join(", ")
            : "Selecione as graduações mágicas"}
          <span className="float-right">▼</span>
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-md">
            {filteredOptions.map((option) => (
              <li
                key={`${option.school}-${option.graduation}`}
                onClick={() => handleGraduationSelect(option)}
                className={`p-2 cursor-pointer ${
                  selectedGraduations.find(
                    (g) =>
                      g.school === option.school &&
                      g.graduation === option.graduation
                  )
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={
                    !!selectedGraduations.find(
                      (g) =>
                        g.school === option.school &&
                        g.graduation === option.graduation
                    )
                  }
                  className="mr-2"
                />
                {option.school} - {option.graduation}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PrerequisiteSelector;
