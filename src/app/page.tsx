import React from 'react';
import {
  getProfile,
  getSkills,
  getProjects,
  getActivities
} from '@/lib/dataService';
import StatsCounter from '@/components/StatsCounter';
import ContactForm from '@/components/ContactForm';
import ActivitiesTimeline from '@/components/ActivitiesTimeline';
import ProfileImage from '@/components/ProfileImage';
import {
  BookOpen,
  TrendingUp,
  Mail,
  FileSpreadsheet,
  Calendar,
  ArrowRight,
  Database,
  Search,
  ChevronRight,
  Award,
  Globe,
  FileText,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const renderSkillIcon = (iconName: string) => {
  switch (iconName) {
    case 'MessageSquare': return <MessageSquare className="h-5 w-5" />;
    case 'TrendingUp': return <TrendingUp className="h-5 w-5" />;
    case 'Award': return <Award className="h-5 w-5" />;
    case 'Calendar': return <Calendar className="h-5 w-5" />;
    case 'FileSpreadsheet': return <FileSpreadsheet className="h-5 w-5" />;
    case 'Database': return <Database className="h-5 w-5" />;
    case 'FileText': return <FileText className="h-5 w-5" />;
    case 'BookOpen': return <BookOpen className="h-5 w-5" />;
    default: return <Award className="h-5 w-5" />;
  }
};

export default async function Home() {
  // Fetch data on the server
  const profile = await getProfile();
  const projects = await getProjects();
  const activities = await getActivities();

  // Hardcoded Skills Dataset for static reliability
  const skills = [
    // Core Competencies
    { id: "s1", name: "Communication", subtitle: "Public speaking, presentation & cultural diplomacy", category: "Core Competencies", proficiency: 95, iconName: "MessageSquare" },
    { id: "s2", name: "Problem Solving", subtitle: "Strategic socio-economic analysis & coordination", category: "Core Competencies", proficiency: 90, iconName: "TrendingUp" },
    { id: "s3", name: "Leadership", subtitle: "Team synergy, active coordination & choreography direction", category: "Core Competencies", proficiency: 92, iconName: "Award" },
    { id: "s4", name: "Organization", subtitle: "Resource logistics & event schedule coordination", category: "Core Competencies", proficiency: 94, iconName: "Calendar" },
    
    // Academic & Technical Tools
    { id: "s5", name: "Microsoft Excel", subtitle: "Economic modeling, pivot tables & data forecasting", category: "Academic & Technical", proficiency: 85, iconName: "FileSpreadsheet" },
    { id: "s6", name: "SPSS Statistics", subtitle: "Quantitative regression & econometric hypothesis testing", category: "Academic & Technical", proficiency: 80, iconName: "Database" },
    { id: "s7", name: "Policy Writing", subtitle: "Developmental policy briefs & economic research papers", category: "Academic & Technical", proficiency: 88, iconName: "FileText" },
    { id: "s8", name: "Arts Management", subtitle: "Traditional dance choreography & stage orchestration", category: "Academic & Technical", proficiency: 96, iconName: "BookOpen" }
  ];

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50/30 selection:bg-sky-200 selection:text-sky-900">
      <ScrollReveal />

      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-100/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <span className="block text-sm font-bold text-slate-800 tracking-tight leading-none">{profile.name}</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1 block">Development Economics</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-sky-600 transition-colors">Profile</a>
            <a href="#education" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-sky-600 transition-colors">Education</a>
            <a href="#skills" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-sky-600 transition-colors">Skills</a>
            <a href="#projects" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-sky-600 transition-colors">Research</a>
            <a href="#activities" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-sky-600 transition-colors">Activities</a>
            <a href="#contact" className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200">Collaborate</a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow">

        {/* Hero Section */}
        <section id="hero" className="relative pt-12 pb-20 sm:py-24 md:py-32 overflow-hidden border-b border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Profile Text */}
              <div className="lg:col-span-8 space-y-6 text-center lg:text-left">

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 leading-[1.1] tracking-tight animate-reveal delay-100">
                  Development Economics & <span className="text-sky-600 relative inline-block">Regional Development</span>
                </h1>

                <p className="max-w-2xl mx-auto lg:mx-0 text-slate-600 text-base sm:text-lg leading-relaxed animate-reveal delay-200 font-sans font-normal">
                  Hello! I am <span className="font-bold text-slate-800">{profile.name}</span>. A 2nd-semester Development Economics student at Universitas Negeri Semarang (UNNES). Passionately focusing on regional developmental studies, creative economy, and leadership collaboration inspired by regional traditional arts.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 animate-reveal delay-300">
                  <a
                    href="#contact"
                    className="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-sm transition-all shadow-sm shadow-sky-500/10 cursor-pointer"
                  >
                    Start Research Collaboration
                  </a>
                  <a
                    href="#projects"
                    className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    View Essay Portfolio
                  </a>
                </div>
              </div>

              {/* Profile Image card */}
              <div className="lg:col-span-4 flex justify-center animate-reveal delay-200">
                <div className="relative group max-w-[280px] sm:max-w-[320px]">
                  <div className="absolute inset-0 bg-sky-200 rounded-3xl rotate-3 scale-[1.02] group-hover:rotate-6 transition-all duration-300"></div>
                  <div className="relative bg-slate-900 rounded-3xl overflow-hidden border-4 border-white shadow-lg shadow-slate-200">
                    <ProfileImage fallbackUrl={profile.headshotUrl} name={profile.name} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Stats Counter Bar Section */}
        <section className="py-12 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatsCounter />
          </div>
        </section>

        {/* Academic Focus & About Me Section */}
        <section id="about" className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Profile & Focus Areas</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  Academic Focus & Research
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p className="text-slate-600 text-base leading-relaxed">
                  Studying Development Economics has taught me that behind every statistical data point lies a story of human livelihoods. As an aspiring academic, I dedicate my studies at Universitas Negeri Semarang (UNNES) to exploring crucial issues such as <strong className="text-slate-800">integrated regional planning</strong>, <strong className="text-slate-800">regional development disparities</strong>, and the direct impact of regional fiscal allocations on poverty alleviation.
                </p>
                <div className="p-5 bg-sky-50/40 rounded-2xl border border-sky-100/50">
                  <span className="block text-xs font-bold text-sky-800 tracking-wider uppercase mb-3">Core Research Focus Areas:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-sky-500 mt-2"></div>
                      <div>
                        <strong className="block text-slate-800 text-sm">Regional Econometrics</strong>
                        <span className="text-xs text-slate-500">Analyzing spatial disparity across regencies and cities in West Java.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-sky-500 mt-2"></div>
                      <div>
                        <strong className="block text-slate-800 text-sm">Sectoral Economics & MSMEs</strong>
                        <span className="text-xs text-slate-500">Studying the transmission of digitalized payments on informal sector profitability.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formal Academic Pathway Section */}
        <section id="education" className="py-20 bg-slate-50/20 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Academic Journey</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                  Formal Academic Pathway
                </h2>
              </div>
              <p className="text-sm text-slate-500 max-w-md font-sans font-normal">
                Chronological foundation of my secondary and higher education studies in economics and social sciences.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Vertical center bar for desktop, left bar for mobile */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[2px] bg-slate-200/80"></div>

              <div className="space-y-12">
                
                {/* Milestone 1: MTS Darunnajah 2 */}
                <div className="relative flex flex-col md:flex-row items-start md:justify-between group reveal-on-scroll reveal-delay-100">
                  {/* Bullet Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1.5 h-9 w-9 rounded-full bg-sky-50 border-4 border-white shadow-md shadow-slate-200 flex items-center justify-center text-sky-600 z-10 group-hover:scale-110 transition-all duration-300">
                    <Award className="h-4 w-4" />
                  </div>

                  {/* Left Side Content (Desktop: MTs card, Mobile: spacing) */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0 md:text-right order-2 md:order-1">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group-hover:border-sky-300 group-hover:shadow-md transition-all duration-300">
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                        2019 - 2022
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-800 mt-3 group-hover:text-sky-600 transition-colors">
                        MTs Darunnajah 2
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-1">
                        Islamic Junior High School
                      </p>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed font-sans font-normal">
                        Nurtured fundamental self-discipline, time management, active cooperation, and basic public speaking competencies. Participated in regional language and scouting activities.
                      </p>
                    </div>
                  </div>

                  {/* Right Side Content (Desktop: Empty spacer) */}
                  <div className="hidden md:block w-[45%] order-2"></div>
                </div>

                {/* Milestone 2: SMAN 12 */}
                <div className="relative flex flex-col md:flex-row items-start md:justify-between group reveal-on-scroll reveal-delay-200">
                  {/* Bullet Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1.5 h-9 w-9 rounded-full bg-sky-50 border-4 border-white shadow-md shadow-slate-200 flex items-center justify-center text-sky-600 z-10 group-hover:scale-110 transition-all duration-300">
                    <BookOpen className="h-4 w-4" />
                  </div>

                  {/* Left Side (Desktop: Empty Spacer) */}
                  <div className="hidden md:block w-[45%] order-1"></div>

                  {/* Right Side (Desktop: Senior High Card, Mobile: Full Width) */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0 order-2">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group-hover:border-sky-300 group-hover:shadow-md transition-all duration-300">
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                        2022 - 2025
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-800 mt-3 group-hover:text-sky-600 transition-colors">
                        SMAN 12 Tangerang Selatan
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-1">
                        High School Diploma in Social Studies (IPS)
                      </p>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed font-sans font-normal">
                        Specialized in geography, sociology, and basic accounting. Served as a core committee member and choreographer of the BESTARI Dance Club. Graduated with honors.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone 3: UNNES */}
                <div className="relative flex flex-col md:flex-row items-start md:justify-between group reveal-on-scroll reveal-delay-300">
                  {/* Bullet Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1.5 h-9 w-9 rounded-full bg-sky-50 border-4 border-white shadow-md shadow-slate-200 flex items-center justify-center text-sky-600 z-10 group-hover:scale-110 transition-all duration-300">
                    <GraduationCap className="h-4 w-4" />
                  </div>

                  {/* Left Side Content */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0 md:text-right order-2 md:order-1">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group-hover:border-sky-300 group-hover:shadow-md transition-all duration-300">
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                        2025 - Present
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-800 mt-3 group-hover:text-sky-600 transition-colors">
                        Universitas Negeri Semarang
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-1">
                        Bachelor of Development Economics (S.E.)
                      </p>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed font-sans font-normal">
                        Currently focusing on regional development, developmental econometrics, and quantitative BPS data analysis. Actively participating in developmental research policy clubs and leadership seminars.
                      </p>
                    </div>
                  </div>

                  {/* Right Side Content */}
                  <div className="hidden md:block w-[45%] order-2"></div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-slate-50/30 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Tools & Competencies</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                Skills & Capabilities
              </h2>
              <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto">
                A seamless blend of socio-economic theory, advanced statistical analysis, public communication, and creative management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category) => {
                const categorySkills = skills.filter(s => s.category === category);
                return (
                  <div
                    key={category}
                    className="bg-white/40 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-100/80 shadow-sm transition-all duration-300"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-800">{category}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                        {categorySkills.length} SKILLS
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      {categorySkills.map((skill) => {
                        const radius = 20;
                        const circumference = 2 * Math.PI * radius; // 125.66
                        const strokeDashoffset = circumference - (skill.proficiency / 100) * circumference;

                        return (
                          <div 
                            key={skill.id} 
                            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100/80 shadow-sm flex items-center justify-between gap-4 hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              {/* Left Icon Wrapper */}
                              <div className="h-12 w-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shrink-0">
                                {renderSkillIcon(skill.iconName)}
                              </div>

                              {/* Text Details */}
                              <div className="min-w-0">
                                <h4 className="font-serif text-sm sm:text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors truncate">
                                  {skill.name}
                                </h4>
                                <p className="text-[11px] sm:text-xs text-slate-400 font-sans mt-0.5 font-normal leading-normal line-clamp-2 sm:line-clamp-1">
                                  {skill.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* SVG Circular Progress Ring */}
                            <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
                              <svg className="h-full w-full transform -rotate-90">
                                {/* Track circle */}
                                <circle
                                  cx="28"
                                  cy="28"
                                  r={radius}
                                  className="stroke-slate-100 fill-none"
                                  strokeWidth="3.5"
                                />
                                {/* Progress circle */}
                                <circle
                                  cx="28"
                                  cy="28"
                                  r={radius}
                                  className="stroke-sky-500 fill-none transition-all duration-1000 ease-out"
                                  strokeWidth="3.5"
                                  strokeDasharray={circumference}
                                  strokeDashoffset={strokeDashoffset}
                                  strokeLinecap="round"
                                />
                              </svg>
                              {/* Percentage Label */}
                              <span className="absolute text-[10px] font-black text-slate-700 group-hover:text-sky-600 transition-colors">
                                {skill.proficiency}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects & Essays Section */}
        <section id="projects" className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Scientific Works & Data Projects</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                  Research Projects & Policy Essays
                </h2>
              </div>
              <p className="text-sm text-slate-500 max-w-md">
                A curated collection of independent reviews and collaborative analyses utilizing BPS macrodata, regional economic theories, and econometric simulations.
              </p>
            </div>

            <div className="bg-slate-50/40 border border-slate-100 rounded-3xl p-12 sm:p-16 flex flex-col items-center justify-center text-center max-w-lg mx-auto shadow-sm shadow-slate-100/50 hover:border-sky-200 transition-all duration-300">
              <div className="h-12 w-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 border border-sky-100/60 animate-pulse">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-3xl font-black text-sky-600 uppercase tracking-widest mb-2 select-none">
                Soon
              </h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-normal">
                A comprehensive set of independent research papers, BPS data visualizations, and strategic development policy essays are currently in preparation.
              </p>
            </div>
          </div>
        </section>

        {/* Activities / Student Organization Section */}
        <section id="activities" className="py-20 bg-slate-50/30 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Campus Life & Extracurriculars</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                Student Leadership & Organization
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Active contribution in development economics student associations (HIMA), creative traditional dance clubs, and academic seminar committees.
              </p>
            </div>

            <ActivitiesTimeline activities={activities} />
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Contact Me</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                Academic Networking & Research Queries
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Interested in providing feedback on policy essays, discussing BPS data modeling, or initiating academic collaborations? Please use the form below.
              </p>
            </div>

            <ContactForm />
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-850">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-800 pb-8 mb-8">

            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-black text-white">{profile.name}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                A digital academic portal showcasing regional econometric modeling and developmental research. Engineered with a premium sky-blue design language.
              </p>
            </div>

            <div className="md:col-span-6 flex justify-start md:justify-end gap-6 text-xs font-bold uppercase tracking-wider">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <svg
                  className="h-4 w-4 text-sky-400 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                <span>Campus Email</span>
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <span>&copy; {new Date().getFullYear()} {profile.name}. All Rights Reserved.</span>
            <span>Universitas Negeri Semarang (UNNES) • Development Economics Study Program</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
