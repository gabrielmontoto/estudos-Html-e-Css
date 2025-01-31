import { useState } from "react";
import {
  ActionType,
  Graduation,
  SchoolType,
  Spells,
  SpellsNames,
  SpellTest,
} from "../types/Spells";
import MultiSelectSpellTestDropDown from "./MultiSelectSpellTestDropDown";
import PrerequisiteSelector from "./PrerequesiteComponent";

export const CreateSpell = () => {
  // const [spells, setSpells] = useState<Spells[]>([]);
  const [spell, setSpell] = useState<Spells>({
    name: "",
    school: SchoolType.Empty,
    manaCost: "",
    actionTime: ActionType.Empty,
    NA: 0,
    baseDamage: "",
    test: [SpellTest.Empty],
    prerequisite: [
      SpellsNames.Empty,
      { school: SchoolType.Empty, graduation: Graduation.Empty },
    ],
    duration: "",
    extraDuration: "",
    extraManaCost: "",
    extraDamage: "",
    description: "",
  });

  const emptySpell: Spells = {
    name: "",
    school: SchoolType.Empty,
    manaCost: "",
    actionTime: ActionType.Empty,
    NA: 0,
    baseDamage: "",
    test: [SpellTest.Empty],
    prerequisite: [
      SpellsNames.Empty,
      { school: SchoolType.Empty, graduation: Graduation.Empty },
    ],
    duration: "",
    extraDuration: "",
    extraManaCost: "",
    extraDamage: "",
    description: "",
  };

  const handleAddButton = async () => {
    if (spell) {
      console.log(spell);

      await fetch("http://localhost:3001/spellsJson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spell),
      });

      setSpell(emptySpell);
      console.log(emptySpell);
      console.log(spell);
    }
  };

  return (
    <div>
      <div className="max-w-xs my-4 flex flex-col gap-3 border border-dotted border-gray-400 p-3 ">
        <h1>Create Spell</h1>
        {sendSpellName(spell, setSpell)}
        {sendSpellSchool(spell, setSpell)}
        {sendManaCost(spell, setSpell)}
        {sendActionType(spell, setSpell)}
        {sendTargetNumber(spell, setSpell)}
        <MultiSelectSpellTestDropDown spell={spell} setSpell={setSpell} />
        <PrerequisiteSelector spell={spell} setSpell={setSpell} />
        {sendDuration(spell, setSpell)}
        {sendExtraDuration(spell, setSpell)}
        {sendExtraManaCost(spell, setSpell)}
        {sendSpellDescription(spell, setSpell)}
        <button
          className="bg-blue-400 p-3 text-white rounded-md"
          onClick={handleAddButton}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};
function sendSpellDescription(spell: Spells, setSpell: (arg0: Spells) => void) {
  return (
    <>
      <p>Descrição</p>
      <textarea
        placeholder="Digite o texto"
        id=""
        className="h-24 border-gray-300 p-2 text-black text-xl"
        value={spell.description}
        onChange={(e) => setSpell({ ...spell, description: e.target.value })}
      ></textarea>
    </>
  );
}

const sendSpellSchool = (spell: Spells, setSpell: (arg0: Spells) => void) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSpell({ ...spell, school: event.target.value as SchoolType });
  };

  return (
    <div className="p-4">
      <label
        htmlFor="school-dropdown"
        className="block mb-2 text-lg font-semibold"
      >
        Escolha uma escola:
      </label>
      <select
        id="school-dropdown"
        value={spell.school}
        onChange={handleSelect}
        className="p-2 border rounded-lg w-full text-black"
      >
        <option value="" disabled>
          -- Selecione --
        </option>
        {Object.values(SchoolType).map((school, index) => (
          <option className="text-black" key={index} value={school}>
            {school}
          </option>
        ))}
      </select>
    </div>
  );
};

const sendActionType = (spell: Spells, setSpell: (arg0: Spells) => void) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSpell({ ...spell, actionTime: event.target.value as ActionType });
  };

  return (
    <div className="p-4">
      <label
        htmlFor="action-type-dropdown"
        className="block mb-2 text-lg font-semibold"
      >
        Escolha um tipo de ação:
      </label>
      <select
        id="action-type-dropdown"
        value={spell.actionTime}
        onChange={handleSelect}
        className="p-2 border rounded-lg w-full text-black"
      >
        <option value="" disabled>
          -- Selecione --
        </option>
        {Object.values(ActionType).map((actionType, index) => (
          <option className="text-black" key={index} value={actionType}>
            {actionType}
          </option>
        ))}
      </select>
    </div>
  );
};

function sendSpellName(spell: Spells, setSpell: (arg0: Spells) => void) {
  return (
    <input
      type="text"
      placeholder="Digite o titulo"
      id=""
      className="border-gray-300 p-2 text-black text-xl"
      value={spell.name}
      onChange={(e) =>
        setSpell({
          ...spell,
          name: e.target.value,
        })
      }
    />
  );
}
function sendManaCost(spell: Spells, setSpell: (arg0: Spells) => void) {
  return (
    <>
      <p>Mana Cost</p>
      <input
        type="text"
        placeholder="digite custo de mana"
        id=""
        className="border-gray-300 p-2 text-black text-xl"
        value={spell.manaCost}
        onChange={(e) =>
          setSpell({
            ...spell,
            manaCost: e.target.value,
          })
        }
      />
    </>
  );
}
function sendDuration(spell: Spells, setSpell: (arg0: Spells) => void) {
  return (
    <>
      <p>duração</p>
      <input
        type="text"
        placeholder="digite duração"
        id=""
        className="border-gray-300 p-2 text-black text-xl"
        value={spell.duration}
        onChange={(e) =>
          setSpell({
            ...spell,
            duration: e.target.value,
          })
        }
      />
    </>
  );
}
function sendExtraDuration(spell: Spells, setSpell: (arg0: Spells) => void) {
  return (
    <>
      <p>Duração extra</p>
      <input
        type="text"
        placeholder="digite duração extra"
        id=""
        className="border-gray-300 p-2 text-black text-xl"
        value={spell.extraDuration}
        onChange={(e) =>
          setSpell({
            ...spell,
            extraDuration: e.target.value,
          })
        }
      />
    </>
  );
}
function sendExtraManaCost(spell: Spells, setSpell: (arg0: Spells) => void) {
  return (
    <>
      <p>Custo de mana extra</p>
      <input
        type="text"
        placeholder="digite custo de mana extra"
        id=""
        className="border-gray-300 p-2 text-black text-xl"
        value={spell.extraManaCost}
        onChange={(e) =>
          setSpell({
            ...spell,
            extraManaCost: e.target.value,
          })
        }
      />
    </>
  );
}
function sendTargetNumber(spell: Spells, setSpell: (arg0: Spells) => void) {
  return (
    <>
      <p>Target Number</p>
      <input
        type="number"
        placeholder="Digite o titulo"
        id=""
        className="border-gray-300 p-2 text-black text-xl"
        value={spell.NA}
        onChange={(e) =>
          setSpell({
            ...spell,
            NA: parseInt(e.target.value),
          })
        }
      />
    </>
  );
}
