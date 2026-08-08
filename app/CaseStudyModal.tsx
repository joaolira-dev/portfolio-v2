"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Code2, MessageCircle, X } from "lucide-react";
import type { Lang, ProjectCase } from "./portfolio-content";

type CaseStudyModalProps = {
  project: ProjectCase;
  lang: Lang;
  onClose: () => void;
  onRequestProject: () => void;
};

const labels = {
  pt: {
    close: "Fechar estudo de caso",
    context: "Contexto",
    problem: "Problema",
    solution: "Solução",
    features: "Principais funcionalidades",
    decisions: "Decisões técnicas",
    screens: "Aplicação em diferentes telas",
    technologies: "Tecnologias",
    learning: "Resultado e aprendizado",
    view: "Ver projeto",
    code: "Código-fonte",
    ctaTitle: "Precisa de um projeto com esse nível de cuidado?",
    ctaText: "Conte sua ideia e eu preparo uma proposta alinhada ao seu objetivo.",
    cta: "Solicitar projeto semelhante",
    desktop: "Desktop",
    mobile: "Mobile",
    role: "Meu papel",
  },
  en: {
    close: "Close case study",
    context: "Context",
    problem: "Problem",
    solution: "Solution",
    features: "Main features",
    decisions: "Technical decisions",
    screens: "Application across screens",
    technologies: "Technologies",
    learning: "Outcome and learning",
    view: "View project",
    code: "Source code",
    ctaTitle: "Need a project built with this level of care?",
    ctaText: "Share your idea and I will prepare a proposal aligned with your goal.",
    cta: "Request a similar project",
    desktop: "Desktop",
    mobile: "Mobile",
    role: "My role",
  },
};

export default function CaseStudyModal({ project, lang, onClose, onRequestProject }: CaseStudyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const titleId = `case-study-${project.slug}`;
  const t = labels[lang];

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const pageRegions = document.querySelectorAll<HTMLElement>(".topbar, main, footer");
    document.body.style.overflow = "hidden";
    pageRegions.forEach((region) => {
      region.setAttribute("inert", "");
      region.setAttribute("aria-hidden", "true");
    });
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      pageRegions.forEach((region) => {
        region.removeAttribute("inert");
        region.removeAttribute("aria-hidden");
      });
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="case-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article ref={modalRef} className="case-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="case-modal-header">
          <div>
            <span className="case-status">{project.status[lang]}</span>
            <p>{project.category[lang]}</p>
          </div>
          <button ref={closeButtonRef} className="modal-close" type="button" onClick={onClose} aria-label={t.close}>
            <X size={20} />
          </button>
        </div>

        <div className="case-modal-intro">
          <div>
            <span className="project-number">{project.number}</span>
            <h2 id={titleId}>{project.title}</h2>
            <p>{project.objective[lang]}</p>
          </div>
          <div className="case-modal-actions">
            <a className="button button-primary" href={project.demo} target="_blank" rel="noopener noreferrer">
              {t.view}<ArrowUpRight size={16} />
            </a>
            {project.code && (
              <a className="button button-ghost" href={project.code} target="_blank" rel="noopener noreferrer">
                <Code2 size={16} />{t.code}
              </a>
            )}
          </div>
        </div>

        <div className="case-browser-frame">
          <div className="browser-chrome" aria-hidden="true"><i /><i /><i /><span>{project.demo.replace("https://", "")}</span></div>
          <div className="case-browser-image">
            <Image src={project.image} alt={project.imageAlt[lang]} width={1600} height={1000} sizes="(max-width: 900px) 92vw, 1040px" />
          </div>
        </div>

        <div className="case-copy-grid">
          <section>
            <span>{t.context}</span>
            <p>{project.context[lang]}</p>
          </section>
          <section>
            <span>{t.problem}</span>
            <p>{project.problem[lang]}</p>
          </section>
          <section>
            <span>{t.solution}</span>
            <p>{project.solution[lang]}</p>
          </section>
          <section>
            <span>{t.role}</span>
            <p>{project.role[lang]}</p>
          </section>
        </div>

        <div className="case-list-grid">
          <section>
            <p className="case-section-label">{t.features}</p>
            <ul>{project.features[lang].map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul>
          </section>
          <section>
            <p className="case-section-label">{t.decisions}</p>
            <ul>{project.decisions[lang].map((item) => <li key={item}><Code2 size={16} />{item}</li>)}</ul>
          </section>
        </div>

        <section className="case-screens">
          <p className="case-section-label">{t.screens}</p>
          <div className="case-devices">
            <figure className="case-desktop-device">
              <div><Image src={project.image} alt={`${project.imageAlt[lang]} — ${t.desktop}`} width={1600} height={1000} sizes="(max-width: 760px) 90vw, 720px" /></div>
              <figcaption>{t.desktop}</figcaption>
            </figure>
            <figure className="case-phone-device">
              <div><Image src={project.image} alt={`${project.imageAlt[lang]} — ${t.mobile}`} width={430} height={920} sizes="220px" /></div>
              <figcaption>{t.mobile}</figcaption>
            </figure>
          </div>
        </section>

        <div className="case-footer-grid">
          <section>
            <p className="case-section-label">{t.technologies}</p>
            <div className="tags">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
          </section>
          <section>
            <p className="case-section-label">{t.learning}</p>
            <p>{project.learning[lang]}</p>
          </section>
        </div>

        <div className="case-cta">
          <div><h3>{t.ctaTitle}</h3><p>{t.ctaText}</p></div>
          <button className="button button-primary" type="button" onClick={onRequestProject}>
            <MessageCircle size={17} />{t.cta}
          </button>
        </div>
      </article>
    </div>
  );
}
