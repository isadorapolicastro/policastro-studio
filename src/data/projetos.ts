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
  { slug: 'olyn', numero: '03', nome: ['Olyn', 'CT'], linhaIndice: 'Landing page · Centro de treinamento · Gravataí', disponivel: false },
]
