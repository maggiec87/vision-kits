document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const themeMenu = document.getElementById('theme-menu');
    const themeButtons = themeMenu.querySelectorAll('button');
    const themeSwitcher = document.getElementById('theme-switcher');

    // 1. 应用保存的主题或默认主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // 2. 切换菜单显示/隐藏
    toggleBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        const isHidden = themeMenu.classList.toggle('hidden');

        // *** 新增：为遥控器管理焦点 ***
        if (!isHidden) {
            // 菜单打开时，自动聚焦到当前活动的主题或第一个主题
            const activeButton = themeMenu.querySelector('button.active') || themeMenu.querySelector('button');
            if (activeButton) {
                setTimeout(() => activeButton.focus(), 100); // 延迟确保菜单可见
            }
        }
    });

    // 3. 点击菜单选项，应用主题
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.dataset.theme;
            applyTheme(themeName);
            themeMenu.classList.add('hidden');
            toggleBtn.focus(); // *** 新增：选择后焦点返回主按钮 ***
        });
    });

    // 4. 点击页面其他地方，关闭菜单
    window.addEventListener('click', (event) => {
        if (!themeSwitcher.contains(event.target)) {
            themeMenu.classList.add('hidden');
        }
    });

    /**
     * 应用指定的主题
     * @param {string} themeName - 主题名称 ('light', 'dark', 'paper', 'eyecare')
     */
    function applyTheme(themeName) {
        document.body.classList.remove('theme-dark', 'theme-paper', 'theme-eyecare');

        if (themeName !== 'light') {
            document.body.classList.add(`theme-${themeName}`);
        }

        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeName);
        });

        localStorage.setItem('theme', themeName);
    }
});