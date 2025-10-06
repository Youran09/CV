import React from 'react';
import { Resume } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

interface ModernTemplateProps {
  resume: Resume;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;

  // 按时间降序排列
  const sortedExperience = [...experience].sort((a, b) => {
    const dateA = new Date(a.startDate || '0');
    const dateB = new Date(b.startDate || '0');
    return dateB.getTime() - dateA.getTime();
  });

  const sortedEducation = [...education].sort((a, b) => {
    const dateA = new Date(a.startDate || '0');
    const dateB = new Date(b.startDate || '0');
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div
      className="bg-white"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '0',
        boxSizing: 'border-box',
        margin: '0 auto',
        fontFamily: 'Calibri, Arial, sans-serif',
        fontSize: '10pt',
        lineHeight: '1.4',
        color: '#2c3e50'
      }}
    >
      {/* Modern Header with Strategic Layout */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '25mm 20mm 15mm 20mm',
          color: 'white'
        }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1
              className="font-bold mb-2"
              style={{
                fontSize: '24pt',
                fontWeight: '700',
                letterSpacing: '0.5px',
                marginBottom: '8px'
              }}
            >
              {personalInfo.fullName || 'Full Name'}
            </h1>
            <p
              className="mb-4"
              style={{
                fontSize: '14pt',
                fontWeight: '300',
                opacity: '0.95'
              }}
            >
              {personalInfo.title || 'Professional Title'}
            </p>
          </div>

          {/* Contact Info - Right Side */}
          <div className="text-right" style={{ fontSize: '9pt', opacity: '0.9' }}>
            {personalInfo.email && (
              <div className="flex items-center justify-end gap-2 mb-1">
                <span>{personalInfo.email}</span>
                <Mail size={12} />
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-end gap-2 mb-1">
                <span>{personalInfo.phone}</span>
                <Phone size={12} />
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-2 mb-1">
                <span>{personalInfo.location}</span>
                <MapPin size={12} />
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="truncate max-w-32">
                  {personalInfo.linkedin.replace('https://', '').replace('www.', '')}
                </span>
                <Linkedin size={12} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="flex" style={{ minHeight: '200mm' }}>
        {/* Left Column - Main Content */}
        <div className="flex-1" style={{ padding: '20mm 15mm 20mm 20mm' }}>
          {/* Professional Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2
                className="font-bold mb-3"
                style={{
                  fontSize: '12pt',
                  color: '#667eea',
                  borderBottom: '2px solid #667eea',
                  paddingBottom: '4px',
                  letterSpacing: '0.5px'
                }}
              >
                PROFESSIONAL SUMMARY
              </h2>
              <p style={{ fontSize: '10pt', lineHeight: '1.6', textAlign: 'justify' }}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {sortedExperience.length > 0 && (
            <section className="mb-6">
              <h2
                className="font-bold mb-4"
                style={{
                  fontSize: '12pt',
                  color: '#667eea',
                  borderBottom: '2px solid #667eea',
                  paddingBottom: '4px',
                  letterSpacing: '0.5px'
                }}
              >
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {sortedExperience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-white"
                      style={{
                        background: '#667eea',
                        marginLeft: '-6px',
                        zIndex: 1
                      }}
                    />
                    {/* Timeline line */}
                    {index < sortedExperience.length - 1 && (
                      <div
                        className="absolute left-0 top-5 w-0.5 h-full"
                        style={{
                          background: '#e8eaed',
                          marginLeft: '-1px'
                        }}
                      />
                    )}

                    <div className="ml-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold" style={{ fontSize: '11pt', color: '#2c3e50' }}>
                            {exp.position}
                          </h3>
                          <p className="font-semibold" style={{ fontSize: '10pt', color: '#667eea' }}>
                            {exp.company}
                          </p>
                          <p style={{ fontSize: '9pt', color: '#7f8c8d' }}>
                            {exp.location}
                          </p>
                        </div>
                        <div
                          className="text-right px-3 py-1 rounded-full"
                          style={{
                            fontSize: '8pt',
                            color: '#667eea',
                            background: '#f8f9ff',
                            border: '1px solid #e8eaed'
                          }}
                        >
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {exp.description.map((desc, descIndex) => (
                          <li
                            key={descIndex}
                            className="flex items-start"
                            style={{ fontSize: '9pt', color: '#2c3e50', lineHeight: '1.5' }}
                          >
                            <span className="mr-2 mt-1" style={{ color: '#667eea' }}>▸</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h2
                className="font-bold mb-4"
                style={{
                  fontSize: '12pt',
                  color: '#667eea',
                  borderBottom: '2px solid #667eea',
                  paddingBottom: '4px',
                  letterSpacing: '0.5px'
                }}
              >
                KEY PROJECTS
              </h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="border-l-3 pl-4" style={{ borderColor: '#e8eaed' }}>
                    <h3 className="font-bold" style={{ fontSize: '10pt', color: '#2c3e50' }}>
                      {project.name}
                    </h3>
                    <p style={{ fontSize: '9pt', color: '#2c3e50', lineHeight: '1.5', marginBottom: '4px' }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full"
                          style={{
                            fontSize: '8pt',
                            background: '#f8f9ff',
                            color: '#667eea',
                            border: '1px solid #e8eaed'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <div
          className="w-1/3"
          style={{
            background: '#f8f9ff',
            padding: '20mm 15mm 20mm 15mm',
            borderLeft: '3px solid #667eea'
          }}
        >
          {/* Education */}
          {sortedEducation.length > 0 && (
            <section className="mb-6">
              <h2
                className="font-bold mb-4"
                style={{
                  fontSize: '11pt',
                  color: '#2c3e50',
                  letterSpacing: '0.5px'
                }}
              >
                EDUCATION
              </h2>
              <div className="space-y-3">
                {sortedEducation.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold" style={{ fontSize: '9pt', color: '#2c3e50' }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: '9pt', color: '#667eea', fontWeight: '600' }}>
                      {edu.field}
                    </p>
                    <p style={{ fontSize: '8pt', color: '#7f8c8d' }}>
                      {edu.school}
                    </p>
                    <p style={{ fontSize: '8pt', color: '#7f8c8d' }}>
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                    {edu.description && (
                      <p style={{ fontSize: '8pt', color: '#2c3e50', marginTop: '4px' }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2
                className="font-bold mb-4"
                style={{
                  fontSize: '11pt',
                  color: '#2c3e50',
                  letterSpacing: '0.5px'
                }}
              >
                CORE COMPETENCIES
              </h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <h3
                      className="font-semibold mb-2"
                      style={{ fontSize: '9pt', color: '#667eea' }}
                    >
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded"
                          style={{
                            fontSize: '8pt',
                            background: 'white',
                            color: '#2c3e50',
                            border: '1px solid #e8eaed'
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact Links */}
          {(personalInfo.github || personalInfo.website) && (
            <section>
              <h2
                className="font-bold mb-3"
                style={{
                  fontSize: '11pt',
                  color: '#2c3e50',
                  letterSpacing: '0.5px'
                }}
              >
                LINKS
              </h2>
              <div className="space-y-2">
                {personalInfo.github && (
                  <div className="flex items-center gap-2">
                    <Github size={12} style={{ color: '#667eea' }} />
                    <span style={{ fontSize: '8pt', color: '#2c3e50' }}>
                      {personalInfo.github.replace('https://', '')}
                    </span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={12} style={{ color: '#667eea' }} />
                    <span style={{ fontSize: '8pt', color: '#2c3e50' }}>
                      {personalInfo.website.replace('https://', '')}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;