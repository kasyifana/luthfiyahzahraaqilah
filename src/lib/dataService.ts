import { prisma } from './db';
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

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
  imageUrl?: string | null;
  certificateUrl?: string | null;
  isTop3?: boolean;
}

// Path to our local JSON database file for persistent fallback
const JSON_DB_PATH = path.join(process.cwd(), 'src', 'lib', 'local_db.json');

// Interface for JSON database structure
interface LocalDbData {
  profile: Profile;
  projects: Project[];
  activities: Activity[];
}

// Read data from local JSON file fallback
function readLocalJsonDb(): LocalDbData {
  try {
    if (fs.existsSync(JSON_DB_PATH)) {
      const fileContent = fs.readFileSync(JSON_DB_PATH, 'utf-8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error("Failed to read local_db.json fallback:", error);
  }
  
  // Return hardcoded fallbacks if file fails to read
  return {
    profile: {
      id: "profile-1",
      name: "Luthfiyah Zahra Aqilah",
      title: "Economic Expert & Development Economics Student",
      bio: "A passionately dedicated 2nd-semester Development Economics student at Universitas Negeri Semarang (UNNES). Focuses on regional econometrics, creative sectors, and local cultural arts leadership.",
      headshotUrl: "/images/profile/image.png",
      academicFocus: "Development Economics, Creative Economy, & Cultural Arts Preservation",
      email: "luthfiyahzahraaqilah@gmail.com",
      linkedinUrl: "https://instagram.com/luthfi.za_"
    },
    projects: [],
    activities: []
  };
}

// Write data to local JSON file fallback
function writeLocalJsonDb(data: LocalDbData): boolean {
  try {
    const dir = path.dirname(JSON_DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Failed to write to local_db.json fallback:", error);
    return false;
  }
}

// ==========================================
// READ OPERATIONS
// ==========================================

export async function getProfile(): Promise<Profile> {
  if (!prisma) {
    return readLocalJsonDb().profile;
  }
  try {
    const profile = await prisma.profile.findFirst();
    if (profile) return profile;
    
    // Seed database completely if profile is empty (first-time initialization)
    const localDb = readLocalJsonDb();
    await prisma.profile.create({ data: localDb.profile });
    
    // Seed projects
    if (localDb.projects.length > 0) {
      const existingProjectsCount = await prisma.project.count();
      if (existingProjectsCount === 0) {
        await prisma.project.createMany({ data: localDb.projects });
      }
    }
    
    // Seed activities
    if (localDb.activities.length > 0) {
      const existingActivitiesCount = await prisma.activity.count();
      if (existingActivitiesCount === 0) {
        await prisma.activity.createMany({ data: localDb.activities });
      }
    }
    
    return localDb.profile;
  } catch (error) {
    console.warn("Prisma failed to fetch profile, falling back to local JSON:", error);
    return readLocalJsonDb().profile;
  }
}

export async function getSkills(): Promise<Skill[]> {
  // Hardcoded Skills Dataset for static reliability
  return [
    { id: "s1", name: "Communication (Public Speaking, Cultural Diplomacy)", category: "Core Competencies", proficiency: 95 },
    { id: "s2", name: "Problem Solving (Strategic Analysis & Project Coordination)", category: "Core Competencies", proficiency: 90 },
    { id: "s3", name: "Leadership (Team Coordination & Stage Confidence)", category: "Core Competencies", proficiency: 92 },
    { id: "s4", name: "Organization (Schedule Management & Event Logistics)", category: "Core Competencies", proficiency: 94 },
    { id: "s5", name: "Microsoft Excel (Economic Data Modeling & Forecasting)", category: "Academic & Technical", proficiency: 85 },
    { id: "s6", name: "SPSS (Statistical Analysis & Hypothesis Testing)", category: "Academic & Technical", proficiency: 80 },
    { id: "s7", name: "Policy Writing & Economic Research Methodologies", category: "Academic & Technical", proficiency: 88 },
    { id: "s8", name: "Cultural Arts Management & Performance Choreography", category: "Academic & Technical", proficiency: 96 }
  ];
}

export async function getProjects(): Promise<Project[]> {
  if (!prisma) {
    return readLocalJsonDb().projects;
  }
  try {
    return await prisma.project.findMany();
  } catch (error) {
    console.warn("Prisma failed to fetch projects, falling back to local JSON:", error);
    return readLocalJsonDb().projects;
  }
}

export async function getActivities(): Promise<Activity[]> {
  if (!prisma) {
    return readLocalJsonDb().activities;
  }
  try {
    return await prisma.activity.findMany();
  } catch (error) {
    console.warn("Prisma failed to fetch activities, falling back to local JSON:", error);
    return readLocalJsonDb().activities;
  }
}


// ==========================================
// WRITE & UPDATE OPERATIONS
// ==========================================

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  if (!prisma) {
    if (isProduction) throw new Error("Database URL is missing or unconfigured in production environment.");
    const db = readLocalJsonDb();
    db.profile = { ...db.profile, ...data };
    writeLocalJsonDb(db);
    return db.profile;
  }
  try {
    const existing = await prisma.profile.findFirst();
    if (existing) {
      return await prisma.profile.update({
        where: { id: existing.id },
        data: data
      });
    } else {
      return await prisma.profile.create({
        data: {
          id: "profile-1",
          name: data.name || "Luthfiyah Zahra Aqilah",
          title: data.title || "",
          bio: data.bio || "",
          headshotUrl: data.headshotUrl || "",
          academicFocus: data.academicFocus || "",
          email: data.email || "",
          linkedinUrl: data.linkedinUrl || ""
        }
      });
    }
  } catch (error) {
    console.error("Prisma failed to update profile:", error);
    if (isProduction) throw error;
    const db = readLocalJsonDb();
    db.profile = { ...db.profile, ...data };
    writeLocalJsonDb(db);
    return db.profile;
  }
}

export async function addProject(data: Omit<Project, "id">): Promise<Project> {
  const newId = `project-${Date.now()}`;
  const newProject: Project = { id: newId, ...data };

  if (!prisma) {
    if (isProduction) throw new Error("Database URL is missing or unconfigured in production environment.");
    const db = readLocalJsonDb();
    db.projects.push(newProject);
    writeLocalJsonDb(db);
    return newProject;
  }
  try {
    return await prisma.project.create({
      data: {
        id: newId,
        title: data.title,
        description: data.description,
        category: data.category,
        url: data.url,
        dataPointsCount: data.dataPointsCount,
        publishedAt: data.publishedAt,
        pdfUrl: data.pdfUrl
      }
    });
  } catch (error) {
    console.error("Prisma failed to add project:", error);
    if (isProduction) throw error;
    const db = readLocalJsonDb();
    db.projects.push(newProject);
    writeLocalJsonDb(db);
    return newProject;
  }
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  if (!prisma) {
    if (isProduction) throw new Error("Database URL is missing or unconfigured in production environment.");
    const db = readLocalJsonDb();
    const index = db.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      db.projects[index] = { ...db.projects[index], ...data };
      writeLocalJsonDb(db);
      return db.projects[index];
    }
    throw new Error(`Project with ID ${id} not found.`);
  }
  try {
    return await prisma.project.update({
      where: { id },
      data: data
    });
  } catch (error) {
    console.error(`Prisma failed to update project ${id}:`, error);
    if (isProduction) throw error;
    const db = readLocalJsonDb();
    const index = db.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      db.projects[index] = { ...db.projects[index], ...data };
      writeLocalJsonDb(db);
      return db.projects[index];
    }
    throw new Error(`Project with ID ${id} not found in fallback.`);
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!prisma) {
    if (isProduction) throw new Error("Database URL is missing or unconfigured in production environment.");
    const db = readLocalJsonDb();
    const beforeLength = db.projects.length;
    db.projects = db.projects.filter(p => p.id !== id);
    writeLocalJsonDb(db);
    return db.projects.length < beforeLength;
  }
  try {
    await prisma.project.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error(`Prisma failed to delete project ${id}:`, error);
    if (isProduction) throw error;
    const db = readLocalJsonDb();
    const beforeLength = db.projects.length;
    db.projects = db.projects.filter(p => p.id !== id);
    writeLocalJsonDb(db);
    return db.projects.length < beforeLength;
  }
}

