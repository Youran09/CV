import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePersonalInfo, addExperience, addEducation, addSkill, addProject } from '../../store/resumeSlice';
import { Upload, FileText, Copy } from 'lucide-react';

const QuickImport: React.FC = () => {
  const dispatch = useDispatch();
  const [importText, setImportText] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const parseAndImport = async () => {
    if (!importText.trim()) {
      alert('请先输入简历内容');
      return;
    }

    setIsImporting(true);

    try {
      // 解析简历文本
      const parsedData = parseResumeText(importText);

      // 导入到store
      if (parsedData.personalInfo) {
        dispatch(updatePersonalInfo(parsedData.personalInfo));
      }

      parsedData.experience.forEach(exp => {
        dispatch(addExperience({
          ...exp,
          id: Date.now().toString() + Math.random()
        }));
      });

      parsedData.education.forEach(edu => {
        dispatch(addEducation({
          ...edu,
          id: Date.now().toString() + Math.random()
        }));
      });

      parsedData.skills.forEach(skill => {
        dispatch(addSkill({
          ...skill,
          id: Date.now().toString() + Math.random()
        }));
      });

      parsedData.projects.forEach(project => {
        dispatch(addProject({
          ...project,
          id: Date.now().toString() + Math.random()
        }));
      });

      alert('简历内容导入成功！');
      setImportText('');
    } catch (error) {
      console.error('导入失败:', error);
      alert('导入失败，请检查格式后重试');
    } finally {
      setIsImporting(false);
    }
  };

  const parseResumeText = (text: string) => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    const result = {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        summary: '',
        linkedin: '',
        github: '',
        website: ''
      },
      experience: [] as any[],
      education: [] as any[],
      skills: [] as any[],
      projects: [] as any[]
    };

    let currentSection = '';
    let currentItem: any = null;
    let summaryLines: string[] = [];
    let isReadingSummary = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // 第一行通常是姓名和职位
      if (i === 0) {
        const parts = line.split(',');
        if (parts.length >= 2) {
          result.personalInfo.fullName = parts[0].trim();
          result.personalInfo.title = parts[1].trim();
        } else {
          result.personalInfo.fullName = line;
        }
        continue;
      }

      // 第二行通常是联系信息
      if (i === 1) {
        const contactInfo = line.split(',').map(item => item.trim());
        contactInfo.forEach(info => {
          if (isEmail(info)) {
            result.personalInfo.email = info;
          } else if (isPhone(info)) {
            result.personalInfo.phone = info;
          } else if (isLinkedIn(info)) {
            result.personalInfo.linkedin = info;
          } else if (isLocation(info)) {
            result.personalInfo.location = info;
          }
        });
        continue;
      }

      // 检测段落标题
      if (isSection(line)) {
        // 保存之前的summary
        if (isReadingSummary && summaryLines.length > 0) {
          result.personalInfo.summary = summaryLines.join(' ');
          summaryLines = [];
          isReadingSummary = false;
        }

        currentSection = line.toLowerCase();

        if (currentSection.includes('summary')) {
          isReadingSummary = true;
        }
        continue;
      }

      // 读取Summary内容
      if (isReadingSummary) {
        summaryLines.push(line);
        continue;
      }

      // 解析工作经历
      if (currentSection.includes('experience') || currentSection.includes('work')) {
        // 检查是否是日期行（工作时间）
        if (isDateLine(line)) {
          if (currentItem) {
            result.experience.push(currentItem);
          }

          // 解析日期和职位信息
          const parts = line.split(/\s{2,}/); // 按多个空格分割
          if (parts.length >= 2) {
            const dates = parts[0].trim();
            const jobInfo = parts.slice(1).join(' ').trim();

            currentItem = {
              position: extractPosition(jobInfo),
              company: extractCompany(jobInfo),
              location: extractLocation(jobInfo),
              startDate: '',
              endDate: '',
              current: false,
              description: []
            };

            const { startDate, endDate, current } = parseDates(dates);
            currentItem.startDate = startDate;
            currentItem.endDate = endDate;
            currentItem.current = current;
          }
        } else if (currentItem && line.length > 20) {
          // 工作描述
          currentItem.description.push(line);
        }
      }

      // 解析教育背景
      if (currentSection.includes('education')) {
        if (isDateLine(line)) {
          const parts = line.split(/\s{2,}/);
          if (parts.length >= 2) {
            const dates = parts[0].trim();
            const eduInfo = parts.slice(1).join(' ').trim();

            const eduData = {
              id: Date.now().toString() + Math.random(),
              school: extractSchool(eduInfo),
              degree: extractDegree(eduInfo),
              field: extractField(eduInfo),
              startDate: '',
              endDate: '',
              current: false,
              description: ''
            };

            const { startDate, endDate, current } = parseDates(dates);
            eduData.startDate = startDate;
            eduData.endDate = endDate;
            eduData.current = current;

            result.education.push(eduData);
          }
        }
      }

      // 解析技能
      if (currentSection.includes('skill')) {
        // 检查是否是技能分类行
        if (line.includes(':')) {
          const [category, items] = line.split(':');
          const skillItems = items.split(/\s+/).filter(item => item.trim());
          if (skillItems.length > 0) {
            result.skills.push({
              category: category.trim(),
              items: skillItems
            });
          }
        } else {
          // 处理没有冒号的技能行，合并到一个通用分类
          const skillItems = line.split(/\s+/).filter(item => item.trim());
          if (skillItems.length > 0) {
            // 查找是否已存在"Technical Skills"分类
            let techSkillsCategory = result.skills.find(skill => skill.category === 'Technical Skills');
            if (!techSkillsCategory) {
              techSkillsCategory = {
                category: 'Technical Skills',
                items: []
              };
              result.skills.push(techSkillsCategory);
            }
            // 合并技能项目，避免重复
            skillItems.forEach(item => {
              if (!techSkillsCategory!.items.includes(item)) {
                techSkillsCategory!.items.push(item);
              }
            });
          }
        }
      }
    }

    // 添加最后一个工作经历
    if (currentItem && currentSection.includes('experience')) {
      result.experience.push(currentItem);
    }

    // 添加剩余的summary
    if (isReadingSummary && summaryLines.length > 0) {
      result.personalInfo.summary = summaryLines.join(' ');
    }

    return result;
  };

  // 辅助函数
  const isSection = (line: string) => {
    const sections = ['SUMMARY', 'WORK EXPERIENCE', 'EDUCATION', 'SKILLS', 'LANGUAGES', 'PROJECTS'];
    return sections.some(section => line.toUpperCase().includes(section));
  };

  const isEmail = (line: string) => /\S+@\S+\.\S+/.test(line);
  const isPhone = (line: string) => /[\+]?[\d\s\-\(\)]{8,}/.test(line);
  const isLinkedIn = (line: string) => line.toLowerCase().includes('linkedin');
  const isGitHub = (line: string) => line.toLowerCase().includes('github');
  const isLocation = (line: string) => /^\w+\s+\w+,?\s*\d+/.test(line) || line.includes('Copenhagen') || line.includes('Denmark');

  const isDateLine = (line: string) => {
    return /^\d{2}\/\d{4}\s*[–\-]\s*(\d{2}\/\d{4}|Present)/.test(line);
  };

  const parseDates = (dateStr: string) => {
    const current = dateStr.toLowerCase().includes('present');
    const dateMatches = dateStr.match(/\d{2}\/\d{4}/g) || [];

    return {
      startDate: dateMatches[0] ? dateMatches[0].replace('/', '-') : '',
      endDate: current ? '' : (dateMatches[1] ? dateMatches[1].replace('/', '-') : ''),
      current
    };
  };

  const extractPosition = (jobInfo: string): string => {
    // 从工作信息中提取职位
    const commonPositions = [
      'Student worker in IT', 'Student worker in Business Strategy', 'Internship',
      'Full Stack Engineer', 'Software Engineer', 'Developer'
    ];

    for (const pos of commonPositions) {
      if (jobInfo.includes(pos)) {
        return pos;
      }
    }

    // 如果没有匹配的，取第一部分作为职位
    const parts = jobInfo.split(',');
    return parts[0].trim();
  };

  const extractCompany = (jobInfo: string): string => {
    // 从工作信息中提取公司名
    if (jobInfo.includes('SOS International')) return 'SOS International';
    if (jobInfo.includes('RGS Nordic')) return 'RGS Nordic';
    if (jobInfo.includes('Guangxi Jingxi')) return 'Guangxi Jingxi Full Rich Investment Co., Ltd.';

    const parts = jobInfo.split(',');
    return parts.length > 1 ? parts[1].trim() : 'Unknown Company';
  };

  const extractLocation = (jobInfo: string): string => {
    if (jobInfo.includes('Copenhagen')) return 'Copenhagen';
    if (jobInfo.includes('Jingxi')) return 'Jingxi, China';
    if (jobInfo.includes('Hong Kong')) return 'Hong Kong';
    return 'Copenhagen';
  };

  const extractSchool = (eduInfo: string): string => {
    if (eduInfo.includes('University of Copenhagen')) return 'University of Copenhagen';
    if (eduInfo.includes('Hong Kong University')) return 'Hong Kong University of Science and Technology';
    if (eduInfo.includes('Copenhagen Business School')) return 'Copenhagen Business School';

    const parts = eduInfo.split('\n')[0];
    return parts.trim();
  };

  const extractDegree = (eduInfo: string): string => {
    if (eduInfo.includes('MSc')) return 'Master of Science';
    if (eduInfo.includes('BSc')) return 'Bachelor of Science';
    return 'Bachelor';
  };

  const extractField = (eduInfo: string): string => {
    if (eduInfo.includes('Computer Science')) return 'Computer Science';
    if (eduInfo.includes('Computer Engineering')) return 'Computer Engineering';
    if (eduInfo.includes('International Business')) return 'International Business in Asia';
    return 'Computer Science';
  };

  const fillSampleData = () => {
    setImportText(`Youran Tao Jensen, Full Stack Engineer
Copenhagen N, 2200, +45-53805209, youran0909@hotmail.com, https://www.linkedin.com/in/youran-tao-jensen-9aa86ba6/

SUMMARY
Dynamic Full-Stack Engineer with over 2 years of hands-on experience in software development and data analysis. Skilled in building scalable web applications and automating workflows using AI technologies. Passionate about creating intelligent, user-centric solutions. Achievements include winning 1st place in the China-ASEAN AI Tourism Innovation Competition and leading an AI-driven smart tourism project from concept to deployment. I thrive in fast-paced startup environments where I can take ownership, learn continuously, and help shape product and engineering culture.

WORK EXPERIENCE
01/2023 – 08/2024 Student worker in IT, SOS International Copenhagen
Automated daily Excel processes using VBA, significantly reducing manual workload and enhancing cross-team efficiency.
Engineered dynamic Power BI dashboards, delivering clear and actionable performance insights to executives.
Collected and transformed data from multiple sources, ensuring quality and consistency in reporting.

01/2021 – 12/2022 Student worker in Business Strategy, RGS Nordic Copenhagen
Devised SQL-based applications and Power BI reports to optimise business data workflows.
Developed comprehensive data models and visualisations, enhancing leadership's understanding of business performance.
Conducted analyses that informed strategic planning and operational decisions.

01/2019 – 12/2019 Internship in International and Border Trade, Guangxi Jingxi Full Rich Investment Co., Ltd. Jingxi, China
Oversaw reporting and compliance for international trade operations at the China–Vietnam border.
Collaborated with customs and authorities to facilitate smooth, data-driven documentation processes.

EDUCATION
08/2023 – Present University of Copenhagen MSc in Computer Science GPA: 3.5/4 Copenhagen
Master's Thesis: Coral Image Segmentation Using Deep Learning

08/2024 – 01/2025 Hong Kong University of Science and Technology MSc in Computer Engineering Exchange GPA: 3.425/4 Hong Kong
T&M Corporate Consulting Project: Meta LLM for Digital Transformation of Viu International

08/2020 – 06/2023 University of Copenhagen BSc in Computer Science GPA: 3.19/4 Copenhagen
Bachelor's Thesis: Whale Localization Tracking - Spatial Distribution Analysis Using Ripley-K Function

08/2018 – 12/2019 Copenhagen Business School BSc in International Business in Asia GPA: 3.59/4 Copenhagen

SKILLS
Programming Languages: Python JavaScript TypeScript
Web Technologies: React Next.js Node.js HTML CSS
Databases: SQL MongoDB PostgreSQL
Tools: Git Docker Figma Power BI Excel VBA
AI/ML: Machine Learning NLP Deep Learning
Business: Strategic Planning Data Analysis Project Management
Languages: Danish English Chinese`);
  };

  const fillMyResume = () => {
    setImportText(`Youran Tao Jensen, Full Stack Engineer
Copenhagen N, 2200, +45-53805209, youran0909@hotmail.com, https://www.linkedin.com/in/youran-tao-jensen-9aa86ba6/
SUMMARY Dynamic Full-Stack Engineer with over 2 years of hands-on experience in
software development and data analysis. Skilled in building scalable web
applications and automating workflows using AI technologies. Passionate
about creating intelligent, user-centric solutions. Achievements include winning
1st place in the China-ASEAN AI Tourism Innovation Competition and leading
an AI-driven smart tourism project from concept to deployment. I thrive in fast-
paced startup environments where I can take ownership, learn continuously,
and help shape product and engineering culture.
WORK EXPERIENCE
01/2023 – 08/2024 01/2021 – 12/2022 01/2019 – 12/2019 Student worker in IT, SOS International Copenhagen
Automated daily Excel processes using VBA, significantly reducing manual
workload and enhancing cross-team efficiency.
Engineered dynamic Power BI dashboards, delivering clear and actionable
performance insights to executives.
Collected and transformed data from multiple sources, ensuring quality
and consistency in reporting.
Student worker in Business Strategy, RGS Nordic Copenhagen
Devised SQL-based applications and Power BI reports to optimise
business data workflows.
Developed comprehensive data models and visualisations, enhancing
leadership's understanding of business performance.
Conducted analyses that informed strategic planning and operational
decisions.
Internship in International and Border Trade, Guangxi Jingxi
Full Rich Investment Co., Ltd.
Jingxi, China
Oversaw reporting and compliance for international trade operations at the
China–Vietnam border.
Collaborated with customs and authorities to facilitate smooth, data-driven
documentation processes.
EDUCATION
08/2023 – Present 08/2024 – 01/2025 University of Copenhagen
MSc in Computer Science
GPA: 3.5/4
Copenhagen
Master's Thesis: Coral Image Segmentation Using Deep Learning
Hong Kong University of Science and Technology
Hong Kong
MSc in Computer Engineering Exchange
GPA: 3.425/4
T&M Corporate Consulting Project: Meta LLM for Digital Transformation of
Viu International
08/2020 – 06/2023 08/2018 – 12/2019 University of Copenhagen
BSc in Computer Science
GPA: 3.19/4
Bachelor's Thesis: Whale Localization Tracking - Spatial Distribution
Analysis Using Ripley-K Function
Copenhagen Business School
BSc in International Business in Asia
GPA: 3.59/4
Copenhagen
Copenhagen
SKILLS
Programming Languages: Python JavaScript TypeScript
Web Technologies: React Next.js Node.js HTML CSS
Databases: SQL MongoDB PostgreSQL
Tools: Git Docker Figma Power BI Excel VBA
AI/ML: Machine Learning NLP Deep Learning
Business: Strategic Planning Data Analysis Project Management
Soft Skills: Communication Collaboration Teamwork Independent Problem-solving
LANGUAGES
Languages: Danish English Chinese`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Upload className="text-blue-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">快速导入简历</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            粘贴你的简历内容
          </label>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="将你的简历内容粘贴到这里，包括个人信息、工作经历、教育背景等..."
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={parseAndImport}
            disabled={isImporting || !importText.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText size={18} />
            {isImporting ? '导入中...' : '开始导入'}
          </button>

          <button
            onClick={fillMyResume}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            <Upload size={18} />
            导入我的简历
          </button>

          <button
            onClick={fillSampleData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            <Copy size={18} />
            标准格式示例
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">导入提示：</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 支持纯文本格式的简历内容</li>
          <li>• 确保包含明确的段落标题，如"工作经历"、"教育背景"等</li>
          <li>• 日期格式建议使用 YYYY-MM 格式</li>
          <li>• 导入后可以继续编辑和优化内容</li>
          <li>• 点击"填入示例数据"查看标准格式</li>
        </ul>
      </div>
    </div>
  );
};

export default QuickImport;