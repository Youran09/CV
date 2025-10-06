import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addProject, updateProject, deleteProject } from '../../store/resumeSlice';
import { Project } from '../../types/resume';
import { Plus, Edit2, Trash2, X, Check, PlusCircle, MinusCircle } from 'lucide-react';

const ProjectsForm: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.resume.projects);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    id: '',
    name: '',
    description: '',
    technologies: [],
    link: '',
    github: '',
  });
  const [techInput, setTechInput] = useState('');

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
    });
    setTechInput('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (editingId) {
      dispatch(updateProject({ ...formData, id: editingId }));
    } else {
      dispatch(addProject({ ...formData, id: Date.now().toString() }));
    }
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProject(id));
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">项目经历</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            添加项目
          </button>
        )}
      </div>

      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                项目名称 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="在线简历生成器"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                项目描述 *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="详细描述项目功能、你的贡献和取得的成果..."
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  技术栈 *
                </label>
                <button
                  onClick={addTechnology}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm"
                >
                  <PlusCircle size={18} />
                  添加技术
                </button>
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, TypeScript, Node.js..."
                />
                <button
                  onClick={addTechnology}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  添加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(index)}
                      className="ml-1 hover:text-blue-600"
                    >
                      <X size={16} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  项目链接
                </label>
                <input
                  type="url"
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub 链接
                </label>
                <input
                  type="url"
                  value={formData.github || ''}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.description || formData.technologies.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={20} />
              保存
            </button>
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              <X size={20} />
              取消
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>
                <p className="text-gray-600 mt-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.link || project.github) && (
                  <div className="flex flex-wrap gap-4 text-sm text-blue-600 mt-3">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        🔗 项目链接
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        📱 GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;