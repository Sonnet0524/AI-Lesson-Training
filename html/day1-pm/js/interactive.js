/**
 * Day 1 PM Content - Interactive Script
 * 交互功能和动画效果
 */

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollProgress();
    initTabSwitching();
    initStepContainer();
    initScrollAnimations();
    initStairAnimations();
    initCodeBlocks();
    initConceptCards();
    initParticles();
});

/**
 * 导航功能
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    const navbar = document.querySelector('.navbar');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // 导航栏显隐
        if (scrollY > lastScrollY && scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = scrollY;
        
        // 高亮当前章节
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 滚动进度条
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Tab切换增强版
 */
function initTabSwitching() {
    const tabHeader = document.querySelector('.tab-header');
    if (!tabHeader) return;
    
    const tabButtons = tabHeader.querySelectorAll('.tab-btn');
    const tabIndicator = tabHeader.querySelector('.tab-indicator');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 初始化指示器位置
    function updateIndicator(activeBtn) {
        if (!activeBtn || !tabIndicator) return;
        tabIndicator.style.width = activeBtn.offsetWidth + 'px';
        tabIndicator.style.left = activeBtn.offsetLeft + 'px';
    }
    
    // 初始化第一个tab
    const firstActiveBtn = tabHeader.querySelector('.tab-btn.active');
    if (firstActiveBtn) {
        setTimeout(() => updateIndicator(firstActiveBtn), 100);
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加active类到当前tab
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // 更新指示器位置
            updateIndicator(this);
            
            // 保存到localStorage
            localStorage.setItem('activeTab', targetTab);
        });
    });
    
    // 恢复之前选中的tab
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        const savedBtn = tabHeader.querySelector(`[data-tab="${savedTab}"]`);
        if (savedBtn) {
            savedBtn.click();
        }
    }
}

/**
 * Tab切换函数（全局调用）
 */
function switchTab(tabId) {
    const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (tabBtn) {
        tabBtn.click();
    }
}

/**
 * 步骤展示组件初始化
 */
function initStepContainer() {
    const container = document.getElementById('rparStepContainer');
    if (!container) return;
    
    // 默认激活第一个步骤
    activateStep(1);
}

/**
 * 激活步骤
 */
function activateStep(stepNumber) {
    const stepItems = document.querySelectorAll('.step-item');
    const detailPanels = document.querySelectorAll('.detail-panel');
    const connectors = document.querySelectorAll('.step-connector');
    const statusText = document.querySelector('.step-status');
    
    stepItems.forEach(item => {
        const itemStep = parseInt(item.getAttribute('data-step'));
        item.classList.remove('active');
        if (itemStep === stepNumber) {
            item.classList.add('active');
        }
    });
    
    detailPanels.forEach(panel => {
        const panelStep = parseInt(panel.getAttribute('data-panel'));
        panel.classList.remove('active');
        if (panelStep === stepNumber) {
            panel.classList.add('active');
        }
    });
    
    // 更新连接器状态
    connectors.forEach((connector, index) => {
        connector.classList.remove('active');
        if (index < stepNumber) {
            connector.classList.add('active');
        }
    });
    
    if (statusText) {
        const stepNames = ['思考', '规划', '执行', '反思'];
        statusText.textContent = `当前步骤: ${stepNames[stepNumber - 1]}`;
    }
    
    // 保存状态
    localStorage.setItem('activeStep', stepNumber);
}

/**
 * RPAR动画播放
 */
let animationInterval = null;

function playRparAnimation() {
    const statusText = document.querySelector('.step-status');
    
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
        if (statusText) {
            statusText.textContent = '点击步骤查看详情或播放动画';
        }
        return;
    }
    
    let currentStep = 1;
    const stepNames = ['思考', '规划', '执行', '反思'];
    
    if (statusText) {
        statusText.textContent = '▶ 播放中...';
    }
    
    activateStep(currentStep);
    
    animationInterval = setInterval(() => {
        currentStep++;
        if (currentStep > 4) {
            clearInterval(animationInterval);
            animationInterval = null;
            if (statusText) {
                statusText.textContent = '✓ RPAR循环完成';
            }
            setTimeout(() => {
                if (statusText) {
                    statusText.textContent = '点击步骤查看详情或播放动画';
                }
            }, 2000);
        } else {
            activateStep(currentStep);
            if (statusText) {
                statusText.textContent = `▶ ${stepNames[currentStep - 1]}...`;
            }
        }
    }, 1500);
}

/**
 * 重置RPAR步骤
 */
function resetRparSteps() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    activateStep(1);
    localStorage.removeItem('activeStep');
}

/**
 * 代码折叠组件初始化
 */
function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const content = block.querySelector('.code-content');
        const toggle = block.querySelector('.code-toggle');
        
        if (!content || !toggle) return;
        
        // 检查行数，超过20行默认折叠
        const lines = content.textContent.split('\n').length;
        if (lines > 20 && !content.classList.contains('expanded')) {
            content.classList.add('collapsed');
            toggle.querySelector('span').textContent = '展开';
        }
    });
}

/**
 * 代码折叠/展开
 */
