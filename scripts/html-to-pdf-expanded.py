#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HTML课件转PDF（展开所有折叠内容版本）
将AI-Lesson-Training的精美HTML课件转换为PDF
所有折叠部分自动展开，无需考虑动画
"""

import os
import sys
import asyncio
from pathlib import Path
from datetime import datetime

# 检查playwright是否可用
try:
    from playwright.async_api import async_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False
    print("[ERROR] Playwright未安装。请运行: pip3 install playwright && playwright install chromium")
    sys.exit(1)

# 配置
HTML_FILE = Path("/Users/sonnet/opencode/AI-Lesson-Training/html/day1-pm/index.html")
OUTPUT_DIR = Path("/Users/sonnet/opencode/AI-Lesson-Training/exports/pdf")
OUTPUT_FILE = OUTPUT_DIR / "day1-pm-course-expanded.pdf"

# 展开所有内容的JavaScript代码
EXPAND_ALL_SCRIPT = """
// 1. 展开所有概念卡片详情
const conceptCards = document.querySelectorAll('.concept-card');
conceptCards.forEach(card => {
    const detail = card.querySelector('.concept-detail');
    const toggle = card.querySelector('.concept-toggle');
    if (detail) {
        detail.classList.add('expanded');
        detail.style.display = 'block';
        detail.style.maxHeight = 'none';
        detail.style.opacity = '1';
        detail.style.overflow = 'visible';
    }
    if (toggle) {
        toggle.classList.add('expanded');
        const icon = toggle.querySelector('.toggle-icon');
        const text = toggle.querySelector('.toggle-text');
        if (icon) icon.textContent = '×';
        if (text) text.textContent = '收起详情';
    }
});

// 2. 展开所有代码块
const codeContents = document.querySelectorAll('.code-content');
codeContents.forEach(content => {
    content.classList.remove('collapsed');
    content.classList.add('expanded');
    content.style.display = 'block';
    content.style.maxHeight = 'none';
    content.style.overflow = 'visible';
});

// 3. 更新所有代码块切换按钮
const codeToggles = document.querySelectorAll('.code-toggle');
codeToggles.forEach(toggle => {
    const span = toggle.querySelector('span');
    if (span) span.textContent = '收起';
});

// 4. 显示所有Tab内容（同时显示所有范式）
const tabContents = document.querySelectorAll('.tab-content');
tabContents.forEach(content => {
    content.classList.add('active');
    content.style.display = 'block';
    content.style.position = 'relative';
    content.style.opacity = '1';
    content.style.transform = 'none';
});

// 5. 显示所有RPAR步骤详情面板
const detailPanels = document.querySelectorAll('.detail-panel');
detailPanels.forEach(panel => {
    panel.classList.add('active');
    panel.style.display = 'block';
    panel.style.position = 'relative';
    panel.style.opacity = '1';
    panel.style.transform = 'none';
});

// 6. 激活所有步骤项
const stepItems = document.querySelectorAll('.step-item');
stepItems.forEach(item => {
    item.classList.add('active');
});

// 7. 激活所有连接器
const stepConnectors = document.querySelectorAll('.step-connector');
stepConnectors.forEach(connector => {
    connector.classList.add('active');
});

// 8. 隐藏导航栏（打印时不显示）
const navbar = document.querySelector('.navbar');
if (navbar) {
    navbar.style.display = 'none';
}

// 9. 隐藏返回顶部按钮
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    backToTop.style.display = 'none';
}

// 10. 显示所有隐藏的教学要点
const collapsedElements = document.querySelectorAll('.collapsed');
collapsedElements.forEach(el => {
    el.classList.remove('collapsed');
    el.style.display = 'block';
    el.style.maxHeight = 'none';
    el.style.overflow = 'visible';
});

// 11. 确保所有内容可见
const allHidden = document.querySelectorAll('[style*="display: none"]');
allHidden.forEach(el => {
    // 只显示主要内容区域，不显示UI控件
    if (!el.classList.contains('nav-link') && 
        !el.classList.contains('nav-brand') &&
        !el.id.includes('nav')) {
        el.style.display = 'block';
    }
});

// 12. 移除所有max-height限制
const limitedHeight = document.querySelectorAll('[style*="max-height"]');
limitedHeight.forEach(el => {
    el.style.maxHeight = 'none';
});

