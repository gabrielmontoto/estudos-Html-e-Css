export type Spells = {
  name: string;
  school: SchoolType;
  manaCost: string;
  actionTime: ActionType;
  NA: number;
  baseDamage: string;
  test: SpellTest[];
  prerequisite: (SpellsNames | MagicGraduation)[];
  duration: string;
  extraDuration: string;
  extraManaCost: string;
  extraDamage: string;
  description: string;
};

export enum SchoolType {
  Empty = "Vazio",
  Criação = "Criação",
  Entropia = "Entropia",
  Espírito = "Espírito",
  Primal = "Primal",
  Sangue = "Sangue",
}
export enum ActionType {
  Empty = "vazio",
  acaoPrincipal = "açãoPrincipal",
  minutos5 = "5minutos",
  minutos1 = "1minuto",
  horas1 = "1hora",
}
export enum SpellTest {
  Empty = "Vazio",
  vigor = "CONSTITUIÇÃO (VIGOR)",
  disciplina = "VONTADE (DISCIPLINA)",
  moral = "VONTADE (MORAL)",
  acrobacia = "DESTREZA (ACROBACIA)",
  poderioMuscular = "FORÇA (PODERIO MUSCULAR)",
  entropia = "MAGIA (ENTROPIA)",
  espirito = "MAGIA (ESPÍRITO)",
  Criação = "MAGIA (CRIAÇÃO)",
  Audiçao = "PERCEPÇÃO (AUDIÇÃO)",
  Olfato = "PERCEPÇÃO (OLFATO)",
  visao = "PERCEPÇÃO (VISÃO)",
}

export enum Graduation {
  Empty = "vazio",
  novato = "novato",
  veterano = "veterano",
  mestre = "mestre",
}

export type MagicGraduation = {
  school: SchoolType;
  graduation: Graduation;
};
export enum SpellsNames {
  Empty = "Vazio",
  AbraçoDaPedra = "Abraço da Pedra",
  Abrigo = "Abrigo",
  Alucinação = "Alucinação",
  Apressar = "Apressar",
  ArmaduraDePedra = "Armadura de Pedra",
  ArmasCongelantes = "Armas Congelantes",
  ArmasFlamejantes = "Armas Flamejantes",
  ArmasTelecinéticas = "Armas Telecinéticas",
  Atordoar = "Atordoar",
  AuraDePoder = "Aura de Poder",
  AuraHeroica = "Aura Heroica",
  BolaDeFogo = "Bola de Fogo",
  BombaAmbulante = "Bomba Ambulante",
  BombaAmbulanteVirulenta = "Bomba Ambulante Virulenta",
  CampoDeForça = "Campo de Força",
  CampoDeRepulsão = "Campo de Repulsão",
  Choque = "Choque",
  ChoqueDeMana = "Choque de Mana",
  ConeDeFrio = "Cone de Frio",
  ConvocarFera = "Convocar Fera",
  CorrenteDeRelâmpagos = "Corrente de Relâmpagos",
  Cura = "Cura",
  CuraEmGrupo = "Cura em Grupo",
  Decompor = "Decompor",
  DefesaHeroica = "Defesa Heroica",
  DissiparMagia = "Dissipar Magia",
  DominioElemental = "Domínio Elemental",
  Dormir = "Dormir",
  DrenarMana = "Drenar Mana",
  DrenarVida = "Drenar Vida",
  EnviarSonho = "Enviar Sonho",
  EnxameDoloroso = "Enxame Doloroso",
  EscudoArcano = "Escudo Arcano",
  EscudoMagico = "Escudo Mágico",
  EscudoDoTurvo = "Escudo do Turvo",
  ExplosaoAntiMagia = "Explosão Anti-Mágia",
  ExplosaoMental = "Explosão Mental",
  ExplosaoTelecinetica = "Explosão Telecinética",
  Fonte = "Fonte",
  FonteMagica = "Fonte Mágica",
  ForçaDeFEitico = "Força de Feitiço",
  FormaDeAnimalGrande = "Forma de Animal Grande",
  FormaDeAnimalPequeno = "Forma de Animal Pequeno",
  FormaDeCriaturaFeroz = "Forma de Criatura Feroz",
  Fosso = "Fosso",
  Fraqueza = "Fraqueza",
  FuriaDosElfos = "Fúria dos Elfos",
  GarraDoInverno = "Garra do Inverno",
  GlifoDeNeutralização = "Glifo de Neutralização",
  GlifoDaPreservação = "Glifo da Preservação",
  GlifoDaParalisia = "Glifo da Paralisia",
  GlifoDaRepulsão = "Glifo da Repulsão",
  GlifoDaVedaçao = "Glifo da Vedação",
  GlifoDaVigiância = "Glifo da Vigilância",
  Graxa = "Graxa",
  Horror = "Horror",
  Inferno = "Inferno",
  Levitar = "Levitar",
  LumeMagico = "Lume Mágico",
  MagiaDaMorte = "Magia da Morte",
  MaldiçãoDaAflição = "Maldição da Aflição",
  MaldiçãoDaDesorientação = "Maldição da Desorientação",
  MaldiçãoDaMortalidade = "Maldição da Mortalidade",
  MaldiçãoDaMorte = "Maldição da Morte",
  MaldiçãoDaVulnerabilidade = "Maldição da Vulnerabilidade",
  MarcaDoEspirito = "Marca do Espírito",
  MarcaDuradoura = "Marca Duradoura",
  Memoria = "Memória",
  Miasma = "Miasma",
  MolderClima = "Molder Clima",
  MoldarTerra = "Moldar Terra",
  MoldarVentos = "Moldar Ventos",
  Nevasca = "Nevasca",
  NuvemDaMorte = "Nuvem da Morte",
  NuvemEntropica = "Nuvem Entropica",
  OfensivaHeroica = "Ofensiva Heroica",
  Paralisar = "Paralisar",
  ParalisiaEmMassa = "Paralisia em Massa",
  PassoDePedra = "Passo de Pedra",
  PesadeloDesperto = "Pesadelo Desperto",
  Petrificar = "Petrificar",
  Prender = "Prender",
  PrisaoEsmagadora = "Prisão Esmagadora",
  ProteçãoAntimagia = "Proteção Antimagia",
  ProteçãoDaVida = "Proteção da Vida",
  PunhoDePedra = "Punho de Pedra",
  PunhoDoCriador = "Punho do Criador",
  PurificaçãoDeMana = "Purificação de Mana",
  PuxaoDoAbismo = "Puxão do Abismo",
  RajadaArcana = "Rajada Arcana",
  RajadaDeFoco = "Rajada de Foco",
  ReanimarMortos = "Reanimar Mortos",
  Regeneração = "Regeneração",
  Rejuvenecer = "Rejuvenescer",
  RejuvenecerEmMassa = "Rejuvenescer em Massa",
  Relampago = "Relâmpago",
  Revigorar = "Revigorar",
  Reviver = "Reviver",
  SifãoDaMorte = "Sifão da Morte",
  Tempestade = "Tempestade",
  Terremoto = "Terremoto",
  VarinhaRabdomântica = "Varinha Rabdomântica",
  EscravoDeSangue = "Escravo de Sangue",
  FerimentoDeSangue = "Ferimento de Sangue",
  Hemorragia = "Hemorragia",
  RouboDePensamento = "Roubo de Pensamento",
  SacrificioDeSangue = "Sacrifício de Sangue",
  Tortura = "Tortura",
}