export async function addActivity(data: Omit<Activity, "id">): Promise<Activity> {
  const newId = `activity-${Date.now()}`;
  const newActivity: Activity = { id: newId, ...data };

  if (!prisma) {
    if (isProduction) throw new Error("Database URL is missing or unconfigured in production environment.");
    const db = readLocalJsonDb();
    db.activities.push(newActivity);
    writeLocalJsonDb(db);
    return newActivity;
  }
  try {
    return await prisma.activity.create({
      data: {
        id: newId,
        role: data.role,
        organization: data.organization,
        period: data.period,
        description: data.description,
        imageUrl: data.imageUrl,
        certificateUrl: data.certificateUrl,
        isTop3: data.isTop3 ?? false
      }
    });
  } catch (error) {
    console.error("Prisma failed to add activity:", error);
    if (isProduction) throw error;
    const db = readLocalJsonDb();
    db.activities.push(newActivity);
    writeLocalJsonDb(db);
    return newActivity;
  }
}

export async function updateActivity(id: string, data: Partial<Activity>): Promise<Activity> {
  if (!prisma) {
    if (isProduction) throw new Error("Database URL is missing or unconfigured in production environment.");
    const db = readLocalJsonDb();
    const index = db.activities.findIndex(a => a.id === id);
    if (index !== -1) {
      db.activities[index] = { ...db.activities[index], ...data };
      writeLocalJsonDb(db);
      return db.activities[index];
    }
    throw new Error(`Activity with ID ${id} not found.`);
  }
  try {
    return await prisma.activity.update({
      where: { id },
      data: data
    });
  } catch (error) {
    console.error(`Prisma failed to update activity ${id}:`, error);
    if (isProduction) throw error;
    const db = readLocalJsonDb();
    const index = db.activities.findIndex(a => a.id === id);
    if (index !== -1) {
      db.activities[index] = { ...db.activities[index], ...data };
      writeLocalJsonDb(db);
      return db.activities[index];
    }
    throw new Error(`Activity with ID ${id} not found in fallback.`);
  }
}

export async function deleteActivity(id: string): Promise<boolean> {
  if (!prisma) {
    if (isProduction) throw new Error("Database URL is missing or unconfigured in production environment.");
    const db = readLocalJsonDb();
    const beforeLength = db.activities.length;
    db.activities = db.activities.filter(a => a.id !== id);
    writeLocalJsonDb(db);
    return db.activities.length < beforeLength;
  }
  try {
    await prisma.activity.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error(`Prisma failed to delete activity ${id}:`, error);
    if (isProduction) throw error;
    const db = readLocalJsonDb();
    const beforeLength = db.activities.length;
    db.activities = db.activities.filter(a => a.id !== id);
    writeLocalJsonDb(db);
    return db.activities.length < beforeLength;
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
