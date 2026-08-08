export type Lang = "pt" | "en";

export type LocalizedText = Record<Lang, string>;

export type ProjectCase = {
  number: string;
  slug: string;
  title: string;
  category: LocalizedText;
  status: LocalizedText;
  objective: LocalizedText;
  solution: LocalizedText;
  role: LocalizedText;
  context: LocalizedText;
  problem: LocalizedText;
  features: Record<Lang, string[]>;
  decisions: Record<Lang, string[]>;
  learning: LocalizedText;
  tech: string[];
  demo: string;
  code?: string;
  image: string;
  imageAlt: LocalizedText;
  accent: "cyan" | "violet" | "magenta" | "blue";
};

export const projects: ProjectCase[] = [
  {
    number: "01",
    slug: "pulse-training-club",
    title: "Pulse Training Club",
    category: { pt: "Landing page para academia", en: "Gym landing page" },
    status: { pt: "Projeto conceitual", en: "Concept project" },
    objective: {
      pt: "Apresentar uma academia premium e conduzir visitantes até o agendamento de uma aula experimental.",
      en: "Present a premium gym and guide visitors toward booking a trial class.",
    },
    solution: {
      pt: "Uma experiência editorial de alto contraste com modalidades, agenda, planos e CTAs distribuídos ao longo da página.",
      en: "A high-contrast editorial experience with programs, schedule, plans and calls to action throughout the page.",
    },
    role: {
      pt: "Direção visual, UX, front-end e publicação.",
      en: "Visual direction, UX, front-end and deployment.",
    },
    context: {
      pt: "Projeto autoral criado para explorar como uma academia pode comunicar energia e profissionalismo sem recorrer a uma interface genérica.",
      en: "An independent project exploring how a gym can communicate energy and professionalism without relying on a generic interface.",
    },
    problem: {
      pt: "Organizar uma grande quantidade de informações — modalidades, horários e planos — sem enfraquecer a proposta principal de conversão.",
      en: "Organize programs, schedules and plans without weakening the main conversion goal.",
    },
    features: {
      pt: ["Hero com CTA principal", "Modalidades e agenda semanal", "Planos e galeria", "FAQ e contato rápido"],
      en: ["Hero with primary CTA", "Programs and weekly schedule", "Plans and gallery", "FAQ and quick contact"],
    },
    decisions: {
      pt: ["Next.js com App Router", "CSS responsivo e mobile-first", "Animações nativas e movimento reduzido", "SEO e imagem social"],
      en: ["Next.js App Router", "Responsive mobile-first CSS", "Native animations and reduced motion", "SEO and social image"],
    },
    learning: {
      pt: "O projeto aprofundou decisões de hierarquia visual, ritmo de leitura e posicionamento de CTAs em páginas comerciais.",
      en: "The project strengthened visual hierarchy, reading rhythm and CTA placement decisions for commercial pages.",
    },
    tech: ["Next.js", "React", "TypeScript", "CSS"],
    demo: "https://pulse-training-club.vercel.app",
    code: "https://github.com/joaolira-dev/pulse-training-club",
    image: "/projects/academy.webp",
    imageAlt: { pt: "Página inicial da academia Pulse Training Club", en: "Pulse Training Club gym homepage" },
    accent: "cyan",
  },
  {
    number: "02",
    slug: "psicologa-nogueira",
    title: "Psicóloga Nogueira",
    category: { pt: "Landing page para psicóloga", en: "Psychologist landing page" },
    status: { pt: "Projeto conceitual", en: "Concept project" },
    objective: {
      pt: "Transmitir acolhimento e confiança, explicando a psicoterapia com clareza e facilitando o primeiro contato.",
      en: "Communicate warmth and trust, explain therapy clearly and make the first contact easier.",
    },
    solution: {
      pt: "Uma interface editorial leve, com conteúdo bem segmentado, FAQ acessível e contato direto pelo WhatsApp.",
      en: "A light editorial interface with structured content, accessible FAQ and direct WhatsApp contact.",
    },
    role: {
      pt: "Pesquisa visual, UX, front-end e acessibilidade.",
      en: "Visual research, UX, front-end and accessibility.",
    },
    context: {
      pt: "Projeto de portfólio para estudar comunicação digital sensível e responsável em uma área que exige clareza e cuidado.",
      en: "A portfolio project studying responsible and sensitive digital communication in a field that requires clarity and care.",
    },
    problem: {
      pt: "Apresentar informações sobre terapia sem promessas, linguagem clínica excessiva ou barreiras para quem busca ajuda pela primeira vez.",
      en: "Present therapy information without promises, excessive clinical language or barriers for first-time visitors.",
    },
    features: {
      pt: ["Apresentação dos temas trabalhados", "Explicação do processo terapêutico", "Atendimento online e presencial", "FAQ e CTA para WhatsApp"],
      en: ["Topics overview", "Therapy process explanation", "Online and in-person sessions", "FAQ and WhatsApp CTA"],
    },
    decisions: {
      pt: ["Composição editorial responsiva", "Paleta de baixo estímulo", "HTML semântico", "Respeito a prefers-reduced-motion"],
      en: ["Responsive editorial composition", "Low-stimulation palette", "Semantic HTML", "Reduced motion support"],
    },
    learning: {
      pt: "A solução reforçou a importância de tom, legibilidade e acessibilidade como partes centrais da experiência — não apenas acabamento.",
      en: "The solution reinforced tone, readability and accessibility as central parts of the experience, not just polish.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    demo: "https://psi-nogueira.vercel.app",
    code: "https://github.com/joaolira-dev/psi-nogueira",
    image: "/projects/psychologist.webp",
    imageAlt: { pt: "Landing page da Psicóloga Nogueira", en: "Psychologist Nogueira landing page" },
    accent: "violet",
  },
  {
    number: "03",
    slug: "linha-norte-arquitetura",
    title: "Linha Norte Arquitetura",
    category: { pt: "Site para escritório de arquitetura", en: "Architecture studio website" },
    status: { pt: "Projeto conceitual", en: "Concept project" },
    objective: {
      pt: "Valorizar projetos arquitetônicos e posicionar o escritório com uma presença digital sofisticada.",
      en: "Showcase architectural work and position the studio with a sophisticated digital presence.",
    },
    solution: {
      pt: "Uma landing page visual, espaçosa e editorial, equilibrando portfólio, método de trabalho e contato comercial.",
      en: "A visual, spacious editorial landing page balancing portfolio, process and commercial contact.",
    },
    role: {
      pt: "Direção visual, UX, front-end e performance.",
      en: "Visual direction, UX, front-end and performance.",
    },
    context: {
      pt: "Estudo autoral de posicionamento digital para um escritório fictício de arquitetura residencial contemporânea.",
      en: "An independent digital positioning study for a fictional contemporary residential architecture studio.",
    },
    problem: {
      pt: "Dar protagonismo às imagens sem deixar informações sobre processo e contato escondidas ou difíceis de navegar.",
      en: "Give imagery a leading role without hiding process and contact information.",
    },
    features: {
      pt: ["Hero de alto impacto", "Portfólio de projetos", "Apresentação do processo", "Contato comercial objetivo"],
      en: ["High-impact hero", "Project portfolio", "Process overview", "Direct commercial contact"],
    },
    decisions: {
      pt: ["Tipografia editorial", "Grid assimétrico responsivo", "Imagens com proporções estáveis", "Animações discretas"],
      en: ["Editorial typography", "Responsive asymmetric grid", "Stable image ratios", "Subtle animations"],
    },
    learning: {
      pt: "O estudo desenvolveu repertório para interfaces em que imagem, espaço e tipografia precisam vender percepção de valor.",
      en: "The study expanded the visual repertoire for interfaces where imagery, space and typography must communicate value.",
    },
    tech: ["Next.js", "React", "TypeScript", "CSS"],
    demo: "https://linha-norte-arquitetura.vercel.app",
    image: "/projects/architect.webp",
    imageAlt: { pt: "Página inicial da Linha Norte Arquitetura", en: "Linha Norte Architecture homepage" },
    accent: "magenta",
  },
  {
    number: "04",
    slug: "olx-clone",
    title: "Marketplace Full Stack",
    category: { pt: "Plataforma de classificados", en: "Classified marketplace" },
    status: { pt: "Projeto conceitual", en: "Concept project" },
    objective: {
      pt: "Construir um fluxo completo de compra e venda com usuários, anúncios, busca e gerenciamento de conteúdo.",
      en: "Build a complete buying and selling flow with users, listings, search and content management.",
    },
    solution: {
      pt: "Uma aplicação full-stack com autenticação JWT, upload de imagens, filtros e páginas de conta e anúncio.",
      en: "A full-stack application with JWT authentication, image uploads, filters, account and listing pages.",
    },
    role: {
      pt: "Arquitetura, front-end, API, banco de dados e deploy.",
      en: "Architecture, front-end, API, database and deployment.",
    },
    context: {
      pt: "Projeto de estudo criado para consolidar a integração entre uma SPA em React, uma API Node.js e um banco MongoDB.",
      en: "A study project built to consolidate integration between a React SPA, a Node.js API and MongoDB.",
    },
    problem: {
      pt: "Coordenar autenticação, dados de anúncios e upload de imagens mantendo uma navegação simples para diferentes perfis de usuário.",
      en: "Coordinate authentication, listing data and image uploads while keeping navigation simple for different user profiles.",
    },
    features: {
      pt: ["Cadastro e autenticação", "Criação e busca de anúncios", "Upload de múltiplas imagens", "Área do usuário"],
      en: ["Registration and authentication", "Listing creation and search", "Multiple image upload", "User area"],
    },
    decisions: {
      pt: ["API REST com Express", "Autenticação JWT", "MongoDB Atlas", "Separação entre front-end e back-end"],
      en: ["Express REST API", "JWT authentication", "MongoDB Atlas", "Front-end and back-end separation"],
    },
    learning: {
      pt: "O projeto consolidou fluxos de autenticação, modelagem de dados, upload e integração ponta a ponta.",
      en: "The project consolidated authentication, data modeling, uploads and end-to-end integration flows.",
    },
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    demo: "https://olxclone-eta.vercel.app",
    code: "https://github.com/joaolira-dev/olx-project",
    image: "/projects/olx.webp",
    imageAlt: { pt: "Página inicial do marketplace inspirado na OLX", en: "Homepage of the OLX-inspired marketplace" },
    accent: "blue",
  },
];

export const services = [
  {
    icon: "landing",
    title: { pt: "Landing pages", en: "Landing pages" },
    description: {
      pt: "Páginas rápidas e focadas em transformar visitantes em contatos e clientes.",
      en: "Fast pages focused on turning visitors into leads and customers.",
    },
  },
  {
    icon: "website",
    title: { pt: "Sites institucionais", en: "Business websites" },
    description: {
      pt: "Sites profissionais para apresentar empresas, serviços e fortalecer a presença digital.",
      en: "Professional websites that present companies and services while strengthening their digital presence.",
    },
  },
  {
    icon: "system",
    title: { pt: "Sistemas web", en: "Web systems" },
    description: {
      pt: "Dashboards, áreas administrativas e plataformas desenvolvidas de acordo com o negócio.",
      en: "Dashboards, admin areas and platforms built around the business.",
    },
  },
  {
    icon: "api",
    title: { pt: "APIs e integrações", en: "APIs and integrations" },
    description: {
      pt: "Integrações com pagamentos, autenticação, WhatsApp e outros serviços externos.",
      en: "Integrations with payments, authentication, WhatsApp and external services.",
    },
  },
];
