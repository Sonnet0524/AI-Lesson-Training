#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ASCII Diagram to Image Converter
将Markdown/HTML中的ASCII字符图转换为高质量PNG图片
"""

import os
import re
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import argparse
import html

BASE_DIR = Path(__file__).parent.parent
OUTPUT_DIR = BASE_DIR / "exports" / "html" / "diagrams"

ASCII_CHARS = set('┌└├─│┬┴┼╭╮╯╰═║╔╗╚╝±×÷→←↑↓↔►▼▲◀▶┐┘┤┬┴┼╔╗╚╝╠╣╦╩╬')


class ASCIIToImage:
    def __init__(self):
        self.font_size = 14
        self.line_height = 20
        self.char_width = 10
        self.padding = 20
        self.bg_color = (45, 45, 60)
        self.text_color = (220, 220, 230)
        self.border_color = (80, 80, 100)
        self.font = self._load_font()
        
    def _load_font(self):
        font_paths = [
            "/System/Library/Fonts/PingFang.ttc",
            "/System/Library/Fonts/STHeiti Light.ttc",
            "/System/Library/Fonts/Hiragino Sans GB.ttc",
            "/Library/Fonts/Source Han Sans.ttc",
            "/Library/Fonts/Arial Unicode.ttf",
            "/System/Library/Fonts/Menlo.ttc",
            "/System/Library/Fonts/Monaco.dfont",
        ]
        
        for font_path in font_paths:
            if os.path.exists(font_path):
                try:
                    return ImageFont.truetype(font_path, self.font_size)
                except:
                    continue
        
        return ImageFont.load_default()
    
    def is_valid_diagram(self, block_content):
        """判断是否是有效的图表"""
        lines = block_content.strip().split('\n')
        
        if len(lines) < 3:
            return False
        
        has_top_border = any('┌' in line or '╔' in line or '╭' in line for line in lines)
        has_bottom_border = any('┘' in line or '╚' in line or '╯' in line for line in lines)
        has_vertical = any('│' in line or '║' in line for line in lines)
        
        if not (has_top_border and has_bottom_border and has_vertical):
            return False
        
        total_chars = sum(len(line) for line in lines)
        diagram_chars = sum(sum(1 for c in line if c in ASCII_CHARS) for line in lines)
        
        if total_chars == 0:
            return False
        
        if diagram_chars / total_chars < 0.15:
            return False
        
        return True
    
    def detect_ascii_blocks(self, content):
        lines = content.split('\n')
        blocks = []
        current_block = []
        current_start = 0
        in_block = False
        
        for i, line in enumerate(lines):
            char_count = sum(1 for c in line if c in ASCII_CHARS)
            is_diagram_line = char_count >= 3
            
            if is_diagram_line:
                if not in_block:
                    in_block = True
                    current_start = i
                    current_block = [line]
                else:
                    current_block.append(line)
            else:
                if in_block and len(current_block) >= 3:
                    block_content = '\n'.join(current_block)
                    if self.is_valid_diagram(block_content):
                        blocks.append({
                            'content': block_content,
                            'start_line': current_start,
                            'end_line': i - 1
                        })
                in_block = False
                current_block = []
        
        if in_block and len(current_block) >= 3:
            block_content = '\n'.join(current_block)
            if self.is_valid_diagram(block_content):
                blocks.append({
                    'content': block_content,
                    'start_line': current_start,
                    'end_line': len(lines) - 1
                })
        
        return blocks
    
    def create_image(self, ascii_text):
        lines = ascii_text.strip().split('\n')
        if not lines:
            return None
        
        max_width = max(len(line) for line in lines)
        img_width = max(max_width * self.char_width + self.padding * 2, 400)
        img_height = len(lines) * self.line_height + self.padding * 2
        
        img = Image.new('RGB', (img_width, img_height), self.bg_color)
        draw = ImageDraw.Draw(img)
        
        draw.rectangle(
            [(0, 0), (img_width-1, img_height-1)],
            outline=self.border_color,
            width=1
        )
        
        y = self.padding
        for line in lines:
            draw.text((self.padding, y), line, font=self.font, fill=self.text_color)
            y += self.line_height
        
        return img
    
    def save_image(self, img, filename):
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        filepath = OUTPUT_DIR / filename
        img.save(filepath, 'PNG', optimize=True)
        return str(filepath)
    
    def process_html_file(self, html_file):
        print(f"[INFO] 处理: {html_file}")
        
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        pattern = r'<div class="highlight"><pre>(?:<span[^>]*></span>)?<code[^>]*>(.*?)</code></pre></div>'
        matches = list(re.finditer(pattern, content, flags=re.DOTALL))
        
        if not matches:
            print(f"[INFO] 未找到代码块")
            return 0
        
        replacements = []
        count = 0
        
        for i, match in enumerate(matches):
            code_content = html.unescape(match.group(1))
            code_content = code_content.replace('<span class="err">', '').replace('</span>', '')
            
            ascii_blocks = self.detect_ascii_blocks(code_content)
            
            if ascii_blocks:
                for j, block in enumerate(ascii_blocks):
                    try:
                        filename = f"{Path(html_file).stem}_diagram_{count+1}.png"
                        img = self.create_image(block['content'])
                        if img:
                            filepath = self.save_image(img, filename)
                            
                            file_size = os.path.getsize(filepath)
                            if file_size < 1000:
                                os.remove(filepath)
                                print(f"[SKIP] 图片太小 ({file_size} bytes): {filename}")
                                continue
                            
                            relative_path = f"diagrams/{filename}"
                            img_tag = f'<div class="diagram-container"><img src="{relative_path}" alt="Diagram {count+1}" class="ascii-image" /></div>'
                            
                            replacements.append({
                                'match': match,
                                'block_content': block['content'],
                                'img_tag': img_tag,
                                'full_match': match.group(0)
                            })
                            
                            print(f"[OK]   生成图表: {filename} ({file_size} bytes)")
                            count += 1
                    except Exception as e:
                        print(f"[ERROR] 生成图表失败: {e}")
        
        for repl in replacements:
            full_match = repl['full_match']
            img_tag = repl['img_tag']
            content = content.replace(full_match, img_tag, 1)
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return count
    
    def process_all_html(self):
        html_dir = BASE_DIR / "exports" / "html"
        
        if not html_dir.exists():
            print(f"[ERROR] HTML目录不存在: {html_dir}")
            return 0
        
        total = 0
        for html_file in html_dir.glob("*.html"):
            total += self.process_html_file(html_file)
        
        print(f"[INFO] 共生成 {total} 个图表")
        return total


def main():
    parser = argparse.ArgumentParser(description='Convert ASCII diagrams to images')
    parser.add_argument('--input', '-i', help='Input HTML file')
    parser.add_argument('--all', '-a', action='store_true', help='Process all HTML files')
    
    args = parser.parse_args()
    
    converter = ASCIIToImage()
    
    if args.all or (not args.input):
        converter.process_all_html()
    elif args.input:
        converter.process_html_file(args.input)


if __name__ == '__main__':
    main()
