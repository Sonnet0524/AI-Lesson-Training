/**
 * Day 1 PM Content - Interactive Script
 * 交互功能和动画效果
 */

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollProgress();
    initTabSwitching();
    initRparAnimation();
    initScrollAnimations();
    initQuadrantInteractions();
    initStairAnimations();
});

/**
 * 导航功能
 * - 平滑滚动
 * - 当前章节高亮
 * - 导航栏显隐
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    const navbar = document.querySelector('.navbar');
    
    // 点击导航链接平滑滚动
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
    
    // 滚动时更新当前章节
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
 * Tab切换功能
 */
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加active类到当前tab
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

/**
 * RPAR循环动画
 */
function initRparAnimation() {
    const rparPhases = document.querySelectorAll('.rpar-phase');
    
    // 点击高亮
    rparPhases.forEach(phase => {
        phase.addEventListener('click', function() {
            rparPhases.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * RPAR循环播放动画
 * 全局函数，供HTML调用
 */
function animateRparCycle() {
    const phases = document.querySelectorAll('#rparCycle .rpar-phase');
    const statusText = document.querySelector('.rpar-status');
    const phaseNames = ['思考', '规划', '执行', '反思'];
    
    let currentIndex = 0;
    
    // 重置所有phase
    phases.forEach(phase => phase.classList.remove('active'));
    
    // 播放动画
    const interval = setInterval(() => {
        // 移除之前的高亮
        phases.forEach(phase => phase.classList.remove('active'));
        
        // 高亮当前phase
        if (currentIndex < phases.length) {
            phases[currentIndex].classList.add('active');
            statusText.textContent = `当前阶段: ${phaseNames[currentIndex]}`;
            currentIndex++;
        } else {
            // 完成一轮循环
            clearInterval(interval);
            statusText.textContent = 'RPAR循环完成 ✓';
            
            // 显示循环箭头动画
            setTimeout(() => {
                phases.forEach(phase => phase.classList.remove('active'));
                statusText.textContent = '点击播放查看RPAR循环';
            }, 2000);
        }
    }, 1000);
}

/**
 * 滚动触发动画
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-block, .card, .workflow-item, .stair, .quadrant-item');
    
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
 * Acting四象限交互
 */
function initQuadrantInteractions() {
    const quadrants = document.querySelectorAll('.quadrant-item');
    
    quadrants.forEach(quadrant => {
        quadrant.addEventListener('mouseenter', function() {
            const actingType = this.getAttribute('data-acting');
            console.log(`Acting类型: ${actingType}`);
            
            // 可以在这里添加更多交互，如显示详细信息
        });
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
                // 依次显示阶梯
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    stairs.forEach(stair => {
        stair.style.opacity = '0';
        stair.style.transform = 'translateX(-50px)';
        stair.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(stair);
    });
}

/**
 * 回到顶部
 * 全局函数，供HTML调用
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * 粒子背景效果（简化版）
 */
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // 创建粒子
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
        `;
        particlesContainer.appendChild(particle);
    }
}

// 添加浮动动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
    }
`;
document.head.appendChild(style);

// 初始化粒子
initParticles();

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
});

/**
 * 打印当前学习进度
 */
function printProgress() {
    const sections = document.querySelectorAll('.section');
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.round((scrollY / docHeight) * 100);
    
    console.log(`学习进度: ${progress}%`);
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            console.log(`当前章节: ${section.querySelector('.section-title')?.textContent || '未知'}`);
        }
    });
}

// 每30秒打印一次进度（调试用）
// setInterval(printProgress, 30000);

console.log('🤖 Day 1 PM Content - 交互功能已加载');
console.log('快捷键: 1-4跳转到对应课时, ESC回到顶部');
