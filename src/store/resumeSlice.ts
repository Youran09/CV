import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resume, PersonalInfo, Education, Experience, Skill, Project } from '../types/resume';

const initialState: Resume = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    linkedin: '',
    github: '',
    website: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  template: 'modern',
  color: '#3B82F6',
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.education.findIndex(edu => edu.id === action.payload.id);
      if (index !== -1) {
        state.education[index] = action.payload;
      }
    },
    deleteEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(edu => edu.id !== action.payload);
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experience.push(action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.experience.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.experience[index] = action.payload;
      }
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter(exp => exp.id !== action.payload);
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<Skill>) => {
      const index = state.skills.findIndex(skill => skill.id === action.payload.id);
      if (index !== -1) {
        state.skills[index] = action.payload;
      }
    },
    deleteSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(skill => skill.id !== action.payload);
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(proj => proj.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(proj => proj.id !== action.payload);
    },
    setTemplate: (state, action: PayloadAction<string>) => {
      state.template = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    loadResume: (state, action: PayloadAction<Resume>) => {
      return action.payload;
    },
    resetResume: () => initialState,
  },
});

export const {
  updatePersonalInfo,
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  updateExperience,
  deleteExperience,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  setTemplate,
  setColor,
  loadResume,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;