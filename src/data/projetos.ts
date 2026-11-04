// Conteúdo dos projetos. Só entra aqui informação real e confirmada.
const base = import.meta.env.BASE_URL

export type Imagem = { src: string; alt: string; legenda: string; altura: number; flex: string; posicao?: string }
export type ItemGaleria =
  | ({ tipo: 'imagem' } & Imagem)
  | { tipo: 'paleta'; cores: { nome: string; hex: string }[]; legenda: string; flex: string }
  | { tipo: 'padrao-rio'; legenda: string; flex: string }

export type Secao =
  | { tipo: 'texto'; rotulo: string; titulo: string; destaque?: string; texto: string }
  | { tipo: 'citacao'; rotulo: string; texto: string; destaque: string; atributos: string[] }
  | { tipo: 'etapas'; rotulo: string; titulo: string; etapas: { titulo: string; texto: string }[] }
  | { tipo: 'galeria'; rotulo: string; titulo: string; destaque: string; grupos: { titulo: string; linhas: ItemGaleria[][] }[] }
  | { tipo: 'entregas'; rotulo: string; titulo: string; itens: string[] }
  | { tipo: 'apresentacao'; animacao: 'kashi' | 'olyn'; rotulo: string; titulo: string; destaque: string; texto: string }

export type Projeto = {
  slug: string
  numero: string
  nome: [string, string]
  linhaIndice: string
  disponivel: boolean
  meta?: string
  resumo?: string
  ficha?: [string, string][]
  miniatura?: string
  capa?: { imagem: string; alt: string; foto: Imagem }
  secoes?: Secao[]
}

const k = (arquivo: string) => `${base}projetos/kashi/${arquivo}`
const o = (arquivo: string) => `${base}projetos/olyn/${arquivo}`

