import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        userTheme: 'light',
        switchThemeValue: false,
        htmlElement: document.documentElement
    }),
    getters: {
        isDarkTheme: (state) => state.userTheme === 'dark'
    },
    actions: {
        initialTheme() {
            const theme = localStorage.getItem('theme');

            switch (theme) {
                case 'dark':
                    this.htmlElement.setAttribute('class', 'theme--dark');
                    this.userTheme = theme;
                    this.switchThemeValue = true;
                    break;
                case 'light':
                    this.htmlElement.setAttribute('class', 'theme--light');
                    this.userTheme = theme;
                    this.switchThemeValue = false;
                    break;
                default:
                    this.htmlElement.setAttribute('class', 'theme--light');
                    this.userTheme = 'light';
                    this.switchThemeValue = false;
                    break;
            }
        },
        setTheme(value) {
            switch (value) {
                case 'light':
                    this.switchThemeValue = false;
                    break;
                case 'dark':
                    this.switchThemeValue = true;
                    break;
            }
            localStorage.setItem('theme', value);
            this.htmlElement.setAttribute('class', `theme--${value}`);
        }
    }
});
