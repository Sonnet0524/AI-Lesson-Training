#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Markdown to HTML Converter
将Markdown文件转换为格式化的HTML，支持自定义模板和扩展
"""

import os
import re
import sys
import argparse
from pathlib import Path
import markdown
from markdown.extensions import fenced_code, tables, toc
from markdown.extensions.codehilite import CodeHiliteExtension
from markdown.extensions.meta import MetaExtension
import json

# 配置
BASE_DIR = Path(__file__).parent.parent
DOCS_DIR = Path("/Users/sonnet/opencode/AI-Lesson-Training/docs/day1-pm")
OUTPUT_DIR = BASE_DIR / "exports" / "html"
TEMPLATE_DIR = BASE_DIR / "templates"

class MarkdownToHTML:
    def __init__(self):
        self.md = markdown.Markdown(extensions=[
            'fenced_code',
            'tables',
            'toc',
            'meta',
            CodeHiliteExtension(
                css_class='highlight',
                guess_lang=True,
                use_pygments=True
            ),
        ])
        
    def read_markdown(self, file_path):
        """读取Markdown文件"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            print(f"[ERROR] 读取文件失败 {file_path}: {e}")
            return None
    
    def extract_title(self, content, file_path):
        """从Markdown内容中提取标题"""
        # 尝试从meta提取
        lines = content.split('\n')
        
        # 查找第一个H1标题
        for line in lines:
            match = re.match(r'^#\s+(.+)$', line.strip())
            if match:
                return match.group(1)
        
        # 使用文件名作为标题
        return Path(file_path).stem.replace('-', ' ').title()
    
    def extract_subtitle(self, content):
        """提取副标题"""
        lines = content.split('\n')
        for line in lines:
            match = re.match(r'^##\s+(.+)$', line.strip())
            if match:
                return match.group(1)
        return "AI种子团队培训教材"
    
    def preprocess_content(self, content):
        """预处理Markdown内容"""
        # 标记ASCII图表块以便后续处理
        content = re.sub(
            r'```ascii\n(.*?)```',
            r'<div class="ascii-diagram" data-type="ascii">\1</div>',
            content,
            flags=re.DOTALL
        )
        
        content = re.sub(
            r'```diagram\n(.*?)```',
            r'<div class="ascii-diagram" data-type="diagram">\1</div>',
            content,
            flags=re.DOTALL
        )
        
        # 标记Mermaid图表
        content = re.sub(
            r'```mermaid\n(.*?)```',
            r'<div class="mermaid-diagram" data-type="mermaid">\1</div>',
            content,
            flags=re.DOTALL
        )
        
        return content
    
    def convert(self, md_content):
        """转换Markdown为HTML"""
        # 重置Markdown实例
        self.md.reset()
        
        # 预处理
        processed = self.preprocess_content(md_content)
        
        # 转换为HTML
        html_content = self.md.convert(processed)
        
        return html_content
    
    def load_template(self):
        """加载HTML模板"""
        template_path = TEMPLATE_DIR / "base-template.html"
        if template_path.exists():
            with open(template_path, 'r', encoding='utf-8') as f:
                return f.read()
        else:
            # 返回默认模板
            return self.get_default_template()
    
    def get_default_template(self):
        """默认HTML模板"""
        return '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <link rel="stylesheet" href="../templates/css/print.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
</head>
<body>
    <div class="cover-page">
        <div class="logo-container">
            <div class="logo">国网四川电力</div>
        </div>
        <h1 class="doc-title">{{title}}</h1>
        <h2 class="doc-subtitle">{{subtitle}}</h2>
        <div class="meta">
            <p>AI种子团队培训教材</p>
            <p>Day 1: Agentic AI 设计范式</p>
            <p class="date">{{date}}</p>
        </div>
    </div>
    
    <div class="page-break"></div>
    
    <nav class="toc">
        <h2>目录</h2>
        {{toc}}
    </nav>
    
    <div class="page-break"></div>
    
    <main class="content">
        {{content}}
    </main>
    
    <footer class="document-footer">
        <p>国网四川电力 · AI种子团队培训</p>
    </footer>
