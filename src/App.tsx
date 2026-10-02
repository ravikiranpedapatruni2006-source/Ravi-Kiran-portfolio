const BASE_URL = import.meta.env.BASE_URL;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Python",
  "Java",
  "Data Structures & Algorithms",
  "React",
  "JavaScript",
  "HTML & CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Git & GitHub",
  "AI / ML",
];

const projects = [
  {
    number: "01",
    title: "ProConnect",
    type: "Full-Stack Marketplace",
    description:
      "A rural-first hyperlocal marketplace designed to connect customers with trusted self-employed service providers such as electricians, plumbers, carpenters, mechanics, painters, cleaners and freelancers. The platform focuses on location-aware discovery, provider profiles, preferred helpers and practical local services.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    number: "02",
    title: "Integrated Solid Waste Segregation System",
    type: "Academic Project",
    description:
      "A practical project focused on improving waste segregation by organizing waste categories and supporting a more structured approach to separating recyclable and non-recyclable materials.",
    tags: ["Python", "AI / ML", "Data Processing"],
  },
  {
    number: "03",
    title: "LLM & RAG Experiments",
    type: "Generative AI",
    description:
      "Hands-on experimentation with large language models, retrieval-augmented generation and fine-tuning workflows through practical chatbot implementations and learning projects.",
    tags: ["LLM", "RAG", "Fine-Tuning", "Python"],
  },
];

const certifications = [
  {
    number: "01",
    title: "24-Hour Hackathon — VEL IDEAFORGE 2K26",
    detail: "Vel Tech University, Chennai",
    images: [
      `${BASE_URL}gallery/hackathon-certificate.jpeg`,
      `${BASE_URL}gallery/hackathon-photo.png`,
    ],
  },
  {
    number: "02",
    title: "Deloitte Data Analytics Job Simulation",
    detail: "Deloitte",
    images: [`${BASE_URL}gallery/deloitte-data-analytics.png`],
  },
  {
    number: "03",
    title: "Deloitte Technology Job Simulation",
    detail: "Deloitte",
    images: [`${BASE_URL}gallery/deloitte-technology.png`],
  },
  {
    number: "04",
    title: "CCNA Certifications",
    detail: "Cisco Networking Academy",
    images: [
      `${BASE_URL}gallery/ccna-switching-routing-wireless.png`,
      `${BASE_URL}gallery/ccna-introduction-to-networks.png`,
    ],
  },
];

