"use client";
import Image from "next/image";
import { CreateSpell } from "./components/CreateSpell";
import SpellsViewer from "./components/SpellsViewer";

export default function Home() {
  //criar um botao para dar hide e show no create spell
  //poder selecionar a magia como do personagem
  //ver a interação das que tem pre requisito ficarem habilitadas quando o pre requisito for selecionado
  //botao de reset para refazer a build
  //fazer codigos de verificaçao para nao adicionar magia duplicada no servidor
  return (
    <div>
      <CreateSpell />
      <SpellsViewer />
    </div>
  );
}
