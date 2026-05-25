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
import Header from '@/components/Header';
import SoonAnimation from '@/components/SoonAnimation';
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
      <Header profileName={profile.name} />

      {/* Main Container */}
      <main className="flex-grow">

        {/* Hero Section */}
        <section id="hero" className="relative pt-12 pb-20 sm:py-24 md:py-32 overflow-hidden border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Profile Text */}
              <div className="lg:col-span-8 space-y-6 text-center lg:text-left">

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 dark:text-slate-100 leading-[1.1] tracking-tight animate-reveal delay-100 transition-colors duration-300">
                  Development Economics & <span className="text-sky-600 relative inline-block">Regional Development</span>
                </h1>

                <p className="max-w-2xl mx-auto lg:mx-0 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed animate-reveal delay-200 font-sans font-normal transition-colors duration-300">
                  Hello! I am <span className="font-bold text-slate-800 dark:text-slate-200">{profile.name}</span>. A 2nd-semester Development Economics student at Universitas Negeri Semarang (UNNES). Passionately focusing on regional developmental studies, creative economy, and leadership collaboration inspired by regional traditional arts.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 animate-reveal delay-300">
                  <a
                    href="#contact"
                    className="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold rounded-xl text-sm transition-all shadow-sm shadow-sky-500/10 cursor-pointer"
                  >
                    Start Research Collaboration
                  </a>
                  <a
                    href="#projects"
                    className="px-6 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    View Essay Portfolio
                  </a>
                </div>
              </div>

              {/* Profile Image card */}
              <div className="lg:col-span-4 flex justify-center animate-reveal delay-200 relative select-none">
                <div className="relative group max-w-[280px] sm:max-w-[320px] z-10 w-full">
                  {/* Glowing Backdrop Ring */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-[36px] blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse z-[-2]"></div>
                  
                  {/* Rotating Econometric Orbit / Radar grid */}
                  <svg className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)] text-sky-200/40 dark:text-sky-400/20 fill-none stroke-current stroke-[0.75] animate-[spin_40s_linear_infinite] pointer-events-none select-none z-[-1]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" strokeDasharray="4 4" />
                    <circle cx="50" cy="50" r="38" />
                    <line x1="50" y1="2" x2="50" y2="98" strokeDasharray="2 2" />
                    <line x1="2" y1="50" x2="98" y2="50" strokeDasharray="2 2" />
                  </svg>

                  {/* Floating Orbiting Node 1 */}
                  <div className="absolute -top-4 -left-4 w-4 h-4 bg-gradient-to-tr from-sky-400 to-sky-500 rounded-full shadow-lg shadow-sky-500/30 animate-[bounce_5s_infinite_ease-in-out]"></div>

                  {/* Floating Orbiting Node 2 */}
                  <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-gradient-to-tr from-indigo-500 to-indigo-600 rounded-full shadow-lg shadow-indigo-500/30 animate-[bounce_6s_infinite_ease-in-out_1s]"></div>

                  {/* Glowing backdrop skew card */}
                  <div className="absolute inset-0 bg-sky-100 dark:bg-slate-900 rounded-3xl rotate-3 scale-[1.02] group-hover:rotate-6 transition-all duration-300 z-[-1]"></div>
                  
                  {/* Profile photo container */}
                  <div className="relative bg-slate-900 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg shadow-slate-200 dark:shadow-none transition-transform duration-500 group-hover:scale-[1.01]">
                    <ProfileImage fallbackUrl={profile.headshotUrl} name={profile.name} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Stats Counter Bar Section */}
        <section className="py-12 bg-slate-50/50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-950 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatsCounter />
          </div>
        </section>

        {/* Academic Focus & About Me Section */}
        <section id="about" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Profile & Focus Areas</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight transition-colors duration-300">
                  Academic Focus & Research
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed transition-colors duration-300">
                  Studying Development Economics has taught me that behind every statistical data point lies a story of human livelihoods. As an aspiring academic, I dedicate my studies at Universitas Negeri Semarang (UNNES) to exploring crucial issues such as <strong className="text-slate-800 dark:text-slate-200">integrated regional planning</strong>, <strong className="text-slate-800 dark:text-slate-200">regional development disparities</strong>, and the direct impact of regional fiscal allocations on poverty alleviation.
                </p>
                <div className="p-5 bg-sky-50/40 dark:bg-slate-900 rounded-2xl border border-sky-100/50 dark:border-slate-800 transition-colors duration-300">
                  <span className="block text-xs font-bold text-sky-800 dark:text-sky-400 tracking-wider uppercase mb-3">Core Research Focus Areas:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-sky-500 mt-2"></div>
                      <div>
                        <strong className="block text-slate-800 dark:text-slate-200 text-sm">Regional Econometrics</strong>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Analyzing spatial disparity across regencies and cities in West Java.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-sky-500 mt-2"></div>
                      <div>
                        <strong className="block text-slate-800 dark:text-slate-200 text-sm">Sectoral Economics & MSMEs</strong>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Studying the transmission of digitalized payments on informal sector profitability.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formal Academic Pathway Section */}
        <section id="education" className="py-20 bg-slate-50/20 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-950 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Academic Journey</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
                  Formal Academic Pathway
                </h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md font-sans font-normal transition-colors duration-300">
                Chronological foundation of my secondary and higher education studies in economics and social sciences.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Vertical center bar for desktop, left bar for mobile */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[2px] bg-slate-200/80 dark:bg-slate-800"></div>

              <div className="space-y-12">
                
                {/* Milestone 1: MTS Darunnajah 2 */}
                <div className="relative flex flex-col md:flex-row items-start md:justify-between group reveal-on-scroll reveal-delay-100">
                  {/* Bullet Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1.5 h-9 w-9 rounded-full bg-sky-50 dark:bg-slate-950 border-4 border-white dark:border-slate-800 shadow-md shadow-slate-200 dark:shadow-none flex items-center justify-center text-sky-600 dark:text-sky-400 z-10 group-hover:scale-110 transition-all duration-300">
                    <Award className="h-4 w-4" />
                  </div>

                  {/* Left Side Content (Desktop: MTs card, Mobile: spacing) */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0 md:text-right order-2 md:order-1">
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm group-hover:border-sky-300 dark:group-hover:border-sky-700 group-hover:shadow-md dark:group-hover:shadow-none transition-all duration-300">
                      <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-1 rounded-full">
                        2019 - 2022
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 mt-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        MTs Darunnajah 2
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        Islamic Junior High School
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-400 mt-3 leading-relaxed font-sans font-normal">
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
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1.5 h-9 w-9 rounded-full bg-sky-50 dark:bg-slate-950 border-4 border-white dark:border-slate-800 shadow-md shadow-slate-200 dark:shadow-none flex items-center justify-center text-sky-600 dark:text-sky-400 z-10 group-hover:scale-110 transition-all duration-300">
                    <BookOpen className="h-4 w-4" />
                  </div>

                  {/* Left Side (Desktop: Empty Spacer) */}
                  <div className="hidden md:block w-[45%] order-1"></div>

                  {/* Right Side (Desktop: Senior High Card, Mobile: Full Width) */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0 order-2">
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm group-hover:border-sky-300 dark:group-hover:border-sky-700 group-hover:shadow-md dark:group-hover:shadow-none transition-all duration-300">
                      <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-1 rounded-full">
                        2022 - 2025
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 mt-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        SMAN 12 Tangerang Selatan
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        High School Diploma in Social Studies (IPS)
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-400 mt-3 leading-relaxed font-sans font-normal">
                        Specialized in geography, sociology, and basic accounting. Served as a core committee member and choreographer of the BESTARI Dance Club. Graduated with honors.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone 3: UNNES */}
                <div className="relative flex flex-col md:flex-row items-start md:justify-between group reveal-on-scroll reveal-delay-300">
                  {/* Bullet Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1.5 h-9 w-9 rounded-full bg-sky-50 dark:bg-slate-950 border-4 border-white dark:border-slate-800 shadow-md shadow-slate-200 dark:shadow-none flex items-center justify-center text-sky-600 dark:text-sky-400 z-10 group-hover:scale-110 transition-all duration-300">
                    <GraduationCap className="h-4 w-4" />
                  </div>

                  {/* Left Side Content */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0 md:text-right order-2 md:order-1">
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm group-hover:border-sky-300 dark:group-hover:border-sky-700 group-hover:shadow-md dark:group-hover:shadow-none transition-all duration-300">
                      <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-1 rounded-full">
                        2025 - Present
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 mt-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        Universitas Negeri Semarang
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        Bachelor of Development Economics (S.E.)
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-400 mt-3 leading-relaxed font-sans font-normal">
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
        <section id="skills" className="py-20 bg-slate-50/30 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Tools & Competencies</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
                Skills & Capabilities
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto transition-colors duration-300">
                A seamless blend of socio-economic theory, advanced statistical analysis, public communication, and creative management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category) => {
                const categorySkills = skills.filter(s => s.category === category);
                return (
                  <div
                    key={category}
                    className="bg-white/40 dark:bg-slate-900 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-100/80 dark:border-slate-800 shadow-sm transition-all duration-300"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                      <h3 className="font-serif text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-100 transition-colors duration-300">{category}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-1 rounded-full">
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
                            className="bg-white dark:bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-100/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-300 group"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              {/* Left Icon Wrapper */}
                              <div className="h-12 w-12 rounded-xl bg-sky-50 dark:bg-sky-950/80 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white dark:group-hover:text-white transition-all duration-300 shrink-0">
                                {renderSkillIcon(skill.iconName)}
                              </div>

                              {/* Text Details */}
                              <div className="min-w-0">
                                <h4 className="font-serif text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                                  {skill.name}
                                </h4>
                                <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-sans mt-0.5 font-normal leading-normal line-clamp-2 sm:line-clamp-1 transition-colors duration-300">
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
                                  className="stroke-slate-100 dark:stroke-slate-800 fill-none"
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
                              <span className="absolute text-[10px] font-black text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
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
        <section id="projects" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-950 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Scientific Works & Data Projects</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
                  Research Projects & Policy Essays
                </h2>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md transition-colors duration-300">
                A curated collection of independent reviews and collaborative analyses utilizing BPS macrodata, regional economic theories, and econometric simulations.
              </p>
            </div>

            <div className="bg-slate-50/40 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-10 sm:p-12 flex flex-col items-center justify-center text-center max-w-lg mx-auto shadow-sm shadow-slate-100/50 hover:border-sky-200 dark:hover:border-sky-850 transition-all duration-300">
              <SoonAnimation />
              <h3 className="font-serif text-3xl font-black text-sky-600 uppercase tracking-widest mb-2 select-none">
                Soon
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed font-normal transition-colors duration-300">
                A comprehensive set of independent research papers, BPS data visualizations, and strategic development policy essays are currently in preparation.
              </p>
            </div>
          </div>
        </section>

        {/* Activities / Student Organization Section */}
        <section id="activities" className="py-20 bg-slate-50/30 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Campus Life & Extracurriculars</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
                Student Leadership & Organization
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-300">
                Active contribution in development economics student associations (HIMA), creative traditional dance clubs, and academic seminar committees.
              </p>
            </div>

            <ActivitiesTimeline activities={activities} />
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Contact Me</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
                Academic Networking & Research Queries
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-300">
                Interested in providing feedback on policy essays, discussing BPS data modeling, or initiating academic collaborations? Reach out via direct chat or file uploader.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
              
              {/* Directory Information Card */}
              <div className="bg-slate-50/50 dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-100/80 dark:border-slate-800 flex flex-col justify-between min-h-[380px] transition-colors duration-300">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 transition-colors">Academic Directory</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-normal transition-colors">
                      Direct connection pathways to Luthfiyah's desk. Preferred route for lecturers, institutional partnerships, and regional development programs.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Program */}
                    <div className="flex items-start gap-3 animate-reveal">
                      <div className="h-8 w-8 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-100/60 dark:border-sky-900/40 shrink-0">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">Study Program</span>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">Development Economics, Universitas Negeri Semarang</span>
                      </div>
                    </div>

                    {/* Desk Location */}
                    <div className="flex items-start gap-3 animate-reveal delay-100">
                      <div className="h-8 w-8 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-100/60 dark:border-sky-900/40 shrink-0">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">Office / Location</span>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">Semarang, Central Java, Indonesia</span>
                      </div>
                    </div>

                    {/* Direct Contact */}
                    <div className="flex items-start gap-3 animate-reveal delay-200">
                      <div className="h-8 w-8 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-100/60 dark:border-sky-900/40 shrink-0">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">Campus Email</span>
                        <a href={`mailto:${profile.email}`} className="text-xs font-semibold text-sky-600 hover:underline leading-snug">{profile.email}</a>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-start gap-3 animate-reveal delay-300">
                      <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100/60 dark:border-emerald-900/40 shrink-0">
                        <svg className="h-4 w-4 fill-current animate-pulse" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.288 1.498 4.76 1.499 5.49-.001 9.945-4.466 9.948-9.96.002-2.662-1.025-5.166-2.89-7.037-1.867-1.871-4.352-2.901-7.012-2.902-5.493 0-9.957 4.466-9.96 9.964-.001 1.558.411 3.084 1.196 4.428L1.082 22.84l4.58-1.201-1.015-1.485zm12.338-7.85c-.328-.163-1.94-.959-2.24-1.069-.3-.11-.519-.163-.737.163-.219.327-.847 1.069-1.037 1.287-.19.218-.382.245-.71.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.824-2.274-.19-.329-.02-.507.143-.67.147-.146.328-.382.492-.573.164-.19.219-.327.328-.545.109-.219.055-.409-.027-.573-.082-.164-.737-1.774-1.01-2.428-.266-.641-.532-.553-.737-.563-.19-.01-.409-.012-.628-.012-.218 0-.573.082-.874.409-.3.327-1.147 1.118-1.147 2.727 0 1.609 1.174 3.163 1.338 3.382.164.218 2.3 3.51 5.573 4.925.779.336 1.387.537 1.86.687.781.248 1.492.213 2.054.129.627-.094 1.94-.794 2.213-1.562.273-.769.273-1.428.191-1.562-.081-.137-.3-.219-.628-.383z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">WhatsApp Direct</span>
                        <a href="https://wa.me/6285926182642" target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-600 hover:underline leading-snug">+62 859-2618-2642</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-relaxed mt-4 border-t border-slate-100 dark:border-slate-800 pt-4 font-sans select-none transition-colors">
                  Please allow a few moments for responses, especially during academic lecture and choreographic hours.
                </div>
              </div>

              {/* Message to WhatsApp Form */}
              <ContactForm />
              
            </div>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-900 pb-8 mb-8">

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
                href="https://wa.me/6285926182642?text=Hello%20Luthfiyah,%20I%20am%20interested%20in%20your%20academic%20portfolio%20and%20would%20love%20to%20collaborate!"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <svg
                  className="h-4 w-4 text-emerald-400 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.288 1.498 4.76 1.499 5.49-.001 9.945-4.466 9.948-9.96.002-2.662-1.025-5.166-2.89-7.037-1.867-1.871-4.352-2.901-7.012-2.902-5.493 0-9.957 4.466-9.96 9.964-.001 1.558.411 3.084 1.196 4.428L1.082 22.84l4.58-1.201-1.015-1.485zm12.338-7.85c-.328-.163-1.94-.959-2.24-1.069-.3-.11-.519-.163-.737.163-.219.327-.847 1.069-1.037 1.287-.19.218-.382.245-.71.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.824-2.274-.19-.329-.02-.507.143-.67.147-.146.328-.382.492-.573.164-.19.219-.327.328-.545.109-.219.055-.409-.027-.573-.082-.164-.737-1.774-1.01-2.428-.266-.641-.532-.553-.737-.563-.19-.01-.409-.012-.628-.012-.218 0-.573.082-.874.409-.3.327-1.147 1.118-1.147 2.727 0 1.609 1.174 3.163 1.338 3.382.164.218 2.3 3.51 5.573 4.925.779.336 1.387.537 1.86.687.781.248 1.492.213 2.054.129.627-.094 1.94-.794 2.213-1.562.273-.769.273-1.428.191-1.562-.081-.137-.3-.219-.628-.383z" />
                </svg>
                <span>WhatsApp</span>
              </a>
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
