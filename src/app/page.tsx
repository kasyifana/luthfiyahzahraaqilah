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
  FileText
} from 'lucide-react';
import Image from 'next/image';

export default async function Home() {
  // Fetch data on the server
  const profile = await getProfile();
  const skills = await getSkills();
  const projects = await getProjects();
  const activities = await getActivities();

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50/30 selection:bg-sky-200 selection:text-sky-900">

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

        {/* Skills & Tools Section */}
        <section id="skills" className="py-20 bg-slate-50/30 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Tools & Competencies</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                Research Methodologies & Quantitative Tools
              </h2>
              <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto">
                A seamless blend of intuitive macro/microeconomic theory and technical data analysis utilizing modern statistical software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => {
                const categorySkills = skills.filter(s => s.category === category);
                return (
                  <div
                    key={category}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md duration-300"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <h3 className="font-serif text-lg font-bold text-slate-800">{category}</h3>
                      <Award className="h-5 w-5 text-sky-600" />
                    </div>

                    <div className="space-y-5">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="group">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-bold text-slate-600 transition-colors group-hover:text-sky-600">
                              {skill.name}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-sky-500 rounded-full transition-all group-hover:bg-sky-600 duration-500"
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
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
