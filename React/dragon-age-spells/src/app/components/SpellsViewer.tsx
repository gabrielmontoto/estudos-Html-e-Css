import { useState, useEffect } from "react";
import { Spells, SchoolType, SpellTest } from "../types/Spells"; // Importando os tipos
import { useTheme } from "../contexts/ThemeContext";

const SpellsViewer = () => {
  const themeCtx = useTheme();

  const [spells, setSpells] = useState<Spells[]>([]); // Lista de magias
  const [selectedSpell, setSelectedSpell] = useState<Spells | null>(null); // Magia selecionada
  const [selectedSpells, setSelectedSpells] = useState<Spells[]>([]); // Magias escolhidas pelo personagem
  const [loading, setLoading] = useState(true); // Indicador de carregamento
  const [error, setError] = useState<string | null>(null); // Erro de carregamento

  // Estados para filtros
  const [search, setSearch] = useState("");
  const [schoolFilter, setSchoolFilter] = useState<SchoolType | "">("");
  const [minMana, setMinMana] = useState("");
  const [maxMana, setMaxMana] = useState("");
  const [testFilter, setTestFilter] = useState<SpellTest | "">("");

  // Busca as magias do backend
  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetch("http://localhost:3001/spellsJson");
        if (!response.ok) {
          throw new Error("Erro ao buscar magias");
        }
        const data: Spells[] = await response.json();
        setSpells(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchSpells();
  }, []);

  // Filtragem das magias com base nos critérios selecionados
  const filteredSpells = spells.filter((spell) => {
    return (
      (search === "" ||
        spell.name.toLowerCase().includes(search.toLowerCase())) &&
      (schoolFilter === "" || spell.school === schoolFilter) &&
      (minMana === "" || parseInt(spell.manaCost) >= parseInt(minMana)) &&
      (maxMana === "" || parseInt(spell.manaCost) <= parseInt(maxMana)) &&
      (testFilter === "" || spell.test.includes(testFilter))
    );
  });

  // Função para selecionar uma magia
  const handleSelectSpell = (spell: Spells) => {
    setSelectedSpell(spell);
  };

  // Função para adicionar uma magia ao personagem
  const handleAddSpellToCharacter = (spell: Spells) => {
    if (!selectedSpells.some((s) => s.name === spell.name)) {
      setSelectedSpells([...selectedSpells, spell]);
    }
  };

  // Função para remover uma magia do personagem
  const handleRemoveSpellFromCharacter = (spell: Spells) => {
    setSelectedSpells(selectedSpells.filter((s) => s.name !== spell.name));
  };

  return (
    <div
      className={`p-4 ${
        themeCtx?.theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-slate-500 text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Magias</h1>

      {/* Mensagem de carregamento ou erro */}
      {loading && <p>Carregando magias...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Filtros */}
      <div className="flex gap-4 mb-4 ">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border rounded p-2 w-1/4 ${
            themeCtx?.theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-slate-500 text-black"
          }`}
        />

        <select
          value={schoolFilter}
          onChange={(e) => setSchoolFilter(e.target.value as SchoolType)}
          className={`border rounded p-2 ${
            themeCtx?.theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-slate-500 text-black"
          }`}
        >
          <option
            value=""
            className={`${
              themeCtx?.theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-slate-500 text-black"
            }`}
          >
            Todas as Escolas
          </option>
          {Object.values(SchoolType).map((school) => (
            <option key={school?.toString()} value={school?.toString()}>
              {school?.toString()}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Mana Mínima"
          value={minMana}
          onChange={(e) => setMinMana(e.target.value)}
          className={`border rounded p-2 w-1/6 ${
            themeCtx?.theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-slate-500 text-black"
          }`}
        />
        <input
          type="number"
          placeholder="Mana Máxima"
          value={maxMana}
          onChange={(e) => setMaxMana(e.target.value)}
          className={`border rounded p-2 w-1/6 ${
            themeCtx?.theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-slate-500 text-black"
          }`}
        />

        <select
          value={testFilter}
          onChange={(e) => setTestFilter(e.target.value as SpellTest)}
          className={`border rounded p-2 ${
            themeCtx?.theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-slate-500 text-black"
          }`}
        >
          <option value="">Todos os Testes</option>
          {Object.values(SpellTest).map((test) => (
            <option key={test?.toString()} value={test?.toString()}>
              {test?.toString()}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de magias */}
      {!loading && !error && (
        <div className="flex">
          {/* Lista Resumida */}
          <div className="w-1/3 border-r pr-4">
            <h2 className="text-xl font-semibold mb-2">Lista de Magias</h2>
            <ul>
              {filteredSpells.map((spell) => (
                <li
                  key={spell.name}
                  onClick={() => handleSelectSpell(spell)}
                  className={`p-2 border-b cursor-pointer hover:bg-gray-800 ${
                    selectedSpells.some((s) => s.name === spell.name)
                      ? "bg-green-900"
                      : ""
                  }`}
                >
                  <span className="font-medium">{spell.name}</span> -{" "}
                  <span className="text-gray-500">{spell.manaCost} Mana</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detalhes da Magia */}
          <div className="w-2/3 pl-4">
            <h2 className="text-xl font-semibold mb-2">Detalhes da Magia</h2>
            {selectedSpell ? (
              <div
                className={`p-4 border rounded ${
                  themeCtx?.theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-slate-500 text-black"
                }`}
              >
                <h3 className="text-lg font-bold">{selectedSpell.name}</h3>
                <p>
                  <strong>Escola:</strong> {selectedSpell.school}
                </p>
                <p>
                  <strong>Custo de Mana:</strong> {selectedSpell.manaCost}
                </p>
                <p>
                  <strong>Tempo de Ação:</strong> {selectedSpell.actionTime}
                </p>
                <p>
                  <strong>NA:</strong> {selectedSpell.NA}
                </p>
                <p>
                  <strong>Dano:</strong> {selectedSpell.baseDamage}
                </p>
                <p>
                  <strong>Teste:</strong> {selectedSpell.test.join(", ")}
                </p>
                <p>
                  <strong>Duração:</strong> {selectedSpell.duration}
                </p>
                <p>
                  <strong>Duração Extra:</strong> {selectedSpell.extraDuration}
                </p>
                <p>
                  <strong>Dano Extra:</strong> {selectedSpell.extraDamage}
                </p>
                <p>
                  <strong>Custo Extra de Mana:</strong>{" "}
                  {selectedSpell.extraManaCost}
                </p>
                <p>
                  <strong>Pré-requisitos:</strong>{" "}
                  {selectedSpell.prerequisite
                    .map((prereq) =>
                      typeof prereq === "string"
                        ? prereq
                        : `${prereq.school} (${prereq.graduation})`
                    )
                    .join(", ")}
                </p>
                <p>
                  <strong>Descrição:</strong> {selectedSpell.description}
                </p>
                <button
                  onClick={() => handleAddSpellToCharacter(selectedSpell)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Adicionar ao Personagem
                </button>
              </div>
            ) : (
              <p>Selecione uma magia para ver os detalhes.</p>
            )}
          </div>
        </div>
      )}

      {/* Lista de Magias Selecionadas */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Magias Selecionadas</h2>
        {selectedSpells.length > 0 ? (
          <ul>
            {selectedSpells.map((spell) => (
              <li
                key={spell.name}
                className="p-2 border-b flex justify-between"
              >
                <span>{spell.name}</span>
                <button
                  onClick={() => handleRemoveSpellFromCharacter(spell)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma magia selecionada.</p>
        )}
      </div>
    </div>
  );
};

export default SpellsViewer;
