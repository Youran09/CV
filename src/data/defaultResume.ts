import { Resume } from '../types/resume';

export const defaultResumeData: Resume = {
  personalInfo: {
    fullName: 'Youran Tao Jensen',
    title: 'Full Stack Engineer',
    email: 'youran0909@hotmail.com',
    phone: '+45-53805209',
    location: 'Copenhagen N, 2200',
    linkedin: 'https://www.linkedin.com/in/youran-tao-jensen-9aa86ba6/',
    github: '',
    website: '',
    summary: 'Dynamic Full-Stack Engineer with over 2 years of hands-on experience in software development and data analysis. Skilled in building scalable web applications and automating workflows using AI technologies. Passionate about creating intelligent, user-centric solutions. Achievements include winning 1st place in the China-ASEAN AI Tourism Innovation Competition and leading an AI-driven smart tourism project from concept to deployment. I thrive in fast-paced startup environments where I can take ownership, learn continuously, and help shape product and engineering culture.'
  },
  experience: [
    {
      id: '1',
      position: 'Student worker in IT',
      company: 'SOS International',
      location: 'Copenhagen',
      startDate: '2023-01',
      endDate: '2024-08',
      current: false,
      description: [
        'Automated daily Excel processes using VBA, significantly reducing manual workload and enhancing cross-team efficiency',
        'Engineered dynamic Power BI dashboards, delivering clear and actionable performance insights to executives',
        'Collected and transformed data from multiple sources, ensuring quality and consistency in reporting'
      ]
    },
    {
      id: '2',
      position: 'Student worker in Business Strategy',
      company: 'RGS Nordic',
      location: 'Copenhagen',
      startDate: '2021-01',
      endDate: '2022-12',
      current: false,
      description: [
        'Devised SQL-based applications and Power BI reports to optimise business data workflows',
        'Developed comprehensive data models and visualisations, enhancing leadership\'s understanding of business performance',
        'Conducted analyses that informed strategic planning and operational decisions'
      ]
    },
    {
      id: '3',
      position: 'Internship in International and Border Trade',
      company: 'Guangxi Jingxi Full Rich Investment Co., Ltd.',
      location: 'Jingxi, China',
      startDate: '2019-01',
      endDate: '2019-12',
      current: false,
      description: [
        'Oversaw reporting and compliance for international trade operations at the China–Vietnam border',
        'Collaborated with customs and authorities to facilitate smooth, data-driven documentation processes'
      ]
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of Copenhagen',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2023-08',
      endDate: '',
      current: true,
      description: 'GPA: 3.5/4 - Master\'s Thesis: Coral Image Segmentation Using Deep Learning'
    },
    {
      id: '2',
      school: 'Hong Kong University of Science and Technology',
      degree: 'Master of Science',
      field: 'Computer Engineering Exchange',
      startDate: '2024-08',
      endDate: '2025-01',
      current: false,
      description: 'GPA: 3.425/4 - T&M Corporate Consulting Project: Meta LLM for Digital Transformation of Viu International'
    },
    {
      id: '3',
      school: 'University of Copenhagen',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2020-08',
      endDate: '2023-06',
      current: false,
      description: 'GPA: 3.19/4 - Bachelor\'s Thesis: Whale Localization Tracking - Spatial Distribution Analysis Using Ripley-K Function'
    },
    {
      id: '4',
      school: 'Copenhagen Business School',
      degree: 'Bachelor of Science',
      field: 'International Business in Asia',
      startDate: '2018-08',
      endDate: '2019-12',
      current: false,
      description: 'GPA: 3.59/4'
    }
  ],
  skills: [
    {
      id: '1',
      category: 'Programming Languages',
      items: ['Python', 'JavaScript', 'TypeScript']
    },
    {
      id: '2',
      category: 'Web Technologies',
      items: ['React', 'Next.js', 'Node.js', 'HTML', 'CSS']
    },
    {
      id: '3',
      category: 'Databases',
      items: ['SQL', 'MongoDB', 'PostgreSQL']
    },
    {
      id: '4',
      category: 'Tools',
      items: ['Git', 'Docker', 'Figma', 'Power BI', 'Excel VBA']
    },
    {
      id: '5',
      category: 'AI/ML',
      items: ['Machine Learning', 'NLP', 'Deep Learning']
    },
    {
      id: '6',
      category: 'Business',
      items: ['Strategic Planning', 'Data Analysis', 'Project Management']
    },
    {
      id: '7',
      category: 'Soft Skills',
      items: ['Communication', 'Collaboration', 'Teamwork', 'Independent', 'Problem-solving']
    },
    {
      id: '8',
      category: 'Languages',
      items: ['Danish', 'English', 'Chinese']
    }
  ],
  projects: [],
  template: 'modern',
  color: '#667eea'
};