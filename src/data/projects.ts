/**
 * @file data/projects.ts
 * @description Portfolio projects (selection updated 2026-10-11). One group per project, so project URLs are `/projects/<id>-0`.
 */

export type ProjectCategory = 'ai' | 'web' | 'mobile' | 'data';

export interface Project {
    title: string;
    photoUrl: string;
    gallery?: string[];
    date: string;
    description: string;
    highlights?: string[];
    skills: string[];
    categories: ProjectCategory[];
    featured?: boolean;
    githubUrl: string;
    demoUrl: string;
}

export interface ProjectGroup {
    id: number;
    data: Project[];
}

export const projectsData: ProjectGroup[] = [
    {
        id: 1,
        data: [
            {
                title: "Agentic QA Platform",
                photoUrl: "/assets/projects/agentic-qa-platform/cover.webp",
                gallery: ["/assets/projects/agentic-qa-platform/01.webp", "/assets/projects/agentic-qa-platform/02.webp", "/assets/projects/agentic-qa-platform/03.webp", "/assets/projects/agentic-qa-platform/04.webp", "/assets/projects/agentic-qa-platform/05.webp"],
                date: "Oct 2026",
                description: "An organisation-wide quality platform: every repository plugs into one pipeline (unit → E2E → mutation → SonarQube → Trivy on each pull request) and an AI layer of agents (Planner, Generator, Healer, Triage, Verifier) proposes tests and fixes. A self-hosted Decision Engine, exposed as an MCP server, routes the work. Design rule: the deterministic pipeline blocks merges; agents only propose.",
                highlights: ["QA Control Center (Next.js 16): projects, runs, pull requests, security, decisions, agents and AI settings, with a read-only QA assistant", "Agents built on the Claude Agent SDK and MCP, with Stryker mutation testing to check that generated tests catch bugs", "Decision Engine with an MCP server and Prometheus metrics; LiteLLM gateway (local Ollama model, escalation to a hosted model)", "Jenkins templates for Angular, Express, Flutter, NestJS and Next.js projects; Grafana dashboards; 300+ unit tests"],
                skills: ["TypeScript", "Next.js", "Claude Agent SDK", "MCP", "LiteLLM", "Ollama", "Playwright", "Stryker", "SonarQube", "Trivy", "Jenkins", "Prometheus", "Grafana", "Turborepo", "Docker"],
                categories: ["ai", "web"],
                featured: true,
                githubUrl: "/confidential",
                demoUrl: "/confidential"
            }
        ]
    },
    {
        id: 2,
        data: [
            {
                title: "Employee Insight Hub (HR BI + AI assistant)",
                photoUrl: "/assets/projects/rh-bi-platform/cover.webp",
                gallery: ["/assets/projects/rh-bi-platform/01.webp", "/assets/projects/rh-bi-platform/02.webp", "/assets/projects/rh-bi-platform/03.webp", "/assets/projects/rh-bi-platform/04.webp", "/assets/projects/rh-bi-platform/05.webp"],
                date: "Sep 2026 - Oct 2026",
                description: "An end-to-end HR business-intelligence platform. Python ETL loads HR sources into a PostgreSQL data warehouse (constellation schema built with dbt), orchestrated by Airflow. ML scripts predict attrition and workload, detect anomalies and segment employees. A Next.js dashboard shows the KPIs (with embedded Power BI), an ETL Studio designs and runs flows visually, and a LangGraph assistant answers HR questions through SQL tools.",
                highlights: ["Verified run: 89 dbt tests passing, 297,953 rows loaded, full Airflow pipeline in 2 min 38 s", "dbt warehouse: staging, intermediate, 9 dimensions/facts and 8 KPI marts (turnover, payroll, presence, training…)", "LangGraph HR agent with tools for leaves, departments and presence, streamed answers and an eval test suite", "Visual ETL Studio (React Flow): catalogue, connections, pipeline editor, runs and scheduling"],
                skills: ["Python", "dbt", "Airflow", "PostgreSQL", "scikit-learn", "LangGraph", "FastAPI", "Next.js", "TypeScript", "Power BI", "Better Auth", "Docker"],
                categories: ["ai", "data", "web"],
                featured: true,
                githubUrl: "/confidential",
                demoUrl: "/confidential"
            }
        ]
    },
    {
        id: 3,
        data: [
            {
                title: "CampyWin Delivery",
                photoUrl: "/assets/projects/campywin-delivery/cover.webp",
                date: "Apr 2026 - Aug 2026",
                description: "A delivery platform for a camping complex, built as Spring Boot microservices. Five business services each own their database behind a config server, Eureka and an API gateway, with Keycloak for OAuth2/OIDC. Around them: a NestJS notification service, two Python RAG assistants (FAQ and delivery chat) evaluated with RAGAS, and a Next.js 16 dashboard with server-side Keycloak sign-in and permission-based access for five roles.",
                highlights: ["5 Spring Boot services (users, catalog, orders, payments, delivery) with database per service: PostgreSQL, MongoDB, MySQL", "Event-driven delivery flow with Kafka / RabbitMQ; OpenFeign, MapStruct, Prometheus metrics, OpenAPI", "RAG assistants with LangChain, Chroma and OpenAI embeddings, measured with RAGAS", "Next.js dashboard: token refresh with request queue, permission map for 5 roles"],
                skills: ["Spring Boot", "Spring Cloud", "Keycloak", "Kafka", "RabbitMQ", "PostgreSQL", "MongoDB", "MySQL", "NestJS", "FastAPI", "LangChain", "RAGAS", "Next.js", "TypeScript", "Docker"],
                categories: ["ai", "web"],
                featured: true,
                githubUrl: "/confidential",
                demoUrl: "/confidential"
            }
        ]
    },
    {
        id: 4,
        data: [
            {
                title: "CampyWin",
                photoUrl: "/assets/projects/campywin-platform/cover.webp",
                gallery: ["/assets/projects/campywin-platform/01.webp", "/assets/projects/campywin-platform/02.webp", "/assets/projects/campywin-platform/03.webp"],
                date: "Feb 2026 - Jun 2026",
                description: "An outdoor-tourism platform for Tunisia (ESPRIT team project, finalist at Bal des Projets 2026). A Spring Boot modular monolith with 53 entities covers camping spots and events, accommodation booking with pricing, transport and delivery, equipment rental and orders, recruitment and a community (blog, forum, FAQ, tickets, chat). Angular 18 front end, delivered with Jenkins to Kubernetes.",
                highlights: ["Top contributor on the backend (69 % of commits)", "Keycloak OAuth2, OTP and refresh tokens; Kafka and RabbitMQ; Redis caching; rate limiting; Liquibase migrations; Stripe and PayPal", "Angular 18 booking wizard (dates → accommodation → transport → payment), host dashboard, logistics hub and WebSocket chat", "66 test files, JaCoCo and SonarQube quality gates, Docker images and Kubernetes manifests"],
                skills: ["Spring Boot", "Java", "Angular", "Keycloak", "Kafka", "RabbitMQ", "Redis", "PostgreSQL", "Stripe", "Jenkins", "Kubernetes", "SonarQube", "Docker"],
                categories: ["web"],
                featured: true,
                githubUrl: "/confidential",
                demoUrl: "https://campywin-demo.vercel.app/"
            }
        ]
    },
    {
        id: 5,
        data: [
            {
                title: "AcademyExpert",
                photoUrl: "/assets/projects/academy-expert/cover.webp",
                gallery: ["/assets/projects/academy-expert/01.webp", "/assets/projects/academy-expert/02.webp"],
                date: "Feb 2025 - Jun 2025",
                description: "An AI-powered learning and recruiting platform for bootcamps, 1st place at Bal des Projets. Five role dashboards (admin, manager, trainer, learner, recruiter) cover organisations, workspaces, courses, learning flows, quizzes, job offers, applications and interviews. The Express/MongoDB backend integrates Azure OpenAI, OpenAI and Hugging Face, a market scraper, Stripe billing and real-time Socket.IO.",
                highlights: ["1st place, Bal des Projets (ESPRIT)", "Co-lead: top contributor with 470 commits", "LLM assistant, AI CV generator and quiz generation", "Market-intelligence scraper over 20+ platforms; Stripe billing; Swagger API docs"],
                skills: ["Angular", "NgRx", "Tailwind CSS", "Express.js", "MongoDB", "Azure OpenAI", "Hugging Face", "Socket.IO", "Stripe", "Puppeteer"],
                categories: ["ai", "web"],
                featured: true,
                githubUrl: "/confidential",
                demoUrl: "https://academy-expert-demo.vercel.app/"
            }
        ]
    },
    {
        id: 6,
        data: [
            {
                title: "ReUsedTN",
                photoUrl: "/assets/projects/reusedtn/cover.webp",
                gallery: ["/assets/projects/reusedtn/01.webp", "/assets/projects/reusedtn/02.webp"],
                date: "Dec 2025 - Jan 2026",
                description: "The storefront and back office of my own second-hand business. A multilingual store (EN/FR/AR) with search, deals, favourites, a blog and buyer/seller guides, and an admin with analytics, AI product descriptions and market-price checks, AI marketing campaigns, a scraper, messages and backups.",
                highlights: ["AI features through OpenRouter (GPT-4o mini) with rate limiting", "16 test files: Jest + Testing Library, MongoDB Memory Server, Playwright end-to-end", "Docker images for dev, test and prod behind nginx; GitHub Actions"],
                skills: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "OpenAI SDK", "Zustand", "Playwright", "Jest", "Docker"],
                categories: ["ai", "web"],
                featured: true,
                githubUrl: "/confidential",
                demoUrl: "https://re-used-tn.vercel.app/"
            }
        ]
    },
    {
        id: 7,
        data: [
            {
                title: "Smart Resale AI",
                photoUrl: "/assets/projects/smart-resale-ai/cover.webp",
                gallery: ["/assets/projects/smart-resale-ai/01.webp", "/assets/projects/smart-resale-ai/02.webp", "/assets/projects/smart-resale-ai/03.webp", "/assets/projects/smart-resale-ai/04.webp"],
                date: "Jan 2026 - Apr 2026",
                description: "A decision-support app for reselling tech products. A FastAPI backend serves five machine-learning models (price regression, condition classification, seasonal classification, market-tier clustering and recommendation) and the Next.js front end turns them into workflows: buy decision, product listing, selling strategy and market intelligence.",
                highlights: ["5 models served with FastAPI (XGBoost, scikit-learn)", "Workflow pages plus a model playground", "Model demo published separately with Streamlit"],
                skills: ["Python", "FastAPI", "XGBoost", "scikit-learn", "Pandas", "Next.js", "TypeScript", "Docker"],
                categories: ["ai", "data", "web"],
                githubUrl: "https://github.com/zied-snoussi/smart-resale-ml-models",
                demoUrl: "https://smart-resale-ml.vercel.app/"
            }
        ]
    },
    {
        id: 8,
        data: [
            {
                title: "CampyWin ML (MLOps)",
                photoUrl: "/assets/projects/campywin-ml/cover.webp",
                gallery: ["/assets/projects/campywin-ml/01.webp", "/assets/projects/campywin-ml/02.webp", "/assets/projects/campywin-ml/03.webp"],
                date: "Jun 2026",
                description: "An MLOps platform around a price-prediction model trained on 961 Decathlon Tunisia products. FastAPI serves the model from the MLflow registry, Prefect runs six pipelines, metrics flow through the ELK stack, and a Next.js dashboard monitors the eight containers.",
                highlights: ["Gradient Boosting tuned with GridSearchCV, 29 registered model versions", "Prefect pipelines (train, evaluate, experiment…) triggered from the dashboard", "Docker Compose stack: FastAPI, MLflow, Prefect, Elasticsearch, Logstash, Kibana"],
                skills: ["Python", "scikit-learn", "MLflow", "Prefect", "FastAPI", "Elasticsearch", "Kibana", "Next.js", "Docker"],
                categories: ["ai", "data"],
                githubUrl: "/confidential",
                demoUrl: "/confidential"
            }
        ]
    },
    {
        id: 9,
        data: [
            {
                title: "AD Eyes (ROOLY)",
                photoUrl: "/assets/projects/ad-eyes/cover.webp",
                gallery: ["/assets/projects/ad-eyes/01.webp", "/assets/projects/ad-eyes/02.webp", "/assets/projects/ad-eyes/03.webp"],
                date: "Sep 2023 - Oct 2024",
                description: "A shrimp-farm management platform built at ROOLY for Aqua Development Ltd. Admins create farms, appoint managers and set parameters and supplies; farm managers plan programs for each pond; technicians run daily checks and record water and shrimp health. Delivered with the company's corporate website.",
                highlights: ["NestJS + MongoDB API: 36 controllers, 39 schemas, Redis cache, rate limiting, S3 files, invitation e-mails", "Next.js 14 installable web app (PWA) with Redux Toolkit, Google Maps and English / Arabic / Korean", "Three role apps: Admin, Farm Manager, Technician"],
                skills: ["Next.js", "TypeScript", "Redux Toolkit", "NestJS", "MongoDB", "Redis", "AWS S3", "PWA", "Tailwind CSS"],
                categories: ["web", "mobile"],
                githubUrl: "/confidential",
                demoUrl: "https://auqa-dev-website.vercel.app/"
            }
        ]
    },
    {
        id: 10,
        data: [
            {
                title: "Menuria",
                photoUrl: "/assets/projects/menuria/cover.webp",
                gallery: ["/assets/projects/menuria/01.webp"],
                date: "May 2026",
                description: "A multi-tenant digital-menu platform for Tunisian cafés and restaurants. Each business gets a public menu page (French / Arabic) reachable by QR code; staff manage categories and items with an availability toggle; a super-admin console manages businesses, credentials and API tokens.",
                highlights: ["Multi-tenant model: businesses, categories, items, users, API tokens", "QR codes, Wi-Fi card, image uploads (Cloudinary)", "Invitations and role-based admin"],
                skills: ["Next.js", "TypeScript", "MongoDB", "next-intl", "Tailwind CSS", "Cloudinary"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "https://menuria.vercel.app/"
            }
        ]
    },
    {
        id: 11,
        data: [
            {
                title: "Primenv",
                photoUrl: "/assets/projects/primenv/cover.webp",
                gallery: ["/assets/projects/primenv/01.webp"],
                date: "Feb 2026",
                description: "A secrets vault for teams: projects and project groups hold environment variables per environment, encrypted with AES-256-GCM, with bulk import, sync to GitHub repositories, an activity log and search. Sign-in uses a magic link plus a 6-digit code, limited to a whitelist.",
                highlights: ["AES-256-GCM encryption at rest", "Magic link + OTP sign-in with e-mail whitelist", "GitHub repository sync"],
                skills: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "Tailwind CSS"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "https://primenv.vercel.app/"
            }
        ]
    },
    {
        id: 23,
        data: [
            {
                title: "Resume Builder",
                photoUrl: "/assets/projects/resume-builder/cover.webp",
                gallery: ["/assets/projects/resume-builder/01.webp", "/assets/projects/resume-builder/02.webp", "/assets/projects/resume-builder/03.webp", "/assets/projects/resume-builder/04.webp"],
                date: "Sep 2026",
                description: "A local-first builder for the two documents an application needs: a resume and the cover letter that goes with it. Edit on the left and watch a real A4 / Letter page update on the right, switch between nine print-ready templates without retyping, keep a named version for each job application and export a PDF whose links still work. Everything stays in the browser: no account, no server, no upload.",
                highlights: ["9 templates, including an ATS Optimized one built around the PDF text layer (no columns, letter-spacing or generated bullets)", "ATS check that reports what a parser will miss: contact details, missing dates, bullets without numbers, unrecognised headings, layout risk", "Cover-letter editor with its own check, saved versions and a signature pad", "Clickable links in the exported PDF; interface in English, French and Arabic"],
                skills: ["React.js", "TypeScript", "Vite", "CSS print layout", "localStorage"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "https://resume-builder-rose-five.vercel.app/"
            }
        ]
    },
    {
        id: 12,
        data: [
            {
                title: "PFM: Personal Finance Platform",
                photoUrl: "/assets/projects/pfm-platform/cover.webp",
                date: "Jun 2025 - Aug 2025",
                description: "A personal-finance platform in French: onboarding, transaction import, budgets, goals and notifications, with a recommendation engine and an AI assistant grounded in the user's own transactions. An advisor role follows clients and an admin area tracks users and AI usage.",
                highlights: ["AI advice and chat through OpenRouter (DeepSeek R1) using the user's transactions as context", "Advisor role with client views; admin statistics and AI-usage tracking"],
                skills: ["Next.js", "TypeScript", "Prisma", "NextAuth", "OpenRouter", "Tailwind CSS"],
                categories: ["ai", "web"],
                githubUrl: "/confidential",
                demoUrl: "/confidential"
            }
        ]
    },
    {
        id: 13,
        data: [
            {
                title: "TS Export (MSG) e-commerce",
                photoUrl: "/assets/projects/ts-export/cover.webp",
                gallery: ["/assets/projects/ts-export/01.webp", "/assets/projects/ts-export/02.webp"],
                date: "Jun 2023 - Present",
                description: "A catalogue and e-commerce website for a Tunisian food exporter, built as a freelance project in 2023 and still maintained. Multilingual public pages and a full back office: catalogue, categories, featured products, messages, users and settings.",
                highlights: ["Live for a real client since 2023 (200+ commits)", "Admin back office with JWT authentication"],
                skills: ["Next.js", "TypeScript", "MongoDB", "i18next", "Tailwind CSS"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "https://ts-export.vercel.app/"
            }
        ]
    },
    {
        id: 14,
        data: [
            {
                title: "Ambulance Tunisie",
                photoUrl: "/assets/projects/ambulance-tunisie/cover.webp",
                gallery: ["/assets/projects/ambulance-tunisie/01.webp", "/assets/projects/ambulance-tunisie/02.webp", "/assets/projects/ambulance-tunisie/03.webp"],
                date: "Feb 2026 - Apr 2026",
                description: "A bilingual website (French / Arabic with right-to-left layout) for a medical-transport company, live on its own domain. Ambulance and VSL booking forms send formatted e-mails, and the site is optimised for search with a sitemap and structured data.",
                highlights: ["Booking forms for ambulance and VSL transport with optional medical services", "French / Arabic with RTL and localised URLs", "SEO: metadata, sitemap, JSON-LD"],
                skills: ["Next.js", "TypeScript", "next-intl", "Tailwind CSS", "Nodemailer"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "https://www.ambulancetunisie.online/fr"
            }
        ]
    },
    {
        id: 15,
        data: [
            {
                title: "CampyWin Mobile",
                photoUrl: "/assets/projects/campywin-mobile/cover.webp",
                date: "Sep 2026 - Present",
                description: "A Flutter app for CampyWin (Android, iOS and web) with three roles: admins see statistics and moderate content, managers publish and manage camps and handle requests, and clients browse, join camps and leave reviews. Includes an OTP sign-up flow and role-guarded navigation.",
                highlights: ["25 screens across admin, manager and client", "go_router with a single role guard; Provider state", "Firebase Auth (e-mail and Google); Android APK built in GitHub Actions"],
                skills: ["Flutter", "Dart", "Firebase Auth", "go_router", "Provider", "fl_chart"],
                categories: ["mobile"],
                githubUrl: "/confidential",
                demoUrl: "/confidential"
            }
        ]
    },
    {
        id: 16,
        data: [
            {
                title: "PerformanceWebOptimize (ip-label)",
                photoUrl: "/assets/projects/performance-web-optimize/cover.webp",
                date: "Feb 2023 - Jun 2023",
                description: "My internship project at ip-label (Ekara): an internal web app that centralises load-test scripts and user access, with a scheduling calendar, a script editor, reports and Grafana monitoring of k6, JMeter and Selenium campaigns.",
                highlights: ["Library of load-test scripts with access control", "Scheduling calendar, Monaco script editor, PDF reports", "Performance campaigns with k6, JMeter and Selenium"],
                skills: ["React.js", "Redux", "Node.js", "Express.js", "Prisma", "PostgreSQL", "K6", "JMeter", "Selenium WebDriver", "Grafana"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "/confidential"
            }
        ]
    },
    {
        id: 17,
        data: [
            {
                title: "SMART SEA",
                photoUrl: "/assets/projects/smart-sea/cover.webp",
                date: "May 2024 - Jul 2024",
                description: "A JavaFX desktop app for maritime transport (ESPRIT team project): boats, cabins, voyages, reservations, events, claims and employees, with admin, passenger and technician dashboards, a chatbot, maps and PDF/Excel reports.",
                highlights: ["Top contributor (72 % of commits)", "21 controllers, MySQL data access layer", "JasperReports, iText PDF, Excel export, QR codes, e-mail"],
                skills: ["Java", "JavaFX", "MySQL", "JasperReports"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "/confidential"
            }
        ]
    },
    {
        id: 18,
        data: [
            {
                title: "STAR SHOP (B2S)",
                photoUrl: "/assets/projects/star-shop/cover.webp",
                gallery: ["/assets/projects/star-shop/01.webp", "/assets/projects/star-shop/02.webp", "/assets/projects/star-shop/03.webp", "/assets/projects/star-shop/04.webp"],
                date: "Jul 2022 - Sep 2022",
                description: "An e-commerce website built during my internship at Business Software Solution: product catalogue and search, cart, order steps, PayPal payment, delivery address on Google Maps, order history and an admin panel for products, users and deliveries.",
                highlights: ["Full order flow: cart → shipping address → payment method → PayPal → delivery", "Admin: products, users, orders and deliveries"],
                skills: ["React.js", "Node.js", "Express.js", "MongoDB", "PayPal", "Bootstrap"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "/confidential"
            }
        ]
    },
    {
        id: 19,
        data: [
            {
                title: "Smart Mobility Predictor",
                photoUrl: "/assets/projects/smart-mobility-predictor/cover.webp",
                gallery: ["/assets/projects/smart-mobility-predictor/01.webp"],
                date: "Jan 2026",
                description: "A prototype for urban mobility in Tunis: travel-time and traffic estimates on a map, route alternatives with cost and CO₂ comparison, and an AI-written trip summary. English / French.",
                highlights: ["Interactive map (Leaflet) with route alternatives", "LLM trip summary through OpenRouter"],
                skills: ["Next.js", "TypeScript", "Leaflet", "OpenRouter", "Tailwind CSS"],
                categories: ["ai", "web"],
                githubUrl: "/confidential",
                demoUrl: "https://smart-mobility-predictor.vercel.app/"
            }
        ]
    },
    {
        id: 20,
        data: [
            {
                title: "IntelliScrape Studio",
                photoUrl: "/assets/projects/intelliscrape-studio/cover.webp",
                gallery: ["/assets/projects/intelliscrape-studio/01.webp"],
                date: "Sep 2025",
                description: "A web-scraping studio with a VS Code-style interface: tabs, command palette and multi-keyword search across news, e-commerce, social media and video sources, with JSON export.",
                highlights: ["VS Code-style tabs and command palette", "Puppeteer + Cheerio extraction"],
                skills: ["Next.js", "TypeScript", "Puppeteer", "Cheerio", "Tailwind CSS"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "https://intelliscrape-studio.vercel.app/"
            }
        ]
    },
    {
        id: 21,
        data: [
            {
                title: "LaTeX Resume Builder",
                photoUrl: "/assets/projects/latex-resume-builder/cover.webp",
                gallery: ["/assets/projects/latex-resume-builder/01.webp"],
                date: "Nov 2025",
                description: "A LaTeX résumé editor with templates, AI rewriting of content, an AI helper that explains LaTeX errors, and PDF export.",
                highlights: ["Monaco editor with live templates", "AI enhancement and error resolution through OpenRouter"],
                skills: ["Next.js", "TypeScript", "LaTeX", "Monaco", "OpenRouter"],
                categories: ["ai", "web"],
                githubUrl: "/confidential",
                demoUrl: "https://tex-builder.vercel.app/"
            }
        ]
    },
    {
        id: 22,
        data: [
            {
                title: "Event Management",
                photoUrl: "/assets/projects/event-management/cover.webp",
                gallery: ["/assets/projects/event-management/01.webp"],
                date: "Oct 2025",
                description: "A front-end prototype for managing events with organizer, manager and member roles, prepared for the BrainCrafters team.",
                highlights: ["Role-based screens for organizers, managers and members"],
                skills: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
                categories: ["web"],
                githubUrl: "/confidential",
                demoUrl: "https://event-management-brain-crafters.vercel.app/"
            }
        ]
    }
];
