import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addExperience, updateExperience, deleteExperience } from '../../store/resumeSlice';
import { Experience } from '../../types/resume';
import { Plus, Edit2, Trash2, X, Check, PlusCircle, MinusCircle } from 'lucide-react';

const ExperienceForm: React.FC = () => {
  const dispatch = useDispatch();
  const experience = useSelector((state: RootState) => state.resume.experience);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Experience>({
    id: '',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    location: '',
    description: [''],
  });

  const resetForm = () => {
    setFormData({
      id: '',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: [''],
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    const filteredDescription = formData.description.filter(desc => desc.trim() !== '');
    if (editingId) {
      dispatch(updateExperience({ ...formData, description: filteredDescription, id: editingId }));
    } else {
      dispatch(addExperience({ ...formData, description: filteredDescription, id: Date.now().toString() }));
    }
    resetForm();
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteExperience(id));
  };

  const addDescriptionItem = () => {
    setFormData({
      ...formData,
      description: [...formData.description, ''],
    });
  };

  const removeDescriptionItem = (index: number) => {
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index),
    });
  };

  const updateDescriptionItem = (index: number, value: string) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData({ ...formData, description: newDescription });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">工作经历</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            添加工作经历
          </button>
        )}
      </div>

      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                公司名称 *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="阿里巴巴"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                职位 *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="高级前端工程师"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                工作地点 *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="北京"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  开始时间 *
                </label>
                <input
                  type="month"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  结束时间
                </label>
                <input
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  disabled={formData.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: '' })}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">目前在职</span>
            </label>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                工作内容 *
              </label>
              <button
                onClick={addDescriptionItem}
                className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm"
              >
                <PlusCircle size={18} />
                添加一项
              </button>
            </div>
            <div className="space-y-2">
              {formData.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => updateDescriptionItem(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="描述你的工作职责和成就..."
                  />
                  {formData.description.length > 1 && (
                    <button
                      onClick={() => removeDescriptionItem(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <MinusCircle size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
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
        {experience.map((exp) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{exp.position}</h3>
                <p className="text-gray-600">{exp.company} · {exp.location}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? '至今' : exp.endDate}
                </p>
                <ul className="mt-2 space-y-1">
                  {exp.description.map((desc, index) => (
                    <li key={index} className="text-gray-600 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
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

export default ExperienceForm;