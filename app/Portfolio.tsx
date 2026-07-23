"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Download,
  Globe2,
  Mail,
  MapPin,
  Moon,
  Phone,
  Send,
  Sun,
} from "lucide-react";
import Background3D from "./Background3D";

type Lang = "pt" | "en";

const projects = [
  {
    number: "01",
    title: "Pulse Training Club",
    subtitle: "Landing page para academia",
    description: {
      pt: "Landing page premium e responsiva para academia, com composição editorial, modalidades, agenda, planos e chamadas orientadas à conversão.",
      en: "Premium responsive gym landing page with an editorial layout, training programs, schedule, plans and conversion-focused calls to action.",
    },
    tech: ["Next.js", "React", "TypeScript", "CSS"],
    demo: "https://pulse-training-club.vercel.app",
    code: "https://github.com/joaolira-dev/pulse-training-club",
    accent: "cyan",
    image: "/projects/academy.png",
  },
  {
    number: "02",
    title: "Psicóloga Nogueira",
    subtitle: "Landing page para psicóloga",
    description: {
      pt: "Experiência acolhedora e responsiva para apresentar a psicoterapia de forma humana, com conteúdo editorial, FAQ e contato direto.",
      en: "A welcoming responsive experience that presents psychotherapy with a human approach, editorial content, FAQ and direct contact.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    demo: "https://psi-nogueira.vercel.app",
    code: "https://github.com/joaolira-dev/psi-nogueira",
    accent: "violet",
    image: "/projects/psychologist.png",
  },
  {
    number: "03",
    title: "Linha Norte Arquitetura",
    subtitle: "Landing page para arquiteto",
    description: {
      pt: "Landing page sofisticada para um escritório de arquitetura, com direção visual editorial, portfólio de projetos e contato comercial.",
      en: "Sophisticated architecture studio landing page with an editorial visual direction, project showcase and commercial contact flow.",
    },
    tech: ["Next.js", "React", "TypeScript", "CSS"],
    demo: "https://linha-norte-arquitetura.vercel.app",
    code: "https://github.com/joaolira-dev/linha-norte-arquitetura",
    accent: "magenta",
    image: "/projects/architect.png",
  },
  {
    number: "04",
    title: "Marketplace Full Stack",
    subtitle: "OLX Clone",
    description: {
      pt: "Marketplace completo com anúncios, autenticação, upload de imagens e uma experiência de busca rápida e intuitiva.",
      en: "Full marketplace with listings, authentication, image uploads and a fast, intuitive search experience.",
    },
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    demo: "https://olxclone-eta.vercel.app",
    code: "https://github.com/joaolira-dev/olx-project",
    accent: "blue",
    image: "/projects/project1.png",
  },
];

const skillGroups = [
  { label: "Front-end", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Tailwind CSS"] },
  { label: "Back-end & APIs", items: ["Node.js", "Java 21", "Spring Boot", "Express", "JWT", "Socket.io", "REST APIs"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "MongoDB Atlas"] },
  { label: "Ops & craft", items: ["Docker", "Git", "GitHub", "CI", "Swagger", "Tests", "Microservices", "Clean Code"] },
];

const techIcons: Record<string, string> = {
  HTML: "https://cdn.simpleicons.org/html5/E34F26",
  CSS: "https://cdn.simpleicons.org/css/663399",
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  TypeScript: "https://cdn.simpleicons.org/typescript/3178C6",
  React: "https://cdn.simpleicons.org/react/61DAFB",
  Angular: "https://cdn.simpleicons.org/angular/DD0031",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/5FA04E",
  "Java 21": "https://cdn.simpleicons.org/openjdk/ED8B00",
  "Spring Boot": "https://cdn.simpleicons.org/springboot/6DB33F",
  Express: "https://cdn.simpleicons.org/express/B7A7D6",
  JWT: "https://cdn.simpleicons.org/jsonwebtokens/D6C7FF",
  "Socket.io": "https://cdn.simpleicons.org/socketdotio/B7A7D6",
  "REST APIs": "https://cdn.simpleicons.org/openapiinitiative/6BA539",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/4169E1",
  MySQL: "https://cdn.simpleicons.org/mysql/4479A1",
  MongoDB: "https://cdn.simpleicons.org/mongodb/47A248",
  "MongoDB Atlas": "https://cdn.simpleicons.org/mongodb/47A248",
  Docker: "https://cdn.simpleicons.org/docker/2496ED",
  Git: "https://cdn.simpleicons.org/git/F05032",
  GitHub: "https://cdn.simpleicons.org/github/B7A7D6",
  CI: "https://cdn.simpleicons.org/githubactions/2088FF",
  Swagger: "https://cdn.simpleicons.org/swagger/85EA2D",
};

const copy = {
  pt: {
    nav: ["Sobre", "Experiência", "Projetos", "Stack", "Contato"],
    available: "Disponível para novas oportunidades",
    kicker: "Desenvolvedor Full Stack · João Pessoa, PB · Remoto",
    heroA: "João Lira",
    heroB: "Desenvolvedor",
    heroC: "Full Stack",
    heroText: "Conecto interfaces precisas, APIs robustas e dados bem modelados para construir experiências digitais que funcionam de ponta a ponta.",
    explore: "Explorar trabalho",
    resume: "Baixar currículo",
    scroll: "Role para explorar",
    aboutEyebrow: "01 / PERFIL",
    aboutTitle: "Um pouco mais sobre mim...",
    aboutText1: "Desenvolvedor Full Stack e estudante de Ciência da Computação, com experiência em aplicações web, APIs, integrações e sistemas financeiros. No meu dia a dia, atuo no desenvolvimento e na manutenção de soluções voltadas a operações de crédito, trabalhando com back-end, front-end e integrações entre plataformas internas e serviços externos.",
    aboutText2: "Tenho experiência em fluxos como simulação de crédito, geração de contratos, análise de propostas, gestão de pagamentos, boletos, renegociações, estornos, ajustes operacionais e integrações financeiras. Busco entender o problema antes de implementar, conectando visão técnica e regra de negócio para entregar soluções escaláveis, eficientes, bem estruturadas e alinhadas à operação da empresa.",
    profileAlt: "Retrato profissional de João Victor Lira",
    profileRole: "Full Stack Developer",
    profileLocation: "João Pessoa · PB",
    expEyebrow: "02 / TRAJETÓRIA",
    expTitle: "Experiência que soma produto e engenharia.",
    present: "atual",
    rpePeriod: "ago 2025 — atual",
    rpeRole: "Desenvolvedor Full Stack · Estágio",
    rpeText: "Desenvolvimento e modernização de sistemas financeiros e arquiteturas de microsserviços. APIs REST com Spring Boot, interfaces React e Angular, migração Java 11 → 21, dados em PostgreSQL e ambientes Docker.",
    freelancePeriod: "dez 2023 — atual",
    freelanceRole: "Desenvolvedor Full Stack · Freelancer",
    freelanceText: "Aplicações web e APIs REST do planejamento ao deploy, com versionamento, integração contínua e decisões técnicas orientadas ao contexto de cada produto.",
    education: "FORMAÇÃO",
    degree: "Bacharelado em Ciência da Computação",
    degreePlace: "Centro Universitário UNIESP · 2024—2027",
    course: "Formação Full Stack",
    coursePlace: "B7Web · JavaScript, Node.js, React, TypeScript e bancos de dados",
    projEyebrow: "03 / TRABALHOS SELECIONADOS",
    projTitle: "Projetos desenvolvidos por mim",
    viewDemo: "Ver site",
    viewCode: "Código fonte",
    noDemo: "Código disponível",
    stackEyebrow: "04 / ARSENAL",
    stackTitle: "Tecnologias que uso para mover ideias.",
    contactEyebrow: "05 / CONTATO",
    contactTitleA: "Tem um problema",
    contactTitleB: "interessante?",
    contactText: "Estou disponível para oportunidades remotas, colaborações e produtos que pedem engenharia cuidadosa. Vamos conversar.",
    name: "Seu nome",
    email: "Seu e-mail",
    message: "Conte um pouco sobre o projeto ou oportunidade",
    send: "Enviar mensagem",
    sent: "Abrindo seu e-mail…",
    footer: "Projetado e desenvolvido por João Victor Lira",
    remote: "João Pessoa, PB · disponível para remoto",
  },
  en: {
    nav: ["About", "Experience", "Projects", "Stack", "Contact"],
    available: "Available for new opportunities",
    kicker: "Full Stack Developer · João Pessoa, Brazil · Remote",
    heroA: "João Lira",
    heroB: "Full Stack",
    heroC: "Developer",
    heroText: "I connect precise interfaces, robust APIs and well-modeled data to build digital experiences that work from end to end.",
    explore: "Explore my work",
    resume: "Download résumé",
    scroll: "Scroll to explore",
    aboutEyebrow: "01 / PROFILE",
    aboutTitle: "A little more about me.",
    aboutText1: "Full Stack Developer and Computer Science student with experience in web applications, APIs, integrations and financial systems. In my day-to-day work, I develop and maintain solutions for credit operations across back-end, front-end and integrations between internal platforms and external services.",
    aboutText2: "My experience includes credit simulations, contract generation, proposal analysis, payment management, bank slips, renegotiations, reversals, operational adjustments and financial integrations. I seek to understand the problem before implementing, connecting technical perspective and business rules to deliver scalable, efficient and well-structured solutions aligned with company operations.",
    profileAlt: "Professional portrait of João Victor Lira",
    profileRole: "Full Stack Developer",
    profileLocation: "João Pessoa · Brazil",
    expEyebrow: "02 / JOURNEY",
    expTitle: "Experience where product meets engineering.",
    present: "present",
    rpePeriod: "Aug 2025 — present",
    rpeRole: "Full Stack Developer · Intern",
    rpeText: "Development and modernization of financial systems and microservice architectures. REST APIs with Spring Boot, React and Angular interfaces, Java 11 → 21 migration, PostgreSQL data and Docker environments.",
    freelancePeriod: "Dec 2023 — present",
    freelanceRole: "Full Stack Developer · Freelancer",
    freelanceText: "Web applications and REST APIs from planning to deployment, using version control, continuous integration and context-driven technical decisions.",
    education: "EDUCATION",
    degree: "BSc in Computer Science",
    degreePlace: "UNIESP University Center · 2024—2027",
    course: "Full Stack Program",
    coursePlace: "B7Web · JavaScript, Node.js, React, TypeScript and databases",
    projEyebrow: "03 / SELECTED WORK",
    projTitle: "Projects developed by me",
    viewDemo: "Live demo",
    viewCode: "Source code",
    noDemo: "Code available",
    stackEyebrow: "04 / TOOLKIT",
    stackTitle: "Technology I use to move ideas forward.",
    contactEyebrow: "05 / CONTACT",
    contactTitleA: "Got an interesting",
    contactTitleB: "problem?",
    contactText: "I’m available for remote opportunities, collaborations and products that call for thoughtful engineering. Let’s talk.",
    name: "Your name",
    email: "Your email",
    message: "Tell me about the project or opportunity",
    send: "Send message",
    sent: "Opening your email…",
    footer: "Designed and developed by João Victor Lira",
    remote: "João Pessoa, Brazil · remote-ready",
  },
};

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("pt");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sent, setSent] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Contato pelo portfólio — ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`);
    setSent(true);
    window.location.href = `mailto:joaoliradev@hotmail.com?subject=${subject}&body=${body}`;
    window.setTimeout(() => setSent(false), 2500);
  };

  return (
    <main className={`site-shell ${theme}`}>
      <Background3D />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="João Lira — início">
          <span className="brand-mark code-brand" aria-hidden="true">
            <span className="code-glyph">&lt;/&gt;</span>
          </span>
          <span>joaolira-dev</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {t.nav.map((item, index) => (
            <a key={item} href={`#${["about", "experience", "projects", "stack", "contact"][index]}`}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button language-button" onClick={() => setLang(lang === "pt" ? "en" : "pt")} aria-label="Alternar idioma">
            <Globe2 size={15} /><span>{lang.toUpperCase()}</span>
          </button>
          <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Alternar tema">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      <section id="top" className="hero canvas-zone">
        <div className="hero-mascot" aria-hidden="true">
          <Image
            src="/gengar-mascot-transparent.png"
            alt=""
            width="600"
            height="600"
            decoding="async"
            fetchPriority="low"
          />
        </div>
        <div className="hero-content">
          <div className="status-pill"><span className="status-dot" />{t.available}</div>
          <p className="hero-kicker">{t.kicker}</p>
          <h1>
            <span>{t.heroA}</span>
            <span className="gradient-word">{t.heroB}</span>
            <span className="gradient-word">{t.heroC}</span>
          </h1>
          <p className="hero-copy">{t.heroText}</p>
          <div className="hero-cta">
            <a className="button button-primary" href="#projects">{t.explore}<ArrowDown size={17} /></a>
            <a className="button button-ghost" href="/joaolira-curriculo.pdf" download>{t.resume}<Download size={17} /></a>
          </div>
        </div>
        <div className="scroll-cue"><span>{t.scroll}</span><div className="scroll-line" /></div>
      </section>

      <section id="about" className="section about-section">
        <div className="section-grid reveal">
          <div className="about-lead">
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2>{t.aboutTitle}</h2>
            <figure className="profile-card">
              <Image
                src="/profile.png"
                alt={t.profileAlt}
                width="1024"
                height="1536"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>{t.profileRole}</span>
                <span>{t.profileLocation}</span>
              </figcaption>
            </figure>
          </div>
          <div className="about-copy">
            <p>{t.aboutText1}</p>
            <p>{t.aboutText2}</p>
          </div>
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="section-heading reveal">
          <p className="eyebrow">{t.expEyebrow}</p>
          <h2>{t.expTitle}</h2>
        </div>
        <div className="experience-layout">
          <div className="timeline">
            <article className="timeline-item reveal">
              <div className="timeline-marker"><BriefcaseBusiness size={17} /></div>
              <div className="timeline-meta"><span>{t.rpePeriod}</span><span>REMOTE</span></div>
              <h3>RPE Tech</h3>
              <p className="role">{t.rpeRole}</p>
              <p>{t.rpeText}</p>
              <div className="tags">{["Java 21", "Spring Boot", "React", "Angular", "PostgreSQL", "Docker"].map((x) => <span key={x}>{x}</span>)}</div>
            </article>
            <article className="timeline-item reveal">
              <div className="timeline-marker"><Code2 size={17} /></div>
              <div className="timeline-meta"><span>{t.freelancePeriod}</span><span>INDEPENDENT</span></div>
              <h3>Freelancer</h3>
              <p className="role">{t.freelanceRole}</p>
              <p>{t.freelanceText}</p>
              <div className="tags">{["React", "Node.js", "REST APIs", "CI/CD", "Deploy"].map((x) => <span key={x}>{x}</span>)}</div>
            </article>
          </div>
          <aside className="education-card glass-card reveal">
            <p className="card-label">{t.education}</p>
            <div className="education-item"><span>2024—27</span><h3>{t.degree}</h3><p>{t.degreePlace}</p></div>
            <div className="education-item"><span>FULL STACK</span><h3>{t.course}</h3><p>{t.coursePlace}</p></div>
          </aside>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="section-heading reveal">
          <p className="eyebrow">{t.projEyebrow}</p>
          <h2>{t.projTitle}</h2>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article className={`project-card project-${project.accent} reveal`} key={project.title}>
              {project.image ? (
                <div className="project-media">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    width="1884"
                    height="1060"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="project-media project-visual-fallback" aria-hidden="true">
                  <span>&lt;/&gt;</span>
                  <i />
                  <i />
                  <i />
                </div>
              )}
              <div className="project-top"><span className="project-number">{project.number}</span><Code2 size={21} /></div>
              <div className="project-copy">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description[lang]}</p>
              </div>
              <div className="tags project-tags">{project.tech.map((x) => <span key={x}>{x}</span>)}</div>
              <div className="project-links">
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">{t.viewDemo}<ArrowUpRight size={15} /></a>}
                <a href={project.code} target="_blank" rel="noreferrer"><Code2 size={15} />{t.viewCode}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="stack" className="section stack-section canvas-zone">
        <div className="section-heading reveal">
          <p className="eyebrow">{t.stackEyebrow}</p>
          <h2>{t.stackTitle}</h2>
        </div>
        <div className="stack-grid">
          {skillGroups.map((group, index) => (
            <div className="skill-group reveal" key={group.label}>
              <div className="skill-group-heading"><span>0{index + 1}</span><h3>{group.label}</h3></div>
              <div className="skill-list">
                {group.items.map((item) => (
                  <span key={item}>
                    {techIcons[item] ? (
                      <Image
                        src={techIcons[item]}
                        alt=""
                        width="18"
                        height="18"
                        loading="lazy"
                        decoding="async"
                        unoptimized
                      />
                    ) : (
                      <Code2 size={16} aria-hidden="true" />
                    )}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-glow" aria-hidden="true" />
        <div className="contact-wrap reveal">
          <div className="contact-intro">
            <p className="eyebrow">{t.contactEyebrow}</p>
            <h2>{t.contactTitleA}<br /><span>{t.contactTitleB}</span></h2>
            <p>{t.contactText}</p>
            <div className="contact-details">
              <a href="mailto:joaoliradev@hotmail.com"><Mail size={17} />joaoliradev@hotmail.com</a>
              <a href="tel:+5583991224066"><Phone size={17} />+55 (83) 99122-4066</a>
              <span><MapPin size={17} />{t.remote}</span>
            </div>
            <div className="socials">
              <a className="social-github" href="https://github.com/joaolira-dev" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Image src="https://cdn.simpleicons.org/github/B8A6D9" alt="" width="20" height="20" unoptimized />
              </a>
              <a className="social-linkedin" href="https://linkedin.com/in/joaolira-dev" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <span className="linkedin-mark" aria-hidden="true">in</span>
              </a>
              <a className="social-vercel" href="https://joaoliradev-portfolio.vercel.app" target="_blank" rel="noreferrer" aria-label="Site pessoal">
                <Image src="https://cdn.simpleicons.org/vercel/A78BFA" alt="" width="20" height="20" unoptimized />
              </a>
            </div>
          </div>
          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <label><span>{t.name}</span><input name="name" required autoComplete="name" /></label>
            <label><span>{t.email}</span><input name="email" type="email" required autoComplete="email" /></label>
            <label><span>{t.message}</span><textarea name="message" required rows={5} /></label>
            <button className="button button-primary" type="submit">{sent ? <><Check size={17} />{t.sent}</> : <>{t.send}<Send size={17} /></>}</button>
          </form>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark code-brand" aria-hidden="true">
            <span className="code-glyph">&lt;/&gt;</span>
          </span>
          <span>joaolira-dev</span>
        </a>
        <p>{t.footer} · © {new Date().getFullYear()}</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
