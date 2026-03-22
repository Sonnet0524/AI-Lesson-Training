#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch Converter - 一键批量转换
将所有Markdown文件一次性转换为PDF
"""

import os
import sys
import subprocess
import asyncio
from pathlib import Path

# 配置
BASE_DIR = Path(__file__).parent.parent
# 使用绝对路径指向docs目录
DOCS_DIR = Path("/Users/sonnet/opencode/AI-Lesson-Training/docs/day1-pm")

def run_command(cmd, description):
    """运行命令并显示进度"""
    print(f"\n{'='*60}")
    print(f"[步骤] {description}")
    print(f"{'='*60}")
    
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=False,
            text=True,
            cwd=BASE_DIR
        )
        
        if result.returncode != 0:
            print(f"[WARN] 命令执行可能有警告，但继续处理...")
        
        return True
        
    except Exception as e:
        print(f"[ERROR] 命令执行失败: {e}")
        return False

def check_dependencies():
    """检查依赖是否安装"""
    print("[检查] 验证依赖...")
    
    dependencies = [
        ('markdown', 'markdown'),
        ('PIL', 'Pillow'),
        ('pygments', 'Pygments'),
        ('playwright', 'playwright'),
        ('jinja2', 'Jinja2'),
        ('bs4', 'beautifulsoup4'),
    ]
    
    missing = []
    for module, package in dependencies:
        try:
            __import__(module)
            print(f"[OK]   {package}")
        except ImportError:
            missing.append(package)
            print(f"[MISS] {package}")
    
    if missing:
        print(f"\n[ERROR] 缺少以下依赖，请先安装:")
        print(f"pip install {' '.join(missing)}")
        if 'playwright' in missing:
            print("playwright install chromium")
        return False
    
    print("[OK]   所有依赖已安装\n")
    return True

def check_source_files():
    """检查源文件是否存在"""
    print("[检查] 验证源文件...")
    
    files = [
        'content-outline.md',
        'hour1-content.md',
        'hour2-content.md',
        'hour3-content.md'
    ]
    
    all_exist = True
    for filename in files:
        file_path = DOCS_DIR / filename
        if file_path.exists():
            print(f"[OK]   {filename}")
        else:
            print(f"[MISS] {filename}")
            all_exist = False
    
    if not all_exist:
        print(f"\n[ERROR] 部分源文件缺失，请检查: {DOCS_DIR}")
        return False
    
    print("[OK]   所有源文件存在\n")
    return True

def main():
    """主函数"""
    print("""
╔══════════════════════════════════════════════════════════╗
║     Markdown to PDF 批量转换工具                          ║
║     AI种子团队培训教材 - Day 1                           ║
╚══════════════════════════════════════════════════════════╝
""")
    
    # 检查依赖
    if not check_dependencies():
        sys.exit(1)
    
    # 检查源文件
    if not check_source_files():
        sys.exit(1)
    
    # 步骤1: Markdown转HTML
    if not run_command(
        "python scripts/md-to-html.py --all",
        "Step 1/4: Markdown → HTML"
    ):
        print("[WARN] Markdown转HTML可能有警告，但继续...")
    
    # 步骤2: ASCII图转图片
    if not run_command(
        "python scripts/ascii-to-image.py --all",
        "Step 2/4: ASCII图 → 图片"
    ):
        print("[WARN] ASCII图转换可能有警告，但继续...")
    
    # 步骤3: Mermaid图生成
    if not run_command(
        "python scripts/generate-diagrams.py --all",
        "Step 3/4: Mermaid图 → 图片"
    ):
        print("[WARN] Mermaid图生成可能有警告，但继续...")
    
    # 步骤4: HTML转PDF
    print(f"\n{'='*60}")
    print("[步骤] Step 4/4: HTML → PDF")
    print(f"{'='*60}")
    
    # 确保html_to_pdf.py可以被导入
    sys.path.insert(0, str(BASE_DIR / "scripts"))
    
    try:
        from html_to_pdf import HTMLToPDF
        from html_to_pdf import HTMLToPDF
        import asyncio
        
        converter = HTMLToPDF()
        results = asyncio.run(converter.convert_all())
        
        if results:
            print(f"\n[OK]   成功生成 {len(results)} 个PDF文件")
        else:
            print("\n[WARN] 未生成PDF文件或生成失败")
            
    except Exception as e:
        print(f"\n[ERROR] PDF生成失败: {e}")
        import traceback
        traceback.print_exc()
    
    # 显示结果
    print("""
╔══════════════════════════════════════════════════════════╗
║                     转换完成!                             ║
╠══════════════════════════════════════════════════════════╣
║  输出位置:                                               ║
║  - HTML: skills/markdown-to-pdf/exports/html/            ║
║  - PDF:  skills/markdown-to-pdf/exports/pdf/             ║
║  - 图表: skills/markdown-to-pdf/exports/html/diagrams/   ║
╚══════════════════════════════════════════════════════════╝
""")
    
    # 列出生成的PDF文件
    pdf_dir = BASE_DIR / "exports" / "pdf"
    if pdf_dir.exists():
        pdf_files = list(pdf_dir.glob("*.pdf"))
        if pdf_files:
            print("[生成文件]:")
            for pdf_file in sorted(pdf_files):
                size = pdf_file.stat().st_size / 1024  # KB
                print(f"  ✓ {pdf_file.name} ({size:.1f} KB)")
    
    print()

if __name__ == '__main__':
    main()
