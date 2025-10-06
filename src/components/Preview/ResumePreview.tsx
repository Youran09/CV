import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ModernTemplate from './ModernTemplate';

const ResumePreview: React.FC = () => {
  const resume = useSelector((state: RootState) => state.resume);

  const renderTemplate = () => {
    switch (resume.template) {
      case 'modern':
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="max-w-full mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">预览</h2>
          <div className="text-sm text-gray-500">
            A4 尺寸 (210mm × 297mm)
          </div>
        </div>
        <div
          className="shadow-2xl mx-auto"
          id="resume-preview"
          style={{
            transform: 'scale(0.7)',
            transformOrigin: 'top center',
            marginBottom: '-150px'
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;