</body>
</html>'''
    
    def apply_template(self, html_content, title, subtitle, toc_html=""):
        """应用模板"""
        from datetime import datetime
        
        template = self.load_template()
        
        # 替换变量
        template = template.replace('{{title}}', title)
        template = template.replace('{{subtitle}}', subtitle)
        template = template.replace('{{content}}', html_content)
        template = template.replace('{{toc}}', toc_html)
        template = template.replace('{{date}}', datetime.now().strftime('%Y年%m月%d日'))
        
        return template
    
    def generate_toc(self, html_content):
        """生成目录"""
        toc_html = '<ul class="toc-list">'
        
        # 提取所有标题
        headers = re.findall(r'<h([1-6])[^>]*>(.*?)</h\1>', html_content)
        
        for level, text in headers[:20]:  # 限制目录条目数量
            anchor = re.sub(r'<[^>]+>', '', text).strip().replace(' ', '-').lower()
            anchor = re.sub(r'[^\w\u4e00-\u9fff-]', '', anchor)[:30]
            toc_html += f'<li class="toc-level-{level}"><a href="#{anchor}">{text}</a></li>'
        
        toc_html += '</ul>'
        return toc_html
    
    def add_anchors(self, html_content):
        """为标题添加锚点"""
        def add_anchor(match):
            level = match.group(1)
            attrs = match.group(2) or ''
            text = match.group(3)
            
            # 生成锚点ID
            anchor = re.sub(r'<[^>]+>', '', text).strip().replace(' ', '-').lower()
            anchor = re.sub(r'[^\w\u4e00-\u9fff-]', '', anchor)[:30]
            
            return f'<h{level}{attrs} id="{anchor}">{text}</h{level}>'
        
        return re.sub(r'<h([1-6])([^>]*)>(.*?)</h\1>', add_anchor, html_content)
    
    def process_file(self, input_file, output_dir=None):
        """处理单个文件"""
        if output_dir is None:
            output_dir = OUTPUT_DIR
        
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # 读取Markdown
        print(f"[INFO] 处理: {input_file}")
        md_content = self.read_markdown(input_file)
        if not md_content:
            return False
        
        # 提取标题和副标题
        title = self.extract_title(md_content, input_file)
        subtitle = self.extract_subtitle(md_content)
        
        # 转换为HTML
        html_content = self.convert(md_content)
        
        # 添加锚点
        html_content = self.add_anchors(html_content)
        
        # 生成目录
        toc_html = self.generate_toc(html_content)
        
        # 应用模板
        final_html = self.apply_template(html_content, title, subtitle, toc_html)
        
        # 保存HTML
        output_file = output_dir / f"{Path(input_file).stem}.html"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(final_html)
        
        print(f"[OK]   HTML生成成功: {output_file}")
        return str(output_file)
    
    def process_all(self):
        """处理所有文件"""
        files = [
            'content-outline.md',
            'hour1-content.md',
            'hour2-content.md',
            'hour3-content.md'
        ]
        
        results = []
        for filename in files:
            file_path = DOCS_DIR / filename
            if file_path.exists():
                result = self.process_file(file_path)
                if result:
                    results.append(result)
            else:
                print(f"[WARN] 文件不存在: {file_path}")
        
        return results

def main():
    parser = argparse.ArgumentParser(description='Convert Markdown to HTML')
    parser.add_argument('--input', '-i', help='Input Markdown file')
    parser.add_argument('--output', '-o', help='Output directory')
    parser.add_argument('--all', '-a', action='store_true', help='Process all files')
    
    args = parser.parse_args()
    
    converter = MarkdownToHTML()
    
    if args.all or (not args.input):
        print("[INFO] 开始批量转换...")
        results = converter.process_all()
        print(f"[INFO] 完成! 共生成 {len(results)} 个HTML文件")
    elif args.input:
        converter.process_file(args.input, args.output)

if __name__ == '__main__':
    main()
