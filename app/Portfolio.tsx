"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  AppWindow,
  Building2,
  Cable,
  Check,
  Coffee,
  Download,
  GitCommitHorizontal,
  GitPullRequest,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PanelsTopLeft,
  Send,
  X,
} from "lucide-react";
import Background3D from "./Background3D";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import CaseStudyModal from "./CaseStudyModal";
import { projects, services, type Lang, type ProjectCase } from "./portfolio-content";

const WHATSAPP_NUMBER = "5583991224066";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, João! Vi seu portfólio e gostaria de conversar sobre um projeto.")}`;

const navigation = {
  pt: [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre mim" },
    { id: "projects", label: "Projetos" },
    { id: "skills", label: "Skills" },
    { id: "services", label: "Serviços" },
    { id: "experience", label: "Experiência" },
    { id: "contact", label: "Contato" },
  ],
  en: [
    { id: "home", label: "Home" },
    { id: "about", label: "About me" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "services", label: "Services" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],
};

const copy = {
  pt: {
    skip: "Pular para o conteúdo",
    phrases: ["Olá, eu me chamo João Victor Lira", "Desenvolvedor Full Stack", "Sites e sistemas sob medida"],
    heroText: "Desenvolvo sistemas completos, landing pages, aplicativos, aplicações web e integrações responsivas e fáceis de manter — do planejamento à aplicação.",
    available: "Disponível para novos projetos",
    heroFacts: ["Projetos", "Full Stack", "Remoto"],
    menu: "Abrir menu",
    closeMenu: "Fechar menu",
    language: "Alternar idioma",
    resume: "Currículo",
    aboutTitle: "Um pouco sobre mim e minha trajetória na programação",
    aboutText1: "Sou desenvolvedor full-stack e estudante de Ciência da Computação, com experiência em aplicações web, APIs, integrações e sistemas financeiros.",
    aboutText2: "Gosto de entender o problema antes de escrever código, criando soluções organizadas, escaláveis e alinhadas às necessidades do negócio.",
    aboutHighlights: ["Experiência com sistemas financeiros", "Do front-end ao back-end", "Atendimento remoto em todo o Brasil"],
    projectsKicker: "Trabalhos selecionados",
    projectsTitle: "Meus projetos",
    projectInstruction: "Role para explorar",
    viewProject: "Ver projeto",
    viewDetails: "Ver detalhes",
    skillsKicker: "Conhecimentos e competências",
    hardSkills: "Hard skills",
    softSkills: "Soft skills",
    servicesKicker: "O que eu construo",
    servicesTitle: "Serviços",
    experienceKicker: "Experiência profissional",
    experienceTitle: "Experiência que soma produto e engenharia",
    rpePeriod: "ago 2025 — atual",
    rpeRole: "Desenvolvedor Full Stack · Estágio",
    rpeText: "Desenvolvimento e modernização de sistemas financeiros e arquiteturas de microsserviços. APIs REST com Spring Boot, interfaces React e Angular, migração Java 11 → 21, dados em PostgreSQL e ambientes Docker.",
    freelancePeriod: "dez 2023 — atual",
    freelanceRole: "Desenvolvedor Full Stack · Freelancer",
    freelanceText: "Aplicações web e APIs REST do planejamento ao deploy, com versionamento, integração contínua e decisões técnicas orientadas ao contexto de cada produto.",
    contactKicker: "Vamos trabalhar juntos",
    contactTitle: "Vamos tirar seu projeto do papel?",
    contactText: "Conte um pouco sobre sua ideia e entrarei em contato para entender como posso ajudar.",
    whatsapp: "Conversar no WhatsApp",
    response: "Retorno em até 1 dia útil",
    formTitle: "Conte sobre o projeto",
    name: "Nome",
    contact: "E-mail ou WhatsApp",
    projectType: "Tipo de projeto",
    budget: "Faixa de orçamento",
    deadline: "Prazo desejado",
    message: "Mensagem",
    select: "Selecione uma opção",
    send: "Preparar mensagem no WhatsApp",
    sent: "Tudo certo! O WhatsApp foi aberto com sua mensagem pronta.",
    privacy: "Seus dados não são armazenados neste site.",
    errors: {
      name: "Informe seu nome com pelo menos 2 caracteres.",
      contact: "Informe um e-mail ou WhatsApp válido.",
      projectType: "Selecione o tipo de projeto.",
      budget: "Selecione uma faixa de orçamento.",
      deadline: "Selecione um prazo desejado.",
      message: "Conte um pouco mais sobre sua ideia.",
    },
    location: "João Pessoa — PB",
    created: "Criado e desenvolvido por",
    backTop: "Voltar ao início",
  },
  en: {
    skip: "Skip to content",
    phrases: ["Hi, I’m João Victor Lira", "Full-Stack Developer", "Custom websites and systems"],
    heroText: "I develop complete systems, landing pages, apps, web applications and responsive, maintainable integrations — from planning to implementation.",
    available: "Available for new projects",
    heroFacts: ["Projects", "Full Stack", "Remote"],
    menu: "Open menu",
    closeMenu: "Close menu",
    language: "Change language",
    resume: "Résumé",
    aboutTitle: "A little about me and my path in software development",
    aboutText1: "I am a full-stack developer and Computer Science student with experience in web applications, APIs, integrations and financial systems.",
    aboutText2: "I like to understand the problem before writing code, creating organized, scalable solutions aligned with business needs.",
    aboutHighlights: ["Financial systems experience", "From front-end to back-end", "Remote service throughout Brazil"],
    projectsKicker: "Selected work",
    projectsTitle: "My projects",
    projectInstruction: "Scroll to explore",
    viewProject: "View project",
    viewDetails: "View details",
    skillsKicker: "Knowledge and capabilities",
    hardSkills: "Hard skills",
    softSkills: "Soft skills",
    servicesKicker: "What I build",
    servicesTitle: "Services",
    experienceKicker: "Professional experience",
    experienceTitle: "Experience where product meets engineering",
    rpePeriod: "Aug 2025 — present",
    rpeRole: "Full Stack Developer · Intern",
    rpeText: "Development and modernization of financial systems and microservice architectures. REST APIs with Spring Boot, React and Angular interfaces, Java 11 → 21 migration, PostgreSQL data and Docker environments.",
    freelancePeriod: "Dec 2023 — present",
    freelanceRole: "Full Stack Developer · Freelancer",
    freelanceText: "Web applications and REST APIs from planning to deployment, using version control, continuous integration and context-driven technical decisions.",
    contactKicker: "Let’s work together",
    contactTitle: "Shall we bring your project to life?",
    contactText: "Tell me about your idea and I will get in touch to understand how I can help.",
    whatsapp: "Talk on WhatsApp",
    response: "Reply within one business day",
    formTitle: "Tell me about the project",
    name: "Name",
    contact: "Email or WhatsApp",
    projectType: "Project type",
    budget: "Budget range",
    deadline: "Desired timeline",
    message: "Message",
    select: "Select an option",
    send: "Prepare WhatsApp message",
    sent: "All set! WhatsApp opened with your message ready.",
    privacy: "Your data is not stored on this website.",
    errors: {
      name: "Enter your name with at least 2 characters.",
      contact: "Enter a valid email or WhatsApp number.",
      projectType: "Select the project type.",
      budget: "Select a budget range.",
      deadline: "Select a desired timeline.",
      message: "Tell me a little more about your idea.",
    },
    location: "João Pessoa — Brazil",
    created: "Created and developed by",
    backTop: "Back to top",
  },
};

const expertise = [
  { name: "TypeScript", icon: "🟦" },
  { name: "React", icon: "⚛" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "⬡" },
  { name: "APIs REST", icon: "🔗" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Tailwind CSS", icon: "〰" },
  { name: "Git", icon: "⑂" },
];

const softSkills = {
  pt: ["Visão de negócio", "Resolução de problemas", "Comunicação", "Organização", "Trabalho em equipe", "Aprendizado contínuo"],
  en: ["Business thinking", "Problem solving", "Communication", "Organization", "Teamwork", "Continuous learning"],
};

const serviceIcons = [PanelsTopLeft, Building2, AppWindow, Cable];
const heroFactIcons = [GitCommitHorizontal, GitPullRequest, Coffee];
const profileOrbitText = Array.from("FULLSTACK • DEVELOPER • ");

const formOptions = {
  projectType: {
    pt: ["Landing page", "Site institucional", "Sistema web", "API ou integração", "Outro"],
    en: ["Landing page", "Business website", "Web system", "API or integration", "Other"],
  },
  budget: {
    pt: ["Até R$ 2 mil", "R$ 2 mil — R$ 5 mil", "R$ 5 mil — R$ 10 mil", "Acima de R$ 10 mil", "Ainda não sei"],
    en: ["Up to R$ 2,000", "R$ 2,000 — R$ 5,000", "R$ 5,000 — R$ 10,000", "Above R$ 10,000", "Not sure yet"],
  },
  deadline: {
    pt: ["Até 2 semanas", "De 2 a 4 semanas", "De 1 a 2 meses", "Sem prazo definido"],
    en: ["Up to 2 weeks", "2 to 4 weeks", "1 to 2 months", "No defined deadline"],
  },
};

type ContactErrors = Partial<Record<"name" | "contact" | "projectType" | "budget" | "deadline" | "message", string>>;

function useTypewriter(phrases: string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const phrase = phrases[phraseIndex];
    const delay = deleting ? 30 : 58;
    const timer = window.setTimeout(() => {
      if (!deleting && text === phrase) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }
      setText(phrase.slice(0, deleting ? Math.max(0, text.length - 1) : text.length + 1));
    }, !deleting && text === phrase ? 1450 : deleting && text === "" ? 240 : delay);

    return () => window.clearTimeout(timer);
  }, [deleting, phraseIndex, phrases, text]);

  return text;
}

