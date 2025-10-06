import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async () => {
  // 查找实际的简历内容元素（不是预览容器）
  const resumeElement = document.querySelector('#resume-preview > div');

  if (!resumeElement) {
    alert('请先编辑简历内容');
    return;
  }

  try {
    // 显示加载提示
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = '正在生成PDF，请稍候...';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.padding = '20px';
    loadingDiv.style.background = 'white';
    loadingDiv.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    loadingDiv.style.borderRadius = '8px';
    loadingDiv.style.zIndex = '9999';
    document.body.appendChild(loadingDiv);

    // 临时移除缩放效果
    const previewContainer = document.getElementById('resume-preview');
    const originalTransform = previewContainer?.style.transform || '';
    if (previewContainer) {
      previewContainer.style.transform = 'none';
    }

    // 生成canvas
    const canvas = await html2canvas(resumeElement as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794, // A4宽度像素 (210mm * 96dpi / 25.4)
      height: 1123 // A4高度像素 (297mm * 96dpi / 25.4)
    });

    // 恢复缩放效果
    if (previewContainer) {
      previewContainer.style.transform = originalTransform;
    }

    // 计算PDF尺寸
    const imgWidth = 210; // A4宽度（mm）
    const pageHeight = 297; // A4高度（mm）
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // 创建PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');

    // 如果内容高度超过一页，需要分页
    if (imgHeight > pageHeight) {
      let heightLeft = imgHeight;
      let position = 0;

      // 添加第一页
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 添加更多页
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    } else {
      // 内容在一页内
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    // 移除加载提示
    document.body.removeChild(loadingDiv);

    // 下载PDF
    pdf.save('resume.pdf');
  } catch (error) {
    console.error('生成PDF失败:', error);
    alert('生成PDF失败，请重试');

    // 确保移除加载提示
    const loadingDiv = document.querySelector('div[style*="z-index: 9999"]');
    if (loadingDiv) {
      document.body.removeChild(loadingDiv);
    }
  }
};