import { ResumeData } from "@/types/resume";

export const mockUserData: ResumeData = {
  personalInfo: {
    fullName: "Siddhartha Shrestha",
    jobTitle: "Senior Software Engineer",
    email: "siddhartha.shrestha@email.com",
    phone: "9801234567",
    address: "Kathmandu, Nepal",
    summary: "Experienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading high-performing teams.",
    linkedin: "linkedin.com/in/siddhartha-shrestha",
    website: "siddhartha-shrestha.dev"
  },
  experience: [
    {
      id: "exp1",
      jobTitle: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "Kathmandu, Nepal",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description: "Lead development of microservices architecture serving 1M+ users. Mentor junior developers and collaborate with cross-functional teams to deliver high-quality software solutions."
    },
    {
      id: "exp2",
      jobTitle: "Software Engineer",
      company: "StartupXYZ",
      location: "Kathmandu, Nepal",
      startDate: "2019-06",
      endDate: "2021-02",
      current: false,
      description: "Developed and maintained React applications with 99.9% uptime. Implemented automated testing suites that reduced bug reports by 40%."
    },
    {
      id: "exp3",
      jobTitle: "Frontend Developer",
      company: "Digital Agency",
      location: "Kathmandu, Nepal",
      startDate: "2017-01",
      endDate: "2019-05",
      current: false,
      description: "Built responsive web applications for various clients using modern JavaScript frameworks. Collaborated with designers to create pixel-perfect user interfaces."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Bachelor of Science in Computer Science",
      school: "NCCS",
      location: "Kathmandu, Nepal",
      startDate: "2013-09",
      endDate: "2017-06",
      gpa: "3.8/4.0",
      description: "Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems"
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "E-commerce Platform",
      description: "Full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and real-time inventory management.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe API", "AWS"],
      link: "https://github.com/siddhartha-shrestha/ecommerce-platform",
      startDate: "2023-01",
      endDate: "2023-06"
    },
    {
      id: "proj2",
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      link: "https://github.com/siddhartha-shrestha/task-manager",
      startDate: "2022-08",
      endDate: "2022-12"
    }
  ],
  skills: [
    { id: "skill1", name: "JavaScript", level: "Expert", category: "Programming Languages" },
    { id: "skill2", name: "TypeScript", level: "Advanced", category: "Programming Languages" },
    { id: "skill3", name: "React", level: "Expert", category: "Frontend" },
    { id: "skill4", name: "Node.js", level: "Advanced", category: "Backend" },
    { id: "skill5", name: "PostgreSQL", level: "Advanced", category: "Database" },
    { id: "skill6", name: "AWS", level: "Intermediate", category: "Cloud" },
    { id: "skill7", name: "Docker", level: "Intermediate", category: "DevOps" },
    { id: "skill8", name: "Git", level: "Expert", category: "Tools" }
  ],
  languages: [
    { id: "lang1", language: "English", proficiency: "Native" },
    { id: "lang2", language: "Spanish", proficiency: "Conversational" },
    { id: "lang3", language: "French", proficiency: "Basic" }
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2025-07",
      link: "https://aws.amazon.com/certification/"
    },
    {
      id: "cert2",
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2022-11"
    }
  ]
};