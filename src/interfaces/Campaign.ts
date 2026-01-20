interface ICampaign {
  titulo: string;
  subtitulo: string;
  descricao: string;
  beneficiaria_id: number | undefined;
  image: File | null;
  categorias: number[];
  whatsapp: string;
  localizacao: number;
  data_inicio: Date | undefined;
  prazo: Date | undefined;
  ativa: boolean;
  itens_cadastrados: string
}

export class Campaign implements ICampaign {
  titulo: string;
  subtitulo: string;
  descricao: string;
  beneficiaria_id: number | undefined;
  image: File | null;
  categorias: number[];
  whatsapp: string;
  localizacao: number;
  data_inicio: Date | undefined;
  prazo: Date | undefined;
  ativa: boolean;
  itens_cadastrados: string

  constructor(
    titulo: string,
    subtitulo: string,
    descricao: string,
    beneficiaria_id: number | undefined,
    image: File | null,
    categorias: number[],
    whatsapp: string,
    localizacao: number,
    data_inicio: Date | undefined,
    prazo: Date | undefined,
    ativa: boolean,
    itens_cadastrados: string
  ) {
    this.titulo = titulo;
    this.subtitulo = subtitulo;
    this.descricao = descricao;
    this.beneficiaria_id = beneficiaria_id;
    this.image = image;
    this.categorias = categorias;
    this.whatsapp = whatsapp;
    this.localizacao = localizacao;
    this.data_inicio = data_inicio;
    this.prazo = prazo;
    this.ativa = ativa;
    this.itens_cadastrados = itens_cadastrados;
  }
}