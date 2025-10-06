import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updatePersonalInfo, updateExperience, updateEducation, updateSkill } from '../../store/resumeSlice';
import { Sparkles, Copy, RotateCcw } from 'lucide-react';

const JobOptimizer: React.FC = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: RootState) => state.resume);
  const [jobDescription, setJobDescription] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedContent, setOptimizedContent] = useState<any>(null);

  const optimizeForJob = async () => {
    if (!jobDescription.trim()) {
      alert('请先输入工作描述');
      return;
    }

    setIsOptimizing(true);

    try {
      // 这里可以集成真实的AI API，现在先用模拟优化
      const optimized = simulateAIOptimization(resume, jobDescription);
      setOptimizedContent(optimized);
    } catch (error) {
      console.error('优化失败:', error);
      alert('优化失败，请重试');
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyOptimization = () => {
    if (!optimizedContent) return;

    // 应用优化后的内容
    if (optimizedContent.personalInfo) {
      dispatch(updatePersonalInfo(optimizedContent.personalInfo));
    }

    alert('AI优化已应用到简历！');
    setOptimizedContent(null);
  };

  const simulateAIOptimization = (currentResume: any, jobDesc: string) => {
    // 模拟AI优化逻辑
    const jobKeywords = extractKeywords(jobDesc);

    return {
      personalInfo: {
        ...currentResume.personalInfo,
        summary: optimizeSummary(currentResume.personalInfo.summary, jobKeywords)
      },
      suggestions: [
        `根据职位要求，建议在个人简介中突出 ${jobKeywords.slice(0, 3).join('、')} 相关经验`,
        '建议调整工作经历描述，更多体现量化成果',
        '技能部分可以突出与目标职位匹配的技术栈'
      ]
    };
  };

  const extractKeywords = (text: string): string[] => {
    // 简单的关键词提取逻辑
    const commonKeywords = [
      'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java',
      'AWS', 'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum',
      '团队合作', '项目管理', '数据分析', '用户体验', '性能优化'
    ];

    return commonKeywords.filter(keyword =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const optimizeSummary = (currentSummary: string, keywords: string[]): string => {
    if (!currentSummary) return currentSummary;

    // 模拟AI优化个人简介
    const keywordString = keywords.slice(0, 3).join('、');
    return `${currentSummary} 具备丰富的${keywordString}经验，能够快速适应新环境并推动项目成功。`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-purple-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">AI 职位匹配优化</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            目标职位描述 *
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="请粘贴完整的工作职位描述，包括职责要求、技能要求等..."
          />
        </div>

        <button
          onClick={optimizeForJob}
          disabled={isOptimizing || !jobDescription.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={20} />
          {isOptimizing ? 'AI正在分析优化...' : '开始AI优化'}
        </button>

        {optimizedContent && (
          <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <h3 className="font-bold text-lg mb-3 text-purple-800">AI优化建议</h3>

            {optimizedContent.personalInfo?.summary && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">优化后的个人简介：</h4>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-gray-700">{optimizedContent.personalInfo.summary}</p>
                </div>
              </div>
            )}

            {optimizedContent.suggestions && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">其他优化建议：</h4>
                <ul className="space-y-1">
                  {optimizedContent.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={applyOptimization}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <Copy size={18} />
                应用优化
              </button>
              <button
                onClick={() => setOptimizedContent(null)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                <RotateCcw size={18} />
                重新分析
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">使用提示：</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 复制完整的招聘信息，包括职位要求、技能需求等</li>
          <li>• AI会分析关键词并优化你的简历内容</li>
          <li>• 建议每次申请不同职位时都重新优化</li>
          <li>• 优化后可以进一步手动调整细节</li>
        </ul>
      </div>
    </div>
  );
};

export default JobOptimizer;