function App() {
  const [activeGallery, setActiveGallery] = useState<string[] | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(".nav", {
          y: -30,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-kicker",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          ".hero-title span",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.05,
            stagger: 0.08,
          },
          "-=0.35"
        )
        .from(
          ".hero-copy",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.55"
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.45"
        )
        .from(
          ".portrait-wrap",
          {
            scale: 0.9,
            opacity: 0,
            duration: 1.15,
          },
          "-=0.7"
        );

      gsap.to(".hero-grid", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(portraitRef.current, {
        yPercent: -8,
        rotateY: 4,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap
        .utils
        .toArray<HTMLElement>(".project-card, .cert-card")
        .forEach((card) => {
          gsap.from(card, {
            y: 45,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          });
        });
    }, heroRef);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      {/* ================= HERO ================= */}

      <section className="hero" ref={heroRef} id="home">
        <div className="hero-grid" />

        <nav className="nav">
          <a className="brand" href="#home">
            RK<span>.</span>
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
          </div>

          <a className="nav-contact" href="#contact">
            Let's talk <span>↗</span>
          </a>
        </nav>

        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-kicker">
              B.TECH CSE · AI &amp; DS
            </p>

            <h1 className="hero-title">
              <span>LEARNING TO</span>
              <span>BUILD.</span>
              <span>
                BUILDING TO <em>GROW.</em>
              </span>
            </h1>

            <p className="hero-copy">
              Hi, I'm <strong>Ravi Kiran</strong>, a B.Tech CSE student
              specializing in Artificial Intelligence &amp; Data Science. I
              enjoy building web applications, solving problems with Java and
              DSA, and exploring practical AI solutions.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#projects">
                View projects <span>↗</span>
              </a>

              <a className="button ghost" href="#contact">
                Contact me
              </a>
            </div>
          </div>

          <div className="portrait-wrap">
            <div className="portrait-glow" />
            <div className="portrait-ring" />

            <img
              ref={portraitRef}
              className="portrait"
              src={`${BASE_URL}hero.jpeg`}
              alt="Ravi Kiran in a professional formal suit"
            />

            <div className="portrait-label">
              <span>AVAILABLE FOR</span>
              <strong>PROJECTS · INTERNSHIPS</strong>
            </div>
          </div>
        </div>

        <div className="scroll-cue">
          <span>SCROLL TO EXPLORE</span>
          <i>↓</i>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section className="intro section" id="about">
        <div className="section-label reveal">
          01 / ABOUT
        </div>

        <div className="intro-content">
          <h2 className="reveal">
            I build, learn and experiment with{" "}
            <em>technology.</em>
          </h2>

          <p className="reveal">
            I'm a B.Tech Computer Science student specializing in
            Artificial Intelligence &amp; Data Science at Vel Tech
            University, Chennai. My interests include Java programming,
            Data Structures &amp; Algorithms, Python, web development and
            practical applications of AI. I enjoy turning ideas into
            working projects and continuously improving my technical
            skills through hands-on development.
          </p>

          <div className="profile-links reveal">
            <a
              href="https://github.com/ravikiranpedapatruni2006-source"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/pedapatruni-ravikiran-1a7389397/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}

      <section className="skills section" id="skills">
        <div className="section-label reveal">
          02 / SKILLS
        </div>

        <div className="skills-layout">
          <div>
            <p className="eyebrow reveal">
              WHAT I WORK WITH
            </p>

            <h2 className="reveal">
              Tools that turn
              <br />
              <em>ideas into code.</em>
            </h2>
          </div>

          <div className="skill-list reveal">
            {skills.map((skill, index) => (
              <div className="skill-row" key={skill}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{skill}</strong>

                <i>↗</i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}

      <section className="projects section" id="projects">
        <div className="section-label reveal">
          03 / SELECTED WORK
        </div>

        <div className="projects-heading">
          <h2 className="reveal">
            Projects with a <em>purpose.</em>
          </h2>

          <p className="reveal">
            Projects that reflect my interest in software development,
            AI and practical problem solving.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.number}
            >
              <div className="project-number">
                {project.number}
              </div>

              <div className="project-main">
                <p className="eyebrow">
                  {project.type}
                </p>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="project-arrow">
                ↗
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= EDUCATION ================= */}

      <section className="education section" id="education">
        <div className="section-label reveal">
          04 / EDUCATION
        </div>

        <div className="education-card reveal">
          <div>
            <p className="eyebrow">
              2024 — PRESENT
            </p>

            <h2>
              B.Tech CSE — AI &amp; DS
            </h2>

            <p>
              Vel Tech University, Chennai
            </p>

            <small>
              Specialization: Artificial Intelligence &amp; Data Science
            </small>
          </div>

          <div className="education-mark">
            AI
            <br />
            <span>&amp; DS</span>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATIONS ================= */}

      <section
        className="certifications section"
        id="certifications"
      >
        <div className="section-label reveal">
          05 / CERTIFICATIONS &amp; EXPERIENCE
        </div>

        <div className="cert-heading">
          <h2 className="reveal">
            Learning beyond the <em>classroom.</em>
          </h2>
        </div>

        <div className="cert-list">
          {certifications.map((cert) => (
            <article
              className={`cert-card${
                cert.images.length
                  ? " cert-clickable"
                  : ""
              }`}
              key={cert.number}
              onClick={() => {
                if (cert.images.length) {
                  setActiveGallery(cert.images);
                  setActiveImage(0);
                }
              }}
              role={
                cert.images.length
                  ? "button"
                  : undefined
              }
              tabIndex={
                cert.images.length
                  ? 0
                  : undefined
              }
              onKeyDown={(event) => {
                if (
                  cert.images.length &&
                  (event.key === "Enter" ||
                    event.key === " ")
                ) {
                  event.preventDefault();

                  setActiveGallery(cert.images);
                  setActiveImage(0);
                }
              }}
            >
              <span>{cert.number}</span>

              <div>
                <h3>{cert.title}</h3>
                <p>{cert.detail}</p>
              </div>

              <b>
                {cert.images.length ? "↗" : ""}
              </b>
            </article>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section className="contact section" id="contact">
        <div className="section-label reveal">
          06 / CONTACT
        </div>

        <div className="contact-content">
          <p className="eyebrow reveal">
            HAVE A PROJECT IN MIND?
          </p>

          <h2 className="reveal">
            Let's build something
            <br />
            <em>meaningful.</em>
          </h2>

          <p className="contact-note reveal">
            Open to opportunities, collaborations, projects and
            internships.
          </p>

          <div className="contact-links reveal">
            <a
              className="email"
              href="mailto:ravikiranpedapatruni2006@gmail.com"
            >
              ravikiranpedapatruni2006@gmail.com{" "}
              <span>↗</span>
            </a>

            <a
              className="social-link"
              href="https://github.com/ravikiranpedapatruni2006-source"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a
              className="social-link"
              href="https://www.linkedin.com/in/pedapatruni-ravikiran-1a7389397/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* ================= GALLERY POPUP ================= */}

      {activeGallery && (
        <div
          className="gallery-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Certificate and event photos"
          onClick={() => setActiveGallery(null)}
        >
          <div
            className="gallery-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="gallery-close"
              aria-label="Close gallery"
              onClick={() =>
                setActiveGallery(null)
              }
            >
              ×
            </button>

            <div className="gallery-image-wrap">
              <img
                src={activeGallery[activeImage]}
                alt={
                  activeImage === 0
                    ? "Portfolio certificate or event photo"
                    : "Portfolio event photo"
                }
              />
            </div>

            {activeGallery.length > 1 && (
              <div className="gallery-controls">
                <button
                  onClick={() =>
                    setActiveImage((current) =>
                      current === 0
                        ? activeGallery.length - 1
                        : current - 1
                    )
                  }
                  aria-label="Previous photo"
                >
                  ←
                </button>

                <span>
                  {activeImage + 1} /{" "}
                  {activeGallery.length}
                </span>

                <button
                  onClick={() =>
                    setActiveImage((current) =>
                      current ===
                      activeGallery.length - 1
                        ? 0
                        : current + 1
                    )
                  }
                  aria-label="Next photo"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}

      <footer>
        <span>
          RAVI KIRAN © 2026
        </span>

        <span>
          REACT · GSAP · LENIS
        </span>

        <a href="#home">
          BACK TO TOP ↑
        </a>
      </footer>
    </main>
  );
}

export default App;