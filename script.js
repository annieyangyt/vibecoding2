// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 确保所有按钮初始状态都是未选中
    const scoreButtons = document.querySelectorAll('.score-btn');
    scoreButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 确保所有form-item的分数都是0
    const formItems = document.querySelectorAll('.form-item');
    formItems.forEach(item => {
        item.setAttribute('data-score', 0);
    });
    
    // 为每个评分按钮添加事件监听
    scoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleScoreClick(this);
        });
    });
    
    // 初始化总分（不显示结果）
    updateTotalScore();
    
    // 评估按钮
    document.getElementById('evaluateBtn').addEventListener('click', showResultModal);
    
    // 关闭按钮
    document.getElementById('closeBtn').addEventListener('click', closeModal);
    
    // 点击遮罩层关闭
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // 重置按钮
    document.getElementById('resetBtn').addEventListener('click', function() {
        resetEvaluation();
        closeModal();
    });
    
    // 分享按钮
    document.getElementById('shareBtn').addEventListener('click', shareResult);
}

function handleScoreClick(button) {
    // 找到父级form-item
    const formItem = button.closest('.form-item');
    
    // 移除同组其他按钮的active状态
    const buttons = formItem.querySelectorAll('.score-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 添加当前按钮的active状态
    button.classList.add('active');
    
    // 更新该项的分数
    const score = parseInt(button.getAttribute('data-value'));
    formItem.setAttribute('data-score', score);
    
    // 更新总分（仅更新显示，不显示结果）
    updateTotalScore();
    
    // 添加点击动画
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

function updateTotalScore() {
    // 这个函数现在只用于计算总分，不更新显示
    // 显示只在弹窗中更新
}

function animateNumber(element, from, to) {
    if (!element) return;
    
    const duration = 500;
    const steps = 30;
    const increment = (to - from) / steps;
    let current = from;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        current += increment;
        
        if (step >= steps) {
            element.textContent = to;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, duration / steps);
}

// updateScoreStatus 函数已移除，因为不再需要更新顶部状态

function showResultModal() {
    const formItems = document.querySelectorAll('.form-item');
    let totalScore = 0;
    
    formItems.forEach(item => {
        const score = parseInt(item.getAttribute('data-score')) || 0;
        totalScore += score;
    });
    
    // 更新弹窗中的分数
    const modalScore = document.getElementById('modalScore');
    if (modalScore) {
        animateNumber(modalScore, 0, totalScore);
    }
    
    // 更新弹窗中的状态
    updateModalScoreStatus(totalScore);
    
    // 更新弹窗中的结果描述
    updateModalResult(totalScore);
    
    // 显示弹窗
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
}

function updateModalScoreStatus(score) {
    const modalStatus = document.getElementById('modalScoreStatus');
    if (!modalStatus) return;
    
    const statusText = modalStatus.querySelector('.modal-status-text');
    if (!statusText) return;
    
    // 移除之前的颜色类
    modalStatus.className = 'modal-score-status';
    
    if (score < 30) {
        statusText.textContent = '❌ 不太行';
        modalStatus.style.color = 'var(--danger-color)';
        modalStatus.style.background = 'rgba(239, 68, 68, 0.1)';
    } else if (score < 50) {
        statusText.textContent = '⚠️ 一般般';
        modalStatus.style.color = 'var(--warning-color)';
        modalStatus.style.background = 'rgba(245, 158, 11, 0.1)';
    } else if (score < 60) {
        statusText.textContent = '🤔 还可以';
        modalStatus.style.color = 'var(--warning-color)';
        modalStatus.style.background = 'rgba(245, 158, 11, 0.1)';
    } else if (score < 80) {
        statusText.textContent = '👍 不错哦';
        modalStatus.style.color = 'var(--success-color)';
        modalStatus.style.background = 'rgba(16, 185, 129, 0.1)';
    } else if (score < 100) {
        statusText.textContent = '🌟 很优秀';
        modalStatus.style.color = 'var(--success-color)';
        modalStatus.style.background = 'rgba(16, 185, 129, 0.1)';
    } else {
        statusText.textContent = '💎 完美！';
        modalStatus.style.color = 'var(--primary-color)';
        modalStatus.style.background = 'rgba(99, 102, 241, 0.1)';
    }
    
    // 更新弹窗中的分数圆圈颜色
    const modalScoreCircle = document.querySelector('.modal-score-circle');
    if (modalScoreCircle) {
        if (score >= 60) {
            modalScoreCircle.style.background = 'linear-gradient(135deg, var(--success-color), #059669)';
        } else if (score >= 40) {
            modalScoreCircle.style.background = 'linear-gradient(135deg, var(--warning-color), #d97706)';
        } else {
            modalScoreCircle.style.background = 'linear-gradient(135deg, var(--danger-color), #dc2626)';
        }
    }
}

function updateModalResult(score) {
    const resultTitle = document.getElementById('resultTitle');
    const resultDescription = document.getElementById('resultDescription');
    
    if (!resultTitle || !resultDescription) return;
    
    if (score < 30) {
        resultTitle.textContent = '❌ 建议慎重考虑';
        resultDescription.textContent = `当前得分 ${score} 分，这个工作可能不太适合你。建议继续寻找更好的机会，或者和公司沟通改善条件。记住，工作是为了更好的生活，不要委屈自己！`;
    } else if (score < 50) {
        resultTitle.textContent = '⚠️ 勉强及格';
        resultDescription.textContent = `当前得分 ${score} 分，这个工作只能说一般般。如果暂时没有更好的选择，可以考虑先接受，但建议继续寻找更好的机会。同时可以尝试和公司协商改善部分条件。`;
    } else if (score < 60) {
        resultTitle.textContent = '🤔 接近好公司';
        resultDescription.textContent = `当前得分 ${score} 分，距离好公司的标准（60分）只差一点。可以考虑接受，但建议重点关注得分较低的维度，看看是否有改善空间。`;
    } else if (score < 80) {
        resultTitle.textContent = '👍 这是好公司！';
        resultDescription.textContent = `恭喜！当前得分 ${score} 分，超过了 60 分的标准线。这是一个值得考虑的好公司。虽然可能还有一些小瑕疵，但整体条件已经相当不错了。建议抓住机会！`;
    } else if (score < 100) {
        resultTitle.textContent = '🌟 非常优秀！';
        resultDescription.textContent = `太棒了！当前得分 ${score} 分，这是一个非常优秀的公司。工作条件、福利待遇、发展前景都很不错。如果这个机会适合你，强烈建议抓住！`;
    } else {
        resultTitle.textContent = '💎 完美公司！';
        resultDescription.textContent = `完美！当前得分 ${score} 分（满分），这是一个近乎完美的公司！所有维度都达到了最高标准。如果这个机会适合你，不要犹豫，赶紧抓住这个难得的机会！`;
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
        document.body.style.overflow = ''; // 恢复滚动
    }
}

function resetEvaluation() {
    // 重置所有评分按钮为未选中状态
    const scoreButtons = document.querySelectorAll('.score-btn');
    scoreButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 重置所有form-item的分数为0
    const formItems = document.querySelectorAll('.form-item');
    formItems.forEach(item => {
        item.setAttribute('data-score', 0);
    });
    
    // 更新总分（虽然现在不显示，但保持函数调用以保持代码一致性）
    updateTotalScore();
}

function shareResult() {
    const modalScore = document.getElementById('modalScore');
    const modalStatus = document.getElementById('modalScoreStatus');
    
    if (!modalScore || !modalStatus) return;
    
    const totalScore = parseInt(modalScore.textContent) || 0;
    const statusText = modalStatus.querySelector('.modal-status-text')?.textContent || '评估结果';
    
    const shareText = `我在"这个b班要上吗"评估了这个工作机会，得分：${totalScore}分\n\n${statusText}\n\n${totalScore >= 60 ? '✅ 这是好公司！' : '⚠️ 建议慎重考虑'}\n\n快来评估你的工作机会吧！`;
    
    // 尝试使用Web Share API
    if (navigator.share) {
        navigator.share({
            title: '这个b班要上吗 - 工作评估结果',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('分享失败:', err);
            copyToClipboard(shareText);
        });
    } else {
        // 降级到复制到剪贴板
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('结果已复制到剪贴板！');
        }).catch(err => {
            console.error('复制失败:', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        alert('结果已复制到剪贴板！');
    } catch (err) {
        alert('复制失败，请手动复制：\n\n' + text);
    }
    
    document.body.removeChild(textarea);
}

// 添加一些有趣的交互效果
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.form-item');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        }
    });
});

document.addEventListener('mouseleave', function() {
    const cards = document.querySelectorAll('.form-item');
    cards.forEach(card => {
        card.style.transform = '';
    });
}, true);

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
