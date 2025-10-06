import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updatePersonalInfo } from '../../store/resumeSlice';
import { PersonalInfo } from '../../types/resume';

const PersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.resume.personalInfo);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    dispatch(updatePersonalInfo({
      ...personalInfo,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">个人信息</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              姓名 *
            </label>
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="张三"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              职位 *
            </label>
            <input
              type="text"
              value={personalInfo.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="高级软件工程师"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              邮箱 *
            </label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="zhangsan@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              电话 *
            </label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="138-0000-0000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            所在地 *
          </label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="北京市"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            个人简介
          </label>
          <textarea
            value={personalInfo.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="简单介绍一下自己的专业背景和职业目标..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              value={personalInfo.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <input
              type="url"
              value={personalInfo.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="github.com/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              个人网站
            </label>
            <input
              type="url"
              value={personalInfo.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="www.example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;