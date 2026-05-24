# ✨ Premium Academic & Research Portfolio Boilerplate

An elegant, data-driven, and highly optimized personal portfolio boilerplate tailored for **Development Economics**, Social Sciences, and general Academic/Leadership majors. Built on top of **Next.js 16 (App Router)**, **Prisma ORM**, and **Tailored HSL Sky Blue Aesthetics**, this portfolio is fully responsive, Vercel-ready, and designed to look analytical and premium.

---

## 🌟 Key Features

* **⚡ Zero-Config Mock Fallback Mode**: Runs seamlessly out-of-the-box! If no `DATABASE_URL` is configured, the system automatically initializes an intelligent mock dataset in memory, letting you clone, run, and explore the layout instantly.
* **🛡️ Self-Healing Local Asset Engine**: 
  * Profile avatars, campus activity documentation, and certificates are mapped to a structured folder directory in `public/images/`.
  * The components programmatically search for `.png` ➔ `.jpg` ➔ `.jpeg` file extensions in sequence.
  * If no image is uploaded, it gracefully renders beautiful CSS initials badges (e.g., "LZA" for profile) or dashed *Belum Ada Dokumentasi* frames rather than throwing React hydration errors.
* **📂 Center-Aligned Research Document Vault**: An integrated, premium PDF document uploader that supports secure local testing and is ready to scale with **Vercel Blob Storage** for cloud assets.
* **🗃️ Robust Prisma Database Schema**: Built-in support for PostgreSQL (Neon/Supabase) containing clean relational schemas for Profiles, Skill Competencies, Policy Projects, Campus Extracurriculars, and Contact logs.
* **🌀 Premium Micro-Animations**: Built with bespoke CSS transitions, smooth color-wipes, dynamic hover-reveal cards, and sleek counter animations.

---

## 📁 Local Directory Asset Mapping

To keep the repository lightweight, you can drop your own photos and certificates directly into the local file system. Place them in the following paths with the name `image.png` or `image.jpg`:

```bash
public/images/
├── profile/
│   └── image.png             # Your hero profile headshot
├── activities/
│   ├── bestari/
│   │   └── image.png         # Photo for Bestari activity
│   ├── kinanti-laras/
│   │   └── image.png         # Photo for Kinanti Laras activity
│   └── lenggang-nyai/
│       └── image.png         # Photo for Lenggang Nyai activity
└── certificates/
    ├── bestari/
    │   └── image.png         # Award certificate for Bestari
    ├── kinanti-laras/
    │   └── image.png         # Award certificate for Kinanti Laras
    └── lenggang-nyai/
        └── image.png         # Award certificate for Lenggang Nyai
```

---

## 🛠️ Tech Stack

* **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Runtime**: [Node.js](https://nodejs.org/)
* **ORM & Database**: [Prisma](https://www.prisma.io/) + PostgreSQL / Neon serverless
* **Styling**: TailwindCSS v4 + Vanilla CSS
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/portfolio-boilerplate.git
cd portfolio-boilerplate
npm install
```

### 2. Configure Environment Variables
Copy the env template:
```bash
cp .env.example .env
```
*(Leave `DATABASE_URL` empty to automatically run the application in its zero-config **Mock Fallback Mode**).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see your premium portfolio live!

### 4. Database Setup (Optional)
If you decide to connect a real PostgreSQL database (e.g. Neon, Supabase):
```bash
# Push schema to database
npx prisma db push

# Seed initial database structure
npx prisma db seed
```

---

## ☁️ Vercel Deployment Instructions

This boilerplate is designed to be fully Vercel-friendly and takes less than 2 minutes to deploy.

1. **Push your code** to a GitHub repository.
2. **Import to Vercel**: Connect your GitHub and import the project.
3. **Environment Variables**: Add your `DATABASE_URL` to Vercel's Environment Variables panel.
4. **Deploy**: Vercel will automatically compile the project, run TypeScript typechecks, auto-generate your Prisma Client, and put the site live!

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute for your own academic or personal portfolio needs!