console.log('[PDF] 所有内容已展开');
"""

# 打印优化CSS
PRINT_OPTIMIZATION_CSS = """
/* PDF打印优化样式 */
@media print {
    /* 隐藏不需要打印的元素 */
    .navbar,
    .back-to-top,
    .scroll-indicator,
    .nav-progress,
    .step-controls,
    .hero-actions {
        display: none !important;
    }
    
    /* 确保所有内容展开 */
    .concept-detail,
    .code-content,
    .tab-content,
    .detail-panel {
        display: block !important;
        max-height: none !important;
        opacity: 1 !important;
        overflow: visible !important;
        transform: none !important;
        position: relative !important;
    }
    
    /* 防止内容被截断 */
    pre, blockquote, table, .concept-card, .code-block,
    .paradigm-card, .comparison-cards, .workflow-comparison {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
    }
    
    /* 标题保护 */
    h1, h2, h3, h4 {
        page-break-after: avoid !important;
    }
    
    /* 章节分页 */
    .section {
        page-break-before: auto;
    }
    
    /* 封面单独一页 */
    .hero {
        page-break-after: always;
    }
    
    /* 代码块优化 */
    pre {
        white-space: pre-wrap !important;
        word-wrap: break-word !important;
    }
    
    /* 表格优化 */
    table {
        page-break-inside: avoid;
    }
    
    tr {
        page-break-inside: avoid;
    }
    
    /* 背景色打印 */
    * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
    }
}

/* 非打印状态下的展开样式 */
.concept-detail,
.code-content,
.tab-content,
.detail-panel {
    display: block !important;
    max-height: none !important;
    opacity: 1 !important;
    overflow: visible !important;
    transform: none !important;
}

/* 隐藏导航 */
.navbar {
    display: none !important;
}

/* 隐藏交互按钮 */
.back-to-top,
.scroll-indicator,
.step-controls {
    display: none !important;
}
"""

async def convert_html_to_pdf():
    """转换HTML为PDF（所有内容展开）"""
    
    print("[INFO] 开始转换HTML课件为PDF...")
    print(f"[INFO] 源文件: {HTML_FILE}")
    print(f"[INFO] 输出文件: {OUTPUT_FILE}")
    
    # 确保输出目录存在
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    async with async_playwright() as p:
        # 启动浏览器
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        print("[INFO] 正在加载HTML文件...")
        
        # 加载HTML文件
        await page.goto(f'file://{HTML_FILE.absolute()}')
        
        # 等待页面完全加载
        await page.wait_for_load_state('networkidle')
        await asyncio.sleep(2)  # 额外等待确保所有资源加载
        
        print("[INFO] 正在展开所有折叠内容...")
        
        # 注入打印优化CSS
        await page.add_style_tag(content=PRINT_OPTIMIZATION_CSS)
        
        # 执行展开脚本
        await page.evaluate(EXPAND_ALL_SCRIPT)
        
        # 等待展开动画完成
        await asyncio.sleep(2)
        
        # 滚动到页面底部确保所有内容渲染
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await asyncio.sleep(1)
        
        # 滚动回顶部
        await page.evaluate("window.scrollTo(0, 0)")
        await asyncio.sleep(1)
        
        print("[INFO] 正在生成PDF...")
        
        # 生成PDF
        await page.pdf(
            path=str(OUTPUT_FILE),
            format='A4',
            print_background=True,
            margin={
                'top': '20mm',
                'right': '15mm',
                'bottom': '20mm',
                'left': '15mm'
            },
            display_header_footer=True,
            header_template='<div style="font-size: 9px; width: 100%; text-align: center; color: #666; padding: 0 20mm;"><span>AI种子团队培训教材 · Day 1 下午课程</span></div>',
            footer_template='<div style="font-size: 9px; width: 100%; text-align: center; color: #666; padding: 0 20mm;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
        )
        
        await browser.close()
        
        print(f"[OK] PDF生成成功!")
        print(f"[OK] 文件路径: {OUTPUT_FILE}")
        print(f"[OK] 文件大小: {OUTPUT_FILE.stat().st_size / 1024 / 1024:.2f} MB")
        
        return OUTPUT_FILE

def main():
    """主函数"""
    if not HTML_FILE.exists():
        print(f"[ERROR] HTML文件不存在: {HTML_FILE}")
        sys.exit(1)
    
    try:
        asyncio.run(convert_html_to_pdf())
    except Exception as e:
        print(f"[ERROR] 转换失败: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
