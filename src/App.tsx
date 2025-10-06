import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PersonalInfoForm from './components/Editor/PersonalInfoForm';
import EducationForm from './components/Editor/EducationForm';
import ExperienceForm from './components/Editor/ExperienceForm';
import SkillsForm from './components/Editor/SkillsForm';
import ProjectsForm from './components/Editor/ProjectsForm';
import QuickImport from './components/Import/QuickImport';
import JobOptimizer from './components/AI/JobOptimizer';
import ResumePreview from './components/Preview/ResumePreview';
import { FileDown, Save, RotateCcw, Eye, Edit, Upload, Sparkles, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { exportToPDF } from './utils/exportPDF';
import { useAutoSave } from './hooks/useAutoSave';

function AppContent() {
  const [activeTab, setActiveTab] = useState('editor');
  const [activeEditorTab, setActiveEditorTab] = useState('edit');
  const [showAutoSaveNotice, setShowAutoSaveNotice] = useState(false);
  const resume = useSelector((state: RootState) => state.resume);
  const { loadAutoSave } = useAutoSave();

  // 检查是否有自动保存的数据
  useEffect(() => {
    const autoSaveData = loadAutoSave();
    if (autoSaveData && autoSaveData.isRecent) {
      setShowAutoSaveNotice(true);
    }
  }, []);

  const handleLoadAutoSave = () => {
    const autoSaveData = loadAutoSave();
    if (autoSaveData) {
      store.dispatch({ type: 'resume/loadResume', payload: autoSaveData.data });
      setShowAutoSaveNotice(false);
      alert('自动保存的数据已恢复！');
    }
  };

  const handleSave = () => {
    localStorage.setItem('resume', JSON.stringify(resume));
    alert('简历已保存到本地！');
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('resume');
    if (saved) {
      const resume = JSON.parse(saved);
      store.dispatch({ type: 'resume/loadResume', payload: resume });
      alert('简历已加载！');
    } else {
      alert('没有找到保存的简历！');
    }
  };

  const handleReset = () => {
    if (window.confirm('确定要重置所有内容吗？')) {
      store.dispatch({ type: 'resume/resetResume' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Auto-save Notice */}
      {showAutoSaveNotice && (
        <div className="bg-blue-50 border-b border-blue-200 p-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-700">
                <Clock size={18} />
                <span className="text-sm">发现自动保存的简历数据，是否恢复？</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleLoadAutoSave}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                >
                  恢复数据
                </button>
                <button
                  onClick={() => setShowAutoSaveNotice(false)}
                  className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                >
                  忽略
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">简历生成器</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Save size={18} />
                保存
              </button>
              <button
                onClick={handleLoad}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <FileDown size={18} />
                加载
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                <FileDown size={18} />
                导出PDF
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <RotateCcw size={18} />
                重置
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 py-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'editor'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Edit size={18} />
              编辑
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'preview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Eye size={18} />
              预览
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Editor Panel */}
          <div className={`${activeTab === 'editor' ? 'block' : 'hidden'} lg:block`}>
            {/* Editor Tab Switcher */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveEditorTab('edit')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeEditorTab === 'edit'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Edit size={18} />
                  编辑简历
                </button>
                <button
                  onClick={() => setActiveEditorTab('import')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeEditorTab === 'import'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Upload size={18} />
                  快速导入
                </button>
                <button
                  onClick={() => setActiveEditorTab('optimize')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeEditorTab === 'optimize'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Sparkles size={18} />
                  AI优化
                </button>
              </div>
            </div>

            {/* Editor Content */}
            {activeEditorTab === 'edit' && (
              <div className="space-y-6">
                <PersonalInfoForm />
                <ExperienceForm />
                <EducationForm />
                <SkillsForm />
                <ProjectsForm />
              </div>
            )}

            {activeEditorTab === 'import' && <QuickImport />}

            {activeEditorTab === 'optimize' && <JobOptimizer />}
          </div>

          {/* Preview Panel */}
          <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-8">
              <ResumePreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;