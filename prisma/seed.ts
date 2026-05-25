import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL env variable is required");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.profile.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.activity.deleteMany();

  // 1. Seed Profile
  const profile = await prisma.profile.create({
    data: {
      name: "Luthfiyah Zahra Aqilah",
      title: "Economic Expert & Development Economics Student",
      bio: "just google me, you would know",
      headshotUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350",
      academicFocus: "Development Economics, Creative Economy, & Cultural Arts Preservation",
      email: "luthfiyahzahraaqilah@gmail.com",
      linkedinUrl: "https://instagram.com/luthfi.za_"
    }
  });
  console.log("Created Profile:", profile.name);

  // 2. Seed Skills
  const skills = [
    // Core Competencies
    { name: "Communication (Public Speaking, Cultural Diplomacy)", category: "Core Competencies", proficiency: 95 },
    { name: "Problem Solving (Strategic Analysis & Project Coordination)", category: "Core Competencies", proficiency: 90 },
    { name: "Leadership (Team Coordination & Stage Confidence)", category: "Core Competencies", proficiency: 92 },
    { name: "Organization (Schedule Management & Event Logistics)", category: "Core Competencies", proficiency: 94 },
    
    // Academic & Technical Tools
    { name: "Microsoft Excel (Economic Data Modeling & Forecasting)", category: "Academic & Technical", proficiency: 85 },
    { name: "SPSS (Statistical Analysis & Hypothesis Testing)", category: "Academic & Technical", proficiency: 80 },
    { name: "Policy Writing & Economic Research Methodologies", category: "Academic & Technical", proficiency: 88 },
    { name: "Cultural Arts Management & Performance Choreography", category: "Academic & Technical", proficiency: 96 }
  ];

  for (const s of skills) {
    await prisma.skill.create({ data: s });
  }
  console.log(`Successfully seeded ${skills.length} skills.`);

  // 3. Seed Projects
  const projects = [
    {
      title: "Analisis Dampak Sosial-Ekonomi Sektor Pariwisata Seni Budaya di Jawa Tengah",
      description: "A socio-economic research paper evaluating the correlation between cultural arts preservation (such as traditional dance festivals) and local economic growth/community income in Banten and Central Java.",
      category: "Creative Economy",
      url: "#",
      dataPointsCount: 8400,
      publishedAt: "April 2026",
      pdfUrl: null
    },
    {
      title: "Pemberdayaan Ekonomi Kreatif Berbasis Seni Tradisional di Tangerang Selatan",
      description: "A policy review focusing on the role of youth organizations and local arts clubs (like dance groups) in boosting regional micro-economies, youth employment, and community engagement.",
      category: "Policy Review",
      url: "#",
      dataPointsCount: 3200,
      publishedAt: "February 2026",
      pdfUrl: null
    },
    {
      title: "Peta Disparitas Indeks Pembangunan Manusia (IPM) Provinsi Banten & Jawa Tengah",
      description: "A comparative quantitative analysis of education, health, and economic indicators between South Tangerang and Semarang using BPS microdata.",
      category: "Regional Disparity",
      url: "#",
      dataPointsCount: 15600,
      publishedAt: "December 2025",
      pdfUrl: null
    }
  ];

  for (const p of projects) {
    await prisma.project.create({ data: p });
  }
  console.log(`Successfully seeded ${projects.length} projects.`);

  // 4. Seed Activities
  const activities = [
    {
      role: "BESTARI EXTRACURRICULAR - DANCE CLUB COMMITTEE",
      organization: "SMAN 12 Tangerang Selatan",
      period: "2024 - 2025",
      description: "Served as a committee member of BESTARI Dance Club during senior high school. Responsible for assisting event preparation, coordinating practice schedules, supporting team performances, and contributing to the organization of cultural and school art activities."
    },
    {
      role: "SECOND WINNER - KINANTI LARAS TRADITIONAL DANCE",
      organization: "South Tangerang City Inter-School Dance Competition",
      period: "2024",
      description: "Achieved 2nd place at the South Tangerang City inter-school traditional dance competition with the Kinanti Laras dance. Collaborated closely with team members in choreography preparation, synchronization, and stage performance while representing the school in a cultural arts competition."
    },
    {
      role: "AWARD - LENGGANG NYAI TRADITIONAL DANCE",
      organization: "Lenggang Nyai Performance Category",
      period: "2024",
      description: "Participated in a traditional dance competition representing the team in the Lenggang Nyai performance category. Demonstrated teamwork, stage confidence, discipline during training sessions, and strong understanding of traditional choreography and cultural performance values."
    }
  ];

  for (const a of activities) {
    await prisma.activity.create({ data: a });
  }
  console.log(`Successfully seeded ${activities.length} activities.`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
