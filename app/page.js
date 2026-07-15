"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./globals.css";

export default function Home() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("");
  const [typedText, setTypedText] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const fullText = "Senior Full-Stack .NET Engineer";
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 55);
    return () => clearInterval(timer);
  }, []);

  // Scroll progress + scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(window.scrollY / total);

      const sections = ["about", "ecosystem", "experience", "resume", "education", "contact"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      if (window.scrollY < 200) current = "";
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track mouse position for custom cursor
  useEffect(() => {
    const handleMouseMoveGlobal = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    return () => window.removeEventListener("mousemove", handleMouseMoveGlobal);
  }, []);

  // Particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 250 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 2 + 0.8;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        if (mouse.x != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= dx * force * 0.018;
            this.y -= dy * force * 0.018;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.5)";
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 8500), 90);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        if (mouse.x != null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * (1 - dist / mouse.radius)})`;
            ctx.lineWidth = 2.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw();
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseOut = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    resize();
    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // Intersection Observer for reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -50px 0px" }
    );
    const hiddenElements = document.querySelectorAll(".reveal-element");
    hiddenElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleScrollTo = useCallback((e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const navLinks = [
    { label: "About", href: "about" },
    { label: "Stack", href: "ecosystem" },
    { label: "Work", href: "experience" },
    { label: "Resume", href: "resume" },
    { label: "Education", href: "education" },
    { label: "Contact", href: "contact" },
  ];

  const techCards = [
    {
      tag: "Backend",
      title: ".NET Ecosystem",
      accent: "cyan",
      items: [".NET Core 8", "ASP.NET Web API", "ASP.NET MVC", "C# 12", "LINQ", "Dapper", "EF Core", "GraphQL"],
      body: "Architecting resilient server-side systems with clean architecture, SOLID principles, and deterministic logic built for scale.",
    },
    {
      tag: "Data",
      title: "Database Layer",
      accent: "violet",
      items: ["SQL Server", "MongoDB", "T-SQL", "Query Tuning", "Indexing", "Stored Procedures"],
      body: "Relational modeling with EF Core alongside high-performance NoSQL schemas for polymorphic data and scalable document stores.",
    },
    {
      tag: "Async",
      title: "Message Pipelines",
      accent: "fuchsia",
      items: ["SignalR", "RabbitMQ", "Hangfire", "WebSockets", "Event-Driven"],
      body: "Decoupling services through event-driven design. Async task orchestration via message brokers and background job processors.",
    },
    {
      tag: "Frontend",
      title: "User Interfaces",
      accent: "sky",
      items: ["Blazor", "Tailwind CSS", "Bootstrap 5", "HTML5", "CSS3", "JavaScript"],
      body: "Responsive, accessible interfaces using modern component frameworks and utility-first CSS for rapid, maintainable styling.",
    },
    {
      tag: "Cloud",
      title: "DevOps & Azure",
      accent: "emerald",
      items: ["Azure App Service", "Azure Functions", "Blob Storage", "Docker", "GitHub Actions", "CI/CD"],
      body: "Cloud-native deployments with automated pipelines, containerized workloads, and robust infrastructure-as-code practices.",
    },
    {
      tag: "APIs",
      title: "Third-Party Integrations",
      accent: "amber",
      items: ["CargoWise", "Stripe", "Twilio", "WhatsApp Business", "REST", "SOAP"],
      body: "Seamlessly wiring enterprise logistics, payment gateways, and communication channels into unified backend orchestration.",
    },
  ];

  const jobs = [
    {
      company: "Intercargo Logistics",
      role: "Senior Software Engineer",
      when: "Jan 2025 — Present",
      where: "Islamabad, Pakistan",
      live: true,
      bullets: [
        "Engineered RESTful and SOAP APIs on .NET Core 8, powering frontend apps and automating logistics workflows via CargoWise and Haulage integrations.",
        "Built real-time notification infrastructure using SignalR hubs for instant cross-system alerts and live collaboration.",
        "Wired WhatsApp Business API and Twilio (SMS, Voice, Conversations) into robust omni-channel communication flows.",
        "Implemented Stripe payment processing with subscription billing and secure webhook event handling.",
        "Deployed enterprise-grade RBAC using ASP.NET Identity and OAuth 2.0 for hardened API endpoint protection.",
        "Drove code quality through peer reviews, comprehensive unit testing, and disciplined Git branching strategies.",
      ],
    },
    {
      company: "Signup Solution",
      role: ".NET Core Developer",
      when: "Apr 2024 — Jan 2025",
      where: "Rawalpindi, Pakistan",
      live: false,
      bullets: [
        "Developed scalable APIs with ASP.NET Core and MVC, ensuring clean separation between frontend and data layers.",
        "Optimized database schemas in EF Core and boosted query throughput via strategic indexing and tuning.",
        "Hardened authentication flows with ASP.NET Identity and OAuth 2.0 to safeguard sensitive customer data.",
        "Integrated external APIs and payment gateways to extend platform capabilities.",
      ],
    },
    {
      company: "Metaphor Technologies",
      role: "Senior Software Engineer",
      when: "Nov 2023 — Jun 2025",
      where: "Remote",
      live: false,
      bullets: [
        "Crafted responsive UIs with Blazor and Tailwind CSS, elevating user engagement and accessibility standards.",
        "Streamlined data fetching with efficient GraphQL queries and mutations, cutting payload overhead and load times.",
        "Tracked down and resolved critical production issues across distributed remote API environments.",
        "Collaborated across teams to push system capabilities forward and introduce technical innovations.",
      ],
    },
    {
      company: "Smartan Solver",
      role: "Full Stack .NET Developer",
      when: "Jan 2022 — Sep 2023",
      where: "Faisalabad, Pakistan",
      live: false,
      bullets: [
        "Owned end-to-end design, coding, and deployment of enterprise web apps following strict SOLID principles.",
        "Built maintainable backend patterns with ASP.NET MVC and .NET Core for long-term codebase health.",
        "Delivered cross-browser responsive UIs using HTML5, CSS3, Bootstrap 5, and vanilla JavaScript.",
        "Applied on-page SEO tactics to improve organic visibility and search rankings.",
      ],
    },
    {
      company: "Virtual University — Capstone",
      role: "Desktop Application Developer",
      when: "Jan 2023 — Aug 2023",
      where: "Remote",
      live: false,
      bullets: [
        "Built a full-featured Point-of-Sale desktop application for retail operations using WinForms/WPF.",
        "Implemented secure role-based login to protect transactional and inventory data.",
        "Generated detailed sales reports and analytics dashboards for business intelligence.",
        "Designed intuitive admin panels for product catalogs, vendor management, and user administration.",
      ],
    },
  ];

  const accentGrad = {
    cyan: "from-cyan-400 to-teal-300",
    violet: "from-violet-400 to-purple-300",
    fuchsia: "from-fuchsia-400 to-pink-300",
    sky: "from-sky-400 to-blue-300",
    emerald: "from-emerald-400 to-teal-300",
    amber: "from-amber-400 to-orange-300",
  };

  const borderGlow = {
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]",
    violet: "hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(167,139,250,0.12)]",
    fuchsia: "hover:border-fuchsia-500/40 hover:shadow-[0_0_35px_rgba(232,121,249,0.12)]",
    sky: "hover:border-sky-500/40 hover:shadow-[0_0_35px_rgba(125,211,252,0.12)]",
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(52,211,153,0.12)]",
    amber: "hover:border-amber-500/40 hover:shadow-[0_0_35px_rgba(251,191,36,0.12)]",
  };

  const dotColor = {
    cyan: "bg-cyan-400",
    violet: "bg-violet-400",
    fuchsia: "bg-fuchsia-400",
    sky: "bg-sky-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
  };

  return (
    <div
      className="relative min-h-screen bg-[#09090f] text-slate-200 font-sans antialiased overflow-x-hidden selection:bg-sky-500/30 selection:text-white pt-14"
    >
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Center dot */}
        <div
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 0 6px rgba(56, 189, 248, 0.8), 0 0 12px rgba(56, 189, 248, 0.4)',
          }}
        />
        {/* Outer ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 20,
            height: 20,
            left: -6,
            top: -6,
            border: '1.5px solid rgba(56, 189, 248, 0.6)',
            boxShadow: '0 0 8px rgba(56, 189, 248, 0.3)',
          }}
        />
      </div>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.65 }} />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-[2px] z-[60] bg-gradient-to-r from-sky-400 to-cyan-400 transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />

      {/* ================= FIXED NAVIGATION ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/[0.05] bg-[#09090f]/90 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-sm font-mono font-bold tracking-tight text-white group"
          >
            <span className="text-sky-400">&lt;</span>
            <span className="group-hover:text-sky-300 transition-colors duration-300 bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">usman.ali</span>
            <span className="text-sky-400"> /&gt;</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`relative px-3 py-1.5 text-[11px] font-semibold tracking-wide rounded-lg transition-all duration-300 ${
                  activeSection === link.href
                    ? "text-sky-300 bg-sky-500/10"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" />
                )}
              </a>
            ))}
          </div>

          <a
            href="https://linkedin.com/in/muhammadusman881"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-semibold text-zinc-500 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to Work
          </a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 pt-16 reveal-element">
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] font-mono text-sky-400/70 bg-sky-500/[0.06] border border-sky-500/20 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Based in Islamabad, PK · Remote Friendly
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white leading-[0.9] mb-3">
            Usman Ali
          </h1>

          <div className="h-10 mt-2">
            <span className="text-lg md:text-2xl font-mono text-sky-400/80 tracking-tight">
              {typedText}
              <span className="inline-block w-[2px] h-6 bg-sky-400 ml-1 animate-pulse align-middle" />
            </span>
          </div>

          <p className="mt-7 text-base md:text-lg text-zinc-500 max-w-xl leading-relaxed font-light">
            I architect high-scale backend systems and ship production-grade .NET applications.
            Around 5 years of turning complex requirements into clean, deterministic code.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
            <a
              href="#ecosystem"
              onClick={(e) => handleScrollTo(e, "ecosystem")}
              className="group px-7 py-3 text-sm font-bold text-[#09090f] bg-sky-400 rounded-xl hover:bg-sky-300 transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.55)] transform hover:-translate-y-0.5"
            >
              View My Stack
              <span className="inline-block ml-1.5 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://linkedin.com/in/muhammadusman881"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3 text-sm font-bold text-zinc-400 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-sky-500/30 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Code Terminal Section (C# Syntax) */}
        <div className="relative z-10 mt-16 w-full max-w-2xl bg-[#0d0d11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] hover:border-zinc-700 transition-all duration-500 group mx-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-zinc-900/40">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs font-mono text-zinc-500 tracking-wider">Usman.cs — Visual Studio</span>
            <div className="w-12" />
          </div>

          <div className="p-6 font-mono text-xs md:text-sm text-zinc-400 text-left overflow-x-auto leading-relaxed">
            <div><span className="text-blue-400">SoftwareEngineer</span> engineer = <span className="text-teal-400">new</span>()</div>
            <div>&#123;</div>
            <div className="pl-4">Name = <span className="text-orange-300">"Muhammad Usman Ali"</span>,</div>
            <div className="pl-4">Role = <span className="text-orange-300">"Senior Full-Stack .NET Engineer"</span>,</div>
            <div className="pl-4">Frameworks = [<span className="text-emerald-400">".NET Core 8"</span>, <span className="text-emerald-400">"ASP.NET MVC"</span>, <span className="text-emerald-400">"Blazor"</span>],</div>
            <div className="pl-4">Architecture = [<span className="text-blue-400">"Clean Architecture"</span>, <span className="text-blue-400">"SOLID"</span>, <span className="text-blue-400">"Event-Driven"</span>],</div>
            <div className="pl-4">Database = <span className="text-teal-400">new</span>()</div>
            <div className="pl-4">&#123;</div>
            <div className="pl-8">Relational = <span className="text-amber-400">"SQL Server"</span>,</div>
            <div className="pl-8">NoSql = <span className="text-emerald-400">"MongoDB"</span>,</div>
            <div className="pl-8">Orm = <span className="text-purple-400">"Entity Framework Core"</span>,</div>
            <div className="pl-8">Tuning = [<span className="text-orange-400">"Stored Procedures"</span>, <span className="text-orange-400">"Indexing Optimization"</span>]</div>
            <div className="pl-4">&#125;,</div>
            <div className="pl-4">Integrations = <span className="text-teal-400">new</span>()</div>
            <div className="pl-4">&#123;</div>
            <div className="pl-8">Telephony = [<span className="text-indigo-400">"Twilio SMS/Voice"</span>, <span className="text-indigo-400">"WhatsApp Business API"</span>],</div>
            <div className="pl-8">Payments = <span className="text-indigo-400">"Stripe Subscriptions & Webhooks"</span>,</div>
            <div className="pl-8">Enterprise = [<span className="text-indigo-400">"CargoWise API"</span>, <span className="text-indigo-400">"Haulage APIs"</span>]</div>
            <div className="pl-4">&#125;,</div>
            <div className="pl-4 text-zinc-500">// Real-time event layers and state pipelines</div>
            <div className="pl-4">AsyncFlow = [<span className="text-teal-400">"RabbitMQ"</span>, <span className="text-teal-400">"SignalR Hubs"</span>, <span className="text-teal-400">"Hangfire"</span>],</div>
            <div className="pl-4">CompilesCleanly = <span className="text-teal-400">true</span></div>
            <div>&#125;;</div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Scroll</span>
          <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-28 px-4 max-w-5xl mx-auto scroll-mt-20 reveal-element">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Building systems that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">scale and endure</span>
            </h2>
          </div>
          <div className="md:col-span-8 space-y-5">
            <p className="text-zinc-400 leading-[1.8] text-[15px]">
              I am a results-driven engineer with roughly half a decade of hands-on experience designing, building, and deploying
              production web applications inside the .NET ecosystem. My focus sits at the intersection of robust backend architecture
              and polished user interfaces — from pixel to pipeline.
            </p>
            <p className="text-zinc-400 leading-[1.8] text-[15px]">
              I have shipped real-time communication layers with SignalR, integrated enterprise logistics APIs like CargoWise,
              and handled secure payment flows through Stripe. Security is not an afterthought — I implement OAuth 2.0 and RBAC
              from day one. Every line of code I write is aimed at reliability, maintainability, and performance.
            </p>
            <div className="flex flex-wrap gap-8 pt-5">
              {[
                { num: "5", label: "Years Shipping" },
                { num: "6", label: "Live Products" },
                { num: "4", label: "Industries" },
                { num: "∞", label: "Debug Sessions" },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <div className="text-3xl font-extrabold text-white group-hover:text-sky-400 transition-colors duration-300">{stat.num}</div>
                  <div className="text-[11px] text-zinc-600 font-mono mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECH ECOSYSTEM ================= */}
      <section id="ecosystem" className="py-28 px-4 max-w-6xl mx-auto scroll-mt-20 reveal-element">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Tools I <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Build With</span>
          </h2>
          <p className="text-zinc-500 mt-4 text-[15px] max-w-lg mx-auto">
            A battle-tested toolkit forged across logistics, fintech, and enterprise platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {techCards.map((card) => (
            <div
              key={card.title}
              className={`group relative bg-[#0b0b14]/70 border border-white/[0.05] rounded-2xl p-6 hover:bg-[#0e0e18] transition-all duration-500 ${borderGlow[card.accent]} hover:scale-[1.02] cursor-default`}
            >
              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${accentGrad[card.accent]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`} />
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-2 rounded-full ${dotColor[card.accent]}`} />
                <span className={`text-[10px] font-mono tracking-[0.15em] uppercase bg-gradient-to-r ${accentGrad[card.accent]} bg-clip-text text-transparent font-bold`}>
                  {card.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{card.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed mb-5">{card.body}</p>
              <div className="flex flex-wrap gap-2">
                {card.items.map((item) => (
                  <span key={item} className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.05] text-zinc-500 rounded-md text-[11px] font-mono group-hover:border-white/[0.1] group-hover:text-zinc-400 transition-all duration-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#09090f] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#09090f] to-transparent z-10" />
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, s) => (
              <React.Fragment key={s}>
                {[".NET Core", "C#", "ASP.NET", "Blazor", "SignalR", "RabbitMQ", "SQL Server", "MongoDB", "Azure", "Docker", "Stripe", "Twilio", "CargoWise", "EF Core", "GraphQL", "Tailwind"].map((skill) => (
                  <span key={`${s}-${skill}`} className="text-zinc-700 font-mono text-[13px] px-4 py-2 border border-white/[0.04] rounded-lg bg-white/[0.015]">{skill}</span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience" className="py-28 px-4 max-w-4xl mx-auto scroll-mt-20 reveal-element">
        <div className="text-center md:text-left mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Where I Have <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Shipped Code</span>
          </h2>
          <p className="text-zinc-500 mt-4 text-[15px]">
            A chronological look at production systems I have architected, maintained, and improved.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] md:left-[23px] top-3 bottom-3 w-px bg-gradient-to-b from-sky-500/30 via-zinc-800 to-zinc-800" />
          <div className="space-y-12">
            {jobs.map((job, idx) => (
              <div key={idx} className="relative pl-12 md:pl-16 group">
                <div className={`absolute left-0 top-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                  job.live ? "border-sky-500/40 bg-sky-500/10 shadow-[0_0_20px_rgba(56,189,248,0.15)]" : "border-zinc-800 bg-[#09090f] group-hover:border-zinc-600"
                }`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${job.live ? "bg-sky-400 animate-pulse" : "bg-zinc-600 group-hover:bg-zinc-400"} transition-colors`} />
                </div>
                <div className={`bg-[#0b0b14]/50 border rounded-2xl p-6 md:p-7 transition-all duration-500 ${
                  job.live ? "border-sky-500/15 hover:border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.04)]" : "border-white/[0.05] hover:border-white/[0.1] hover:bg-[#0e0e18]"
                }`}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">{job.company}</h3>
                      <p className="text-sm text-zinc-400 mt-0.5">{job.role}</p>
                    </div>
                    <span className={`text-[11px] font-mono px-3 py-1 rounded-full border ${
                      job.live ? "bg-sky-500/10 text-sky-400 border-sky-500/25" : "bg-zinc-900 text-zinc-500 border-zinc-800"
                    }`}>{job.when}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 font-mono mb-5 flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {job.where}
                  </p>
                  <ul className="space-y-2.5">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="text-[13px] text-zinc-400 leading-relaxed flex gap-3">
                        <span className="text-sky-500/50 mt-1.5 shrink-0 text-[10px]">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESUME ================= */}
      <section id="resume" className="py-28 px-4 max-w-4xl mx-auto scroll-mt-20 reveal-element">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Grab My <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">CV</span>
          </h2>
          <p className="text-zinc-500 mt-4 text-[15px]">A PDF snapshot of my background, skills, and experience.</p>
        </div>
        <div className="bg-[#0b0b14]/50 border border-white/[0.05] rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-sky-500/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.06)] transition-all duration-500 group">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-lg group-hover:scale-110 transition-transform duration-500">PDF</div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">Muhammad_Usman_Ali_Resume.pdf</h3>
              <p className="text-[11px] text-zinc-600 font-mono mt-0.5">Senior Full-Stack .NET Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <a href="/Muhammad_Usman_Ali_Senior_Resume.pdf" target="_blank" rel="noreferrer" className="flex-1 md:flex-initial text-center px-6 py-2.5 text-[11px] font-bold text-zinc-400 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-xl transition-all duration-300 font-mono">Preview</a>
            <a href="/Muhammad_Usman_Ali_Senior_Resume.pdf" download className="flex-1 md:flex-initial text-center px-6 py-2.5 text-[11px] font-bold text-[#09090f] bg-sky-400 hover:bg-sky-300 rounded-xl transition-all duration-300 font-mono shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transform hover:-translate-y-0.5">Download</a>
          </div>
        </div>
      </section>

      {/* ================= EDUCATION ================= */}
      <section id="education" className="py-28 px-4 max-w-4xl mx-auto scroll-mt-20 reveal-element">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Foundation</span>
          </h2>
        </div>
        <div className="space-y-6">
          <div className="bg-[#0b0b14]/50 border border-white/[0.05] rounded-2xl p-7 hover:border-sky-500/20 hover:shadow-[0_0_30px_rgba(56,189,248,0.05)] transition-all duration-500 group">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎓</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">Bachelor of Science in Computer Science (BSCS)</h3>
                </div>
                <p className="text-zinc-500 text-sm">Virtual University · Faisalabad, Pakistan</p>
                <p className="text-[12px] text-zinc-600 mt-3 max-w-2xl leading-relaxed">
                  Data Structures & Algorithms, Operating Systems, Computer Networks, DBMS, OOP, Artificial Intelligence, Web Design & Development, Desktop Application Development.
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-mono text-sky-400 bg-sky-500/10 px-4 py-2 border border-sky-500/20 rounded-xl">2019 — 2023</span>
                <span className="text-[11px] font-mono text-zinc-600">CGPA: 3.4 / 4.0</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#0b0b14]/30 border border-white/[0.05] rounded-xl p-5 hover:border-emerald-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-emerald-400 text-lg">📜</span>
                <h4 className="text-sm font-bold text-white">Fullstack .NET Development</h4>
              </div>
              <p className="text-[11px] text-zinc-600 font-mono">Smartan Solver, Faisalabad · Aug 2020</p>
            </div>
            <div className="bg-[#0b0b14]/30 border border-white/[0.05] rounded-xl p-5 hover:border-emerald-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-emerald-400 text-lg">📜</span>
                <h4 className="text-sm font-bold text-white">Desktop Application Development</h4>
              </div>
              <p className="text-[11px] text-zinc-600 font-mono">Aptech, Faisalabad · Mar 2019</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GLOSSY CTA / CONTACT ================= */}
      <section id="contact" className="py-28 px-4 max-w-5xl mx-auto scroll-mt-20 reveal-element group/contact">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#0f1225] via-[#0a0a14] to-[#0d1020] transition-all duration-500 group-hover/contact:border-sky-500/20 group-hover/contact:shadow-[0_0_60px_rgba(56,189,248,0.08)]">
          {/* Glossy overlay effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.08)_0%,_transparent_60%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          
          {/* Floating particles inside card */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-sky-400/30 animate-float"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${4 + i * 0.5}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400">collaborate</span>
            </h2>
            <p className="text-zinc-400 text-[15px] max-w-lg mx-auto leading-relaxed mb-10">
              I am open to senior engineering roles, technical leadership, and challenging product work.
              Drop me a message — I typically respond within a day.
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <a
                href="mailto:mohamadusman881@gmail.com"
                className="group flex items-center gap-2.5 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl hover:from-sky-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_50px_rgba(56,189,248,0.5)] hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email
              </a>
              <a
                href="/Muhammad_Usman_Ali_Senior_Resume.pdf"
                download
                className="flex items-center gap-2.5 px-6 py-3 text-sm font-bold text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-sky-500/30 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                CV
              </a>
              <a
                href="https://linkedin.com/in/muhammadusman881"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 text-sm font-bold text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-sky-500/30 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                LinkedIn
              </a>
              <a
                href="tel:+923234243791"
                className="flex items-center gap-2.5 px-6 py-3 text-sm font-bold text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-sky-500/30 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +92 323 4243791
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/[0.05] bg-[#06060a] py-14 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-sm font-mono font-bold text-white mb-1">
              <span className="text-sky-400">&lt;</span><span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">usman.ali</span><span className="text-sky-400"> /&gt;</span>
            </div>
            <p className="text-[11px] text-zinc-700">Senior Full-Stack .NET Engineer</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/in/muhammadusman881" target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-sky-400 transition-colors duration-300 text-[11px] font-mono">LinkedIn</a>
            <a href="mailto:mohamadusman881@gmail.com" className="text-zinc-600 hover:text-sky-400 transition-colors duration-300 text-[11px] font-mono">Email</a>
            <span className="text-zinc-700 text-[11px] font-mono">+92-323-4243791</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-white/[0.03] text-center">
          <p className="text-[10px] text-zinc-800 font-mono tracking-[0.15em]">
            © 2026 MUHAMMAD USMAN ALI · BUILT WITH PRECISION
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .reveal-element {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-element.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #09090f; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}