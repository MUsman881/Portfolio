"use client";
import React, { useEffect } from 'react';
import "./globals.css";

export default function Home() {
  // High-Performance Intersection Observer for the upward scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-12");
          }
        });
      },
      { 
        root: null,
        threshold: 0.02, // Lowered for a faster, lower-overhead calculation
        rootMargin: "0px 0px -20px 0px" 
      }
    );

    const hiddenElements = document.querySelectorAll(".reveal-element");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Smooth Scroll Handler to prevent harsh browser jumps over fixed headers
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80; // Offsets the layout perfectly below the fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#000000] text-[#f5f5f7] min-h-screen font-sans antialiased selection:bg-teal-500/30 selection:text-white overflow-x-hidden scroll-smooth">
      
      {/* ================= OPTIMIZED FIXED NAVBAR (Replaced laggy backdrop-blur with precise opacity) ================= */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0c]/90 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between text-xs font-medium tracking-tight text-zinc-400">
          <span className="text-white font-semibold font-mono tracking-wider">MUA.DEV</span>
          <div className="flex gap-6">
            <a 
              href="#ecosystem" 
              onClick={(e) => handleScroll(e, 'ecosystem')}
              className="hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 pb-1 cursor-pointer"
            >
              Ecosystem
            </a>
            <a 
              href="#experience" 
              onClick={(e) => handleScroll(e, 'experience')}
              className="hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 pb-1 cursor-pointer"
            >
              Experience
            </a>
            <a 
              href="#resume" 
              onClick={(e) => handleScroll(e, 'resume')}
              className="hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 pb-1 cursor-pointer"
            >
              Resume
            </a>
            <a 
              href="#education" 
              onClick={(e) => handleScroll(e, 'education')}
              className="hover:text-white transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 pb-1 cursor-pointer"
            >
              Education
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 reveal-element opacity-0 translate-y-12 transition-all duration-700 ease-out transform-gpu">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-tr from-teal-500/10 to-orange-500/10 blur-[80px] md:blur-[130px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-zinc-400 bg-zinc-900/80 border border-zinc-800 rounded-full mb-6 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Available for Roles in Islamabad & Remote
          </span>

          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#FFFFFF] to-[#86868b] leading-tight pb-2">
            Muhammad Usman Ali
          </h1>
          
          <p className="mt-6 text-lg md:text-2xl text-[#86868b] max-w-2xl font-normal tracking-tight balance leading-relaxed">
            Engineering high-scale backend architectures. <br />
            Refining enterprise .NET systems with deterministic precision.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
            <a 
              href="#ecosystem" 
              onClick={(e) => handleScroll(e, 'ecosystem')}
              className="px-6 py-3 text-sm font-medium text-black bg-white rounded-full hover:bg-[#f5f5f7] transition-all duration-300 ease-out transform hover:scale-[1.02] shadow-lg"
            >
              Explore Ecosystem
            </a>
            <a 
              href="https://linkedin.com/in/muhammadusman881" 
              target="_blank" 
              rel="noreferrer"
              className="group px-6 py-3 text-sm font-medium text-zinc-300 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 rounded-full transition-all duration-300"
            >
              Connect on LinkedIn <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
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
            <span className="text-xs font-mono text-zinc-500 tracking-wider">Usman.cs</span>
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
      </section>

      {/* ================= TECH ECOSYSTEM ================= */}
      <section id="ecosystem" className="py-32 px-4 max-w-6xl mx-auto scroll-mt-20 reveal-element opacity-0 translate-y-12 transition-all duration-700 ease-out transform-gpu">
        <div className="text-center md:text-left mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">The Tech Ecosystem</h2>
          <p className="text-[#86868b] mt-4 text-lg">Engineered architectures designed to support scale, speed, and cross-platform integrity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary Stack */}
          <div className="md:col-span-2 bg-[#0d0d11] border border-white/5 p-8 rounded-3xl flex flex-col justify-between hover:border-teal-500/50 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:scale-[1.025] transition-all duration-500 ease-out group/card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="text-teal-400 text-xs font-mono tracking-widest uppercase mb-2">Primary Stack</div>
              <h3 className="text-2xl font-bold text-white tracking-tight">C# & The .NET Stack</h3>
              <p className="text-[#86868b] mt-3 text-sm leading-relaxed">
                Over 5 years building resilient multi-tier frameworks using ASP.NET Core, Blazor, and robust architectural principles. Specialized in creating automated application logic built to perform seamlessly.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 relative z-10">
              {['.NET Core', 'C#', 'WebAPI', 'Blazor', 'WinForms', 'WPF', 'XAML', 'Dapper', 'LINQ'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-zinc-900/60 border border-white/5 text-zinc-300 rounded-md text-xs font-mono group-hover/card:border-teal-500/20 transition-colors duration-500">{tech}</span>
              ))}
            </div>
          </div>

          {/* Data Layer */}
          <div className="bg-[#0d0d11] border border-white/5 p-8 rounded-3xl flex flex-col justify-between hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] hover:scale-[1.025] transition-all duration-500 ease-out group/card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="text-orange-400 text-xs font-mono tracking-widest uppercase mb-2">Data Layer</div>
              <h3 className="text-2xl font-bold text-white tracking-tight">SQL Server & MongoDB</h3>
              <p className="text-[#86868b] mt-3 text-sm leading-relaxed">
                Expert relational modeling through Entity Framework Core combined with high-performance unstructured NoSQL schemas using MongoDB for polymorphic logs and scalable documents.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 relative z-10">
              {['SQL Server', 'MongoDB', 'EF Core', 'T-SQL', 'Optimization'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 bg-zinc-900/60 border border-white/5 text-zinc-300 rounded-md text-xs font-mono group-hover/card:border-orange-500/20 transition-colors duration-500">{tech}</span>
              ))}
            </div>
          </div>

          {/* Message Pipelines */}
          <div className="bg-[#0d0d11] border border-white/5 p-8 rounded-3xl flex flex-col justify-between hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:scale-[1.025] transition-all duration-500 ease-out group/card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="text-purple-400 text-xs font-mono tracking-widest uppercase mb-2">Message Pipelines</div>
              <h3 className="text-2xl font-bold text-white tracking-tight">RabbitMQ & Async Flow</h3>
              <p className="text-[#86868b] mt-3 text-sm leading-relaxed">
                Decoupling architectural nodes with Event-Driven Design. Managing task backlogs asynchronously via RabbitMQ and Hangfire for fail-safe data transmission loops.
              </p>
            </div>
          </div>

          {/* Real-Time */}
          <div className="bg-[#0d0d11] border border-white/5 p-8 rounded-3xl flex flex-col justify-between hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:scale-[1.025] transition-all duration-500 ease-out group/card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="text-blue-400 text-xs font-mono tracking-widest uppercase mb-2">Real-Time</div>
              <h3 className="text-2xl font-bold text-white tracking-tight">SignalR Broadcasts</h3>
              <p className="text-[#86868b] mt-3 text-sm leading-relaxed">
                Constructing lightning-fast, bi-directional sockets to power live telemetry dashboards, monitoring updates, and immediate client notifications.
              </p>
            </div>
          </div>

          {/* Connectivity */}
          <div className="bg-[#0d0d11] border border-white/5 p-8 rounded-3xl flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:scale-[1.025] transition-all duration-500 ease-out group/card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">Connectivity</div>
              <h3 className="text-2xl font-bold text-white tracking-tight">REST & Cloud Hubs</h3>
              <p className="text-[#86868b] mt-3 text-sm leading-relaxed">
                Extensive operations connecting CargoWise, Stripe channels, Twilio communication backends, and WhatsApp corporate programmatic routing configurations cleanly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHRONOLOGICAL WORK HISTORY ================= */}
      <section id="experience" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-20 reveal-element opacity-0 translate-y-12 transition-all duration-700 ease-out transform-gpu">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Professional Journey</h2>
          <p className="text-[#86868b] mt-4 text-lg">Detailed history compiled directly from production-level execution lifecycles.</p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:right-auto before:left-4 before:w-px before:bg-zinc-800">
          
          {/* Job 1: Intercargo */}
          <div className="relative pl-10 group">
            <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-teal-400 border-4 border-black group-hover:scale-125 transition-transform" />
            <div className="bg-[#0d0d11] border border-white/10 rounded-2xl p-6 hover:border-teal-500/30 hover:scale-[1.01] transition-all duration-300 ease-out shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">Intercargo Logistics — Senior Software Engineer</h3>
                <span className="text-xs font-mono px-2.5 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full">Jan 2025 - Present</span>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-1">Islamabad, Pakistan</p>
              <ul className="mt-4 text-sm text-[#86868b] space-y-2.5 list-disc list-inside">
                <li>Designed and maintained RESTful and SOAP APIs using .NET Core 8, automating workflows through third-party integrations with CargoWise and Haulage.</li>
                <li>Architected real-time communication mechanics by implementing SignalR hubs for instant notifications.</li>
                <li>Integrated WhatsApp Business API and Twilio APIs (SMS, Voice, and omni-channel Conversations).</li>
                <li>Integrated Stripe for secure transactions, subscription infrastructure, and webhook processing.</li>
                <li>Implemented enterprise security via ASP.NET Identity and OAuth 2.0 for role-based access control (RBAC).</li>
              </ul>
            </div>
          </div>

          {/* Job 2: Signup Solution */}
          <div className="relative pl-10 group">
            <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-zinc-600 border-4 border-black group-hover:scale-125 transition-transform" />
            <div className="bg-[#0d0d11] border border-white/5 rounded-2xl p-6 hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 ease-out shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">Signup Solution — .NET Core Developer</h3>
                <span className="text-xs font-mono px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full">Apr 2024 - Jan 2025</span>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-1">Rawalpindi, Pakistan</p>
              <ul className="mt-4 text-sm text-[#86868b] space-y-2.5 list-disc list-inside">
                <li>Built robust, scalable APIs using ASP.NET Core and ASP.NET MVC for seamless data layer communication.</li>
                <li>Designed and optimized database schemas using EF Core; tuned performance through strategic indexing.</li>
                <li>Implemented secure login layers using ASP.NET Identity and OAuth 2.0 to protect sensitive application details.</li>
              </ul>
            </div>
          </div>

          {/* Job 3: Metaphor Technologies */}
          <div className="relative pl-10 group">
            <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-zinc-600 border-4 border-black group-hover:scale-125 transition-transform" />
            <div className="bg-[#0d0d11] border border-white/5 rounded-2xl p-6 hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 ease-out shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">Metaphor Technologies — Senior Software Engineer</h3>
                <span className="text-xs font-mono px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full">Nov 2023 - June 2025</span>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-1">Remote</p>
              <ul className="mt-4 text-sm text-[#86868b] space-y-2.5 list-disc list-inside">
                <li>Built responsive user interfaces using Blazor and Tailwind CSS, increasing interaction depth.</li>
                <li>Developed efficient GraphQL queries and mutations to streamline loading times and limit payload weights.</li>
                <li>Identified, debugged, and resolved critical production bugs across remote API environments.</li>
              </ul>
            </div>
          </div>

          {/* Job 4: Smartan Solver */}
          <div className="relative pl-10 group">
            <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-zinc-600 border-4 border-black group-hover:scale-125 transition-transform" />
            <div className="bg-[#0d0d11] border border-white/5 rounded-2xl p-6 hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 ease-out shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">Smartan Solver — Full Stack .NET Developer</h3>
                <span className="text-xs font-mono px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full">Jan 2022 - Sep 2023</span>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-1">Faisalabad, Pakistan</p>
              <ul className="mt-4 text-sm text-[#86868b] space-y-2.5 list-disc list-inside">
                <li>Led design, coding, and deployment of enterprise web applications following strict SOLID principles.</li>
                <li>Leveraged ASP.NET MVC and .NET Core to implement maintainable structural layout patterns.</li>
                <li>Optimized UI responsiveness using HTML5, CSS3, Bootstrap 5, and vanilla JavaScript.</li>
              </ul>
            </div>
          </div>

          {/* Job 5: Desktop Project */}
          <div className="relative pl-10 group">
            <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-orange-400 border-4 border-black group-hover:scale-125 transition-transform" />
            <div className="bg-[#0d0d11] border border-white/5 rounded-2xl p-6 hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 ease-out shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">Virtual University — Desktop Application Developer</h3>
                <span className="text-xs font-mono px-2.5 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">Jan 2023 - Aug 2023</span>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-1">Remote Desktop System</p>
              <ul className="mt-4 text-sm text-[#86868b] space-y-2.5 list-disc list-inside">
                <li>Developed a comprehensive Point-of-Sale (POS) desktop application for retail management.</li>
                <li>Built sales report generation mechanics for deeper analytical processing performance.</li>
                <li>Designed intuitive dashboards for product management, vendor handling, and system administration.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE RESUME / CV SHOWCASE SECTION ================= */}
      <section id="resume" className="py-24 border-t border-zinc-950 px-4 max-w-4xl mx-auto scroll-mt-20 reveal-element opacity-0 translate-y-12 transition-all duration-700 ease-out transform-gpu">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Curriculum Vitae</h2>
          <p className="text-[#86868b] mt-3 text-lg">Review or acquire an off-line version of my structured background metrics.</p>
        </div>

        <div className="bg-[#0d0d11] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 hover:border-zinc-800 transition-all duration-500 ease-out group">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 font-bold group-hover:text-white group-hover:border-teal-500/30 transition-all duration-500 shadow-inner">
              PDF
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors duration-500">Muhammad_Usman_Ali_Resume.pdf</h3>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">Senior Full-Stack .NET Systems Architecture</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a 
              href="/Muhammad_Usman_Ali_Senior_Resume.pdf" 
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-initial text-center px-5 py-2.5 text-xs font-semibold tracking-tight text-zinc-300 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-300 font-mono"
            >
              View Document
            </a>
            <a 
              href="/Muhammad_Usman_Ali_Senior_Resume.pdf" 
              download
              className="flex-1 md:flex-initial text-center px-5 py-2.5 text-xs font-semibold tracking-tight text-black bg-white hover:bg-zinc-200 rounded-xl transition-all duration-300 font-mono shadow-md transform hover:scale-[1.02]"
            >
              Download
            </a>
          </div>
        </div>
      </section>

      {/* ================= ACADEMIC CREDENTIALS ================= */}
      <section id="education" className="py-24 border-t border-zinc-900 px-4 max-w-4xl mx-auto scroll-mt-20 reveal-element opacity-0 translate-y-12 transition-all duration-700 ease-out transform-gpu">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center md:text-left mb-10">Education & Background</h2>
        <div className="bg-[#0d0d11] border border-white/5 rounded-2xl p-8 flex flex-wrap justify-between items-center gap-4 hover:border-zinc-700 hover:scale-[1.01] transition-all duration-500 ease-out transform-gpu">
          <div>
            <h3 className="text-xl font-bold text-white">Bachelor of Science in Computer Science (BSCS)</h3>
            <p className="text-zinc-400 mt-1">Virtual University | CGPA: 3.4 / 4.0</p>
            <p className="text-xs text-zinc-500 mt-2 max-w-xl leading-relaxed">
              Coursework: Data Structures and Algorithms, Operating Systems, Computer Networks, Database Management Systems (DBMS), Object-Oriented Programming (OOP).
            </p>
          </div>
          <span className="text-sm font-mono text-zinc-400 bg-zinc-900 px-4 py-2 border border-zinc-800 rounded-xl">2019 - 2023</span>
        </div>
      </section>

      {/* ================= FOOTER / CONTACT ================= */}
      <footer className="border-t border-zinc-900 bg-black py-12 text-center text-xs text-zinc-600 font-mono tracking-wider">
        <p>© 2026 MUHAMMAD USMAN ALI. ALL RIGHTS RESERVED.</p>
      </footer>
      
    </div>
  );
}