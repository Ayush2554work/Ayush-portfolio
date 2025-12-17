import { Certification, Project, SocialLink } from './types';

export const PROFILE_IMAGE_URL = "/myphoto2.png";

export const RESUME_LINK = "https://drive.google.com/file/d/1JA2CZg58VYsDJdM4A-uOfIR55HYNu3xV/view?usp=sharing";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ayush-kumar2554",
    icon: "linkedin"
  },
  {
    platform: "GitHub",
    url: "https://github.com/Ayush2554work",
    icon: "github"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "ublio",
    title: "Ublio",
    description: "Premium audio equipment e-commerce platform delivering exceptional sound experiences. Features intuitive navigation, product showcase, and responsive design.",
    liveLink: "https://ubliolux.shop",
    repoLink: "https://github.com/Ayush2554work/Ublio",
    techStack: ["HTML", "CSS", "JavaScript", "E-commerce"],
    imageUrl: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80"
  },
  {
    id: "dermoscan",
    title: "DermOscan",
    description: "AI-powered skin cancer detection application using MobileNetV2 for accurate diagnosis. Provides real-time analysis and health insights through advanced machine learning.",
    liveLink: null,
    repoLink: "https://github.com/Ayush2554work/DermOscan",
    techStack: ["Python", "TensorFlow", "MobileNetV2", "AI/ML"],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
  },
  {
    id: "infrasys",
    title: "InfraSYS",
    description: "Streamlines infrastructure project planning and execution for government agencies using AI-powered analytics. Optimizes resource allocation and project timelines.",
    liveLink: "https://ayush2554work.github.io/InfraSYS/",
    repoLink: "https://github.com/Ayush2554work/InfraSYS",
    techStack: ["HTML", "CSS", "JavaScript", "AI Analytics"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  },
  {
    id: "litmu",
    title: "Lit-Mu",
    description: "IoT-powered energy optimization system tracking real-time usage across appliances. Integrates with home automation for intelligent energy-saving recommendations.",
    liveLink: "https://ayush2554work.github.io/Lit-Mu/",
    repoLink: "https://github.com/Ayush2554work/Lit-Mu",
    techStack: ["IoT", "Node.js", "React", "MongoDB", "Azure"],
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
  },
  {
    id: "myyogi",
    title: "MyYOGI",
    description: "AI-powered yoga mat with Bluetooth connectivity, pressure sensors, and LED panels. Customizes workouts based on user data with real-time audio guidance.",
    liveLink: "https://ayush2554work.github.io/MyYOGI/",
    repoLink: "https://github.com/Ayush2554work/MyYOGI",
    techStack: ["Python", "AI/ML", "Bluetooth", "React Native"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
  },
  {
    id: "plantlify",
    title: "Plantlify",
    description: "AI image recognition system for plant health monitoring and disease diagnosis. Provides real-time insights and actionable care recommendations.",
    liveLink: null,
    repoLink: "https://github.com/Ayush2554work/Plantlify",
    techStack: ["Python", "TensorFlow", "OpenCV", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800&q=80"
  },
  {
    id: "smart-traffic",
    title: "Smart Traffic Manager",
    description: "AI-driven traffic signal optimization system using real-time vehicle density analysis. Minimizes congestion and improves urban traffic flow efficiency.",
    liveLink: null,
    repoLink: "https://github.com/Ayush2554work/Smart-traffic-manager",
    techStack: ["Python", "TensorFlow", "OpenCV", "IoT"],
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80"
  },
  {
    id: "tradestream",
    title: "TradeStream India",
    description: "Real-time investment tracking platform for stocks, IPOs, gold, and crypto. Features AI-powered market analysis and personalized recommendations.",
    liveLink: "https://ayush2554work.github.io/TradeStream---India-/",
    repoLink: "https://github.com/Ayush2554work/TradeStream---India-",
    techStack: ["React", "Node.js", "Python", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
  },
  {
    id: "seo-mastery",
    title: "SEO Mastery App",
    description: "Comprehensive SEO learning platform with 8 interactive modules and data visualizations. Dashboard-hybrid layout for effective keyword and optimization mastery.",
    liveLink: "https://seo-mastery-app.vercel.app",
    repoLink: "https://github.com/Ayush2554work/SEO-Mastery-App",
    techStack: ["HTML", "CSS", "JavaScript", "Chart.js"],
    imageUrl: "/image.png"
  },
  {
    id: "seo-mobile",
    title: "SEO Mastery Mobile",
    description: "Mobile-optimized version of the SEO learning platform. Designed for on-the-go learning with responsive interface and touch-friendly navigation.",
    liveLink: "https://ayush2554work.github.io/SEO_Mastery_App_MOBILE/",
    repoLink: "https://github.com/Ayush2554work/SEO_Mastery_App_MOBILE",
    techStack: ["HTML", "CSS", "JavaScript", "Mobile-First"],
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
  },
  {
    id: "jira-scraper",
    title: "Apache Jira Scraper",
    description: "Python-based data scraping utility for Apache Jira. Automates issue tracking data extraction and processing for enhanced project management insights.",
    liveLink: null,
    repoLink: "https://github.com/Ayush2554work/AYUSH-Apache-jira-scraper",
    techStack: ["Python", "Web Scraping", "Data Processing"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  },
  {
    id: "ai-scope",
    title: "Sutikshna - AI Scope",
    description: "AI-powered ballistic scope simulation with advanced object detection, facial recognition, and real-time ballistic calculations in a high-tech environment.",
    liveLink: "https://github.com/Ayush2554work/Sutikshna--Ayi--Scope-",
    repoLink: "https://github.com/Ayush2554work/Sutikshna--Ayi--Scope-",
    techStack: ["Artificial Intelligence", "Computer Vision", "HTML5 Canvas", "JavaScript"],
    imageUrl: "/ai_scope.png"
  }
];

// Certificate data with actual course names
const certificateData: Array<{ id: string, title: string, issuer: string, url: string }> = [
  { id: "c1", title: "NGO Startup Analysis with Nonprofit Business Model Canvas", issuer: "Coursera", url: "https://www.coursera.org/account/accomplishments/records/XUS5DGI4T0E0" },
  { id: "c2", title: "Foundations of Digital Marketing and E-commerce", issuer: "Google", url: "https://www.coursera.org/account/accomplishments/records/AGY8R39E661L" },
  { id: "c3", title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization", issuer: "DeepLearning.AI", url: "https://www.coursera.org/account/accomplishments/records/GJGN3CHYO6NP" },
  { id: "c4", title: "Natural Language Processing with Classification and Vector Spaces", issuer: "DeepLearning.AI", url: "https://www.coursera.org/account/accomplishments/records/4T321BH3P2JM" },
  { id: "c5", title: "Initiating and Planning Projects", issuer: "UC Irvine", url: "https://www.coursera.org/account/accomplishments/records/7QJOE0E17QK0" },
  { id: "c6", title: "C++ Object Basics: Functions, Recursion, and Objects", issuer: "Codio", url: "https://www.coursera.org/account/accomplishments/records/LSWTMKKDKJM8" },
  { id: "c7", title: "Machine Learning with Python", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/records/26U61DS34FFY" },
  { id: "c8", title: "Foundations: Data, Data, Everywhere", issuer: "Google", url: "https://www.coursera.org/account/accomplishments/records/5OIIYFIXBH00" },
  { id: "c9", title: "Fundamentals of Digital Image and Video Processing", issuer: "Northwestern", url: "https://www.coursera.org/account/accomplishments/records/33T7O723ID84" },
  { id: "c10", title: "Introduction to Intellectual Property", issuer: "UPenn", url: "https://www.coursera.org/account/accomplishments/records/LSWUOIZ8HWC2" },
  { id: "c11", title: "Digital business - Act on the digital world", issuer: "École Polytechnique", url: "https://www.coursera.org/account/accomplishments/records/AELJ6JZXP56S" },
  { id: "c12", title: "Algorithmic Toolbox", issuer: "UC San Diego", url: "https://www.coursera.org/account/accomplishments/records/Y266V6LQTPUB" },
  { id: "c13", title: "The Bits and Bytes of Computer Networking", issuer: "Google", url: "https://www.coursera.org/account/accomplishments/records/CX55NLLVYAFL" },
  { id: "c14", title: "Supervised Machine Learning: Classification", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/records/LWT3FK9DYSYD" },
  { id: "c15", title: "Unsupervised Machine Learning", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/records/US9J2XHPLNSJ" },
  { id: "c16", title: "Digital business - Grow on digital world", issuer: "École Polytechnique", url: "https://www.coursera.org/account/accomplishments/records/LMH3TU6HUNS7" },
  { id: "c17", title: "Fundamentals of Network Communication", issuer: "UC System", url: "https://www.coursera.org/account/accomplishments/records/ZYKQYGXSWHKL" },
  { id: "c18", title: "Simulation and modeling of natural processes", issuer: "U. Geneva", url: "https://www.coursera.org/account/accomplishments/records/MQ3EZHB3F8ND" },
  { id: "c19", title: "Patent Law", issuer: "UPenn", url: "https://www.coursera.org/account/accomplishments/records/OZB8EXXHH5MD" },
  { id: "c20", title: "Introduction to Computers and Operating Systems and Security", issuer: "Microsoft", url: "https://www.coursera.org/account/accomplishments/records/LX8SJRHWMBV7" },
  { id: "c21", title: "Foundations of Project Management", issuer: "Google", url: "https://www.coursera.org/account/accomplishments/records/9CYW5JR27CTJ" },
  { id: "c22", title: "Exploratory Data Analysis for Machine Learning", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/records/HMJUYTRY8HJL" },
  { id: "c23", title: "Data Structures", issuer: "UC San Diego", url: "https://www.coursera.org/account/accomplishments/records/JPWH86XA4XMN" }
];

export const CERTIFICATIONS: Certification[] = certificateData.map(cert => ({
  id: cert.id,
  title: cert.title,
  issuer: cert.issuer,
  link: cert.url
}));

// Personal Information
export const PERSONAL_INFO = {
  bio: "Motivated and disciplined Computer Science student with a strong foundation in machine learning and data structures & algorithms. Known for a hardworking and determined approach to problem-solving, with a keen interest in integrating technical expertise with business acumen in sales and management. Avid and flexible learner seeking opportunities to contribute to innovative projects while continuously expanding skill sets across both technical and managerial domains.",
  address: "SP-1102, Omaxe palm Greens",
  city: "Greater Noida, 201310",
  country: "INDIA",
  phone: "+91 9315246678",
  email: "ayushkumarwork2554@gmail.com",
  birthDate: "25 May 2004"
};

// Technical Skills
export const SKILLS = [
  { name: "Intermediate Java", category: "programming" },
  { name: "C++", category: "programming" },
  { name: "Machine Learning", category: "ai" },
  { name: "SQL", category: "database" },
  { name: "Netlify", category: "deployment" },
  { name: "MongoDB", category: "database" },
  { name: "NodeJS", category: "backend" },
  { name: "HTML", category: "frontend" },
  { name: "Git | GitHub", category: "tools" },
  { name: "CSS", category: "frontend" },
  { name: "NLP", category: "ai" },
  { name: "Computer Vision", category: "ai" },
  { name: "Data Structures", category: "programming" },
  { name: "API", category: "backend" },
  { name: "Reinforcement Learning", category: "ai" },
  { name: "UI/UX design - Figma", category: "design" },
  { name: "Ability to Work Under Pressure", category: "soft" },
  { name: "Team Leadership", category: "soft" }
];

// Hobbies
export const HOBBIES = [
  { name: "Reading", icon: "book" },
  { name: "Podcasts", icon: "headphones" },
  { name: "Computer Hardware", icon: "cpu" },
  { name: "Football", icon: "football" },
  { name: "Pool/Snooker", icon: "circle" },
  { name: "Business Analytics", icon: "trending-up" }
];

// Languages
export const LANGUAGES = [
  { name: "English", proficiency: "Fluent" },
  { name: "Hindi", proficiency: "Native" }
];

// Soft Skills
export const SOFT_SKILLS = [
  "Adaptability",
  "Communication",
  "Problem Solving",
  "Teamwork",
  "Leadership",
  "Time Management",
  "Critical Thinking",
  "Creativity"
];

// Coding Profiles
export const CODING_PROFILES = [
  {
    platform: "LeetCode",
    username: "Ayush2554",
    url: "https://leetcode.com/u/Ayush2554",
    icon: "code"
  },
  {
    platform: "GeeksforGeeks",
    username: "ayushkumarmqxc",
    url: "https://www.geeksforgeeks.org/user/ayushkumarmqxc/",
    icon: "terminal"
  },
  {
    platform: "Kaggle",
    username: "ayushkumaryadav2394",
    url: "https://www.kaggle.com/ayushkumaryadav2394",
    icon: "bar-chart"
  }
];

// Achievements
export const ACHIEVEMENTS = [
  {
    id: "sia",
    title: "SMART INDIA Hackathon",
    period: "08/2025 - 10/2025",
    description: "Selected for the 2nd round (3 rounds) in Smart India Hackathon 2024. Our team worked on two hardware-focused projects:",
    projects: [
      "Redesigning a conventional aerospace component to enhance air vehicle efficiency",
      "Developing an AI-powered yoga mat integrated with a smartwatch for personalized health monitoring"
    ]
  },
  {
    id: "innovate",
    title: "Innovate Hackathon",
    subtitle: "Innovate by Microsoft",
    period: "01/2025 - 01/2025",
    description: "Selected in the screening round by Microsoft for the Hackathon 2025. Our project focused on developing a Smart Home Energy Monitoring System using IoT to optimize energy consumption. This, along with other innovative projects, showcased our expertise in both software and hardware solutions."
  }
];