#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HTML to PDF Converter
使用Playwright和Paged.js将HTML转换为高质量PDF
"""

import os
import sys
import asyncio
import argparse
from pathlib import Path
from datetime import datetime

# 检查playwright是否可用
try:
    from playwright.async_api import async_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False
    print("[ERROR] Playwright未安装。请运行: pip install playwright && playwright install chromium")

# 配置
BASE_DIR = Path(__file__).parent.parent
HTML_DIR = BASE_DIR / "exports" / "html"
PDF_DIR = BASE_DIR / "exports" / "pdf"

class HTMLToPDF:
    def __init__(self):
        self.html_dir = HTML_DIR
        self.pdf_dir = PDF_DIR
        self.pdf_dir.mkdir(parents=True, exist_ok=True)
        
    async def convert_single(self, html_file, output_file=None):
        """转换单个HTML文件为PDF"""
        html_path = Path(html_file)
        
        if not html_path.exists():
            print(f"[ERROR] HTML文件不存在: {html_path}")
            return False
        
        if output_file is None:
            output_file = self.pdf_dir / f"day1-{html_path.stem}.pdf"
        else:
            output_file = Path(output_file)
        
        print(f"[INFO] 转换PDF: {html_path.name}")
        
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch()
                page = await browser.new_page()
                
                # 加载HTML文件
                await page.goto(f'file://{html_path.absolute()}')
                
                # 等待页面完全加载
                await page.wait_for_load_state('networkidle')
                
                # 等待字体和样式加载
                await asyncio.sleep(2)
                
                # 生成PDF
                await page.pdf(
                    path=str(output_file),
                    format='A4',
                    print_background=True,
                    margin={
                        'top': '25mm',
                        'right': '20mm',
                        'bottom': '25mm',
                        'left': '20mm'
                    },
                    display_header_footer=True,
                    header_template='<div style="font-size: 9px; width: 100%; text-align: center; color: #666; padding: 0 20mm;"><span>AI种子团队培训教材 · Day 1</span></div>',
                    footer_template='<div style="font-size: 9px; width: 100%; text-align: center; color: #666; padding: 0 20mm;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
                )
                
                await browser.close()
                
                print(f"[OK]   PDF生成成功: {output_file}")
                return str(output_file)
                
        except Exception as e:
            print(f"[ERROR] PDF生成失败: {e}")
            import traceback
            traceback.print_exc()
            return False
    
    async def convert_all(self):
        """转换所有HTML文件"""
        if not self.html_dir.exists():
            print(f"[ERROR] HTML目录不存在: {self.html_dir}")
            return []
        
        html_files = list(self.html_dir.glob("*.html"))
        
        if not html_files:
            print(f"[WARN] 未找到HTML文件")
            return []
        
        print(f"[INFO] 开始批量转换，共 {len(html_files)} 个文件...")
        
        results = []
        for html_file in sorted(html_files):
            result = await self.convert_single(html_file)
            if result:
                results.append(result)
        
        print(f"[INFO] 转换完成! 成功: {len(results)}, 失败: {len(html_files) - len(results)}")
        return results

def main():
    parser = argparse.ArgumentParser(description='Convert HTML to PDF using Playwright')
    parser.add_argument('--input', '-i', help='Input HTML file')
    parser.add_argument('--output', '-o', help='Output PDF file')
    parser.add_argument('--all', '-a', action='store_true', help='Process all HTML files')
    
    args = parser.parse_args()
    
    if not PLAYWRIGHT_AVAILABLE:
        print("[ERROR] 无法运行: Playwright未安装")
        sys.exit(1)
    
    converter = HTMLToPDF()
    
    if args.all or (not args.input):
        asyncio.run(converter.convert_all())
    elif args.input:
        asyncio.run(converter.convert_single(args.input, args.output))

if __name__ == '__main__':
    main()
