#!/usr/bin/env node

/**
 * PDF生成脚本 (使用Puppeteer)
 * 将Markdown文件转换为PDF
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// 确保输出目录存在
const outputDir = path.join(__dirname, '../pdf-output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 要生成的文件列表
const files = [
  {
    input: 'Day2-投资问效案例-完整版.md',
    output: 'Day2-投资问效案例.pdf',
    title: 'Day2 投资问效案例 - Agent开发实战'
  },
  {
    input: 'Day3-投资问效案例-完整版.md',
    output: 'Day3-投资问效案例.pdf',
    title: 'Day3 投资问效案例 - 多智能体协作'
  },
  {
    input: 'Day4-投资问效案例-完整版.md',
    output: 'Day4-投资问效案例.pdf',
    title: 'Day4 投资问效案例 - 前端开发'
  }
];

// 读取CSS样式
const cssPath = path.join(__dirname, 'pdf-style.css');
const cssContent = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf-8') : '';

/**
 * 生成HTML内容
 */
function generateHTML(markdownContent, title) {
  const htmlContent = marked(markdownContent);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    ${cssContent}
    
    /* 额外的PDF优化样式 */
    @page {
      margin: 2cm;
      size: A4;
    }
    
    body {
      font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #333;
    }
    
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    table {
      page-break-inside: avoid;
    }
    
    h1, h2, h3, h4 {
      page-break-after: avoid;
    }
    
    pre, blockquote {
      page-break-inside: avoid;
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
  `;
}

/**
 * 生成单个PDF
 */
async function generatePDF(browser, file) {
  const inputPath = path.join(__dirname, file.input);
  const outputPath = path.join(outputDir, file.output);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ 文件不存在: ${file.input}`);
    return false;
  }
  
  console.log(`\n正在生成: ${file.title}`);
  console.log(`  输入: ${file.input}`);
  
  try {
    // 读取Markdown内容
    const markdownContent = fs.readFileSync(inputPath, 'utf-8');
    
    // 生成HTML
    const html = generateHTML(markdownContent, file.title);
    
    // 创建新页面
    const page = await browser.newPage();
    
    // 设置内容
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });
    
    // 生成PDF
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '2cm',
        right: '2cm',
        bottom: '2cm',
        left: '2cm'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 9px; color: #999; width: 100%; text-align: center; margin-top: 10px;">
          国网四川电力 AI种子团队培训 - ${file.title}
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 9px; color: #999; width: 100%; text-align: center; margin-bottom: 10px;">
          第 <span class="pageNumber"></span> 页 / 共 <span class="totalPages"></span> 页
        </div>
      `
    });
    
    await page.close();
    
    console.log(`  ✅ 完成: ${file.output}`);
    return true;
    
  } catch (error) {
    console.error(`  ❌ 错误: ${error.message}`);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('='.repeat(60));
  console.log('PDF生成工具');
  console.log('使用技术: Puppeteer + Markdown');
  console.log('='.repeat(60));
  
  let browser;
  
  try {
    // 启动浏览器
    console.log('\n正在启动浏览器...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    console.log('浏览器启动成功！\n');
    
    // 生成所有PDF
    let successCount = 0;
    for (const file of files) {
      const success = await generatePDF(browser, file);
      if (success) successCount++;
    }
    
    // 关闭浏览器
    await browser.close();
    
    // 输出结果
    console.log('\n' + '='.repeat(60));
    console.log(`PDF生成完成！成功: ${successCount}/${files.length}`);
    console.log(`输出目录: ${outputDir}`);
    console.log('='.repeat(60) + '\n');
    
    // 列出生成的文件
    const generatedFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.pdf'));
    if (generatedFiles.length > 0) {
      console.log('生成的PDF文件:');
      generatedFiles.forEach(file => {
        const stats = fs.statSync(path.join(outputDir, file));
        const size = (stats.size / 1024).toFixed(1);
        console.log(`  📄 ${file} (${size} KB)`);
      });
    }
    
  } catch (error) {
    console.error('\n❌ 生成失败:', error.message);
    if (browser) await browser.close();
    process.exit(1);
  }
}

// 执行主函数
main();
