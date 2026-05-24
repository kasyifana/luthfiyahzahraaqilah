import { prisma } from './db';

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  headshotUrl: string;
  academicFocus: string;
  email: string;
  linkedinUrl: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string | null;
  dataPointsCount?: number | null;
  publishedAt: string;
  pdfUrl?: string | null;
}

export interface Activity {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

// High-fidelity fallback mock data for Luthfiyah Zahra Aqilah (Development Economics student & Creative Leader)
const MOCK_PROFILE: Profile = {
  id: "profile-1",
  name: "Luthfiyah Zahra Aqilah",
  title: "Economic Expert & Development Economics Student",
  bio: "just google me, you would know",
  headshotUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350",
  academicFocus: "Development Economics, Creative Economy, & Cultural Arts Preservation",
  email: "luthfiyahzahraaqilah@gmail.com",
  linkedinUrl: "https://instagram.com/luthfi.za_"
};

const MOCK_SKILLS: Skill[] = [
  // Core Competencies
  { id: "s1", name: "Communication (Public Speaking, Cultural Diplomacy)", category: "Core Competencies", proficiency: 95 },
  { id: "s2", name: "Problem Solving (Strategic Analysis & Project Coordination)", category: "Core Competencies", proficiency: 90 },
  { id: "s3", name: "Leadership (Team Coordination & Stage Confidence)", category: "Core Competencies", proficiency: 92 },
  { id: "s4", name: "Organization (Schedule Management & Event Logistics)", category: "Core Competencies", proficiency: 94 },
  
  // Academic & Technical Tools
  { id: "s5", name: "Microsoft Excel (Economic Data Modeling & Forecasting)", category: "Academic & Technical", proficiency: 85 },
  { id: "s6", name: "SPSS (Statistical Analysis & Hypothesis Testing)", category: "Academic & Technical", proficiency: 80 },
  { id: "s7", name: "Policy Writing & Economic Research Methodologies", category: "Academic & Technical", proficiency: 88 },
  { id: "s8", name: "Cultural Arts Management & Performance Choreography", category: "Academic & Technical", proficiency: 96 }
];

const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Analisis Dampak Sosial-Ekonomi Sektor Pariwisata Seni Budaya di Jawa Tengah",
    description: "A socio-economic research paper evaluating the correlation between cultural arts preservation (such as traditional dance festivals) and local economic growth/community income in Banten and Central Java.",
    category: "Creative Economy",
    url: "#",
    dataPointsCount: 8400,
    publishedAt: "April 2026",
    pdfUrl: null
  },
  {
    id: "p2",
    title: "Pemberdayaan Ekonomi Kreatif Berbasis Seni Tradisional di Tangerang Selatan",
    description: "A policy review focusing on the role of youth organizations and local arts clubs (like dance groups) in boosting regional micro-economies, youth employment, and community engagement.",
    category: "Policy Review",
    url: "#",
    dataPointsCount: 3200,
    publishedAt: "February 2026",
    pdfUrl: null
  },
  {
    id: "p3",
    title: "Peta Disparitas Indeks Pembangunan Manusia (IPM) Provinsi Banten & Jawa Tengah",
    description: "A comparative quantitative analysis of education, health, and economic indicators between South Tangerang and Semarang using BPS microdata.",
    category: "Regional Disparity",
    url: "#",
    dataPointsCount: 15600,
    publishedAt: "December 2025",
    pdfUrl: null
  }
];

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "a1",
    role: "BESTARI EXTRACURRICULAR - DANCE CLUB COMMITTEE",
    organization: "SMAN 12 Tangerang Selatan",
    period: "2024 - 2025",
    description: "Served as a committee member of BESTARI Dance Club during senior high school. Responsible for assisting event preparation, coordinating practice schedules, supporting team performances, and contributing to the organization of cultural and school art activities."
  },
  {
    id: "a2",
    role: "SECOND WINNER - KINANTI LARAS TRADITIONAL DANCE",
    organization: "South Tangerang City Inter-School Dance Competition",
    period: "2024",
    description: "Achieved 2nd place at the South Tangerang City inter-school traditional dance competition with the Kinanti Laras dance. Collaborated closely with team members in choreography preparation, synchronization, and stage performance while representing the school in a cultural arts competition."
  },
  {
    id: "a3",
    role: "AWARD - LENGGANG NYAI TRADITIONAL DANCE",
    organization: "Lenggang Nyai Performance Category",
    period: "2024",
    description: "Participated in a traditional dance competition representing the team in the Lenggang Nyai performance category. Demonstrated teamwork, stage confidence, discipline during training sessions, and strong understanding of traditional choreography and cultural performance values."
  }
];

export async function getProfile(): Promise<Profile> {
  if (!prisma) return MOCK_PROFILE;
  try {
    const profile = await prisma.profile.findFirst();
    return profile || MOCK_PROFILE;
  } catch (error) {
    console.warn("Prisma failed to fetch profile, falling back to mock data:", error);
    return MOCK_PROFILE;
  }
}

export async function getSkills(): Promise<Skill[]> {
  if (!prisma) return MOCK_SKILLS;
  try {
    const skills = await prisma.skill.findMany();
    return skills.length > 0 ? skills : MOCK_SKILLS;
  } catch (error) {
    console.warn("Prisma failed to fetch skills, falling back to mock data:", error);
    return MOCK_SKILLS;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!prisma) return MOCK_PROJECTS;
  try {
    const projects = await prisma.project.findMany();
    return projects.length > 0 ? projects : MOCK_PROJECTS;
  } catch (error) {
    console.warn("Prisma failed to fetch projects, falling back to mock data:", error);
    return MOCK_PROJECTS;
  }
}

export async function getActivities(): Promise<Activity[]> {
  if (!prisma) return MOCK_ACTIVITIES;
  try {
    const activities = await prisma.activity.findMany();
    return activities.length > 0 ? activities : MOCK_ACTIVITIES;
  } catch (error) {
    console.warn("Prisma failed to fetch activities, falling back to mock data:", error);
    return MOCK_ACTIVITIES;
  }
}

export async function saveContactLog(name: string, email: string, message: string): Promise<boolean> {
  if (!prisma) {
    console.log(`[CONTACT LOG FALLBACK] Name: ${name}, Email: ${email}, Message: ${message}`);
    return true;
  }
  try {
    await prisma.contactLog.create({
      data: {
        name,
        email,
        message
      }
    });
    return true;
  } catch (error) {
    console.warn("Prisma failed to save contact log, fallback logged in terminal:", error);
    console.log(`[CONTACT LOG FALLBACK] Name: ${name}, Email: ${email}, Message: ${message}`);
    return true;
  }
}
