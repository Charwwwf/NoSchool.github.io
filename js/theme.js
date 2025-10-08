// Управление темой
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon i');
        this.init();
    }

    init() {
        // Проверяем сохраненную тему или системные предпочтения
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.enableDarkTheme();
        } else {
            this.enableLightTheme();
        }

        // Добавляем обработчик клика
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Слушаем изменения системных предпочтений
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                e.matches ? this.enableDarkTheme() : this.enableLightTheme();
            }
        });
    }

    enableDarkTheme() {
        document.body.classList.add('dark-theme');
        this.updateIcon('sun');
        localStorage.setItem('theme', 'dark');
    }

    enableLightTheme() {
        document.body.classList.remove('dark-theme');
        this.updateIcon('moon');
        localStorage.setItem('theme', 'light');
    }

    toggleTheme() {
        if (document.body.classList.contains('dark-theme')) {
            this.enableLightTheme();
        } else {
            this.enableDarkTheme();
        }
        
        // Добавляем анимацию переключения
        this.themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    updateIcon(iconType) {
        if (!this.themeIcon) return;
        
        this.themeIcon.className = iconType === 'sun' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});