function TypewriterLine({ phrases }: { phrases: string[] }) {
  const text = useTypewriter(phrases);
  return (
    <>
      <h1 aria-hidden="true">{text}<span className="type-caret" aria-hidden="true" /></h1>
      <span className="sr-only">{phrases.join(". ")}</span>
    </>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("pt");
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);
  const projectSectionRef = useRef<HTMLElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".cinematic-reveal").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-24% 0px -64%", threshold: [0.05, 0.2, 0.45] },
    );
    navigation.pt.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const section = projectSectionRef.current;
    const track = projectTrackRef.current;
    if (!section || !track) return;

    let frame = 0;
    let distance = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      frame = 0;
      if (reducedMotion) return;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      track.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const measure = () => {
      if (reducedMotion) {
        section.style.height = "auto";
        track.style.transform = "none";
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth + Math.max(28, window.innerWidth * 0.06));
      section.style.height = `${window.innerHeight + distance + window.innerHeight * 0.22}px`;
      update();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    measure();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
    };
  }, [lang]);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  const closeCaseStudy = useCallback(() => setSelectedProject(null), []);
  const requestSimilarProject = useCallback(() => {
    setSelectedProject(null);
    window.setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 0);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      projectType: String(data.get("projectType") ?? "").trim(),
      budget: String(data.get("budget") ?? "").trim(),
      deadline: String(data.get("deadline") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const nextErrors: ContactErrors = {};
    if (values.name.length < 2) nextErrors.name = t.errors.name;
    if (values.contact.length < 8 || (!values.contact.includes("@") && values.contact.replace(/\D/g, "").length < 8)) nextErrors.contact = t.errors.contact;
    if (!values.projectType) nextErrors.projectType = t.errors.projectType;
    if (!values.budget) nextErrors.budget = t.errors.budget;
    if (!values.deadline) nextErrors.deadline = t.errors.deadline;
    if (values.message.length < 12) nextErrors.message = t.errors.message;
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    const text = [
      "Olá, João! Vi seu portfólio e gostaria de solicitar um orçamento.",
      "",
      `Nome: ${values.name}`,
      `Contato: ${values.contact}`,
      `Tipo de projeto: ${values.projectType}`,
      `Faixa de orçamento: ${values.budget}`,
      `Prazo: ${values.deadline}`,
      "",
      `Mensagem: ${values.message}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setErrors({});
    form.reset();
    window.setTimeout(() => setSent(false), 6000);
  };

  const renderError = (field: keyof ContactErrors) => errors[field] ? <span id={`${field}-error`} className="field-error">{errors[field]}</span> : null;

  return (
    <div className="cinematic-site">
      <a className="skip-link" href="#content">{t.skip}</a>
      <Background3D />

      <header className="cinematic-header">
        <a className="cinematic-brand" href="#home" aria-label="João Lira — início" onClick={() => { setMenuOpen(false); setActiveSection("home"); }}>João Lira</a>
        <nav className="cinematic-nav" aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}>
          {navigation[lang].slice(1).map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "is-active" : ""} aria-current={activeSection === item.id ? "location" : undefined} onClick={() => setActiveSection(item.id)}>{item.label}</a>
          ))}
        </nav>
        <div className="cinematic-actions">
          <a href="https://github.com/joaolira-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon size={18} /></a>
          <a href="https://www.linkedin.com/in/joaolira-dev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon size={18} /></a>
          <a className="cinematic-resume" href="/joaolira-curriculo.pdf" download><Download size={15} /><span>{t.resume}</span></a>
          <button className="cinematic-language" type="button" onClick={() => setLang(lang === "pt" ? "en" : "pt")} aria-label={t.language}><Globe2 size={15} />{lang === "pt" ? "PT" : "EN"}</button>
          <button className="cinematic-menu-button" type="button" onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-controls="cinematic-mobile-menu" aria-label={menuOpen ? t.closeMenu : t.menu}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
        <div id="cinematic-mobile-menu" className={`cinematic-mobile-menu ${menuOpen ? "is-open" : ""}`}>
          {navigation[lang].map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => { setMenuOpen(false); setActiveSection(item.id); }}>{item.label}</a>)}
          <a href="/joaolira-curriculo.pdf" download onClick={() => setMenuOpen(false)}>{t.resume}</a>
        </div>
      </header>

      <main id="content">
        <section id="home" className="cinematic-hero">
          <div className="cinematic-hero-type">
            <TypewriterLine key={lang} phrases={t.phrases} />
          </div>
          <div className="cinematic-hero-bottom">
            <div className="cinematic-hero-copy">
              <span className="availability"><i />{t.available}</span>
              <p>{t.heroText}</p>
            </div>
            <div className="cinematic-hero-facts">
              {t.heroFacts.map((fact, index) => {
                const FactIcon = heroFactIcons[index];
                const value = index === 0 ? String(projects.length).padStart(2, "0") : index === 1 ? "Full Stack" : "100%";
                return <div key={fact}><FactIcon size={17} aria-hidden="true" /><strong>{value}</strong><span>{fact}</span></div>;
              })}
            </div>
          </div>
        </section>

        <section id="about" className="cinematic-about">
          <div className="cinematic-about-intro cinematic-reveal" aria-hidden="true" />
          <div className="cinematic-about-detail">
            <div className="cinematic-profile-wrap cinematic-reveal">
              <figure className="cinematic-profile">
                <Image src="/profile.webp" alt={lang === "pt" ? "Retrato profissional de João Victor Lira" : "Professional portrait of João Victor Lira"} width={800} height={1000} sizes="(max-width: 767px) 88vw, 430px" loading="lazy" />
              </figure>
              <div className="profile-orbit" aria-hidden="true">
                {profileOrbitText.map((character, index) => (
                  <span
                    key={`${character}-${index}`}
                    style={{ "--orbit-angle": `${index * (360 / profileOrbitText.length)}deg` } as CSSProperties}
                  >
                    {character === " " ? "\u00A0" : character}
                  </span>
                ))}
              </div>
            </div>
            <div className="cinematic-about-copy cinematic-reveal">
              <span className="section-dot" aria-hidden="true" />
              <h3>{t.aboutTitle}</h3>
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
              <ul>{t.aboutHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="projects" className="cinematic-projects" ref={projectSectionRef}>
          <div className="cinematic-projects-sticky">
            <div className="cinematic-projects-heading">
              <div><span>{t.projectsKicker}</span><h2>{t.projectsTitle}</h2></div>
              <p>{t.projectInstruction}<ArrowDownRight size={15} /></p>
            </div>
            <div className="cinematic-project-track" ref={projectTrackRef} role="region" aria-label={t.projectsTitle}>
              {projects.map((project) => (
                <article className="cinematic-project-card" key={project.slug}>
                  <span className="cinematic-project-number">{project.number}</span>
                  <a className="cinematic-project-image" href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${t.viewProject}: ${project.title}`}>
                    <Image src={project.image} alt={project.imageAlt[lang]} width={900} height={620} sizes="(max-width: 767px) 86vw, 46vw" loading="lazy" />
                  </a>
                  <div className="cinematic-project-meta"><span>{project.category[lang]}</span><i>{project.status[lang]}</i></div>
                  <h3>{project.title}</h3>
                  <p>{project.solution[lang]}</p>
                  <div className="cinematic-project-tech">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  <div className="cinematic-project-links">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">{t.viewProject}<ArrowUpRight size={15} /></a>
                    <button type="button" onClick={() => setSelectedProject(project)}>{t.viewDetails}<ArrowUpRight size={15} /></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="cinematic-skills">
          <div className="cinematic-section-title cinematic-reveal"><span>{t.skillsKicker}</span></div>
          <div className="cinematic-skill-grid">
            <div className="cinematic-skill-column cinematic-reveal">
              <h3>{t.hardSkills}</h3>
              <div className="cinematic-light-card cinematic-tech-card">
                {expertise.map((item) => <span key={item.name}><i aria-hidden="true">{item.icon}</i>{item.name}</span>)}
              </div>
            </div>
            <div className="cinematic-skill-column cinematic-reveal">
              <h3>{t.softSkills}</h3>
              <div className="cinematic-light-card cinematic-soft-card">
                {softSkills[lang].map((skill, index) => <span key={skill}><i aria-hidden="true">0{index + 1}</i>{skill}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="cinematic-services">
          <div className="cinematic-section-title cinematic-reveal"><span>{t.servicesKicker}</span><h2>{t.servicesTitle}</h2></div>
          <div className="cinematic-service-grid">
            {services.map((service, index) => {
              const ServiceIcon = serviceIcons[index];
              return (
                <article className="cinematic-service-item cinematic-reveal" key={service.title.pt}>
                  <div><span>0{index + 1}</span><ServiceIcon size={20} aria-hidden="true" /></div>
                  <h3>{service.title[lang]}</h3>
                  <p>{service.description[lang]}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="experience" className="cinematic-experience">
          <div className="cinematic-section-title cinematic-reveal"><span>{t.experienceKicker}</span><h2>{t.experienceTitle}</h2></div>
          <div className="experience-list">
            <article className="experience-row cinematic-reveal">
              <div><span>{t.rpePeriod}</span><h3>RPE Tech</h3><strong>{t.rpeRole}</strong></div>
              <i aria-hidden="true" />
              <div><p>{t.rpeText}</p><div className="experience-tags">{["Java 21", "Spring Boot", "React", "Angular", "PostgreSQL", "Docker"].map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </article>
            <article className="experience-row cinematic-reveal">
              <div><span>{t.freelancePeriod}</span><h3>Freelancer</h3><strong>{t.freelanceRole}</strong></div>
              <i aria-hidden="true" />
              <div><p>{t.freelanceText}</p><div className="experience-tags">{["React", "Node.js", "REST APIs", "CI/CD", "Deploy"].map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </article>
          </div>
        </section>

        <section id="contact" className="cinematic-contact">
          <div className="cinematic-contact-intro cinematic-reveal">
            <span>{t.contactKicker}</span>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{t.whatsapp}<ArrowUpRight size={17} /></a>
            <small>{t.response}</small>
          </div>

          <form className="cinematic-form cinematic-reveal" onSubmit={handleSubmit} noValidate>
            <h3>{t.formTitle}</h3>
            <div className="cinematic-form-grid">
              <label><span>{t.name}</span><input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{renderError("name")}</label>
              <label><span>{t.contact}</span><input name="contact" autoComplete="email" aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-error" : undefined} />{renderError("contact")}</label>
              <label><span>{t.projectType}</span><select name="projectType" defaultValue="" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "projectType-error" : undefined}><option value="" disabled>{t.select}</option>{formOptions.projectType[lang].map((option) => <option key={option}>{option}</option>)}</select>{renderError("projectType")}</label>
              <label><span>{t.budget}</span><select name="budget" defaultValue="" aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "budget-error" : undefined}><option value="" disabled>{t.select}</option>{formOptions.budget[lang].map((option) => <option key={option}>{option}</option>)}</select>{renderError("budget")}</label>
              <label className="cinematic-form-wide"><span>{t.deadline}</span><select name="deadline" defaultValue="" aria-invalid={Boolean(errors.deadline)} aria-describedby={errors.deadline ? "deadline-error" : undefined}><option value="" disabled>{t.select}</option>{formOptions.deadline[lang].map((option) => <option key={option}>{option}</option>)}</select>{renderError("deadline")}</label>
              <label className="cinematic-form-wide"><span>{t.message}</span><textarea name="message" rows={4} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />{renderError("message")}</label>
            </div>
            <button type="submit">{sent ? <><Check size={17} />{t.sent}</> : <>{t.send}<Send size={17} /></>}</button>
            <p>{t.privacy}</p>
            <div className="form-status" aria-live="polite">{sent ? t.sent : ""}</div>
          </form>
        </section>
      </main>

      <footer className="cinematic-footer">
        <h2>João Victor Lira</h2>
        <div className="cinematic-footer-grid">
          <div>
            <a href="mailto:joaoliradev@hotmail.com"><Mail size={17} /><span><small>E-mail</small>joaoliradev@hotmail.com</span></a>
            <span><MapPin size={17} /><span><small>{lang === "pt" ? "Localização" : "Location"}</small>{t.location}</span></span>
          </div>
          <div><small>{lang === "pt" ? "Redes sociais" : "Social media"}</small><a href="https://github.com/joaolira-dev" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/joaolira-dev" target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} /></a></div>
          <div><small>{t.created}</small><strong>João Victor Lira</strong><span>© {new Date().getFullYear()}</span></div>
          <a className="cinematic-back-top" href="#home">{t.backTop}<ArrowUpRight size={15} /></a>
        </div>
      </footer>

      {selectedProject && <CaseStudyModal project={selectedProject} lang={lang} onClose={closeCaseStudy} onRequestProject={requestSimilarProject} />}
    </div>
  );
}
