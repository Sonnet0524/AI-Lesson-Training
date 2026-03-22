#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mermaid Diagram Generator
将Mermaid语法转换为图形化图片
支持流程图、时序图、甘特图等
"""

import os
import re
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import argparse

# 配置
BASE_DIR = Path(__file__).parent.parent
OUTPUT_DIR = BASE_DIR / "exports" / "html" / "diagrams"

try:
    import graphviz
    GRAPHVIZ_AVAILABLE = True
except ImportError:
    GRAPHVIZ_AVAILABLE = False
    print("[WARN] graphviz库未安装，将使用PIL手动绘制")

class MermaidGenerator:
    def __init__(self):
        self.output_dir = OUTPUT_DIR
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
    def parse_mermaid(self, mermaid_text):
        """解析Mermaid文本，提取图表类型和内容"""
        lines = mermaid_text.strip().split('\n')
        
        if not lines:
            return None, []
        
        # 确定图表类型
        first_line = lines[0].strip().lower()
        
        diagram_type = 'flowchart'  # 默认类型
        
        if 'flowchart' in first_line or 'graph' in first_line:
            diagram_type = 'flowchart'
        elif 'sequencediagram' in first_line or 'sequence' in first_line:
            diagram_type = 'sequence'
        elif 'gantt' in first_line:
            diagram_type = 'gantt'
        elif 'classdiagram' in first_line or 'class' in first_line:
            diagram_type = 'class'
        elif 'statediagram' in first_line or 'state' in first_line:
            diagram_type = 'state'
        elif 'erdiagram' in first_line or 'er' in first_line:
            diagram_type = 'er'
        
        return diagram_type, lines
    
    def generate_flowchart(self, lines, filename):
        """生成流程图"""
        # 使用graphviz生成
        if GRAPHVIZ_AVAILABLE:
            return self._generate_with_graphviz(lines, filename)
        else:
            return self._generate_flowchart_with_pil(lines, filename)
    
    def _generate_with_graphviz(self, lines, filename):
        """使用Graphviz生成图表"""
        try:
            dot = graphviz.Digraph(
                format='png',
                engine='dot',
                graph_attr={'rankdir': 'TB', 'bgcolor': 'white', 'fontname': 'SimHei'},
                node_attr={'shape': 'box', 'style': 'filled', 'fillcolor': '#f0f0f0', 'fontname': 'SimHei'},
                edge_attr={'fontname': 'SimHei'}
            )
            
            # 解析节点和边
            nodes = set()
            for line in lines[1:]:  # 跳过第一行（类型声明）
                line = line.strip()
                if not line or line.startswith('%'):
                    continue
                
                # 解析节点定义
                if '-->' in line:
                    parts = line.split('-->')
                    if len(parts) == 2:
                        source = parts[0].strip().split('[')[0].strip()
                        target = parts[1].strip().split('[')[0].strip()
                        label = ''
                        
                        # 提取标签
                        if '|' in parts[1]:
                            target_parts = parts[1].split('|')
                            target = target_parts[0].strip().split('[')[0].strip()
                            label = target_parts[1].replace('|', '').strip()
                        
                        # 添加节点
                        if source not in nodes:
                            dot.node(source, source)
                            nodes.add(source)
                        if target not in nodes:
                            dot.node(target, target)
                            nodes.add(target)
                        
                        # 添加边
                        if label:
                            dot.edge(source, target, label=label)
                        else:
                            dot.edge(source, target)
            
            # 保存
            output_path = self.output_dir / filename.replace('.png', '')
            dot.render(str(output_path), cleanup=True)
            
            return f"{output_path}.png"
            
        except Exception as e:
            print(f"[ERROR] Graphviz生成失败: {e}")
            return self._generate_flowchart_with_pil(lines, filename)
    
    def _generate_flowchart_with_pil(self, lines, filename):
        """使用PIL手动绘制流程图"""
        # 解析节点
        nodes = {}
        edges = []
        
        for line in lines[1:]:
            line = line.strip()
            if not line or line.startswith('%'):
                continue
            
            # 解析节点定义，如 A[文本]
            node_match = re.match(r'\s*(\w+)\s*\[(.*?)\]', line)
            if node_match:
                node_id = node_match.group(1)
                node_text = node_match.group(2)
                nodes[node_id] = {'text': node_text, 'x': 0, 'y': 0}
            
            # 解析边，如 A --> B
            edge_match = re.match(r'\s*(\w+)\s*-->\s*(\w+)', line)
            if edge_match:
                source = edge_match.group(1)
                target = edge_match.group(2)
                edges.append((source, target))
        
        # 如果没有节点，创建一个默认的
        if not nodes:
            nodes['default'] = {'text': '流程图', 'x': 100, 'y': 100}
        
        # 布局节点（简单垂直布局）
        y_pos = 50
        x_pos = 200
        for i, (node_id, node) in enumerate(nodes.items()):
            node['x'] = x_pos
            node['y'] = y_pos + i * 120
        
        # 计算图片尺寸
        max_y = max(node['y'] for node in nodes.values()) + 150 if nodes else 300
        img_width = 600
        img_height = max(400, max_y)
        
        # 创建图片
        img = Image.new('RGB', (img_width, img_height), (255, 255, 255))
        draw = ImageDraw.Draw(img)
        
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
            title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
        except:
            font = ImageFont.load_default()
            title_font = font
        
        # 绘制节点
        for node_id, node in nodes.items():
            x, y = node['x'], node['y']
            text = node['text']
            
            # 节点尺寸
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            box_width = max(120, text_width + 40)
            box_height = max(50, text_height + 20)
            
            # 绘制节点框
            draw.rectangle(
                [(x - box_width//2, y - box_height//2), 
                 (x + box_width//2, y + box_height//2)],
                fill='#e8f4f8',
                outline='#1a365d',
                width=2
            )
            
            # 绘制文本
            draw.text((x - text_width//2, y - text_height//2), 
                     text, fill='#1a365d', font=font)
        
        # 绘制边
        for source, target in edges:
            if source in nodes and target in nodes:
                x1, y1 = nodes[source]['x'], nodes[source]['y'] + 25
                x2, y2 = nodes[target]['x'], nodes[target]['y'] - 25
                
                # 绘制箭头线
                draw.line([(x1, y1), (x2, y2)], fill='#666666', width=2)
                
                # 绘制箭头头部
                arrow_size = 8
                draw.polygon([(x2, y2), (x2-arrow_size, y2-arrow_size), 
                             (x2+arrow_size, y2-arrow_size)], fill='#666666')
        
        # 保存
        filepath = self.output_dir / filename
        img.save(filepath, 'PNG')
        
        return str(filepath)
    
    def generate_sequence_diagram(self, lines, filename):
        """生成时序图"""
        # 使用PIL手动绘制
        img_width = 800
        img_height = 600
        
        img = Image.new('RGB', (img_width, img_height), (255, 255, 255))
        draw = ImageDraw.Draw(img)
        
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 12)
        except:
            font = ImageFont.load_default()
        
        # 绘制标题
        draw.text((img_width//2 - 50, 20), "时序图", fill='#1a365d', font=font)
        
        # 绘制示例参与者
        participants = ['User', 'System', 'Database']
        x_positions = [150, 400, 650]
        
        for i, participant in enumerate(participants):
            x = x_positions[i]
            # 参与者框
            draw.rectangle([(x-60, 50), (x+60, 90)], 
                          fill='#f0f0f0', outline='#1a365d', width=2)
            draw.text((x-30, 65), participant, fill='#1a365d', font=font)
            
            # 生命线
            draw.line([(x, 90), (x, 550)], fill='#cccccc', width=1)
        
        # 绘制消息
        messages = [
            (0, 1, '请求数据'),
            (1, 2, '查询'),
            (2, 1, '返回结果'),
            (1, 0, '响应'),
        ]
        
        y = 120
        for source, target, msg in messages:
            x1, x2 = x_positions[source], x_positions[target]
            
            # 消息线
            draw.line([(x1, y), (x2, y)], fill='#666666', width=2)
            
            # 箭头
            if x2 > x1:
                draw.polygon([(x2-8, y-4), (x2, y), (x2-8, y+4)], fill='#666666')
            else:
                draw.polygon([(x2+8, y-4), (x2, y), (x2+8, y+4)], fill='#666666')
            
            # 消息文本
            mid_x = (x1 + x2) // 2
            draw.text((mid_x - 30, y - 20), msg, fill='#333333', font=font)
            
            y += 80
        
        # 保存
        filepath = self.output_dir / filename
        img.save(filepath, 'PNG')
        
        return str(filepath)
    
    def generate_generic_diagram(self, lines, filename, diagram_type):
        """生成通用图表（其他类型）"""
        img_width = 700
        img_height = 500
        
        img = Image.new('RGB', (img_width, img_height), (255, 255, 255))
        draw = ImageDraw.Draw(img)
        
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
        except:
            font = ImageFont.load_default()
        
        # 标题
        type_names = {
            'flowchart': '流程图',
            'sequence': '时序图',
            'gantt': '甘特图',
            'class': '类图',
            'state': '状态图',
            'er': 'ER图'
        }
        title = type_names.get(diagram_type, '图表')
        
        draw.text((img_width//2 - 50, 20), f'{title}', fill='#1a365d', font=font)
        
        # 绘制内容框
        draw.rectangle([(50, 60), (img_width-50, img_height-50)], 
                      outline='#1a365d', width=2)
        
        # 绘制内容文本
        y = 80
        for line in lines[:15]:  # 最多显示15行
            if y < img_height - 70:
                draw.text((70, y), line[:80], fill='#333333', font=font)
                y += 25
        
        # 保存
        filepath = self.output_dir / filename
        img.save(filepath, 'PNG')
        
        return str(filepath)
    
    def process_html_file(self, html_file):
        """处理HTML文件中的Mermaid图"""
        print(f"[INFO] 处理Mermaid图: {html_file}")
        
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 查找Mermaid图表
        mermaid_blocks = re.findall(
            r'<div class="mermaid-diagram"[^>]*>(.*?)</div>',
            content,
            flags=re.DOTALL
        )
        
        if not mermaid_blocks:
            print(f"[INFO] 未找到Mermaid图")
            return 0
        
        count = 0
        for i, mermaid_text in enumerate(mermaid_blocks):
            try:
                # 清理HTML实体
                mermaid_text = mermaid_text.replace('&lt;', '<').replace('&gt;', '>')
                mermaid_text = mermaid_text.replace('&amp;', '&')
                
                # 解析类型
                diagram_type, lines = self.parse_mermaid(mermaid_text)
                
                # 生成文件名
                filename = f"{Path(html_file).stem}_mermaid_{i+1}.png"
                
                # 生成图表
                if diagram_type == 'flowchart':
                    filepath = self.generate_flowchart(lines, filename)
                elif diagram_type == 'sequence':
                    filepath = self.generate_sequence_diagram(lines, filename)
                else:
                    filepath = self.generate_generic_diagram(lines, filename, diagram_type)
                
                # 替换HTML中的内容为图片引用
                relative_path = f"diagrams/{filename}"
                img_tag = f'<div class="diagram-container"><img src="{relative_path}" alt="Mermaid Diagram {i+1}" class="mermaid-image" /></div>'
                
                # 替换
                pattern = r'<div class="mermaid-diagram"[^>]*>' + re.escape(mermaid_blocks[i]) + r'</div>'
                content = re.sub(pattern, img_tag, content, count=1)
                
                print(f"[OK]   生成Mermaid图: {filename}")
                count += 1
                
            except Exception as e:
                print(f"[ERROR] 生成Mermaid图失败: {e}")
                import traceback
                traceback.print_exc()
                continue
        
        # 保存更新后的HTML
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return count
    
    def process_all_html(self):
        """处理所有HTML文件"""
        html_dir = BASE_DIR / "exports" / "html"
        
        if not html_dir.exists():
            print(f"[ERROR] HTML目录不存在: {html_dir}")
            return 0
        
        total = 0
        for html_file in html_dir.glob("*.html"):
            count = self.process_html_file(html_file)
            total += count
        
        print(f"[INFO] 共生成 {total} 个Mermaid图")
        return total

def main():
    parser = argparse.ArgumentParser(description='Generate Mermaid diagrams')
    parser.add_argument('--input', '-i', help='Input HTML file')
    parser.add_argument('--all', '-a', action='store_true', help='Process all HTML files')
    
    args = parser.parse_args()
    
    generator = MermaidGenerator()
    
    if args.all or (not args.input):
        generator.process_all_html()
    elif args.input:
        generator.process_html_file(args.input)

if __name__ == '__main__':
    main()
