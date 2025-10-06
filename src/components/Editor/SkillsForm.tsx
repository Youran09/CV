import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addSkill, updateSkill, deleteSkill } from '../../store/resumeSlice';
import { Skill } from '../../types/resume';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.resume.skills);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Skill>({
    id: '',
    category: '',
    items: [],
  });
  const [itemInput, setItemInput] = useState('');

  const resetForm = () => {
    setFormData({
      id: '',
      category: '',
      items: [],
    });
    setItemInput('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (editingId) {
      dispatch(updateSkill({ ...formData, id: editingId }));
    } else {
      dispatch(addSkill({ ...formData, id: Date.now().toString() }));
    }
    resetForm();
  };

  const handleEdit = (skill: Skill) => {
    setFormData(skill);
    setEditingId(skill.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSkill(id));
  };

  const addItem = () => {
    if (itemInput.trim()) {
      setFormData({
        ...formData,
        items: [...formData.items, itemInput.trim()],
      });
      setItemInput('');
    }
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">技能</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            添加技能类别
          </button>
        )}
      </div>

      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              技能类别 *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="编程语言 / 框架 / 工具 / 其他"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              技能项目 *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入技能名称，按回车添加"
              />
              <button
                onClick={addItem}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                添加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.items.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {item}
                  <button
                    onClick={() => removeItem(index)}
                    className="ml-1 hover:text-blue-600"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!formData.category || formData.items.length === 0}
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
        {skills.map((skill) => (
          <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
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

export default SkillsForm;