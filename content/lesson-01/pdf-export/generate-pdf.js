#!/usr/bin/env node

/**
 * PDF生成脚本
 * 将Markdown文件转换为PDF
 */

const markdownPdf = require('markdown-pdf');
const fs = require('fs');
const path = require('path');

// PDF样式配置
const pdfOptions = {
  paperFormat: 'A4',
  paperOrientation: 'portrait',
  paperBorder: '1cm',
  
  // 使用自定义CSS样式
  cssPath: './pdf-style.css',
  
  // 页面页脚
  remarkable: {
    html: true,
    breaks: true
  }
};

// 要生成的文件列表
const files = [
  {
    input: 'Day2-投资问效案例-完整版.md',
    output: '../pdf-output/Day2-投资问效案例.pdf',
    title: 'Day2 投资问效案例 - Agent开发实战'
  },
  {
    input: 'Day3-投资问效案例-完整版.md',
    output: '../pdf-output/Day3-投资问效案例.pdf',
    title: 'Day3 投资问效案例 - 多智能体协作'
  },
  {
    input: 'Day4-投资问效案例-完整版.md',
    output: '../pdf-output/Day4-投资问效案例.pdf',
    title: 'Day4 投资问效案例 - 前端开发'
  }
];

// 确保输出目录存在
const outputDir = path.join(__dirname, '../pdf-output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 生成PDF
async function generatePDFs() {
  console.log('开始生成PDF文件...\n');
  
  for (const file of files) {
    const inputPath = path.join(__dirname, file.input);
    const outputPath = path.join(__dirname, file.output);
    
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ 文件不存在: ${file.input}`);
      continue;
    }
    
    console.log(`正在生成: ${file.title}`);
    console.log(`  输入: ${file.input}`);
    console.log(`  输出: ${file.output}`);
    
    try {
      await new Promise((resolve, reject) => {
        markdownPdf(pdfOptions)
          .from(inputPath)
          .to(outputPath, () => {
            console.log(`  ✅ 完成\n`);
            resolve();
          });
      });
    } catch (error) {
      console.error(`  ❌ 错误: ${error.message}\n`);
    }
  }
  
  console.log('PDF生成完成！');
  console.log(`输出目录: ${outputDir}`);
}

// 执行生成
generatePDFs().catch(console.error);
