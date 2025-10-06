import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '../../types/resume';

Font.register({
  family: 'Noto Sans SC',
  src: 'https://fonts.gstatic.com/s/notosanssc/v26/k3kXo84MPvpLmixcA63oeALhL4iJ-Q7m8w.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Noto Sans SC',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #333',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#666',
    gap: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottom: '1px solid #ddd',
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
  },
  itemDate: {
    fontSize: 9,
    color: '#666',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333',
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    width: 80,
  },
  skillItems: {
    fontSize: 10,
    flex: 1,
  },
});

interface ResumePDFProps {
  resume: Resume;
}

const ResumePDF: React.FC<ResumePDFProps> = ({ resume }) => {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || '姓名'}</Text>
          <Text style={styles.title}>{personalInfo.title || '职位'}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
            {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
            {personalInfo.github && <Text>{personalInfo.github}</Text>}
            {personalInfo.website && <Text>{personalInfo.website}</Text>}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>个人简介</Text>
            <Text style={styles.description}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>工作经历</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemSubtitle}>
                      {exp.company} · {exp.location}
                    </Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {exp.startDate} - {exp.current ? '至今' : exp.endDate}
                  </Text>
                </View>
                {exp.description.map((desc, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {desc}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>教育背景</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.experienceItem}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{edu.school}</Text>
                    <Text style={styles.itemSubtitle}>
                      {edu.degree} · {edu.field}
                    </Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {edu.startDate} - {edu.current ? '至今' : edu.endDate}
                  </Text>
                </View>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>技能</Text>
            {skills.map((skill) => (
              <View key={skill.id} style={styles.skillRow}>
                <Text style={styles.skillCategory}>{skill.category}:</Text>
                <Text style={styles.skillItems}>{skill.items.join(' · ')}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>项目经历</Text>
            {projects.map((project) => (
              <View key={project.id} style={styles.experienceItem}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                <Text style={styles.description}>{project.description}</Text>
                <Text style={styles.itemSubtitle}>
                  技术栈: {project.technologies.join(', ')}
                </Text>
                {project.link && (
                  <Text style={styles.itemSubtitle}>链接: {project.link}</Text>
                )}
                {project.github && (
                  <Text style={styles.itemSubtitle}>GitHub: {project.github}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;