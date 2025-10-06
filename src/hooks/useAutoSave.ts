import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useAutoSave = () => {
  const resume = useSelector((state: RootState) => state.resume);

  useEffect(() => {
    // 防抖保存，避免频繁写入
    const timeoutId = setTimeout(() => {
      // 检查是否有实际内容再保存
      const hasContent =
        resume.personalInfo.fullName ||
        resume.personalInfo.email ||
        resume.experience.length > 0 ||
        resume.education.length > 0 ||
        resume.skills.length > 0;

      if (hasContent) {
        localStorage.setItem('resume-autosave', JSON.stringify(resume));
        localStorage.setItem('resume-autosave-timestamp', new Date().toISOString());
      }
    }, 2000); // 2秒后保存

    return () => clearTimeout(timeoutId);
  }, [resume]);

  // 恢复自动保存的数据
  const loadAutoSave = () => {
    try {
      const saved = localStorage.getItem('resume-autosave');
      const timestamp = localStorage.getItem('resume-autosave-timestamp');

      if (saved && timestamp) {
        const saveTime = new Date(timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - saveTime.getTime()) / (1000 * 60 * 60);

        return {
          data: JSON.parse(saved),
          timestamp: saveTime,
          isRecent: hoursDiff < 24 // 24小时内的自动保存
        };
      }
    } catch (error) {
      console.error('加载自动保存失败:', error);
    }
    return null;
  };

  return { loadAutoSave };
};