export const projetos: Projeto[] = [
  {
    slug: 'kashi',
    numero: '01',
    nome: ['Kashi', 'Espaço'],
    linhaIndice: 'Branding · Identidade visual · 2026',
    disponivel: true,
    meta: 'Cliente · Branding · Identidade visual · 2026',
    resumo:
      'Nova identidade visual e manual de uso de marca para o Kashi, espaço de Ayurveda e Yogaterapia conduzido pela Leila Policastro.',
    ficha: [
      ['Tipo', 'Identidade visual e uso de marca'],
      ['Segmento', 'Ayurveda e yogaterapia'],
      ['Nosso papel', '[A confirmar]'],
      ['Formato', 'Cliente'],
    ],
    miniatura: k('capa.webp'),
    capa: {
      imagem: k('capa.webp'),
      alt: 'Capa do manual de uso de marca da Kashi: símbolo, nome, Ayurveda & Yogaterapia e a frase Um lugar de luz, cuidado e presença',
      foto: {
        src: k('pratica.webp'),
        alt: 'Prática de yoga na sala do Kashi, com tapetes verde-água e jardim ao fundo',
        legenda: '',
        altura: 620,
        flex: '1 1 320px',
      },
    },
    secoes: [
      {
        tipo: 'texto',
        rotulo: 'Contexto',
        titulo: 'Um novo nome para o que',
        destaque: 'sempre foi.',
        texto:
          'O espaço que nasceu como Leila Policastro ganhou o nome Kashi — o nome antigo de Varanasi, na Índia, às margens do Ganges, um dos berços do Yoga e do Ayurveda. A marca precisava dizer isso falando baixo e acolhendo.',
      },
      {
        tipo: 'apresentacao',
        animacao: 'kashi',
        rotulo: 'Apresentação',
        titulo: 'A marca em',
        destaque: 'movimento',
        texto: 'Trinta segundos com as frases do próprio espaço: do símbolo que se acende às peças do dia a dia, até o sol, o rio e as folhas se juntarem para formar o logo.',
      },
      {
        tipo: 'citacao',
        rotulo: 'Conceito',
        texto: '“A cidade da luz,',
        destaque: 'em casa.”',
        atributos: ['Acolhedora', 'Ancestral', 'Serena', 'Natural'],
      },
      {
        tipo: 'etapas',
        rotulo: 'Processo',
        titulo: 'Do conceito ao símbolo',
        etapas: [
          { titulo: 'O sol', texto: 'A luz de Kashi no centro do símbolo: presença.' },
          { titulo: 'O rio', texto: 'As ondas lembram o Ganges: fluxo e respiração.' },
          { titulo: 'As folhas', texto: 'O jardim da casa e o cuidado que cresce.' },
          { titulo: 'O sistema', texto: 'Os três elementos se desdobram em grafismos, papelaria, objetos e sinalização.' },
        ],
      },
      {
        tipo: 'galeria',
        rotulo: 'Pranchas',
        titulo: 'Do símbolo ao',
        destaque: 'dia a dia',
        grupos: [
          {
            titulo: '03 · Logo e versões',
            linhas: [
              [
                { tipo: 'imagem', src: k('logo_principal.webp'), alt: 'Logo principal vertical da Kashi', legenda: 'Principal · vertical', altura: 640, flex: '2 1 320px' },
                { tipo: 'imagem', src: k('logo_horizontal.webp'), alt: 'Logo horizontal da Kashi', legenda: 'Horizontal', altura: 640, flex: '3 1 420px' },
              ],
              [
                { tipo: 'imagem', src: k('logo_negativo.webp'), alt: 'Símbolo da Kashi em negativo sobre petróleo', legenda: 'Símbolo · negativo', altura: 320, flex: '1 1 260px' },
                { tipo: 'imagem', src: k('logo_terracota.webp'), alt: 'Nome Kashi em branco sobre terracota', legenda: 'Nome · sobre terracota', altura: 320, flex: '1 1 260px' },
                { tipo: 'imagem', src: k('logo_avatar.webp'), alt: 'Avatar e ícone da Kashi em tamanhos reduzidos', legenda: 'Avatar e ícone', altura: 320, flex: '1 1 260px' },
              ],
            ],
          },
          {
            titulo: '04 · Cores e 05 · Grafismos',
            linhas: [
              [
                {
                  tipo: 'paleta',
                  legenda: 'Petróleo, Ganges, Água, Terracota, Pêssego, Linho e Areia',
                  flex: '2 1 420px',
                  cores: [
                    { nome: 'Petróleo', hex: '#1E5556' },
                    { nome: 'Ganges', hex: '#3F8789' },
                    { nome: 'Água', hex: '#6CC1C2' },
                    { nome: 'Terracota', hex: '#B45F37' },
                    { nome: 'Pêssego', hex: '#F2B696' },
                    { nome: 'Linho', hex: '#CFC6A8' },
                    { nome: 'Areia', hex: '#F4F0E8' },
                  ],
                },
                { tipo: 'padrao-rio', legenda: 'Grafismo do rio', flex: '1 1 300px' },
              ],
            ],
          },
          {
            titulo: '07 · Objetos do espaço',
            linhas: [
              [
                { tipo: 'imagem', src: k('ecobag.webp'), alt: 'Ecobag de algodão cru com a marca Kashi', legenda: 'Ecobag de algodão cru', altura: 460, flex: '3 1 420px' },
                { tipo: 'imagem', src: k('marcadores.webp'), alt: 'Quatro marcadores de página da Kashi', legenda: 'Marcadores · brinde para alunas', altura: 460, flex: '2 1 320px' },
              ],
              [
                { tipo: 'imagem', src: k('oleo.webp'), alt: 'Frasco âmbar de óleo ayurvédico com rótulo Kashi', legenda: 'Óleo de massagem', altura: 380, flex: '1 1 260px' },
                { tipo: 'imagem', src: k('garrafa.webp'), alt: 'Garrafa de alumínio com a marca Kashi', legenda: 'Garrafa de alumínio', altura: 380, flex: '1 1 260px' },
                { tipo: 'imagem', src: k('vela.webp'), alt: 'Vela de meditação Kashi acesa', legenda: 'Vela de meditação', altura: 380, flex: '1 1 260px' },
              ],
            ],
          },
          {
            titulo: '08 · Fachada e sinalização',
            linhas: [
              [
                { tipo: 'imagem', src: k('fachada.webp'), alt: 'Fachada da casa com a placa em arco da Kashi no poste', legenda: 'Símbolo na fachada', altura: 620, flex: '3 1 420px', posicao: '50% 45%' },
                { tipo: 'imagem', src: k('placa.webp'), alt: 'Placa em arco e cartão de horários da Kashi', legenda: 'Placa em arco e horários', altura: 620, flex: '2 1 320px' },
              ],
              [
                { tipo: 'imagem', src: k('porta.webp'), alt: 'Porta de vidro da entrada com a placa da Kashi', legenda: 'Placa na porta do corredor', altura: 460, flex: '1 1 420px' },
              ],
            ],
          },
          {
            titulo: '09 · Instagram e site',
            linhas: [
              [
                { tipo: 'imagem', src: k('site.webp'), alt: 'Página inicial do site da Kashi', legenda: 'Página inicial do site', altura: 620, flex: '3 1 420px', posicao: '50% 40%' },
                { tipo: 'imagem', src: k('instagram.webp'), alt: 'Perfil do Instagram da Kashi', legenda: 'Perfil no Instagram', altura: 620, flex: '1 1 260px', posicao: '50% 30%' },
              ],
            ],
          },
        ],
      },
      {
        tipo: 'entregas',
        rotulo: 'Entregas',
        titulo: 'Do nome à fachada',
        itens: ['Conceito', 'Logo e versões', 'Cores e tipografia', 'Grafismos', 'Papelaria', 'Objetos do espaço', 'Fachada e sinalização', 'Instagram e site'],
      },
    ],
  },
  { slug: 'projeto-02', numero: '02', nome: ['[Projeto real 02]', ''], linhaIndice: 'Em preparação', disponivel: false },
  {
    slug: 'olyn',
    numero: '03',
    nome: ['Olyn', 'CT'],
    linhaIndice: 'Landing page · Centro de treinamento · Gravataí',
    disponivel: true,
    meta: 'Cliente · Landing page · Gravataí, RS',
    resumo:
      'Landing page da OLYN Centro de Treinamento, em Gravataí: uma página narrativa que apresenta o método, o espaço e o time, e leva o visitante a agendar uma aula experimental.',
    ficha: [
      ['Tipo', 'Landing page'],
      ['Segmento', 'Centro de treinamento'],
      ['Nosso papel', '[A confirmar]'],
      ['No ar', 'olynct.com.br'],
    ],
    miniatura: o('capa.webp'),
    capa: {
      imagem: o('capa.webp'),
      alt: 'Logo da OLYN Centro de Treinamento sobre azul-marinho',
      foto: { src: o('foto-treino.webp'), alt: 'Treino na OLYN: dois alunos fazendo um exercício com bastão', legenda: '', altura: 620, flex: '1 1 320px' },
    },
    secoes: [
      {
        tipo: 'texto',
        rotulo: 'Contexto',
        titulo: 'Academia para quem',
        destaque: 'não gosta de academia.',
        texto:
          'A OLYN é um centro de treinamento com no máximo quatro alunos por horário, inspirado em Olympia, berço dos jogos olímpicos. A página precisava explicar um método diferente da academia convencional e transformar a visita em uma aula experimental agendada pelo WhatsApp.',
      },
      {
        tipo: 'apresentacao',
        animacao: 'olyn',
        rotulo: 'Apresentação',
        titulo: 'A página em',
        destaque: 'movimento',
        texto: 'Trinta segundos com as frases da própria landing page: das telas e do método à chamada para a aula experimental, até as partes da chama se juntarem e formarem o símbolo.',
      },
      {
        tipo: 'citacao',
        rotulo: 'Conceito',
        texto: '“Performance',
        destaque: 'com propósito.”',
        atributos: ['Clareza no movimento', 'Força com significado', 'Treine com intenção'],
      },
      {
        tipo: 'etapas',
        rotulo: 'Processo',
        titulo: 'Do símbolo à página',
        etapas: [
          { titulo: 'O símbolo', texto: 'A chama nasce da tocha olímpica: força, disciplina e superação.' },
          { titulo: 'A narrativa', texto: 'Uma página contada em nove capítulos numerados, de quem somos à localização.' },
          { titulo: 'O método', texto: 'OLYN GROUP e OLYN ONE explicados lado a lado, sem jargão.' },
          { titulo: 'A conversão', texto: 'Aula experimental pelo WhatsApp a um toque, em todos os pontos da página.' },
        ],
      },
      {
        tipo: 'galeria',
        rotulo: 'Telas',
        titulo: 'Da chama à',
        destaque: 'aula experimental',
        grupos: [
          {
            titulo: '01 · Marca',
            linhas: [
              [
                { tipo: 'imagem', src: o('logo-horizontal.webp'), alt: 'Logo horizontal da OLYN sobre azul-marinho', legenda: 'Logo horizontal', altura: 420, flex: '3 1 420px' },
                { tipo: 'imagem', src: o('logo-vertical.webp'), alt: 'Logo vertical da OLYN sobre fundo claro', legenda: 'Logo vertical', altura: 420, flex: '2 1 300px' },
              ],
              [
                { tipo: 'imagem', src: o('simbolo.webp'), alt: 'Símbolo da OLYN, uma chama em laranja e magenta', legenda: 'Símbolo', altura: 520, flex: '1 1 300px' },
                { tipo: 'imagem', src: o('post-simbolo.webp'), alt: 'Post explicando que o símbolo da OLYN vem da tocha olímpica', legenda: 'De onde vem o símbolo', altura: 520, flex: '1 1 300px', posicao: '50% 0%' },
              ],
            ],
          },
          {
            titulo: '02 · Abertura',
            linhas: [
              [
                { tipo: 'imagem', src: o('site-hero.webp'), alt: 'Abertura da landing page da OLYN no computador: Seu treino. Do seu jeito.', legenda: 'Abertura no computador', altura: 640, flex: '3 1 480px', posicao: '50% 0%' },
                { tipo: 'imagem', src: o('site-celular.webp'), alt: 'Abertura da landing page da OLYN no celular', legenda: 'No celular', altura: 640, flex: '1 1 260px', posicao: '50% 0%' },
              ],
            ],
          },
          {
            titulo: '03 · Quem somos e método',
            linhas: [
              [{ tipo: 'imagem', src: o('site-olyn.webp'), alt: 'Seção Quem somos da landing page da OLYN', legenda: '01 · Quem somos', altura: 560, flex: '1 1 480px', posicao: '50% 0%' }],
              [{ tipo: 'imagem', src: o('site-metodologia.webp'), alt: 'Seção Método OLYN, com OLYN GROUP e OLYN ONE', legenda: '02 · Método OLYN', altura: 760, flex: '1 1 480px', posicao: '50% 0%' }],
            ],
          },
          {
            titulo: '04 · Espaço e profissionais',
            linhas: [
              [
                { tipo: 'imagem', src: o('site-estrutura.webp'), alt: 'Seção Academia para quem não gosta de academia, com fotos do espaço', legenda: '04 · O espaço', altura: 620, flex: '1 1 420px', posicao: '50% 0%' },
                { tipo: 'imagem', src: o('site-profissionais.webp'), alt: 'Seção Quem está por trás da OLYN', legenda: '05 · Profissionais', altura: 620, flex: '1 1 420px', posicao: '50% 30%' },
              ],
            ],
          },
          {
            titulo: '05 · Conversão',
            linhas: [
              [
                { tipo: 'imagem', src: o('site-experimental.webp'), alt: 'Chamada para aula experimental em fundo degradê laranja e magenta', legenda: '08 · Aula experimental', altura: 460, flex: '3 1 480px' },
                { tipo: 'imagem', src: o('site-celular-rolagem.webp'), alt: 'Landing page da OLYN rolando no celular', legenda: 'Rolagem no celular', altura: 460, flex: '1 1 260px', posicao: '50% 0%' },
              ],
            ],
          },
        ],
      },
      {
        tipo: 'entregas',
        rotulo: 'Entregas',
        titulo: 'Da abertura ao agendamento',
        itens: ['Landing page', 'Versão para celular', 'Narrativa em nove seções', 'Método e formatos', 'Vídeos', 'Avaliações do Google', 'Planos', 'Aula experimental pelo WhatsApp', 'Localização e mapa'],
      },
    ],
  },
]
