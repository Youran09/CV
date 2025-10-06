import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addEducation, updateEducation, deleteEducation } from '../../store/resumeSlice';
import { Education } from '../../types/resume';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const EducationForm: React.FC = () => {
  const dispatch = useDispatch();
  const education = useSelector((state: RootState) => state.resume.education);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Education>({
    id: '',
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const resetForm = () => {
    setFormData({
      id: '',
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (editingId) {
      dispatch(updateEducation({ ...formData, id: editingId }));
    } else {
      dispatch(addEducation({ ...formData, id: Date.now().toString() }));
    }
    resetForm();
  };

  const handleEdit = (edu: Education) => {
    setFormData(edu);
    setEditingId(edu.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteEducation(id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">教育背景</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            添加教育经历
          </button>
        )}
      </div>

      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                学校名称 *
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="清华大学"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                学位 *
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="学士/硕士/博士"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                专业 *
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="计算机科学与技术"
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
              <span className="text-sm font-medium text-gray-700">目前在读</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              描述（可选）
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="主要成绩、获奖情况等..."
            />
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
        {education.map((edu) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{edu.school}</h3>
                <p className="text-gray-600">{edu.degree} - {edu.field}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.current ? '至今' : edu.endDate}
                </p>
                {edu.description && (
                  <p className="mt-2 text-gray-600">{edu.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
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

export default EducationForm;