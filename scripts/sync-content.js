#!/usr/bin/env node

/**
 * 内容同步脚本
 * 将 content/ 目录的内容同步到 docs/ 目录
 * 自动添加 frontmatter 和转换文件名
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 读取映射配置
const mappingPath = path.join(__dirname, 'filename-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

// 获取当前日期
const today = new Date().toISOString().split('T')[0];

/**
 * 确保目录存在
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 创建目录: ${path.relative(rootDir, dirPath)}`);
  }
}

/**
 * 生成 frontmatter
 */
function generateFrontmatter(title, description, prev, next) {
  let fm = `---
title: "${title}"
description: "${description}"
outline: deep
lastUpdated: ${today}
`;
  
  if (prev) {
    fm += `prev: ${prev}\n`;
  }
  
  if (next) {
    fm += `next: ${next}\n`;
  }
  
  fm += '---\n\n';
  return fm;
}

/**
 * 检查是否应该排除
 */
function shouldExclude(filePath, excludes) {
  for (const pattern of excludes) {
    // 简单的 glob 匹配
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
    if (regex.test(filePath)) {
      return true;
    }
  }
  return false;
}

/**
 * 同步单个文件
 */
function syncFile(sourcePath, targetPath, config, prevPath, nextPath) {
  // 检查源文件是否存在
  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️  源文件不存在: ${sourcePath}`);
    return false;
  }
  
  // 确保目标目录存在
  ensureDir(path.dirname(targetPath));
  
  // 读取源文件内容
  let content = fs.readFileSync(sourcePath, 'utf-8');
  
  // 检查是否已有 frontmatter
  if (!content.startsWith('---')) {
    // 添加 frontmatter
    const frontmatter = generateFrontmatter(
      config.title,
      config.description,
      prevPath,
      nextPath
    );
    content = frontmatter + content;
  }
  
  // 写入目标文件
  fs.writeFileSync(targetPath, content, 'utf-8');
  console.log(`✅ 同步: ${path.relative(rootDir, sourcePath)} → ${path.relative(rootDir, targetPath)}`);
  
  return true;
}

/**
 * 创建索引文件
 */
function createIndexFile(dirPath, title, description, items) {
  const indexPath = path.join(dirPath, 'index.md');
  
  let content = generateFrontmatter(title, description);
  
  content += `# ${title}\n\n${description}\n\n`;
  
  if (items && items.length > 0) {
    content += '## 内容列表\n\n';
    for (const item of items.sort((a, b) => (a.order || 0) - (b.order || 0))) {
      const link = path.basename(item.target, '.md');
      content += `- [${item.title}](./${link}) - ${item.description}\n`;
    }
  }
  
  ensureDir(dirPath);
  fs.writeFileSync(indexPath, content, 'utf-8');
  console.log(`📄 创建索引: ${path.relative(rootDir, indexPath)}`);
}

/**
 * 主同步函数
 */
function sync() {
  console.log('🚀 开始同步内容...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  // 同步主内容
  const sortedMappings = [...mapping.mappings].sort((a, b) => (a.order || 0) - (b.order || 0));
  
  // 按类型分组
  const preLessonItems = sortedMappings.filter(m => m.target.includes('pre-lesson/'));
  const lessonItems = sortedMappings.filter(m => m.target.includes('lesson-01/'));
  const projectItems = sortedMappings.filter(m => m.target.includes('projects/'));
  
  for (let i = 0; i < sortedMappings.length; i++) {
    const config = sortedMappings[i];
    const sourcePath = path.join(rootDir, config.source);
    const targetPath = path.join(rootDir, config.target);
    
    // 计算 prev 和 next（基于分组）
    let prevPath = null;
    let nextPath = null;
    
    if (config.target.includes('pre-lesson/')) {
      const idx = preLessonItems.findIndex(m => m.target === config.target);
      if (idx > 0) {
        prevPath = '/' + path.dirname(config.target).replace('docs/', '') + '/' + path.basename(preLessonItems[idx - 1].target, '.md');
      }
      if (idx < preLessonItems.length - 1) {
        nextPath = '/' + path.dirname(config.target).replace('docs/', '') + '/' + path.basename(preLessonItems[idx + 1].target, '.md');
      } else if (idx === preLessonItems.length - 1 && lessonItems.length > 0) {
        // 最后一个 Pre-Lesson 链接到第一个 Lesson
        nextPath = '/lesson-01/' + path.basename(lessonItems[0].target, '.md');
      }
    } else if (config.target.includes('lesson-01/')) {
      const idx = lessonItems.findIndex(m => m.target === config.target);
      if (idx > 0) {
        prevPath = '/lesson-01/' + path.basename(lessonItems[idx - 1].target, '.md');
      } else if (idx === 0 && preLessonItems.length > 0) {
        // 第一个 Lesson 链接到最后一个 Pre-Lesson
        prevPath = '/pre-lesson/' + path.basename(preLessonItems[preLessonItems.length - 1].target, '.md');
      }
      if (idx < lessonItems.length - 1) {
        nextPath = '/lesson-01/' + path.basename(lessonItems[idx + 1].target, '.md');
      }
    }
    // Projects 不需要 prev/next
    
    if (syncFile(sourcePath, targetPath, config, prevPath, nextPath)) {
      successCount++;
    } else {
      errorCount++;
    }
  }
  
  // 同步资源
  if (mapping.resourceMappings) {
    for (const config of mapping.resourceMappings) {
      const sourcePath = path.join(rootDir, config.source);
      const targetPath = path.join(rootDir, config.target);
      
      if (fs.existsSync(sourcePath)) {
        if (syncFile(sourcePath, targetPath, config, null, null)) {
          successCount++;
        } else {
          errorCount++;
        }
      } else {
        console.warn(`⚠️  资源文件不存在: ${sourcePath}`);
      }
    }
  }
  
  // 创建索引文件
  console.log('\n📋 创建索引文件...\n');
  
  // Pre-Lesson 索引
  createIndexFile(
    path.join(rootDir, 'docs/pre-lesson'),
    '预授课',
    'Pre-Lesson 直播课程，为正式培训做好技术和环境准备',
    preLessonItems
  );
  
  // Lesson-01 索引
  createIndexFile(
    path.join(rootDir, 'docs/lesson-01'),
    'Lesson-01：Agentic AI 实战培训',
    '5天集中培训课程，从理论到实践掌握Agentic AI开发',
    lessonItems
  );
  
  // Projects 索引
  createIndexFile(
    path.join(rootDir, 'docs/projects'),
    '项目设计',
    '三个实战项目的设计方案和技术实现',
    projectItems
  );
  
  // Resources 索引
  createIndexFile(
    path.join(rootDir, 'docs/resources'),
    '资源中心',
    '技术栈速查、环境搭建指南和参考资料',
    []
  );
  
  // 打印统计
  console.log('\n' + '='.repeat(50));
  console.log(`✅ 成功: ${successCount} 个文件`);
  if (errorCount > 0) {
    console.log(`❌ 失败: ${errorCount} 个文件`);
  }
  console.log('='.repeat(50) + '\n');
  
  return errorCount === 0;
}

// 执行同步
const success = sync();
process.exit(success ? 0 : 1);