function toggleCode(button) {
    const codeBlock = button.closest('.code-block');
    const content = codeBlock.querySelector('.code-content');
    const span = button.querySelector('span');
    
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        content.classList.add('expanded');
        span.textContent = '收起';
        
        // 保存展开状态
        const codeId = codeBlock.querySelector('code').className;
        localStorage.setItem(`code_${codeId}`, 'expanded');
    } else {
        content.classList.add('collapsed');
        content.classList.remove('expanded');
        span.textContent = '展开';
        
        // 移除展开状态
        const codeId = codeBlock.querySelector('code').className;
        localStorage.removeItem(`code_${codeId}`);
    }
}

/**
 * 概念详情卡片初始化
 */
function initConceptCards() {
    const cards = document.querySelectorAll('.concept-card');
    
    cards.forEach(card => {
        const conceptId = card.getAttribute('data-concept');
        const detail = card.querySelector('.concept-detail');
        
        // 恢复展开状态
        if (localStorage.getItem(`concept_${conceptId}`) === 'expanded') {
            detail.classList.add('expanded');
            const toggle = card.querySelector('.concept-toggle');
            if (toggle) {
                toggle.classList.add('expanded');
                toggle.querySelector('.toggle-text').textContent = '收起详情';
                toggle.querySelector('.toggle-icon').textContent = '×';
            }
        }
    });
}

/**
 * 概念卡片展开/收起
 */
function toggleConcept(button) {
    const card = button.closest('.concept-card');
    const detail = card.querySelector('.concept-detail');
    const conceptId = card.getAttribute('data-concept');
    const icon = button.querySelector('.toggle-icon');
    const text = button.querySelector('.toggle-text');
    
    if (detail.classList.contains('expanded')) {
        detail.classList.remove('expanded');
        button.classList.remove('expanded');
        icon.textContent = '+';
        text.textContent = '了解详情';
        localStorage.removeItem(`concept_${conceptId}`);
    } else {
        detail.classList.add('expanded');
        button.classList.add('expanded');
        icon.textContent = '×';
        text.textContent = '收起详情';
        localStorage.setItem(`concept_${conceptId}`, 'expanded');
        
        // 滚动到卡片位置
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * 滚动触发动画
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-block, .card, .workflow-item, .stair, .quadrant-item, .code-block');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * 演进阶梯动画
 */
function initStairAnimations() {
    const stairs = document.querySelectorAll('.stair');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, observerOptions);
    
    stairs.forEach(stair => {
        stair.style.opacity = '0';
        stair.style.transform = 'translateX(-30px)';
        stair.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(stair);
    });
}

/**
 * 粒子背景效果
 */
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // 清除现有粒子
    particlesContainer.innerHTML = '';
    
    // 创建粒子
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(88, 166, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// 添加粒子动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        25% { transform: translateY(-30px) translateX(10px); opacity: 0.6; }
        50% { transform: translateY(-20px) translateX(-10px); opacity: 0.4; }
        75% { transform: translateY(-40px) translateX(5px); opacity: 0.5; }
    }
`;
document.head.appendChild(style);

/**
 * 回到顶部
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * 键盘快捷键
 */
document.addEventListener('keydown', function(e) {
    // ESC键回到顶部
    if (e.key === 'Escape') {
        scrollToTop();
    }
    
    // 数字键1-4跳转到对应课时
    if (e.key >= '1' && e.key <= '4') {
        const sectionMap = {
            '1': 'hour1',
            '2': 'hour2',
            '3': 'hour3',
            '4': 'summary'
        };
        const targetId = sectionMap[e.key];
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    // 空格键播放/暂停RPAR动画
    if (e.key === ' ' && document.querySelector('.step-container:hover')) {
        e.preventDefault();
        playRparAnimation();
    }
});

/**
 * RPAR循环动画（兼容旧版）
 */
function animateRparCycle() {
    playRparAnimation();
}

/**
 * 打印当前学习进度
 */
function printProgress() {
    const sections = document.querySelectorAll('.section');
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.round((scrollY / docHeight) * 100);
    
    console.log(`📊 学习进度: ${progress}%`);
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            const title = section.querySelector('.section-title')?.textContent || '未知';
            console.log(`📍 当前章节: ${title}`);
        }
    });
}

// 导出全局函数
window.toggleCode = toggleCode;
window.toggleConcept = toggleConcept;
window.activateStep = activateStep;
window.playRparAnimation = playRparAnimation;
window.resetRparSteps = resetRparSteps;
window.switchTab = switchTab;
window.scrollToTop = scrollToTop;
window.animateRparCycle = animateRparCycle;

// 控制台提示
console.log('🤖 Day 1 PM Content - 交互功能已加载');
console.log('💡 快捷键提示:');
console.log('   1-4: 跳转到对应课时');
console.log('   ESC: 回到顶部');
console.log('   空格: 播放RPAR动画（当鼠标在步骤组件上时）');
console.log('📚 组件清单:');
console.log('   ✓ 代码折叠组件');
console.log('   ✓ 概念详情卡片');
console.log('   ✓ 代码语法高亮（Prism.js）');
console.log('   ✓ 步骤展示组件');
console.log('   ✓ Tab切换增强');